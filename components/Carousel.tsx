"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface CarouselProps {
    images: string[];
}

export default function Carousel({ images }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-2xl mt-8">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((src, index) => (
                        <div className="relative flex-[0_0_100%] min-w-0" key={index}>
                            <div className="aspect-[16/9] md:aspect-[21/9] relative w-full">
                                <Image
                                    src={src}
                                    alt={`Carousel Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                                    {/* Optional: Add captions here if you want */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={() => emblaApi && emblaApi.scrollPrev()}
                aria-label="Previous Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={() => emblaApi && emblaApi.scrollNext()}
                aria-label="Next Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${index === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
