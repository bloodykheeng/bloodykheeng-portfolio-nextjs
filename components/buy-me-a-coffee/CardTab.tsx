"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/providers/ThemeProvider";

interface OlyCashWindow extends Window {
    OlyCash?: { init: () => void };
}

// Mirrors the exact pattern from the original CoffeeModal:
//  - always-mounted component
//  - mounted ref for async safety
//  - loadSDK triggered by `active` prop change (not on mount)
//  → Strict Mode's double-fire only hits active=false, so SDK never loads twice
export default function CardTab({ active }: { active: boolean }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("5.00");
    const [sdkLoading, setSdkLoading] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mounted = useRef(true);

    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const text = isDark ? "#ffffff" : "#0a0a0f";
    const subtext = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
    const inputBg = isDark ? "#111118" : "#f7f7fb";
    const inputBorder = isDark ? "rgba(0,229,160,0.3)" : "rgba(0,184,122,0.4)";
    const bg = isDark ? "#0a0a0f" : "#ffffff";

    const inputStyle: React.CSSProperties = {
        backgroundColor: inputBg, color: text,
        border: `1px solid ${inputBorder}`,
        padding: "10px 12px", fontSize: "13px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        outline: "none", width: "100%", boxSizing: "border-box",
    };

    const labelStyle: React.CSSProperties = {
        fontFamily: "Syne, sans-serif", fontWeight: 600,
        fontSize: "11px", color: subtext,
        letterSpacing: "0.08em", textTransform: "uppercase" as const,
        display: "block", marginBottom: "6px",
    };

    // Track mounted state so async SDK callbacks don't fire after unmount
    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; if (timerRef.current) clearTimeout(timerRef.current); };
    }, []);

    const buildDOM = useCallback((cur: string, amt: string) => {
        const a = anchorRef.current; if (!a) return;
        a.innerHTML = "";
        const d = document.createElement("div");
        d.className = "olycash-pay olycash--window";
        d.style.cssText = "width:100% !important;";
        d.dataset.id = "1346D7C_5A9468";
        const h = (id: string, n: string, v: string) => {
            const i = document.createElement("input");
            i.type = "hidden"; i.id = id; i.name = n; i.value = v;
            return i;
        };
        d.appendChild(h("olycash__category", "olycash__category", "156"));
        d.appendChild(h("olycash__total", "olycash__total", amt));
        d.appendChild(h("olycash__currency", "olycash__currency", cur));
        d.appendChild(h("olycash__third_party_fee_paid_by", "olycash__third_party_fee_paid_by", "payee"));
        a.appendChild(d);
    }, []);

    const cleanBody = useCallback(() => {
        document.querySelectorAll('iframe[src*="olycash"],div[class*="olycash"][id*="olycash"]')
            .forEach(el => { if (!anchorRef.current?.contains(el)) el.remove(); });
    }, []);

    const loadSDK = useCallback((cur: string, amt: string) => {
        if (!mounted.current) return;
        setSdkLoading(true);
        cleanBody();
        const ex = document.getElementById("olycash-js-sdk"); if (ex) ex.remove();
        buildDOM(cur, amt);
        const s = document.createElement("script");
        s.id = "olycash-js-sdk";
        s.src = "https://share.olycash.com/en-us/sdk.js";
        s.async = true;
        s.onload = () => {
            timerRef.current = setTimeout(() => {
                if (!mounted.current) return;
                try { const w = window as OlyCashWindow; if (w.OlyCash?.init) w.OlyCash.init(); } catch { }
                timerRef.current = setTimeout(() => { if (mounted.current) setSdkLoading(false); }, 1000);
            }, 300);
        };
        s.onerror = () => { if (mounted.current) setSdkLoading(false); };
        document.body.appendChild(s);
    }, [buildDOM, cleanBody]);

    // Same trigger pattern as original CoffeeModal's useEffect([visible]):
    // fires once when active becomes true — NOT on the initial false state,
    // so Strict Mode's double-fire is a harmless no-op.
    useEffect(() => {
        if (active) {
            timerRef.current = setTimeout(() => loadSDK(currency, amount), 150);
        } else {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    // Reload SDK when currency or amount change while tab is active.
    // Debounced so typing doesn't fire on every keystroke.
    useEffect(() => {
        if (!active) return;
        const timer = setTimeout(() => loadSDK(currency, amount), 600);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, amount]);

    return (
        <div style={{ width: "100%" }}>
            {/* Loading overlay */}
            {sdkLoading && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 0", gap: "14px" }}>
                    <div style={{ width: "38px", height: "38px", borderLeft: "3px solid rgba(0,229,160,0.15)", borderRight: "3px solid rgba(0,229,160,0.15)", borderBottom: "3px solid rgba(0,229,160,0.15)", borderTop: "3px solid #F5C518", borderRadius: "50%", animation: "c_spin 0.7s linear infinite" }} />
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", color: subtext, margin: 0 }}>Loading payment widget…</p>
                </div>
            )}

            <div style={{ display: sdkLoading ? "none" : "block", width: "100%" }}>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", color: subtext, textAlign: "center", margin: "0 0 20px" }}>
                    Pay securely with your debit or credit card
                </p>

                {/* Amount row */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Amount</label>
                    <div style={{ display: "flex" }}>
                        <select
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                            id="olycash__tempcurrency_1738145629"
                            name="olycash__tempcurrency_1738145629"
                            className="__olycash-temp-currency-field"
                            data-order="USD,UGX,EUR,GBP,KES"
                            style={{ ...inputStyle, width: "90px", flexShrink: 0, borderRight: "none", fontFamily: "Syne, sans-serif", fontWeight: 600 }}
                        >
                            <option value="USD">USD</option>
                            <option value="UGX">UGX</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="KES">KES</option>
                        </select>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            id="olycash__temptotal_1738145629"
                            name="olycash__temptotal_1738145629"
                            className="__olycash-temp-amount-field"
                            placeholder="0.00"
                            maxLength={12}
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                        {["3.00", "5.00", "10.00", "20.00"].map(v => (
                            <button key={v} type="button" onClick={() => setAmount(v)}
                                style={{ fontFamily: "Syne, sans-serif", fontSize: "11px", fontWeight: 600, padding: "4px 10px", background: amount === v ? "#F5C518" : "transparent", color: amount === v ? "#0a0a0f" : subtext, border: `1px solid ${amount === v ? "#F5C518" : border}`, cursor: "pointer", transition: "all 0.15s" }}>
                                {currency} {v}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount entry form — SDK reads these temp fields on Pay */}
                <table className="olycash-amount-entry-form" data-id="1346D7C_5A9468_amountform"
                    style={{ display: "none" }}>
                    <tbody><tr><td></td></tr></tbody>
                </table>

                {/* SDK widget renders here */}
                <div ref={anchorRef} style={{ width: "100%", backgroundColor: bg }} />
            </div>
        </div>
    );
}
