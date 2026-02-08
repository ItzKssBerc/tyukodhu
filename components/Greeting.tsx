"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface GreetingProps {
    images?: any[];
}

export default function Greeting({ images = [] }: GreetingProps) {
    const [randomImage, setRandomImage] = React.useState<any>(null);

    React.useEffect(() => {
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            setRandomImage(images[randomIndex]);
        }
    }, [images]);

    const handleShuffle = () => {
        if (images.length > 1) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * images.length);
            } while (randomImage && images[nextIndex]._id === randomImage._id);
            setRandomImage(images[nextIndex]);
        }
    };

    return (
        <section id="koszonto" className="w-full py-24 bg-stone-50 dark:bg-stone-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Random Gallery Image Placeholder */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-[2.5rem] blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl bg-stone-100 dark:bg-stone-900">
                            {randomImage ? (
                                <>
                                    <Image
                                        src={urlFor(randomImage.kep).url()}
                                        alt={randomImage.kepcim || "Galéria kép"}
                                        fill
                                        className="object-cover transition-all duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <p className="text-white font-bold text-lg line-clamp-2">{randomImage.kepcim}</p>
                                        <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Pillanatkép a galériából</p>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-stone-400">
                                    <i className="bi bi-images text-4xl opacity-20"></i>
                                    <p className="text-sm font-medium uppercase tracking-widest opacity-40">Kép betöltése...</p>
                                </div>
                            )}

                            {/* Shuffle Button */}
                            {images.length > 1 && (
                                <button
                                    onClick={handleShuffle}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90 z-20"
                                    title="Másik kép"
                                >
                                    <i className="bi bi-shuffle"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
                                Köszöntöm <span className="text-blue-600">Tyukod</span> község honlapján!
                            </h2>
                            <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
                        </div>

                        <div className="prose prose-lg dark:prose-invert text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                            <p>
                                Tyukod megújult digitális platformja a legkorszerűbb technológiákkal szolgálja közösségünket. Fedezze fel az oldal legfontosabb funkcióit:
                            </p>
                            <ul className="list-none p-0 space-y-3">
                                <li className="flex items-center">
                                    <i className="bi bi-check2-circle text-blue-600 mr-3"></i>
                                    <strong>Korszerű hírközlés:</strong> Friss tájékoztatás és naprakész információk a község életéből.
                                </li>
                                <li className="flex items-center">
                                    <i className="bi bi-check2-circle text-blue-600 mr-3"></i>
                                    <strong>Élő közvetítés:</strong> Kövesse nyomon a fontos eseményeket és üléseket valós időben.
                                </li>
                                <li className="flex items-center">
                                    <i className="bi bi-check2-circle text-blue-600 mr-3"></i>
                                    <strong>Interaktív térkép:</strong> Találja meg könnyen a helyi intézményeket és látnivalókat.
                                </li>
                                <li className="flex items-center">
                                    <i className="bi bi-check2-circle text-blue-600 mr-3"></i>
                                    <strong>Letölthető dokumentumok:</strong> Gyors és egyszerű hozzáférés a hivatalos nyomtatványokhoz.
                                </li>
                            </ul>
                        </div>

                        {/* Signature */}
                        <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
                            <p className="text-xl font-bold text-stone-900 dark:text-white">Név Placeholder</p>
                            <p className="text-sm uppercase tracking-widest text-stone-500 font-medium">Polgármester</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
