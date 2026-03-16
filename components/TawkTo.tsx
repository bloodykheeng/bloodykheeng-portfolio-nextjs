"use client";

import { useEffect } from "react";

export default function TawkTo() {
    // ================== embed tawk.to script ==================
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

    // // ============= remove tawk.to branding by injecting CSS into its iframe ======================
    // useEffect(() => {
    //     const hideBranding = (iframe: HTMLIFrameElement) => {
    //         try {
    //             const doc = iframe.contentDocument || iframe.contentWindow?.document;
    //             if (!doc) return;

    //             // Skip if already injected
    //             if (doc.getElementById("hide-tawk-branding")) return;

    //             const style = doc.createElement("style");
    //             style.id = "hide-tawk-branding";
    //             style.innerHTML = `
    //             a[href*="tawk.to"] {
    //                 display: none !important;
    //                 visibility: hidden !important;
    //                 opacity: 0 !important;
    //             }
    //         `;
    //             doc.head?.appendChild(style);
    //         } catch {
    //             // cross-origin iframe → expected
    //         }
    //     };

    //     const scanIframes = () => {
    //         document
    //             .querySelectorAll("iframe[title*='chat']")
    //             .forEach((iframe) => hideBranding(iframe as HTMLIFrameElement));
    //     };

    //     // Initial scan
    //     scanIframes();

    //     // Debounce to prevent rapid-fire calls
    //     let debounceTimer: ReturnType<typeof setTimeout>;
    //     const debouncedScan = () => {
    //         clearTimeout(debounceTimer);
    //         debounceTimer = setTimeout(scanIframes, 500);
    //     };

    //     // Only watch childList (new nodes), NOT subtree mutations inside iframes
    //     const observer = new MutationObserver(debouncedScan);
    //     observer.observe(document.body, {
    //         childList: true,
    //         subtree: false, // ← key change: don't watch inside existing nodes
    //     });

    //     return () => {
    //         observer.disconnect();
    //         clearTimeout(debounceTimer);
    //     };
    // }, []);


    // // ================== add ur own branding to tawk.to widget by injecting CSS into its iframe ====================
    useEffect(() => {
        const BRAND_NAME = "bloodykheeng";
        const STYLE_ID = "hide-tawk-branding";
        const IFRAME_SELECTOR = "iframe[title*='chat']";

        const hideBranding = (iframe: HTMLIFrameElement) => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                if (!doc) return;

                // Inject styles only once
                if (doc.getElementById(STYLE_ID)) return;

                const style = doc.createElement("style");
                style.id = STYLE_ID;
                style.innerHTML = `
                a[href*="tawk.to"] {
                    font-size: 0 !important;
                    pointer-events: none !important;
                    cursor: default !important;
                }
                a[href*="tawk.to"] img,
                a[href*="tawk.to"] svg {
                    display: none !important;
                }
                a[href*="tawk.to"]::after {
                    content: "Powered by ${BRAND_NAME}";
                    font-size: 11px;
                    color: #9ca3af;
                    text-align: center !important;
                    margin-top: 4px !important;
                    margin-bottom: 4px !important;
                }
            `;
                doc.head?.appendChild(style);
            } catch {
                // cross-origin iframe → expected
            }
        };

        const scanIframes = () => {
            document
                .querySelectorAll(IFRAME_SELECTOR)
                .forEach((iframe) => hideBranding(iframe as HTMLIFrameElement));
        };

        // Initial scan
        scanIframes();

        // Debounce to prevent rapid-fire calls
        let debounceTimer: ReturnType<typeof setTimeout>;
        const debouncedScan = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(scanIframes, 500);
        };

        // Only watch childList (new nodes), NOT subtree mutations inside iframes
        const observer = new MutationObserver(debouncedScan);
        observer.observe(document.body, {
            childList: true,
            subtree: false,
        });

        return () => {
            observer.disconnect();
            clearTimeout(debounceTimer);
        };
    }, []);

    return null;
}