"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import {
    RiSunLine,
    RiMoonLine,
    RiMenuLine,
    RiCloseLine,
    RiCodeSSlashLine,
} from "react-icons/ri";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ✅ Scroll-based active section detection
    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));

        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        // Capitalize to match label format
                        setActive(
                            NAV_LINKS.find((l) => l.href === `#${id}`)?.label ?? ""
                        );
                    }
                },
                {
                    rootMargin: "-40% 0px -50% 0px", // triggers when section hits middle of viewport
                    threshold: 0,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    useEffect(() => {
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
    ${isDark
                        ? scrolled
                            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                            : "bg-transparent border-transparent"
                        : scrolled
                            ? "bg-white/90 backdrop-blur-xl border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-[#F5C518] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                            <RiCodeSSlashLine className="text-black text-[16px]" />
                        </div>
                        <span className={`font-['Syne'] font-extrabold text-[17px] tracking-tight
              ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                            BK<span className="text-[#F5C518]">.</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setActive(link.label)}
                                className={`px-4 py-2 text-[12px] font-['Syne'] font-semibold tracking-[0.08em] uppercase transition-all duration-200 relative
                  ${isDark
                                        ? active === link.label ? "text-[#F5C518]" : "text-white/55 hover:text-white"
                                        : active === link.label ? "text-[#D4A017]" : "text-black/50 hover:text-black"
                                    }`}
                            >
                                {link.label}
                                {active === link.label && (
                                    <motion.span
                                        layoutId="nav-dot"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5C518]"
                                    />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/8 hover:bg-black/15 text-black"}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
                        </button>

                        {/* CTA */}
                        <a
                            href="/cv/bloodykheeng_cv.pdf"
                            download
                            className="hidden sm:inline-flex items-center gap-2 bg-[#F5C518] text-black px-5 py-2.5 text-[11px] font-['Syne'] font-bold tracking-[0.1em] uppercase hover:bg-[#00ffb3] transition-colors duration-200"
                        >
                            Download CV
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`lg:hidden w-9 h-9 flex items-center justify-center
                ${isDark ? "text-white" : "text-black"}`}
                        >
                            {menuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
                        </button>
                    </div>
                </div >
            </motion.header >

            {/* Mobile menu */}
            <AnimatePresence>
                {
                    menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={`fixed inset-0 z-40 pt-[68px] flex flex-col
              ${isDark ? "bg-[#0a0a0f]" : "bg-white"}`}
                        >
                            <nav className="flex flex-col px-8 pt-10 gap-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        onClick={() => { setActive(link.label); setMenuOpen(false); }}
                                        // ✅ Fixed: active state color + dot sits on the right with flex, no squishing
                                        className={`py-4 text-[28px] font-['Syne'] font-extrabold border-b tracking-tight flex items-center justify-between
                    ${isDark
                                                ? active === link.label
                                                    ? "text-[#F5C518] border-white/10"
                                                    : "text-white border-white/10 hover:text-[#F5C518]"
                                                : active === link.label
                                                    ? "text-[#D4A017] border-black/10"
                                                    : "text-black border-black/10 hover:text-[#D4A017]"
                                            }`}
                                    >
                                        {link.label}

                                        {/* ✅ Active dot — floated right via flex justify-between, never squishes the label */}
                                        {active === link.label && (
                                            <motion.span
                                                layoutId="mobile-nav-dot"
                                                className="w-2 h-2 rounded-full bg-[#F5C518] shrink-0 ml-4"
                                            />
                                        )}
                                    </motion.a>
                                ))}
                            </nav>
                            <div className="px-8 pt-8">
                                <a
                                    href="/cv/bloodykheeng_cv.pdf"
                                    download
                                    className="w-full flex items-center justify-center bg-[#F5C518] text-black py-4 text-[13px] font-['Syne'] font-bold tracking-[0.15em] uppercase"
                                >
                                    Download CV
                                </a>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}