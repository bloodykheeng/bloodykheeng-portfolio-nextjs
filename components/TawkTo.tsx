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

    // ============= remove tawk.to branding by injecting CSS into its iframe ======================
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


    // // // ================== add ur own branding to tawk.to widget by injecting CSS into its iframe ====================
    // useEffect(() => {
    //     const BRAND_NAME = "bloodykheeng";
    //     const STYLE_ID = "hide-tawk-branding";
    //     const IFRAME_SELECTOR = "iframe[title*='chat']";

    //     const hideBranding = (iframe: HTMLIFrameElement) => {
    //         try {
    //             const doc = iframe.contentDocument || iframe.contentWindow?.document;
    //             if (!doc) return;

    //             // Inject styles only once
    //             if (doc.getElementById(STYLE_ID)) return;

    //             const style = doc.createElement("style");
    //             style.id = STYLE_ID;
    //             style.innerHTML = `
    //             a[href*="tawk.to"] {
    //                 font-size: 0 !important;
    //                 pointer-events: none !important;
    //                 cursor: default !important;
    //             }
    //             a[href*="tawk.to"] img,
    //             a[href*="tawk.to"] svg {
    //                 display: none !important;
    //             }
    //             a[href*="tawk.to"]::after {
    //                 content: "Powered by ${BRAND_NAME}";
    //                 font-size: 11px;
    //                 color: #9ca3af;
    //                 text-align: center !important;
    //                 margin-top: 4px !important;
    //                 margin-bottom: 4px !important;
    //             }
    //         `;
    //             doc.head?.appendChild(style);
    //         } catch {
    //             // cross-origin iframe → expected
    //         }
    //     };

    //     const scanIframes = () => {
    //         document
    //             .querySelectorAll(IFRAME_SELECTOR)
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
    //         subtree: false,
    //     });

    //     return () => {
    //         observer.disconnect();
    //         clearTimeout(debounceTimer);
    //     };
    // }, []);

    // // //================ latest hide branding =================
    // useEffect(() => {
    //     const BRANDING_SELECTORS = `
    //     /* expanded widget branding */
    //     a[style*="font-size: 12px"][style*="font-weight: 400"][style*="padding: 0.5em"],

    //     /* minimized widget branding */
    //     a[style*="font-size: 12px"][style*="border-radius: 100px"]
    // `;



    //     const injectStyle = (doc: Document) => {
    //         if (doc.getElementById("hide-tawk-branding")) return;

    //         const style = doc.createElement("style");
    //         style.id = "hide-tawk-branding";

    //         style.textContent = `
    //         ${BRANDING_SELECTORS} {
    //             display: none !important;
    //             visibility: hidden !important;
    //             opacity: 0 !important;
    //             pointer-events: none !important;
    //             width: 0 !important;
    //             height: 0 !important;
    //             overflow: hidden !important;
    //             max-width: 0 !important;
    //             max-height: 0 !important;
    //         }
    //     `;

    //         (doc.head || doc.documentElement).prepend(style);
    //     };

    //     const handleIframe = (iframe: HTMLIFrameElement) => {
    //         const apply = () => {
    //             try {
    //                 const doc =
    //                     iframe.contentDocument ||
    //                     iframe.contentWindow?.document;

    //                 if (!doc) return;

    //                 injectStyle(doc);
    //             } catch {
    //                 // cross-origin iframe — expected for non-tawk iframes
    //             }
    //         };

    //         apply();
    //         iframe.addEventListener("load", apply);
    //     };

    //     // existing iframes
    //     document.querySelectorAll("iframe").forEach((iframe) => {
    //         handleIframe(iframe as HTMLIFrameElement);
    //     });

    //     // future iframes
    //     const observer = new MutationObserver((mutations) => {
    //         mutations.forEach((mutation) => {
    //             mutation.addedNodes.forEach((node) => {
    //                 if (node instanceof HTMLIFrameElement) {
    //                     handleIframe(node);
    //                 }

    //                 if (node instanceof HTMLElement) {
    //                     node.querySelectorAll("iframe").forEach((iframe) => {
    //                         handleIframe(iframe as HTMLIFrameElement);
    //                     });
    //                 }
    //             });
    //         });
    //     });

    //     observer.observe(document.documentElement, {
    //         childList: true,
    //         subtree: true,
    //     });

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);


    // //================ latest hide branding and add ur custom branding =================
    useEffect(() => {
        const BRAND_TEXT = "Powered by bloodykheeng";
        const OVERLAY_ID = "custom-tawk-branding";

        // =========================
        // create stable branding overlay
        // =========================
        let branding = document.getElementById(OVERLAY_ID);

        if (!branding) {
            branding = document.createElement("div");
            branding.id = OVERLAY_ID;
            branding.innerText = BRAND_TEXT;

            Object.assign(branding.style, {
                position: "fixed",
                bottom: "30px",
                right: "100px",
                zIndex: "999999",
                background: "#fff",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "11px",
                color: "#6b7280",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                pointerEvents: "none",
                transition: "opacity .2s ease",
                opacity: "0",
                visibility: "hidden",
            });

            document.body.appendChild(branding);
        }

        // =========================
        // show/hide overlay
        // =========================
        const showBranding = () => {
            if (!branding) return;

            branding.style.opacity = "1";
            branding.style.visibility = "visible";
        };

        const hideBranding = () => {
            if (!branding) return;

            branding.style.opacity = "0";
            branding.style.visibility = "hidden";
        };

        // =========================
        // tawk callbacks
        // =========================
        const w = window as any;

        w.Tawk_API = w.Tawk_API || {};

        w.Tawk_API.onChatMaximized = showBranding;
        w.Tawk_API.onChatStarted = showBranding;
        w.Tawk_API.onChatMinimized = hideBranding;
        w.Tawk_API.onChatHidden = hideBranding;

        // =========================
        // aggressively hide real branding
        // =========================
        const injectStyle = (doc: Document) => {
            if (doc.getElementById("hide-real-tawk-branding")) return;

            const style = doc.createElement("style");

            style.id = "hide-real-tawk-branding";

            style.textContent = `
            a[style*="font-size: 12px"][style*="padding: 0.5em"],
            a[style*="border-radius: 100px"] {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                transform: scale(0) !important;
            }
        `;

            (doc.head || doc.documentElement).prepend(style);
        };

        const handleIframe = (iframe: HTMLIFrameElement) => {
            const apply = () => {
                try {
                    const doc =
                        iframe.contentDocument ||
                        iframe.contentWindow?.document;

                    if (!doc) return;

                    injectStyle(doc);
                } catch {
                    // cross-origin
                }
            };

            apply();

            iframe.addEventListener("load", apply);
        };

        // existing iframes
        document.querySelectorAll("iframe").forEach((iframe) => {
            handleIframe(iframe as HTMLIFrameElement);
        });

        // future iframes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLIFrameElement) {
                        handleIframe(node);
                    }

                    if (node instanceof HTMLElement) {
                        node.querySelectorAll("iframe").forEach((iframe) => {
                            handleIframe(iframe as HTMLIFrameElement);
                        });
                    }
                });
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            branding?.remove();
        };
    }, []);



    return null;
}