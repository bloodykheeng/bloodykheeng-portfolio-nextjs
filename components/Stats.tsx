"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useTheme } from "@/providers/ThemeProvider";

const STATS = [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 30, suffix: "+", label: "Projects Delivered" },
    { value: 20, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "%", label: "Satisfaction Rate" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
    const ref = useRef(null);
    // ─── once: true — prevents CountUp from resetting and re-animating on scroll back,
    //     which also eliminates the layout jump that causes overflow flicker ───
    const inView = useInView(ref, { once: true });

    return (
        <span ref={ref}>
            {inView && (
                <CountUp
                    start={0}
                    end={target}
                    duration={1.4}
                    suffix={suffix}
                />
            )}
            {/* Placeholder keeps layout stable before inView fires */}
            {!inView && <span>0{suffix}</span>}
        </span>
    );
}

export default function Stats() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        // ─── overflow-hidden clips any animation bleed on mobile ───
        <section className={`py-12 sm:py-16 overflow-hidden ${isDark ? "bg-[#F5C518]/5 border-y border-[#F5C518]/15" : "bg-[#F5C518]/8 border-y border-[#D4A017]/20"}`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-[#F5C518]/20">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            // ─── once: true — animation fires once, no re-trigger on scroll back ───
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center lg:px-8"
                        >
                            <p
                                className="font-['Syne'] font-extrabold leading-none text-[#F5C518] mb-1"
                                style={{ fontSize: "clamp(2rem, 9vw, 3.25rem)" }}
                            >
                                <Counter target={s.value} suffix={s.suffix} />
                            </p>
                            <p className={`text-[10px] sm:text-[11px] font-['Syne'] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase
                                ${isDark ? "text-white/45" : "text-black/50"}`}>
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}