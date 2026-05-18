"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import MobileMoneyTab from "./MobileMoneyTab";
import CardTab from "./CardTab";

type Tab = "mobile" | "card";

export default function CoffeeTabs() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<Tab>("mobile");

    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const subtext = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
    const tabActiveBg = isDark ? "#111118" : "#f0f0f8";

    const tabStyle = (active: boolean): React.CSSProperties => ({
        flex: 1,
        padding: "11px 0",
        fontFamily: "Syne, sans-serif",
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.06em",
        cursor: "pointer",
        border: "none",
        backgroundColor: active ? tabActiveBg : "transparent",
        color: active ? "#F5C518" : subtext,
        borderBottom: active ? "2px solid #F5C518" : "2px solid transparent",
        transition: "all 0.2s",
    });

    return (
        <>
            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: `1px solid ${border}` }}>
                <button style={tabStyle(activeTab === "mobile")} onClick={() => setActiveTab("mobile")}>
                    📱  MOBILE MONEY
                </button>
                <button style={tabStyle(activeTab === "card")} onClick={() => setActiveTab("card")}>
                    💳  CARD
                </button>
            </div>

            {/* Tab content — both always mounted so SDK lifecycle is preserved */}
            <div style={{ display: activeTab === "mobile" ? "block" : "none", padding: "1.5rem", width: "100%", boxSizing: "border-box" }}>
                <MobileMoneyTab />
            </div>
            <div style={{ display: activeTab === "card" ? "block" : "none", padding: "1.5rem", width: "100%", boxSizing: "border-box" }}>
                <CardTab active={activeTab === "card"} />
            </div>
        </>
    );
}
