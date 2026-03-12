"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import {
    RiGithubLine,
    RiLinkedinLine,
    RiInstagramLine,
    RiArrowDownLine,
    RiDownloadLine,
} from "react-icons/ri";
import CoffeeModal from "@/components/CoffeeModal";

const ROLES = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Next.js Engineer",
    "Laravel Specialist",
    "React Developer",
];

function useTypewriter(words: string[], speed = 75, pause = 2200) {
    const [display, setDisplay] = useState("");
    const [wIdx, setWIdx] = useState(0);
    const [cIdx, setCIdx] = useState(0);
    const [del, setDel] = useState(false);
    useEffect(() => {
        const cur = words[wIdx];
        const delay = del ? speed / 2 : cIdx === cur.length ? pause : speed;
        const t = setTimeout(() => {
            if (!del && cIdx < cur.length) { setDisplay(cur.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
            else if (!del && cIdx === cur.length) setDel(true);
            else if (del && cIdx > 0) { setDisplay(cur.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
            else { setDel(false); setWIdx(i => (i + 1) % words.length); }
        }, delay);
        return () => clearTimeout(t);
    }, [cIdx, del, wIdx, words, speed, pause]);
    return display;
}

const SOCIALS = [
    { icon: RiGithubLine, href: "https://github.com/bloodykheeng", label: "GitHub" },
    { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/kimerafarouk/", label: "LinkedIn" },
    { icon: RiInstagramLine, href: "https://www.instagram.com/bloody_kheeng/", label: "Instagram" },
];

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const typed = useTypewriter(ROLES);
    const [coffeeOpen, setCoffeeOpen] = useState(false);

    return (
        <>
            <CoffeeModal visible={coffeeOpen} onClose={() => setCoffeeOpen(false)} />

            <section
                id="hero"
                className={`relative min-h-screen flex flex-col justify-center overflow-hidden pt-[68px]
                    ${isDark ? "bg-[#0a0a0f]" : "bg-[#f7f7fb]"}`}
            >
                {/* Background accent blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
                    style={{ background: "radial-gradient(circle, #F5C518 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
                    style={{ background: "radial-gradient(circle, #F5C518 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

                {/* Dot grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{ backgroundImage: `radial-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-16 sm:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Content — animate only opacity + y (never x) to prevent horizontal overflow */}
                        <div className="min-w-0">
                            {/* Status badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2.5 mb-6 sm:mb-8"
                            >
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C518] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C518]" />
                                </span>
                                <span className={`text-[10px] sm:text-[11px] font-['Syne'] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase
                                    ${isDark ? "text-white/50" : "text-black/50"}`}>
                                    Available for Projects · Kampala, Uganda
                                </span>
                            </motion.div>

                            {/* Name */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <p className={`font-['Syne'] text-[11px] sm:text-[13px] font-semibold tracking-[0.4em] uppercase mb-2 sm:mb-3
                                    ${isDark ? "text-white/30" : "text-black/35"}`}>Hi, I am</p>
                                <h1
                                    className={`font-['Syne'] font-extrabold leading-[0.9] mb-4
                                        ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                                    style={{ fontSize: "clamp(2.75rem, 12vw, 6.25rem)" }}
                                >
                                    Bloody<br />
                                    <span className="text-[#F5C518]">Kheeng</span>
                                </h1>
                            </motion.div>

                            {/* Typewriter */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`flex items-center gap-3 mb-5 sm:mb-6 font-['Syne'] font-bold
                                    ${isDark ? "text-white/60" : "text-black/55"}`}
                                style={{ fontSize: "clamp(1rem, 4.5vw, 1.375rem)" }}
                            >
                                <span className="w-5 sm:w-6 h-[2px] bg-[#F5C518] shrink-0" />
                                <span className="truncate">{typed}</span>
                                <span className="text-[#F5C518] animate-pulse shrink-0">|</span>
                            </motion.div>

                            {/* Bio */}
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.85] max-w-lg mb-8 sm:mb-10 font-['Plus_Jakarta_Sans'] font-light
                                    ${isDark ? "text-white/50" : "text-black/55"}`}
                            >
                                A versatile Full Stack Developer passionate about crafting intuitive experiences.
                                Specializing in <span className={isDark ? "text-[#F5C518]" : "text-[#00a070]"}>Next.js, React, Laravel & MySQL</span> —
                                building seamless, responsive applications that meet both user needs and business goals.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12"
                            >
                                <a href="#projects"
                                    className="inline-flex items-center gap-2 bg-[#F5C518] text-black px-5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-['Syne'] font-bold tracking-[0.12em] uppercase hover:bg-[#00ffb3] transition-colors">
                                    View Projects
                                </a>
                                <a href="/cv/bloodykheeng_cv.pdf" download
                                    className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-['Syne'] font-bold tracking-[0.12em] uppercase border transition-colors
                                        ${isDark ? "border-white/20 text-white/70 hover:border-[#F5C518] hover:text-[#F5C518]" : "border-black/20 text-black/60 hover:border-[#D4A017] hover:text-[#D4A017]"}`}>
                                    <RiDownloadLine size={13} />
                                    Download CV
                                </a>
                                <div className="cursor-pointer relative inline-block overflow-hidden rounded-md p-[2px]">
                                    <span className="absolute inset-[-120%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#facc15,transparent,#facc15)]"></span>
                                    <span className="absolute inset-[-120%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_180deg,#fde047,transparent,#fde047)]"></span>
                                    <button
                                        onClick={() => setCoffeeOpen(true)}
                                        className={`relative cursor-pointer inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-['Syne'] font-bold tracking-[0.12em] uppercase rounded-md
                                            ${isDark ? "bg-[#0a0a0f] text-white border border-white/20" : "bg-white text-black border border-black/20"}`}
                                    >
                                        ☕ Buy Me a Coffee
                                    </button>
                                </div>
                            </motion.div>

                            {/* Socials */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-2"
                            >
                                {SOCIALS.map(({ icon: Icon, href, label }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border transition-all duration-200
                                            ${isDark ? "border-white/15 text-white/40 hover:border-[#F5C518] hover:text-[#F5C518]" : "border-black/15 text-black/40 hover:border-[#D4A017] hover:text-[#D4A017]"}`}>
                                        <Icon size={16} />
                                    </a>
                                ))}
                                <span className={`ml-3 text-[10px] sm:text-[11px] font-['Syne'] tracking-[0.2em] uppercase
                                    ${isDark ? "text-white/25" : "text-black/30"}`}>Follow me</span>
                            </motion.div>
                        </div>

                        {/* Right: Avatar card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="hidden lg:flex justify-center"
                        >
                            <div className="relative">
                                <div className={`w-[340px] xl:w-[380px] aspect-square relative overflow-hidden
                                    ${isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"}`}>
                                    <img
                                        src="/logos/bloodykheeng.jpeg"
                                        alt="bloodykheeng avatar"
                                        className="w-full h-full object-cover object-center opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5C518]/20 to-transparent" />
                                </div>
                                {/* Floating stat cards */}
                                <div className={`absolute -left-10 top-12 px-4 py-3 shadow-xl
                                    ${isDark ? "bg-[#0f1117] border border-white/10 text-white" : "bg-white border border-black/10 text-black"}`}>
                                    <p className={`text-[10px] font-['Syne'] tracking-widest uppercase mb-0.5 ${isDark ? "text-white/40" : "text-black/40"}`}>Experience</p>
                                    <p className="font-['Syne'] font-extrabold text-[22px] text-[#F5C518] leading-none">5+ Yrs</p>
                                </div>
                                <div className={`absolute -right-8 bottom-16 px-4 py-3 shadow-xl
                                    ${isDark ? "bg-[#0f1117] border border-white/10 text-white" : "bg-white border border-black/10 text-black"}`}>
                                    <p className={`text-[10px] font-['Syne'] tracking-widest uppercase mb-0.5 ${isDark ? "text-white/40" : "text-black/40"}`}>Projects</p>
                                    <p className="font-['Syne'] font-extrabold text-[22px] text-[#F5C518] leading-none">30+</p>
                                </div>
                                <div className={`absolute -bottom-4 left-8 px-4 py-3 shadow-xl
                                    ${isDark ? "bg-[#0f1117] border border-white/10 text-white" : "bg-white border border-black/10 text-black"}`}>
                                    <p className={`text-[10px] font-['Syne'] tracking-widest uppercase mb-0.5 ${isDark ? "text-white/40" : "text-black/40"}`}>Clients</p>
                                    <p className="font-['Syne'] font-extrabold text-[22px] text-[#F5C518] leading-none">20+</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.a
                    href="#about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                        ${isDark ? "text-white/25 hover:text-white/60" : "text-black/25 hover:text-black/60"} transition-colors`}
                >
                    <span className="text-[10px] font-['Syne'] tracking-[0.3em] uppercase">Scroll</span>
                    <RiArrowDownLine size={16} />
                </motion.a>
            </section>
        </>
    );
}