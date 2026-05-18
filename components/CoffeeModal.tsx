"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";

interface OlyCashWindow extends Window {
    OlyCash?: { init: () => void };
}

function CoffeeCard({ onClose }: { onClose: () => void }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("10.00");
    const [sdkLoading, setSdkLoading] = useState(true);
    const anchorRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialized = useRef(false);

    const bg = isDark ? "#0a0a0f" : "#ffffff";
    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const text = isDark ? "#ffffff" : "#0a0a0f";
    const subtext = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
    const inputBg = isDark ? "#111118" : "#f7f7fb";
    const inputBorder = isDark ? "rgba(0,229,160,0.3)" : "rgba(0,184,122,0.4)";

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        const a = anchorRef.current;
        if (!a) return;

        // Build the olycash-pay div with hidden inputs
        a.innerHTML = "";
        const d = document.createElement("div");
        d.className = "olycash-pay olycash--window";
        d.style.cssText = "width:100% !important;";
        d.dataset.ignorefrequency = "Y";
        d.dataset.id = "1346D7C_959467";
        const hidden = (id: string, n: string, v: string) => {
            const i = document.createElement("input");
            i.type = "hidden"; i.id = id; i.name = n; i.value = v;
            return i;
        };
        d.appendChild(hidden("olycash__category", "olycash__category", "156"));
        d.appendChild(hidden("olycash__total", "olycash__total", amount));
        d.appendChild(hidden("olycash__currency", "olycash__currency", currency));
        d.appendChild(hidden("olycash__third_party_fee_paid_by", "olycash__third_party_fee_paid_by", "payer"));
        a.appendChild(d);

        // Clean up any body-level SDK remnants from a previous session
        document.querySelectorAll('iframe[src*="olycash"],div[class*="olycash"][id*="olycash"]')
            .forEach(el => { if (!a.contains(el)) el.remove(); });

        // Remove old script + global so SDK re-executes fresh
        const existing = document.getElementById("olycash-js-sdk");
        if (existing) existing.remove();
        try { delete (window as OlyCashWindow).OlyCash; } catch { }

        const s = document.createElement("script");
        s.id = "olycash-js-sdk";
        s.src = "https://share.olycash.com/en-us/sdk.js";
        s.async = true;
        s.onload = () => {
            timerRef.current = setTimeout(() => {
                try {
                    const w = window as OlyCashWindow;
                    if (w.OlyCash?.init) w.OlyCash.init();
                } catch { }
                timerRef.current = setTimeout(() => setSdkLoading(false), 1000);
            }, 300);
        };
        s.onerror = () => setSdkLoading(false);
        document.body.appendChild(s);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ position: "relative", width: "min(92vw, 820px)", maxHeight: "90vh", overflowY: "auto", backgroundColor: bg, borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}`, borderTop: "2px solid #F5C518", animation: "c_enter 0.25s ease", boxShadow: "0 25px 80px rgba(0,0,0,0.4)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "14px", color: text, letterSpacing: "0.05em" }}>
                    ☕ BUY ME A COFFEE
                </span>
                <button onClick={onClose} style={{ background: "none", border: `1px solid ${border}`, cursor: "pointer", color: subtext, padding: "4px 10px", fontFamily: "monospace", fontSize: "14px" }}>✕</button>
            </div>
            {/* Body */}
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", minHeight: "280px" }}>
                {/* Loading overlay */}
                <div style={{ position: "absolute", inset: 0, display: sdkLoading ? "flex" : "none", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: bg, zIndex: 10, gap: "14px" }}>
                    <div style={{ width: "38px", height: "38px", borderLeft: "3px solid rgba(0,229,160,0.15)", borderRight: "3px solid rgba(0,229,160,0.15)", borderBottom: "3px solid rgba(0,229,160,0.15)", borderTop: "3px solid #F5C518", borderRadius: "50%", animation: "c_spin 0.7s linear infinite" }} />
                    <p style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontSize: "13px", color: subtext, textAlign: "center", margin: 0 }}>Loading payment widget…</p>
                </div>
                {/* Amount row */}
                <table className="olycash-amount-entry-form" data-id="1346D7C_959467_amountform"
                    style={{ borderCollapse: "collapse", border: "none", minWidth: "100px", maxWidth: "280px", marginBottom: "16px", background: "none" }}>
                    <tbody>
                        <tr>
                            <td style={{ background: "none", border: "none", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: "13px", padding: "0", whiteSpace: "nowrap", width: "1%", color: subtext, paddingRight: "10px" }}>
                                Amount:
                            </td>
                            <td style={{ background: "none", border: "none", padding: "0 4px" }}>
                                <select value={currency} onChange={e => setCurrency(e.target.value)}
                                    id="olycash__tempcurrency_1738145629" name="olycash__tempcurrency_1738145629"
                                    className="__olycash-temp-currency-field" data-order="USD,UGX,EUR,GBP,KES"
                                    style={{ backgroundColor: inputBg, color: text, border: `1px solid ${inputBorder}`, padding: "8px 6px", fontSize: "13px", fontFamily: "Syne,sans-serif", width: "80px", height: "42px", outline: "none" }}>
                                    <option value="USD">USD</option>
                                    <option value="UGX">UGX</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="KES">KES</option>
                                </select>
                            </td>
                            <td style={{ background: "none", border: "none", padding: "0" }}>
                                <input type="text" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)}
                                    id="olycash__temptotal_1738145629" name="olycash__temptotal_1738145629"
                                    className="__olycash-temp-amount-field" placeholder="0.00" maxLength={12}
                                    style={{ backgroundColor: inputBg, color: text, border: `1px solid ${inputBorder}`, padding: "8px 12px", fontSize: "13px", fontFamily: "Syne,sans-serif", width: "110px", height: "24px", outline: "none" }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div ref={anchorRef} style={{ width: "100%" }} />
            </div>
        </div>
    );
}

export default function CoffeeModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    return (
        <>
            <style>{`
                @keyframes c_spin { to { transform: rotate(360deg); } }
                @keyframes c_enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
            {/* Backdrop — always mounted so it can fade */}
            <div
                style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transition: "opacity 0.25s ease" }}
                onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            >
                {/* Card — conditionally rendered so React always gets a clean DOM */}
                {visible && <CoffeeCard onClose={onClose} />}
            </div>
        </>
    );
}
