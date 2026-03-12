"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import {
    RiMailLine, RiPhoneLine, RiMapPinLine,
    RiGithubLine, RiLinkedinLine, RiInstagramLine,
    RiWhatsappLine,
} from "react-icons/ri";

const INFO = [
    { icon: RiMailLine, label: "Personal Email", value: "kimerafarouk8@gmail.com", href: "mailto:kimerafarouk8@gmail.com" },
    { icon: RiMailLine, label: "Alt Email", value: "bloodykheeng@gmail.com", href: "mailto:bloodykheeng@gmail.com" },
    { icon: RiMailLine, label: "Work Email", value: "kimerafarouk@nwt.ug", href: "mailto:kimerafarouk@nwt.ug" },
    { icon: RiPhoneLine, label: "Phone", value: "+256 774 542 872", href: "tel:+256774542872" },
    { icon: RiPhoneLine, label: "Alt Phone", value: "+256 707 860 666", href: "tel:+256707860666" },
    { icon: RiMapPinLine, label: "Location", value: "Kampala, Uganda", href: "https://maps.google.com/?q=Kampala,Uganda" },
];

const SOCIALS = [
    { icon: RiGithubLine, href: "https://github.com/bloodykheeng", label: "GitHub" },
    { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/kimerafarouk/", label: "LinkedIn" },
    { icon: RiInstagramLine, href: "https://www.instagram.com/bloody_kheeng/", label: "Instagram" },
    { icon: RiWhatsappLine, href: "https://wa.me/256707860666", label: "WhatsApp" },
];

const WHATSAPP_NUMBER = "256707860666";

const VP = { once: true, amount: 0.2 };

export default function Contact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = encodeURIComponent(
            `*New Portfolio Message*\n\n` +
            `*Name:* ${form.name}\n` +
            `*Email:* ${form.email}\n` +
            `*Subject:* ${form.subject}\n\n` +
            `*Message:*\n${form.message}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: "", email: "", subject: "", message: "" });
    };

    const inputClass = `w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-[13px] font-['Plus_Jakarta_Sans'] border bg-transparent outline-none transition-all duration-200
        ${isDark
            ? "border-white/15 text-white placeholder:text-white/25 focus:border-[#F5C518] focus:bg-white/[0.03]"
            : "border-black/15 text-black placeholder:text-black/35 focus:border-[#D4A017] focus:bg-black/[0.02]"
        }`;

    return (
        <section id="contact" className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#0a0a0f]" : "bg-[#f7f7fb]"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-10 sm:mb-16"
                >
                    <span className="text-[#F5C518] text-[11px] font-['Syne'] font-bold tracking-[0.4em] uppercase shrink-0">06.</span>
                    <span className={`text-[11px] font-['Syne'] font-bold tracking-[0.3em] uppercase shrink-0 ${isDark ? "text-white/30" : "text-black/35"}`}>Contact</span>
                    <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">

                    {/* Left — info
                        FIX: x: -20 → y: 20
                    ────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className={`font-['Syne'] font-extrabold leading-[1.05] mb-4 sm:mb-5
                                ${isDark ? "text-white" : "text-[#0a0a0f]"}`}
                            style={{ fontSize: "clamp(1.75rem, 6.5vw, 3rem)" }}
                        >
                            Let's build something<br />
                            <span className="text-[#F5C518]">great together</span>
                        </h2>
                        <p className={`text-[13px] sm:text-[14px] leading-[1.85] font-['Plus_Jakarta_Sans'] font-light mb-8 sm:mb-10 max-w-md
                            ${isDark ? "text-white/50" : "text-black/55"}`}>
                            I'm open to freelance projects, full-time roles, and collaborations.
                            Drop me a message and I'll get back to you within 24 hours.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
                            {INFO.map(({ icon: Icon, label, value, href }, i) => (
                                <motion.a
                                    key={value}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VP}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className={`group relative flex flex-col gap-2 p-3 sm:p-4 border transition-all duration-200
                                        ${isDark
                                            ? "border-white/10 bg-white/[0.02] hover:border-[#F5C518]/50 hover:bg-white/[0.05]"
                                            : "border-black/8 bg-white hover:border-[#D4A017]/50 hover:bg-[#f0fdf8]"
                                        }`}
                                >
                                    <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#F5C518] transition-all duration-300 group-hover:w-full" />
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 border flex items-center justify-center shrink-0 transition-colors
                                        ${isDark
                                            ? "border-white/15 group-hover:border-[#F5C518] bg-white/[0.03]"
                                            : "border-black/12 group-hover:border-[#D4A017] bg-black/[0.02]"
                                        }`}>
                                        <Icon size={13} className={`transition-colors
                                            ${isDark
                                                ? "text-white/35 group-hover:text-[#F5C518]"
                                                : "text-black/35 group-hover:text-[#D4A017]"
                                            }`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-[9px] font-['Syne'] font-bold tracking-[0.2em] uppercase mb-0.5
                                            ${isDark ? "text-white/25" : "text-black/30"}`}>
                                            {label}
                                        </p>
                                        <p className={`text-[10px] sm:text-[11px] font-['Plus_Jakarta_Sans'] leading-snug break-all transition-colors
                                            ${isDark
                                                ? "text-white/55 group-hover:text-[#F5C518]"
                                                : "text-black/60 group-hover:text-[#D4A017]"
                                            }`}>
                                            {value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                            <span className={`text-[11px] font-['Syne'] tracking-[0.2em] uppercase ${isDark ? "text-white/25" : "text-black/30"}`}>
                                Find me on
                            </span>
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                                    className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center transition-colors
                                        ${label === "WhatsApp"
                                            ? isDark
                                                ? "border-[#25D366]/30 text-[#25D366]/60 hover:border-[#25D366] hover:text-[#25D366]"
                                                : "border-[#25D366]/40 text-[#25D366]/60 hover:border-[#25D366] hover:text-[#25D366]"
                                            : isDark
                                                ? "border-white/15 text-white/40 hover:border-[#F5C518] hover:text-[#F5C518]"
                                                : "border-black/15 text-black/40 hover:border-[#D4A017] hover:text-[#D4A017]"
                                        }`}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — form
                        FIX: x: 20 → y: 20
                    ────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div
                            className={`p-5 sm:p-6 lg:p-8 border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/8"}`}
                            style={{ borderTop: "2px solid #F5C518" }}
                        >
                            <div className={`flex items-center gap-2 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b
                                ${isDark ? "border-white/8" : "border-black/8"}`}>
                                <RiWhatsappLine size={14} className="text-[#25D366]" />
                                <span className={`text-[10px] sm:text-[11px] font-['Syne'] font-semibold tracking-[0.15em] uppercase
                                    ${isDark ? "text-white/35" : "text-black/40"}`}>
                                    Message will be sent via WhatsApp
                                </span>
                            </div>

                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
                                >
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center mb-4 sm:mb-5">
                                        <RiWhatsappLine size={26} className="text-[#25D366]" />
                                    </div>
                                    <h3 className={`font-['Syne'] font-bold text-[18px] sm:text-[20px] mb-2 ${isDark ? "text-white" : "text-[#0a0a0f]"}`}>
                                        WhatsApp Opened!
                                    </h3>
                                    <p className={`text-[13px] font-['Plus_Jakarta_Sans'] ${isDark ? "text-white/50" : "text-black/50"}`}>
                                        Your message is ready to send on WhatsApp.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                                        <div>
                                            <label className={`text-[10px] font-['Syne'] font-semibold tracking-[0.2em] uppercase block mb-1.5 sm:mb-2
                                                ${isDark ? "text-white/40" : "text-black/45"}`}>Full Name</label>
                                            <input
                                                type="text" required placeholder="Your Name" value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={`text-[10px] font-['Syne'] font-semibold tracking-[0.2em] uppercase block mb-1.5 sm:mb-2
                                                ${isDark ? "text-white/40" : "text-black/45"}`}>Email</label>
                                            <input
                                                type="email" required placeholder="your@email.com" value={form.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`text-[10px] font-['Syne'] font-semibold tracking-[0.2em] uppercase block mb-1.5 sm:mb-2
                                            ${isDark ? "text-white/40" : "text-black/45"}`}>Subject</label>
                                        <input
                                            type="text" required placeholder="Project Inquiry / Collaboration..." value={form.subject}
                                            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={`text-[10px] font-['Syne'] font-semibold tracking-[0.2em] uppercase block mb-1.5 sm:mb-2
                                            ${isDark ? "text-white/40" : "text-black/45"}`}>Message</label>
                                        <textarea
                                            required rows={5} placeholder="Tell me about your project..." value={form.message}
                                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                            className={inputClass + " resize-none"}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 bg-[#F5C518] text-black py-3.5 sm:py-4 text-[11px] sm:text-[12px] font-['Syne'] font-bold tracking-[0.15em] uppercase hover:bg-[#00ffb3] transition-colors"
                                    >
                                        <RiWhatsappLine size={14} />
                                        Send via WhatsApp
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}