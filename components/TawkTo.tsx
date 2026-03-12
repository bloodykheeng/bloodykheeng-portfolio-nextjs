"use client";

import { useEffect } from "react";

export default function TawkTo() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/69b2bcce80878f1c37ded7b7/1jjh3322k";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0?.parentNode?.insertBefore(s1, s0);
    }, []);
    return null;
}