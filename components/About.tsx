"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { RiCheckLine, RiMapPinLine, RiMailLine, RiPhoneLine } from "react-icons/ri";

const HIGHLIGHTS = [
    "5+ years building full stack web applications",
    "Next.js, React.js, Laravel & MySQL expert",
    "Passionate UI/UX designer (Adobe XD, Figma)",
    "Worked with NGOs, government & commercial clients",
    "Based in Kampala, Uganda — available remotely",
];

// ─── Safe viewport config: once=true prevents re-triggering overflow on scroll back ───
const VP = { once: true, amount: 0.2 };

export default function About() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        // ─── overflow-hidden on the section clips any transform bleed ───
        <section id="about" className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#0d0d14]" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-10 sm:mb-16"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase shrink-0">01.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase shrink-0 ${isDark ? "text-white/30" : "text-black/35"}`}>About Me</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-center">

                    {/* Left — image
                        FIX: Changed x: -30 → y: 20 on mobile to prevent horizontal overflow.
                        The x animation is only safe on lg+ where the grid has two columns.
                    ───────────────────────────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className={`relative overflow-hidden ${isDark ? "border border-white/10" : "border border-black/8"}`}>
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=85&fit=crop"
                                alt="Developer workspace"
                                className="w-full h-[260px] sm:h-[380px] lg:h-[500px] object-cover opacity-75"
                            />
                            <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-tr from-[#0a0a0f]/60 to-transparent" : "bg-gradient-to-tr from-white/30 to-transparent"}`} />
                        </div>

                        <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 border-r-2 border-b-2 border-[#F5C518] hidden sm:block" />

                        <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-5
                            ${isDark ? "bg-[#0a0a0f]/95 border border-white/10" : "bg-white/95 border border-black/10"} backdrop-blur-sm`}>
                            <div className="space-y-1.5 sm:space-y-2">
                                {[
                                    { icon: RiMapPinLine, text: "Kampala, Uganda" },
                                    { icon: RiMailLine, text: "kimerafarouk8@gmail.com" },
                                    { icon: RiPhoneLine, text: "+256 774 542 872" },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} className={`flex items-center gap-2 font-['Plus_Jakarta_Sans']
                                        ${isDark ? "text-white/60" : "text-black/60"}`}
                                        style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}
                                    >
                                        <Icon size={12} className="text-[#F5C518] shrink-0" />
                                        <span className="truncate">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — text
                        FIX: Changed x: 30 → y: 20 to prevent horizontal overflow on mobile.
                    ─────────────────────────────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.7 }}
                    >
                        <h2
                            className={`font-['Syne'] font-extrabold leading-[1.05] mb-5 sm:mb-6
                                ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                            style={{ fontSize: "clamp(1.9rem, 7vw, 3rem)" }}
                        >
                            Crafting digital<br />
                            <span className="text-[#F5C518]">experiences</span> that<br />
                            leave an impact.
                        </h2>

                        <p className={`text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.85] mb-4 sm:mb-5 font-['Plus_Jakarta_Sans'] font-light
                            ${isDark ? "text-white/55" : "text-black/60"}`}>
                            I'm Kimera Farouq (BK) — a Full Stack Software Developer and UI/UX designer based in Uganda.
                            I build end-to-end web applications that are fast, accessible, and beautifully designed.
                        </p>
                        <p className={`text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.85] mb-7 sm:mb-8 font-['Plus_Jakarta_Sans'] font-light
                            ${isDark ? "text-white/55" : "text-black/60"}`}>
                            I've worked with startups, NGOs, government agencies, and enterprise teams — translating
                            complex requirements into elegant software solutions that users love.
                        </p>

                        <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
                            {HIGHLIGHTS.map((h, i) => (
                                <motion.li
                                    key={h}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VP}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-0.5 w-4 h-4 bg-[#F5C518]/15 border border-[#F5C518]/40 flex items-center justify-center shrink-0">
                                        <RiCheckLine size={10} className="text-[#F5C518]" />
                                    </span>
                                    <span className={`text-[12px] sm:text-[13px] font-['Plus_Jakarta_Sans'] ${isDark ? "text-white/60" : "text-black/65"}`}>{h}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 bg-[#F5C518] text-black px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] font-['Syne'] font-bold tracking-[0.15em] uppercase hover:bg-[#00ffb3] transition-colors"
                        >
                            Let's Work Together
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}