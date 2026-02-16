"use client";

import { useEffect } from "react";

export default function WeatherWidget() {
    useEffect(() => {
        // Check if script is already loaded to avoid duplicates
        if (!document.getElementById("weatherwidget-io-js")) {
            const js = document.createElement("script");
            js.id = "weatherwidget-io-js";
            js.src = "https://weatherwidget.io/js/widget.min.js";
            document.body.appendChild(js);
        } else {
            // If already loaded, we might need to re-trigger it for this instance
            // though weatherwidget.io usually handles this via the class
            if (window.__weatherwidget_init) {
                window.__weatherwidget_init();
            }
        }
    }, []);

    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-stone-200 dark:border-stone-800 theme-transition">
            <a
                className="weatherwidget-io"
                href="https://forecast7.com/en/47d8522d56/tyukod/"
                data-label_1="TYUKOD"
                data-label_2="IDŐJÁRÁS"
                data-font="Orbitron"
                data-icons="Climacons Animated"
                data-theme="pure"
                data-basecolor="transparent"
                data-accent="transparent"
            >
                TYUKOD IDŐJÁRÁS
            </a>
        </div>
    );
}

// Add type for the widget init function if it's available globally
declare global {
    interface Window {
        __weatherwidget_init?: () => void;
    }
}
