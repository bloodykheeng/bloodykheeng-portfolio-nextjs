"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { RiBriefcaseLine, RiGraduationCapLine } from "react-icons/ri";

const TIMELINE = [
    {
        type: "work",
        year: "2023 – Present",
        role: "Software Developer",
        company: "New Wave Technologies",
        desc: "Building scalable full-stack web applications. Developing responsive user interfaces with React.js and creating and managing backend API systems using Laravel. Collaborating with teams using agile methodologies.",
    },
    {
        type: "work",
        year: "2021 – 2022",
        role: "IT Manager",
        company: "Bugatech",
        desc: "Oversaw IT infrastructure and implemented software solutions. Managed databases using MySQL and coordinated technical teams and project delivery.",
    },
    {
        type: "edu",
        year: "2019 – 2022",
        role: "Bachelor's Degree in Information Systems & Technology (BIST)",
        company: "Makerere University",
        desc: "Studied information systems, software development, and database management.",
    },
];

const SKILLS = [
    { name: "Next.js / React", level: 92, color: "#F5C518" },
    { name: "Laravel / PHP", level: 88, color: "#00c9ff" },
    { name: "MySQL / Databases", level: 85, color: "#b47cff" },
    { name: "UI/UX Design", level: 80, color: "#ff7eb3" },
    { name: "TypeScript", level: 78, color: "#ffb347" },
    { name: "Node.js", level: 72, color: "#F5C518" },
];

const ALSO_KNOWS = ["Bootstrap", "Tailwind", "Material UI", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Git", "Docker", "REST APIs", "GraphQL", "WordPress"];

const VP = { once: true, amount: 0.2 };

export default function Experience() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="experience" className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-10 sm:mb-16"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase shrink-0">03.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase shrink-0 ${isDark ? "text-white/30" : "text-black/35"}`}>Experience & Skills</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Timeline
                        FIX: x: -20 → y: 20 to prevent horizontal overflow on mobile
                    ──────────────────────────────────────────────────────────────── */}
                    <div>
                        <h3 className={`font-['Syne'] font-extrabold text-[20px] sm:text-[24px] mb-7 sm:mb-8 ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                            My Journey
                        </h3>
                        <div className="relative">
                            <div className={`absolute left-[17px] top-0 bottom-0 w-px ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                            <div className="space-y-7 sm:space-y-8">
                                {TIMELINE.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={VP}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="relative flex gap-4 sm:gap-6 pl-11 sm:pl-12"
                                    >
                                        <div className={`absolute left-0 top-1 w-[34px] h-[34px] flex items-center justify-center border-2 border-[#F5C518] shrink-0
                                            ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}>
                                            {item.type === "work"
                                                ? <RiBriefcaseLine size={14} className="text-[#F5C518]" />
                                                : <RiGraduationCapLine size={14} className="text-[#F5C518]" />}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-['Syne'] font-semibold tracking-widest uppercase text-[#F5C518] mb-1 block">
                                                {item.year}
                                            </span>
                                            <h4 className={`font-['Syne'] font-bold text-[14px] sm:text-[15px] mb-0.5 leading-snug ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                                {item.role}
                                            </h4>
                                            <p className={`text-[12px] font-['Syne'] font-semibold mb-2 ${isDark ? "text-white/35" : "text-black/40"}`}>
                                                {item.company}
                                            </p>
                                            <p className={`text-[12px] sm:text-[13px] leading-[1.7] font-['Plus_Jakarta_Sans'] font-light
                                                ${isDark ? "text-white/50" : "text-black/55"}`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skill bars
                        FIX: x: 20 → y: 20 to prevent horizontal overflow on mobile
                        Skill bar width animation is safe — it's width not x transform
                    ──────────────────────────────────────────────────────────────── */}
                    <div>
                        <h3 className={`font-['Syne'] font-extrabold text-[20px] sm:text-[24px] mb-7 sm:mb-8 ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                            Technical Skills
                        </h3>
                        <div className="space-y-5 sm:space-y-6">
                            {SKILLS.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VP}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-[12px] sm:text-[13px] font-['Syne'] font-semibold ${isDark ? "text-white/80" : "text-black/75"}`}>
                                            {skill.name}
                                        </span>
                                        <span className="text-[11px] sm:text-[12px] font-['Syne'] font-bold" style={{ color: skill.color }}>
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={VP}
                                            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: skill.color }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 sm:mt-12">
                            <h4 className={`font-['Syne'] font-bold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase mb-4 sm:mb-5
                                ${isDark ? "text-white/40" : "text-black/40"}`}>Also proficient in</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {ALSO_KNOWS.map((t) => (
                                    <span
                                        key={t}
                                        className={`text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 font-['Syne'] font-semibold border transition-colors cursor-default
                                            ${isDark
                                                ? "border-white/15 text-white/45 hover:border-[#F5C518]/50 hover:text-[#F5C518]"
                                                : "border-black/12 text-black/50 hover:border-[#D4A017]/50 hover:text-[#D4A017]"
                                            }`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}