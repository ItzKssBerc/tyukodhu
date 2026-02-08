"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NewsItem {
    title: string;
    url: string;
    date: string;
    type: "news" | "document";
}

interface NewsTickerProps {
    items: NewsItem[];
    mode?: 'default' | 'minimal';
}

export default function NewsTicker({ items, mode = 'default' }: NewsTickerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (items.length <= 1) return;

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
                setIsVisible(true);
            }, 500); // Wait for fade out
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [items.length]);

    if (items.length === 0) return null;

    const currentItem = items[currentIndex];

    const containerClasses = mode === 'default'
        ? "w-full transition-all duration-500"
        : "w-full transition-all duration-500";

    return (
        <div className={containerClasses}>
            <div className="flex items-center w-full">
                <div className={`mr-4 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10`}>
                    {currentItem.type === 'news' ? (
                        <i className="bi bi-megaphone-fill text-blue-400 text-sm"></i>
                    ) : (
                        <i className="bi bi-file-earmark-text-fill text-red-400 text-sm"></i>
                    )}
                </div>
                <div className={`flex-grow text-left transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <Link href={currentItem.url} className="text-white hover:text-blue-300 transition-colors line-clamp-1 text-sm md:text-base font-medium">
                        {currentItem.title}
                    </Link>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mt-0.5">
                        {currentItem.type === 'news' ? 'Friss Hír' : 'Dokumentum'} • {currentItem.date}
                    </div>
                </div>
            </div>
        </div>
    );
}
