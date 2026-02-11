"use client";

import React from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: string;
}

export default function EmptyState({ title, description, icon = "bi-search" }: EmptyStateProps) {
    return (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <div className="relative mb-8">
                {/* Decorative background glows */}
                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full"></div>

                {/* Icon Container */}
                <div className="relative w-24 h-24 bg-white/20 dark:bg-stone-900/20 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-[2rem] flex items-center justify-center shadow-xl group transition-all duration-500 hover:scale-110">
                    <i className={`bi ${icon} text-4xl text-stone-400 dark:text-stone-600 transition-colors duration-500 group-hover:text-blue-500`}></i>

                    {/* Floating badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white dark:border-stone-950">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-md space-y-3">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                    {title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Subtle decorative line */}
            <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent"></div>
        </div>
    );
}
