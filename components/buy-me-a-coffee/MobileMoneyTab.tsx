"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";

type Status = "idle" | "loading" | "initiated" | "success" | "failed";

interface FieldErrors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    amount?: string;
}

function normalizePhone(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("256")) return digits;
    if (digits.startsWith("0")) return "256" + digits.slice(1);
    return "256" + digits;
}

const MAX_POLL_ATTEMPTS = 60;   // 5 min initial wait (60 × 5 s)
const MAX_RETRY_ATTEMPTS = 6;   // 30 s on manual retry  (6 × 5 s)

const QUICK_AMOUNTS = [
    { label: "2K", value: "2000" },
    { label: "5K", value: "5000" },
    { label: "10K", value: "10000" },
    { label: "20K", value: "20000" },
];

export default function MobileMoneyTab() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("5000");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [timedOut, setTimedOut] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const mounted = useRef(true);
    const amountInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const text = isDark ? "#ffffff" : "#0a0a0f";
    const subtext = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
    const inputBg = isDark ? "#111118" : "#f7f7fb";
    const inputBorder = isDark ? "rgba(0,229,160,0.3)" : "rgba(0,184,122,0.4)";
    const sectionBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
    const accent = "#00e5a0";
    const errorRed = "#ff6b6b";
    const errorBorder = "rgba(255,107,107,0.8)";

    const baseInput: React.CSSProperties = {
        backgroundColor: inputBg, color: text,
        padding: "11px 14px", fontSize: "13px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        outline: "none", width: "100%", boxSizing: "border-box",
    };

    const inputStyle = (field?: keyof FieldErrors): React.CSSProperties => ({
        ...baseInput,
        border: `1px solid ${field && fieldErrors[field] ? errorBorder : inputBorder}`,
    });

    const labelStyle: React.CSSProperties = {
        fontFamily: "Syne, sans-serif", fontWeight: 600,
        fontSize: "11px", color: subtext,
        letterSpacing: "0.08em", textTransform: "uppercase",
        display: "block", marginBottom: "6px",
    };

    const sectionStyle: React.CSSProperties = {
        backgroundColor: sectionBg,
        border: `1px solid ${border}`,
        padding: "16px",
        marginBottom: "12px",
    };

    const fieldErrorStyle: React.CSSProperties = {
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "11px", color: errorRed,
        marginTop: "5px", display: "block",
    };

    function clearFieldError(field: keyof FieldErrors) {
        if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }

    function validate(): FieldErrors {
        const errors: FieldErrors = {};
        if (!firstName.trim()) errors.firstName = "First name is required.";
        if (!lastName.trim()) errors.lastName = "Last name is required.";
        if (!phone.trim()) {
            errors.phone = "Phone number is required.";
        } else if (normalizePhone(phone).length < 12) {
            errors.phone = "Enter a valid Uganda number (e.g. 0707 123 456).";
        }
        const amt = parseInt(amount, 10);
        if (!amount.trim()) {
            errors.amount = "Amount is required.";
        } else if (!amt || amt < 500) {
            errors.amount = "Minimum amount is UGX 500.";
        }
        return errors;
    }

    async function pollStatus(pid: string, attempts = 0, maxAttempts = MAX_POLL_ATTEMPTS) {
        if (!mounted.current) return;
        if (attempts >= maxAttempts) {
            setStatus("failed");
            setTimedOut(true);
            setErrorMsg("Timed out — if you already paid, tap below to check.");
            return;
        }
        try {
            const res = await fetch(`/api/coffee/webhook?purchase_id=${pid}`);
            const data = await res.json();
            if (!mounted.current) return;
            if (data.status === "success") { setStatus("success"); return; }
            if (data.status === "fail") { setStatus("failed"); setTimedOut(false); setErrorMsg("Payment was declined or cancelled."); return; }
        } catch { }
        if (mounted.current) setTimeout(() => pollStatus(pid, attempts + 1, maxAttempts), 5000);
    }

    function retryCheck() {
        setStatus("initiated");
        setTimedOut(false);
        setErrorMsg("");
        pollStatus(purchaseId, 0, MAX_RETRY_ATTEMPTS);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg("");

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setFieldErrors({});
        setStatus("loading");

        const normalized = normalizePhone(phone);
        const amt = parseInt(amount, 10);

        try {
            const res = await fetch("/api/coffee/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, phone: normalized, amount: amt }),
            });
            const data = await res.json();

            if (!res.ok || data.error) {
                setStatus("failed");
                setErrorMsg(data.error ?? "Failed to initiate payment. Try again.");
                return;
            }

            setPurchaseId(data.purchase_id);
            setStatus("initiated");
            pollStatus(data.purchase_id);
        } catch {
            setStatus("failed");
            setErrorMsg("Network error. Please check your connection.");
        }
    }

    /* ── Success screen ── */
    if (status === "success") {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "52px", marginBottom: "16px" }}>☕</div>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px", color: accent, margin: "0 0 8px" }}>
                    Thank you!
                </p>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: subtext, margin: 0 }}>
                    UGX {parseInt(amount).toLocaleString()} received. You&apos;re amazing!
                </p>
            </div>
        );
    }

    /* ── Timed out screen ── */
    if (status === "failed" && timedOut) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>⏱</div>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "15px", color: text, margin: "0 0 10px" }}>
                    Still waiting…
                </p>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: subtext, margin: "0 0 24px" }}>
                    If you already approved the prompt, tap below to check again.
                </p>
                <button onClick={retryCheck}
                    style={{ padding: "12px 28px", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.06em", color: "#0a0a0f", backgroundColor: "#F5C518", border: "none", cursor: "pointer" }}>
                    CHECK PAYMENT STATUS
                </button>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "11px", color: subtext, marginTop: "16px" }}>
                    Or close and try again if you haven&apos;t paid yet.
                </p>
            </div>
        );
    }

    /* ── Awaiting PIN screen ── */
    if (status === "initiated") {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: "44px", height: "44px", borderLeft: "3px solid rgba(0,229,160,0.15)", borderRight: "3px solid rgba(0,229,160,0.15)", borderBottom: "3px solid rgba(0,229,160,0.15)", borderTop: "3px solid #F5C518", borderRadius: "50%", animation: "c_spin 0.7s linear infinite", margin: "0 auto 20px" }} />
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "15px", color: text, margin: "0 0 10px" }}>
                    📱 Check your phone
                </p>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: subtext, margin: "0 0 6px" }}>
                    Payment prompt sent to <strong style={{ color: text }}>0{normalizePhone(phone).slice(3)}</strong>
                </p>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: subtext, margin: "0 0 20px" }}>
                    Enter your PIN to confirm <strong style={{ color: text }}>UGX {parseInt(amount).toLocaleString()}</strong>
                </p>
                {purchaseId && (
                    <p style={{ fontFamily: "monospace", fontSize: "11px", color: subtext, opacity: 0.5, margin: 0 }}>
                        Ref: {purchaseId}
                    </p>
                )}
            </div>
        );
    }

    /* ── Form ── */
    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }} noValidate>

            {/* Section: Your Details */}
            <div style={sectionStyle}>
                <p style={{ ...labelStyle, marginBottom: "12px", color: text }}>Your Details</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <div>
                        <label style={labelStyle}>First Name</label>
                        <input
                            value={firstName}
                            onChange={e => { setFirstName(e.target.value); clearFieldError("firstName"); }}
                            placeholder="John"
                            style={inputStyle("firstName")}
                        />
                        {fieldErrors.firstName && <span style={fieldErrorStyle}>{fieldErrors.firstName}</span>}
                    </div>
                    <div>
                        <label style={labelStyle}>Last Name</label>
                        <input
                            value={lastName}
                            onChange={e => { setLastName(e.target.value); clearFieldError("lastName"); }}
                            placeholder="Doe"
                            style={inputStyle("lastName")}
                        />
                        {fieldErrors.lastName && <span style={fieldErrorStyle}>{fieldErrors.lastName}</span>}
                    </div>
                </div>
                <div>
                    <label style={labelStyle}>Mobile Money Number</label>
                    <div style={{ display: "flex" }}>
                        <span style={{ backgroundColor: inputBg, borderTop: `1px solid ${fieldErrors.phone ? errorBorder : inputBorder}`, borderBottom: `1px solid ${fieldErrors.phone ? errorBorder : inputBorder}`, borderLeft: `1px solid ${fieldErrors.phone ? errorBorder : inputBorder}`, borderRight: "none", padding: "11px 12px", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "12px", color: subtext, whiteSpace: "nowrap", flexShrink: 0 }}>
                            🇺🇬 +256
                        </span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setPhone(digits);
                                clearFieldError("phone");
                            }}
                            placeholder="707 123 456"
                            maxLength={10}
                            style={{ ...inputStyle("phone"), flex: 1 }}
                        />
                    </div>
                    {fieldErrors.phone
                        ? <span style={fieldErrorStyle}>{fieldErrors.phone}</span>
                        : <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "11px", color: subtext, marginTop: "5px", display: "block" }}>MTN or Airtel Uganda number</span>
                    }
                </div>
            </div>

            {/* Section: Amount */}
            <div style={sectionStyle}>
                <p style={{ ...labelStyle, marginBottom: "12px", color: text }}>Amount</p>
                <div style={{ display: "flex", marginBottom: "6px" }}>
                    <span style={{ backgroundColor: inputBg, borderTop: `1px solid ${fieldErrors.amount ? errorBorder : inputBorder}`, borderBottom: `1px solid ${fieldErrors.amount ? errorBorder : inputBorder}`, borderLeft: `1px solid ${fieldErrors.amount ? errorBorder : inputBorder}`, borderRight: "none", padding: "11px 14px", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", color: text, flexShrink: 0 }}>
                        UGX
                    </span>
                    <input
                        ref={amountInputRef}
                        type="text"
                        inputMode="numeric"
                        value={amount ? Number(amount).toLocaleString("en-US") : ""}
                        onChange={e => {
                            const el = e.currentTarget;
                            const cursor = el.selectionStart ?? 0;
                            const oldFormatted = el.value;
                            const raw = oldFormatted.replace(/,/g, "").replace(/\D/g, "");
                            const newFormatted = raw ? Number(raw).toLocaleString("en-US") : "";
                            // adjust cursor for commas added/removed
                            const oldCommas = (oldFormatted.slice(0, cursor).match(/,/g) || []).length;
                            const newCommas = (newFormatted.slice(0, cursor).match(/,/g) || []).length;
                            const newCursor = cursor + (newCommas - oldCommas);
                            setAmount(raw);
                            clearFieldError("amount");
                            requestAnimationFrame(() => {
                                amountInputRef.current?.setSelectionRange(newCursor, newCursor);
                            });
                        }}
                        placeholder="5,000"
                        style={{ ...inputStyle("amount"), flex: 1 }}
                    />
                </div>
                {fieldErrors.amount && <span style={{ ...fieldErrorStyle, marginBottom: "8px" }}>{fieldErrors.amount}</span>}
                {/* Quick amounts */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                    {QUICK_AMOUNTS.map(({ label, value }) => (
                        <button key={value} type="button"
                            onClick={() => { setAmount(value); clearFieldError("amount"); }}
                            style={{ fontFamily: "Syne, sans-serif", fontSize: "11px", fontWeight: 700, padding: "5px 12px", background: amount === value ? "#F5C518" : "transparent", color: amount === value ? "#0a0a0f" : subtext, border: `1px solid ${amount === value ? "#F5C518" : border}`, cursor: "pointer", transition: "all 0.15s" }}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Global API error */}
            {errorMsg && (
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", color: errorRed, margin: "0 0 12px", padding: "10px 14px", border: "1px solid rgba(255,107,107,0.3)", backgroundColor: "rgba(255,107,107,0.08)" }}>
                    {errorMsg}
                </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === "loading"}
                style={{ width: "100%", padding: "14px", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.08em", color: "#0a0a0f", backgroundColor: status === "loading" ? "rgba(245,197,24,0.6)" : "#F5C518", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", transition: "opacity 0.2s" }}>
                {status === "loading" ? "SENDING PROMPT…" : "☕  SEND COFFEE VIA MOBILE MONEY"}
            </button>

            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "11px", color: subtext, textAlign: "center", margin: "10px 0 0" }}>
                You will receive a payment prompt on your phone
            </p>
        </form>
    );
}
