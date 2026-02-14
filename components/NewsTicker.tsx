"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* Start of Selection */
export interface NewsItem {
    title: string;
    url: string;
    date: string;
    imageUrl?: string | null;
    category?: string;
    type: "news" | "document";
}

export interface NewsTickerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    news: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs: any[];
    mode?: 'default' | 'minimal';
}

export default function NewsTicker({ news, docs, mode = 'default' }: NewsTickerProps) {
    const [activeType, setActiveType] = useState<'news' | 'docs'>('news');
    const [isVisible, setIsVisible] = useState(true);

    const hasNews = news.length > 0;
    const hasDocs = docs.length > 0;

    useEffect(() => {
        if (!hasNews || !hasDocs) return;

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setActiveType((prev) => (prev === 'news' ? 'docs' : 'news'));
                setIsVisible(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [hasNews, hasDocs]);

    // Determine current set of items
    let currentItems = activeType === 'news' ? news : docs;

    if (currentItems.length === 0) {
        // Fallback if one category is empty, show the other if possible
        const fallbackItems = activeType === 'news' ? docs : news;
        if (fallbackItems.length === 0) return null;
        // If currentItems was empty, but fallbackItems is not, use fallbackItems
        currentItems = fallbackItems;
    }

    // Category display name mapping
    const categoryMapping: Record<string, string> = {
        'kozerdeku': 'Közérdekű',
        'onkormanyzati': 'Önkormányzati',
        'kulturalis': 'Kulturális',
        'sport': 'Sport',
        'egyeb': 'Egyéb',
    };

    const getCategoryName = (item: NewsItem) => {
        if (item.category && categoryMapping[item.category]) {
            return categoryMapping[item.category];
        }
        return item.category || (item.type === 'news' ? 'Hír' : 'Dokumentum');
    };

    const containerClasses = "w-full flex-grow flex flex-col transition-all duration-500 overflow-hidden";


    return (
        <div className={containerClasses}>
            <div className={`flex flex-col w-full flex-grow divide-y divide-white/10 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {currentItems.map((item, idx) => (
                    <div key={`${activeType}-${idx}`} className="flex-1 flex flex-col min-h-0 relative group">
                        <Link href={item.url} className="absolute inset-0 z-10" aria-label={item.title}></Link>
                        <div className="flex items-stretch w-full flex-grow bg-transparent overflow-hidden">
                            {/* Left Side: Content */}
                            <div className={`flex-grow flex flex-col justify-center text-left pointer-events-none ${mode === 'minimal' ? 'p-3 md:px-5 md:py-3' : 'p-4 md:p-6'}`}>
                                <span className={`text-white group-hover:text-blue-300 transition-colors font-bold leading-tight ${mode === 'minimal' ? 'line-clamp-1 text-sm md:text-base' : 'line-clamp-3 text-sm md:text-xl'}`}>
                                    {item.title}
                                </span>
                                <div className={`flex items-center uppercase tracking-widest text-white/60 font-semibold space-x-2 ${mode === 'minimal' ? 'text-[9px] md:text-[10px] mt-1' : 'text-[10px] md:text-xs mt-2'}`}>
                                    <span>{getCategoryName(item)}</span>
                                    <span>•</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>

                            {/* Right Side: Image */}
                            <div className="w-1/3 md:w-40 relative flex-shrink-0 pointer-events-none border-l border-white/5">
                                {item.imageUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        {item.type === 'news' ? (
                                            <i className="bi bi-megaphone-fill text-blue-400 text-2xl"></i>
                                        ) : (
                                            <i className="bi bi-file-earmark-text-fill text-red-400 text-2xl"></i>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
