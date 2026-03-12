"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { RiExternalLinkLine, RiGithubLine } from "react-icons/ri";

const PROJECTS = [
    {
        title: "Yuri Interiors",
        category: "frontend",
        tags: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
        desc: "Premium interior & exterior finishing company site. Precision craftsmanship showcase with animated sections, dark/light theme, and mobile-first design.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80&fit=crop",
        color: "#F5C518",
        live: "https://muhsin-interior.vercel.app/",
        repo: "https://github.com/bloodykheeng",
    },
    {
        title: "Mbarara City Website",
        category: "fullstack",
        tags: ["Next.js", "Laravel", "MySQL", "Tailwind"],
        desc: "Official city government portal for Mbarara City, Uganda. Public information, services directory, and civic engagement platform.",
        image: "https://www.murchisonfallsparkuganda.com/wp-content/uploads/2024/02/290771045_578486056957284_3318899535874830176_n.jpg",
        color: "#00c9ff",
        live: "https://mbararacity.go.ug/",
        repo: "https://github.com/bloodykheeng",
    },
    {
        title: "Masaka City Website",
        category: "fullstack",
        tags: ["Next.js", "Laravel", "MySQL", "Tailwind"],
        desc: "Official digital presence for Masaka City Council. Citizen services, news, and government information portal built for scale.",
        image: "https://hereinuganda.com/uploads/images/202205/image_750x_628a9f95814b5.jpg",
        color: "#b47cff",
        live: "https://www.masakacity.go.ug/",
        repo: "https://github.com/bloodykheeng",
    },
    {
        title: "OAG Citizen Feedback Platform",
        category: "fullstack",
        tags: ["React", "Laravel", "MySQL", "REST API"],
        desc: "Office of the Auditor General's feedback portal. Empowers citizens to report on public services, driving transparency and accountability.",
        image: "https://pbs.twimg.com/media/GGoNzdVXAAEOner.jpg",
        color: "#ff7eb3",
        live: "http://cfp.oag.go.ug/",
        repo: "https://github.com/bloodykheeng",
    },
    {
        title: "Elevate Pesa",
        category: "frontend",
        tags: ["Next.js", "Tailwind", "TypeScript", "Mobile"],
        desc: "On-demand gas, water & delivery platform. Clean marketing site with app download CTAs for Apple and Google Play stores.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Light_my_fire_%282152952690%29.jpg/1280px-Light_my_fire_%282152952690%29.jpg",
        color: "#ffb347",
        live: "https://elevatepesa.com/",
        repo: "https://github.com/bloodykheeng",
    },
    {
        title: "MWE M&E Portal",
        category: "fullstack",
        tags: ["React", "Laravel", "MySQL", "Material UI"],
        desc: "Ministry of Water & Environment monitoring and evaluation portal. Data dashboards, reporting tools, and program tracking for government teams.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29EAU1Vws1wVb35_5F5iFaaAaDJLT2gFj3g&s",
        color: "#F5C518",
        live: "http://mweui.nwtdemos.com/",
        repo: "https://github.com/bloodykheeng",
    },
];

const FILTERS = ["all", "fullstack", "frontend"];

const VP = { once: true, amount: 0.15 };

export default function Projects() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [active, setActive] = useState("all");

    const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.category === active);

    return (
        <section id="projects" className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#0a0a0f]" : "bg-[#f7f7fb]"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase shrink-0">04.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase shrink-0 ${isDark ? "text-white/30" : "text-black/35"}`}>Projects</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <div className="flex flex-col gap-5 mb-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP} transition={{ duration: 0.5, delay: 0.1 }}
                        className={`font-['Syne'] font-extrabold leading-[1.05] ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                        style={{ fontSize: "clamp(1.9rem, 7vw, 3rem)" }}
                    >
                        Selected <span className="text-[#F5C518]">Work</span>
                    </motion.h2>

                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActive(f)}
                                className={`px-3.5 sm:px-4 py-2 text-[10px] font-['Syne'] font-bold tracking-[0.15em] uppercase border transition-all duration-200
                                    ${active === f
                                        ? "bg-[#F5C518] text-black border-[#F5C518]"
                                        : isDark
                                            ? "border-white/15 text-white/45 hover:border-white/30 hover:text-white/70"
                                            : "border-black/15 text-black/45 hover:border-black/30 hover:text-black/70"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <motion.div
                                key={p.title}
                                layout
                                // FIX: scale only (no x) — scale is safe as it doesn't push outside bounds
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.35, delay: i * 0.05 }}
                                className={`group overflow-hidden border
                                    ${isDark
                                        ? "bg-white/[0.03] border-white/10 hover:border-white/20"
                                        : "bg-white border-black/8 hover:shadow-xl"}`}
                            >
                                <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
                                    <img
                                        src={p.image} alt={p.title}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: p.color }} />
                                    <div className="absolute inset-0 flex items-center justify-center gap-3
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#F5C518] hover:text-black transition-colors">
                                            <RiExternalLinkLine size={16} />
                                        </a>
                                        <a href={p.repo} target="_blank" rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#F5C518] hover:text-black transition-colors">
                                            <RiGithubLine size={16} />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 lg:p-6">
                                    <h3 className={`font-['Syne'] font-bold text-[15px] sm:text-[16px] mb-2 ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                        {p.title}
                                    </h3>
                                    <p className={`text-[12px] sm:text-[13px] leading-[1.7] font-['Plus_Jakarta_Sans'] font-light mb-3 sm:mb-4
                                        ${isDark ? "text-white/50" : "text-black/55"}`}>
                                        {p.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {p.tags.map((t) => (
                                            <span
                                                key={t}
                                                className={`text-[10px] px-2 py-1 font-['Syne'] font-semibold
                                                    ${isDark ? "bg-white/8 text-white/40" : "bg-black/6 text-black/45"}`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="mt-8 sm:mt-10 text-center"
                >
                    <a
                        href="https://github.com/bloodykheeng" target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 border px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] font-['Syne'] font-bold tracking-[0.15em] uppercase transition-colors
                            ${isDark
                                ? "border-white/20 text-white/60 hover:border-[#F5C518] hover:text-[#F5C518]"
                                : "border-black/20 text-black/55 hover:border-[#D4A017] hover:text-[#D4A017]"
                            }`}
                    >
                        <RiGithubLine size={15} /> View All on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
}