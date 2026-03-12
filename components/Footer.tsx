"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { RiGithubLine, RiLinkedinLine, RiInstagramLine, RiArrowUpLine, RiCodeSSlashLine } from "react-icons/ri";

const SOCIALS = [
    { icon: RiGithubLine, href: "https://github.com/bloodykheeng", label: "GitHub" },
    { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/kimerafarouk/", label: "LinkedIn" },
    { icon: RiInstagramLine, href: "https://www.instagram.com/bloody_kheeng/", label: "Instagram" },
];

const NAV = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const CONTACTS = [
    { value: "kimerafarouk8@gmail.com", href: "mailto:kimerafarouk8@gmail.com" },
    { value: "bloodykheeng@gmail.com", href: "mailto:bloodykheeng@gmail.com" },
    { value: "+256 774 542 872", href: "tel:+256774542872" },
];

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer className={`overflow-hidden ${isDark ? "bg-[#0d0d14] border-t border-white/10" : "bg-white border-t border-black/10"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">

                {/* 
                    On desktop: 3 equal columns via grid-cols-3
                    On tablet (sm): Brand full-width top, then Nav + Contact side by side
                    On mobile: all stacked, all centered
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-10 sm:mb-12">

                    {/* Brand — spans full width on sm, single col on lg */}
                    <div className="flex flex-col items-center sm:items-start sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                            <div className="w-8 h-8 bg-[#F5C518] flex items-center justify-center shrink-0">
                                <RiCodeSSlashLine className="text-black text-[16px]" />
                            </div>
                            <span className={`font-['Syne'] font-extrabold text-[17px] ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                BK<span className="text-[#F5C518]">.</span>
                            </span>
                        </div>
                        <p className={`text-[13px] leading-[1.8] font-['Plus_Jakarta_Sans'] font-light max-w-[260px] text-center sm:text-left
                            ${isDark ? "text-white/45" : "text-black/50"}`}>
                            Full Stack Developer & UI/UX Designer based in Kampala, Uganda.
                        </p>
                        <div className="flex gap-2 mt-4 sm:mt-5">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className={`w-9 h-9 border flex items-center justify-center transition-colors
                                        ${isDark
                                            ? "border-white/15 text-white/40 hover:border-[#F5C518] hover:text-[#F5C518]"
                                            : "border-black/15 text-black/40 hover:border-[#D4A017] hover:text-[#D4A017]"
                                        }`}>
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="flex flex-col items-center sm:items-start">
                        <p className={`text-[10px] font-['Syne'] font-bold tracking-[0.3em] uppercase mb-4
                            ${isDark ? "text-white/30" : "text-black/35"}`}>Navigation</p>
                        <div className="grid grid-cols-2 gap-x-30 gap-y-2.5">
                            {NAV.map((n) => (
                                <a key={n.label} href={n.href}
                                    className={`text-[13px] font-['Plus_Jakarta_Sans'] transition-colors text-center sm:text-left
                                        ${isDark ? "text-white/50 hover:text-[#F5C518]" : "text-black/50 hover:text-[#D4A017]"}`}>
                                    {n.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center sm:items-start">
                        <p className={`text-[10px] font-['Syne'] font-bold tracking-[0.3em] uppercase mb-4
                            ${isDark ? "text-white/30" : "text-black/35"}`}>Get In Touch</p>
                        <div className="flex flex-col items-center sm:items-start space-y-2">
                            {CONTACTS.map(({ value, href }) => (
                                <a key={value} href={href}
                                    className={`text-[13px] font-['Plus_Jakarta_Sans'] transition-colors text-center sm:text-left break-all
                                        ${isDark ? "text-white/50 hover:text-[#F5C518]" : "text-black/50 hover:text-[#D4A017]"}`}>
                                    {value}
                                </a>
                            ))}
                        </div>
                        <a href="/cv/bloodykheeng_cv.pdf" download
                            className="inline-flex items-center gap-2 mt-5 bg-[#F5C518] text-black px-5 py-2.5 text-[11px] font-['Syne'] font-bold tracking-[0.12em] uppercase hover:bg-[#00ffb3] transition-colors">
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 sm:pt-8 border-t
                    ${isDark ? "border-white/10" : "border-black/10"}`}>
                    <p className={`text-[11px] font-['Syne'] tracking-wider text-center sm:text-left
                        ${isDark ? "text-white/25" : "text-black/30"}`}>
                        © {new Date().getFullYear()} Bloodykheeng — BK. Built with Next.js & Tailwind v4.
                    </p>
                    <a href="#"
                        className={`w-9 h-9 border flex items-center justify-center transition-colors shrink-0
                            ${isDark
                                ? "border-white/15 text-white/35 hover:border-[#F5C518] hover:text-[#F5C518]"
                                : "border-black/15 text-black/35 hover:border-[#D4A017] hover:text-[#D4A017]"
                            }`}
                        aria-label="Back to top">
                        <RiArrowUpLine size={15} />
                    </a>
                </div>
            </div>
        </footer>
    );
}