"use client";

import { useEffect } from "react";

interface TawkWindow extends Window {
    Tawk_API?: {
        onChatMaximized?: () => void;
        onChatMinimized?: () => void;
        onChatHidden?: () => void;
    };
}


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

    // //================ latest hide branding =================
    // useEffect(() => {
    //     const processedIframes = new WeakSet<HTMLIFrameElement>();

    //     const injectHideCSS = (
    //         iframe: HTMLIFrameElement
    //     ) => {
    //         try {
    //             const doc =
    //                 iframe.contentDocument ||
    //                 iframe.contentWindow?.document;

    //             if (!doc) return;

    //             if (
    //                 doc.getElementById(
    //                     "hide-tawk-branding"
    //                 )
    //             ) {
    //                 iframe.style.visibility = "visible";
    //                 return;
    //             }

    //             // hide iframe instantly
    //             iframe.style.visibility = "hidden";

    //             const style =
    //                 doc.createElement("style");

    //             style.id = "hide-tawk-branding";

    //             style.innerHTML = `
    //             a[style*="font-size: 12px"][style*="border-radius: 100px"] {
    //                 display: none !important;
    //                 visibility: hidden !important;
    //                 opacity: 0 !important;
    //                 pointer-events: none !important;
    //             }
    //         `;

    //             doc.head.appendChild(style);

    //             // show iframe after css injected
    //             iframe.style.visibility = "visible";
    //         } catch { }
    //     };

    //     const scanIframes = () => {
    //         document
    //             .querySelectorAll("iframe")
    //             .forEach((iframe) => {
    //                 const frame =
    //                     iframe as HTMLIFrameElement;

    //                 if (
    //                     processedIframes.has(frame)
    //                 ) {
    //                     return;
    //                 }

    //                 processedIframes.add(frame);

    //                 // hide immediately before load
    //                 frame.style.visibility =
    //                     "hidden";

    //                 if (
    //                     frame.contentDocument?.readyState ===
    //                     "complete"
    //                 ) {
    //                     injectHideCSS(frame);
    //                 } else {
    //                     frame.addEventListener(
    //                         "load",
    //                         () =>
    //                             injectHideCSS(frame),
    //                         { once: true }
    //                     );
    //                 }
    //             });
    //     };

    //     scanIframes();

    //     const observer =
    //         new MutationObserver(scanIframes);

    //     observer.observe(document.body, {
    //         childList: true,
    //         subtree: true,
    //     });

    //     return () => observer.disconnect();
    // }, []);


    // //================ latest hide branding and add ur custom branding =================
    useEffect(() => {
        const BRAND_TEXT = "Powered by bloodykheeng";

        // 1. Create branding overlay (outside iframe - stable), hidden by default
        const branding = document.createElement("div");
        branding.innerText = BRAND_TEXT;

        branding.style.position = "fixed";
        branding.style.bottom = "30px";
        branding.style.right = "100px";
        branding.style.zIndex = "999999";
        branding.style.background = "white";
        branding.style.padding = "6px 10px";
        branding.style.borderRadius = "999px";
        branding.style.fontSize = "12px";
        branding.style.color = "#6b7280";
        branding.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
        branding.style.pointerEvents = "none";
        branding.style.display = "none"; // hidden until chat opens

        document.body.appendChild(branding);

        // 2. Show/hide branding with chat open/close via Tawk API
        const w = window as TawkWindow;
        w.Tawk_API = w.Tawk_API || {};
        w.Tawk_API.onChatMaximized = () => { branding.style.display = "block"; };
        w.Tawk_API.onChatMinimized = () => { branding.style.display = "none"; };
        w.Tawk_API.onChatHidden = () => { branding.style.display = "none"; };

        // 3. Optional: try to hide Tawk branding inside iframe (best effort only)
        const STYLE_ID = "tawk-hide-branding";

        const tryHide = () => {
            const iframes = document.querySelectorAll("iframe");

            iframes.forEach((iframe) => {
                try {
                    const doc = (iframe as HTMLIFrameElement).contentDocument;
                    if (!doc) return;

                    if (doc.getElementById(STYLE_ID)) return;

                    const style = doc.createElement("style");
                    style.id = STYLE_ID;

                    style.innerHTML = `
                        a[style*="border-radius: 100px"] {
                            display: none !important;
                            visibility: hidden !important;
                            opacity: 0 !important;
                        }
                    `;

                    doc.head?.appendChild(style);
                } catch {
                    // cross-origin blocked → expected
                }
            });
        };

        // 4. Observe DOM changes (Tawk reinserts iframe often)
        const observer = new MutationObserver(() => {
            tryHide();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // initial run
        tryHide();

        return () => {
            observer.disconnect();
            branding.remove();
        };
    }, []);



    return null;
}