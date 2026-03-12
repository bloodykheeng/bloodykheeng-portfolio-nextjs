"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { RiStarFill, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const TESTIMONIALS = [
    {
        name: "Sarah Nakamatte",
        role: "Project Manager, UNHCR Uganda",
        text: "Farouq delivered our grant tracking system on time and beyond our expectations. His attention to detail in both the UI and backend logic was outstanding. A true professional.",
        rating: 5,
        avatar: "SN",
    },
    {
        name: "David Okullo",
        role: "CEO, BuildMart Uganda",
        text: "The e-commerce platform BK built for us transformed our online sales. He understood our business needs perfectly and translated them into a seamless shopping experience.",
        rating: 5,
        avatar: "DO",
    },
    {
        name: "Patricia Namugga",
        role: "Director, Green Fields NGO",
        text: "Working with Kimera was an excellent experience. He built our entire web platform from scratch — a clean, functional system that our team actually enjoys using daily.",
        rating: 5,
        avatar: "PN",
    },
    {
        name: "Alex Mugisha",
        role: "CTO, FinTech Startup Kampala",
        text: "BK is one of the most versatile developers I've worked with. His full-stack skills, combined with solid UI/UX instincts, make him a rare find in the Ugandan tech space.",
        rating: 5,
        avatar: "AM",
    },
];

const VP = { once: true, amount: 0.2 };

export default function Testimonials() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    const next = () => setCurrent(i => (i + 1) % TESTIMONIALS.length);

    return (
        <section id="testimonials" className={`py-24 sm:py-32 overflow-hidden ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase">05.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase ${isDark ? "text-white/30" : "text-black/35"}`}>Testimonials</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`font-['Syne'] font-extrabold leading-[1.1] mb-6
                            ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                            style={{ fontSize: "clamp(1.9rem, 7vw, 2.75rem)" }}
                        >
                            What clients<br /><span className="text-[#F5C518]">say</span> about<br />my work
                        </h2>
                        <p className={`text-[13px] leading-[1.8] font-['Plus_Jakarta_Sans'] font-light mb-8
                            ${isDark ? "text-white/45" : "text-black/50"}`}>
                            I've had the privilege of working with amazing clients across Uganda and beyond.
                        </p>
                        <div className="flex gap-2 mb-6">
                            {TESTIMONIALS.map((_, i) => (
                                <button key={i} onClick={() => setCurrent(i)}
                                    className={`h-1.5 transition-all duration-300 ${i === current ? "w-8 bg-[#F5C518]" : `w-3 ${isDark ? "bg-white/20" : "bg-black/20"}`}`} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={prev}
                                className={`w-11 h-11 border flex items-center justify-center transition-colors
                                    ${isDark ? "border-white/20 text-white/50 hover:border-[#F5C518] hover:text-[#F5C518]" : "border-black/20 text-black/50 hover:border-[#D4A017] hover:text-[#D4A017]"}`}>
                                <RiArrowLeftLine size={17} />
                            </button>
                            <button onClick={next}
                                className={`w-11 h-11 border flex items-center justify-center transition-colors
                                    ${isDark ? "border-white/20 text-white/50 hover:border-[#F5C518] hover:text-[#F5C518]" : "border-black/20 text-black/50 hover:border-[#D4A017] hover:text-[#D4A017]"}`}>
                                <RiArrowRightLine size={17} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right — active card
                        FIX: y: 20 / y: -20 instead of any x transform
                    ──────────────────────────────────────────────── */}
                    <div className="relative min-h-[280px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className={`p-8 sm:p-10 border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-[#f7f7fb] border-black/8"}`}
                                style={{ borderTop: "2px solid #F5C518" }}
                            >
                                <div className="text-[80px] leading-none font-['Syne'] font-extrabold text-[#F5C518]/20 mb-2 -mt-4">
                                    "
                                </div>
                                <p className={`text-[16px] sm:text-[18px] leading-[1.75] font-['Plus_Jakarta_Sans'] font-light mb-8
                                    ${isDark ? "text-white/75" : "text-black/70"}`}>
                                    {TESTIMONIALS[current].text}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F5C518]/15 border border-[#F5C518]/30 flex items-center justify-center">
                                            <span className="font-['Syne'] font-bold text-[13px] text-[#F5C518]">
                                                {TESTIMONIALS[current].avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <p className={`font-['Syne'] font-bold text-[14px] ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                                {TESTIMONIALS[current].name}
                                            </p>
                                            <p className={`text-[12px] font-['Plus_Jakarta_Sans'] ${isDark ? "text-white/40" : "text-black/45"}`}>
                                                {TESTIMONIALS[current].role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                                            <RiStarFill key={i} size={14} className="text-[#ffc832]" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* All cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.button
                            key={t.name}
                            onClick={() => setCurrent(i)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VP}
                            transition={{ delay: i * 0.07 }}
                            className={`text-left p-4 border transition-all duration-200
                                ${i === current
                                    ? "border-[#F5C518]/50 bg-[#F5C518]/5"
                                    : isDark ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]" : "border-black/8 bg-white hover:bg-black/3"}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-[#F5C518]/15 flex items-center justify-center">
                                    <span className="font-['Syne'] font-bold text-[11px] text-[#F5C518]">{t.avatar}</span>
                                </div>
                                <div>
                                    <p className={`font-['Syne'] font-bold text-[12px] ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>{t.name}</p>
                                </div>
                            </div>
                            <p className={`text-[11px] font-['Plus_Jakarta_Sans'] line-clamp-2 ${isDark ? "text-white/40" : "text-black/45"}`}>
                                {t.text}
                            </p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}