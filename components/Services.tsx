"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import {
    RiCodeSSlashLine,
    RiPaletteLine,
    RiServerLine,
    RiSmartphoneLine,
    RiDatabase2Line,
    RiSettings3Line,
} from "react-icons/ri";

const SERVICES = [
    {
        icon: RiCodeSSlashLine,
        title: "Frontend Development",
        color: "#F5C518",
        desc: "Building responsive, performant interfaces with Next.js, React, Tailwind, and Material UI. Pixel-perfect implementation from any design.",
        tech: ["Next.js", "React.js", "Tailwind CSS", "TypeScript"],
    },
    {
        icon: RiServerLine,
        title: "Backend Development",
        color: "#00c9ff",
        desc: "Robust APIs and server-side logic with Laravel, Node.js & PHP. RESTful services, authentication, and scalable architecture.",
        tech: ["Laravel", "Node.js", "PHP", "REST APIs"],
    },
    {
        icon: RiDatabase2Line,
        title: "Database Design",
        color: "#b47cff",
        desc: "Structured, optimized database schemas using MySQL. Query optimization, migrations, relationships, and data integrity.",
        tech: ["MySQL", "Migrations", "Eloquent ORM"],
    },
    {
        icon: RiPaletteLine,
        title: "UI/UX Design",
        color: "#ff7eb3",
        desc: "User-centered design from wireframes to polished UI. Creating intuitive flows and visually engaging interfaces with Adobe XD and Figma.",
        tech: ["Adobe XD", "Figma", "Photoshop", "Illustrator"],
    },
    {
        icon: RiSmartphoneLine,
        title: "Responsive Design",
        color: "#ffb347",
        desc: "Ensuring seamless experiences across all devices — mobile, tablet, and desktop — with modern CSS techniques and frameworks.",
        tech: ["Mobile First", "Bootstrap", "Flexbox", "Grid"],
    },
    {
        icon: RiSettings3Line,
        title: "Full Stack Solutions",
        color: "#F5C518",
        desc: "End-to-end development from concept to deployment. Complete ownership of the product lifecycle, from DB to UI.",
        tech: ["Full Stack", "DevOps", "Git", "CI/CD"],
    },
];

const VP = { once: true, amount: 0.15 };

export default function Services() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="services" className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#0a0a0f]" : "bg-[#f7f7fb]"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase shrink-0">02.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase shrink-0 ${isDark ? "text-white/30" : "text-black/35"}`}>Services</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-10 sm:mb-14"
                >
                    <h2
                        className={`font-['Syne'] font-extrabold leading-[1.05] max-w-2xl
                            ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                        style={{ fontSize: "clamp(1.9rem, 7vw, 3.5rem)" }}
                    >
                        What I <span className="text-[#F5C518]">bring</span> to<br />your project
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {SERVICES.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={VP} transition={{ duration: 0.5, delay: i * 0.08 }}
                            className={`group relative p-5 sm:p-6 lg:p-7 border transition-all duration-300 cursor-default
                                ${isDark
                                    ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                                    : "bg-white border-black/8 hover:border-black/15 hover:shadow-lg"}`}
                            style={{ borderTop: `2px solid ${s.color}` }}
                        >
                            <div
                                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: s.color + "18", border: `1px solid ${s.color}30` }}
                            >
                                <s.icon size={18} style={{ color: s.color }} />
                            </div>

                            <h3 className={`font-['Syne'] font-bold text-[15px] sm:text-[16px] mb-2.5 sm:mb-3 ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                {s.title}
                            </h3>
                            <p className={`text-[12px] sm:text-[13px] leading-[1.75] font-['Plus_Jakarta_Sans'] font-light mb-4 sm:mb-5
                                ${isDark ? "text-white/50" : "text-black/55"}`}>
                                {s.desc}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {s.tech.map((t) => (
                                    <span
                                        key={t}
                                        className={`text-[10px] px-2 sm:px-2.5 py-1 font-['Syne'] font-semibold tracking-wide
                                            ${isDark ? "bg-white/8 text-white/45" : "bg-black/6 text-black/50"}`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}