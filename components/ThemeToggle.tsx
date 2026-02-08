"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 animate-pulse"></div>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:scale-110 active:scale-95 group overflow-hidden shadow-sm"
            aria-label="Téma váltása"
        >
            {/* Decorative inner glow */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10">
                {theme === "dark" ? (
                    <i className="bi bi-moon-stars-fill text-yellow-400 group-hover:rotate-12 transition-transform duration-500"></i>
                ) : (
                    <i className="bi bi-sun-fill text-orange-500 group-hover:rotate-45 transition-transform duration-500"></i>
                )}
            </div>

            {/* Visual ring on click/focus */}
            <div className="absolute inset-0 rounded-full border-0 border-blue-500/50 group-active:border-4 transition-all duration-300"></div>
        </button>
    );
}
