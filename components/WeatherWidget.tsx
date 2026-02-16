"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function WeatherWidget() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Function to initialize or re-initialize the widget
        const initWidget = () => {
            if (typeof window !== "undefined") {
                // If script is not there, add it
                if (!document.getElementById("weatherwidget-io-js")) {
                    const js = document.createElement("script");
                    js.id = "weatherwidget-io-js";
                    js.src = "https://weatherwidget.io/js/widget.min.js";
                    document.body.appendChild(js);
                } else if (window.__weatherwidget_init) {
                    // If script exists, just re-init
                    window.__weatherwidget_init();
                }
            }
        };

        initWidget();
    }, [resolvedTheme]); // Re-run when theme changes

    if (!mounted) return <div className="h-[150px] w-full bg-stone-100 dark:bg-stone-800 animate-pulse rounded-2xl" />;

    const isDark = resolvedTheme === "dark";

    return (
        <div key={resolvedTheme} className="w-full theme-transition overflow-hidden">
            <div className="-mb-[1px]">
                <a
                    className="weatherwidget-io"
                    href="https://forecast7.com/hu/47d8522d56/tyukod/"
                    data-label_1="TYUKOD"
                    data-label_2="IDŐJÁRÁS"
                    data-theme={isDark ? "dark" : "pure"}
                    data-language="HU"
                    data-basecolor={isDark ? "#0c0a09" : "transparent"}
                    data-accent="transparent"
                >
                    TYUKOD IDŐJÁRÁS
                </a>
            </div>
        </div>
    );
}

declare global {
    interface Window {
        __weatherwidget_init?: () => void;
    }
}
