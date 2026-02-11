"use client";

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface CarouselProps {
    images: string[];
    children?: React.ReactNode;
}

export default function Carousel({ images, children }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);



    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full h-[85vh] overflow-hidden shadow-2xl mt-0">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((src, index) => (
                        <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`Carousel Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-black/40"></div> {/* Darker overlay for text readability */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {/* ... buttons 62-80 unchanged ... */}

            {/* Dots */}
            {/* ... dots 82-92 unchanged ... */}

            {/* Content Slot for Floating Dashboard / Overlays */}
            {children && (
                <div className="absolute inset-0 z-30 w-full max-w-7xl mx-auto px-4 pointer-events-none overflow-y-auto scrollbar-hide">
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
