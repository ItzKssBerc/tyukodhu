"use client";

import { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';

export default function InfoButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Disable scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* The Floating Action Button */}
            <button
                onClick={openModal}
                className="fixed bottom-20 right-4 z-[1100] h-14 w-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-bold"
                aria-label="Információ az oldalról"
            >
                <Info className="h-7 w-7" />
            </button>

            {/* The Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeModal}
                >
                    {/* The Modal Content */}
                    <div
                        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
                                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                Információ az oldalról
                            </h3>
                            <button
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                                onClick={closeModal}
                                aria-label="Bezárás"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content - Scrollable if too long */}
                        <div className="p-8 space-y-8 text-gray-700 dark:text-gray-300 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-3">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">A weboldal célja</h4>
                                <p className="leading-relaxed">Ez a weboldal Tyukod Nagyközség hivatalos információs portálja. Célja, hogy tájékoztatást nyújtson a helyi lakosok és az idelátogatók számára a község életéről, híreiről, eseményeiről és az önkormányzat működéséről.</p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Technikai háttér</h4>
                                <p className="leading-relaxed">A weboldal a legmodernebb technológiákkal készült, hogy gyors, biztonságos és könnyen használható legyen.</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                    <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="font-medium text-gray-900 dark:text-white">Keretrendszer:</span> Next.js</li>
                                    <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"><span className="w-2 h-2 rounded-full bg-teal-500"></span><span className="font-medium text-gray-900 dark:text-white">Stílus:</span> Tailwind CSS</li>
                                    <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span className="font-medium text-gray-900 dark:text-white">CMS:</span> Headless CMS</li>
                                    <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="font-medium text-gray-900 dark:text-white">Térkép:</span> Leaflet.js</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Készítő</h4>
                                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        KB
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">Kiss Bercel</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Fejlesztő és karbantartó</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-right border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors shadow-md hover:shadow-lg"
                            >
                                Bezárás
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
