"use client";

import Link from "next/link";
import NewsTicker from "./NewsTicker";
import React from "react"; // Import React for React.ReactNode

interface CarouselOverlayProps {
    news: any[];
    documents: any[];
    children?: React.ReactNode; // Added children prop
}

export default function CarouselOverlay({ news, documents }: CarouselOverlayProps) {
    const allItems = [...news, ...documents];

    return (
        <div className="relative w-full h-full pointer-events-none flex flex-col items-center justify-start px-6 md:px-12 py-12 md:py-24">

            {/* TOP SECTION: C1 and C2 */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-16 lg:mt-10 mb-16">

                {/* C1: Title Section */}
                <div className="pointer-events-auto text-left py-6 lg:py-12 space-y-4">
                    <h1 className="tracking-tighter leading-[0.95] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                        <span className="text-5xl md:text-8xl font-bold block text-transparent bg-clip-text bg-gradient-to-br from-white via-white/40 to-white/80 mb-2">
                            Tyukod
                        </span>
                        <span className="text-4xl md:text-7xl font-black block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-gray-400/50 pb-6">
                            Nagyközség
                        </span>
                    </h1>
                </div>

                {/* C2: Info Section (News/Docs) */}
                <div className="pointer-events-auto flex flex-col justify-center animate-fade-in delay-100">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-2 shadow-2xl">
                        <div className="bg-black/20 rounded-[1.5rem] p-6 lg:p-8">
                            <NewsTicker items={allItems} mode="minimal" />
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: C3 (Navigation Island) - Drived to bottom with mt-auto */}
            <div className="w-full max-w-3xl pointer-events-auto animate-fade-in-up delay-200 mt-auto mb-12">
                <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-2 shadow-2xl flex items-center justify-between overflow-x-auto scrollbar-hide">
                    <Link href="#koszonto" className="flex-1 min-w-[100px] flex items-center justify-center py-5 rounded-l-[2rem] rounded-r-none transition-all duration-500 hover:bg-white/10 group">
                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/90 group-hover:text-blue-400 transition-colors whitespace-nowrap">Köszöntő</span>
                    </Link>
                    <div className="w-px h-8 bg-white/10 ml-2 mr-2 flex-shrink-0"></div>
                    <Link href="/ertektar" className="flex-1 min-w-[100px] flex items-center justify-center py-5 rounded-none transition-all duration-500 hover:bg-white/10 group">
                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/90 group-hover:text-yellow-400 transition-colors whitespace-nowrap">Értéktár</span>
                    </Link>
                    <div className="w-px h-8 bg-white/10 ml-2 mr-2 flex-shrink-0"></div>
                    <Link href="/tyukodkozsegert" className="flex-1 min-w-[100px] flex items-center justify-center py-5 rounded-r-[2rem] rounded-l-none transition-all duration-500 hover:bg-white/10 group">
                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/90 group-hover:text-cyan-400 transition-colors whitespace-nowrap">Községért</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}
