"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import CoffeeTabs from "./CoffeeTabs";

function CoffeeCard({ onClose }: { onClose: () => void }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [maximized, setMaximized] = useState(false);

    const bg = isDark ? "#0a0a0f" : "#ffffff";
    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const text = isDark ? "#ffffff" : "#0a0a0f";
    const subtext = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
    const btnHover = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

    const iconBtnStyle: React.CSSProperties = {
        background: "none",
        border: `1px solid ${border}`,
        cursor: "pointer",
        color: subtext,
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        transition: "background 0.15s, color 0.15s",
    };

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                backgroundColor: bg,
                borderLeft: `1px solid ${border}`,
                borderRight: `1px solid ${border}`,
                borderBottom: `1px solid ${border}`,
                borderTop: "2px solid #F5C518",
                animation: "c_enter 0.25s ease",
                boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                // Size: normal vs maximized
                width: maximized ? "min(96vw, 1100px)" : "min(92vw, 680px)",
                height: maximized ? "88vh" : "auto",
                maxHeight: maximized ? "88vh" : "90vh",
                // Native browser resize handle (bottom-right corner)
                resize: "both",
                overflow: "hidden",
                minWidth: "min(92vw, 520px)",
                minHeight: "260px",
                transition: "width 0.2s ease, height 0.2s ease",
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "13px", color: text, letterSpacing: "0.05em" }}>
                    ☕ BUY ME A COFFEE
                </span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {/* Maximize / Restore */}
                    <button
                        onClick={() => setMaximized(m => !m)}
                        title={maximized ? "Restore" : "Maximize"}
                        style={iconBtnStyle}
                        onMouseEnter={e => (e.currentTarget.style.background = btnHover)}
                        onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                        {maximized
                            ? <RiFullscreenExitLine size={14} />
                            : <RiFullscreenLine size={14} />}
                    </button>
                    {/* Close */}
                    <button
                        onClick={onClose}
                        title="Close"
                        style={{ ...iconBtnStyle, fontFamily: "monospace", fontSize: "13px", padding: "4px 9px" }}
                        onMouseEnter={e => (e.currentTarget.style.background = btnHover)}
                        onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: maximized ? "center" : "stretch" }}>
                <div style={{ width: "100%", maxWidth: maximized ? "600px" : "100%" }}>
                    <CoffeeTabs />
                </div>
            </div>
        </div>
    );
}

export default function CoffeeModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    // Track where mousedown started so a resize-drag releasing over the backdrop
    // doesn't accidentally close the modal
    const backdropMouseDown = useRef(false);

    return (
        <>
            <style>{`
                @keyframes c_spin  { to { transform: rotate(360deg); } }
                @keyframes c_enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
            {/* Backdrop — always mounted for the fade transition */}
            <div
                style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transition: "opacity 0.25s ease" }}
                onMouseDown={e => { backdropMouseDown.current = e.target === e.currentTarget; }}
                onClick={e => { if (e.target === e.currentTarget && backdropMouseDown.current) onClose(); }}
            >
                {/* Card — conditionally rendered so React always gets a clean DOM on each open */}
                {visible && <CoffeeCard onClose={onClose} />}
            </div>
        </>
    );
}
