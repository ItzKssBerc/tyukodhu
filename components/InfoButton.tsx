"use client";

import { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function InfoButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* The Floating Action Button */}
            <button
                onClick={openModal}
                className="fixed bottom-20 right-4 z-40 h-14 w-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                aria-label="Információ az oldalról"
            >
                <Info className="h-7 w-7" />
            </button>

            {/* The Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full border border-gray-200 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
                                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
                                Információ az oldalról
                            </h3>
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                                onClick={closeModal}
                                aria-label="Bezárás"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6 text-gray-700 dark:text-gray-300">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">A weboldal célja</h4>
                                <p>Ez a weboldal Tyukod Nagyközség hivatalos információs portálja. Célja, hogy tájékoztatást nyújtson a helyi lakosok és az idelátogatók számára a község életéről, híreiről, eseményeiről és az önkormányzat működéséről.</p>
                            </div>
                            
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Technikai háttér</h4>
                                <p>A weboldal a legmodernebb technológiákkal készült, hogy gyors, biztonságos és könnyen használható legyen.</p>
                                <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><span className="font-medium text-gray-800 dark:text-gray-200">Keretrendszer:</span> Next.js (React)</li>
                                    <li><span className="font-medium text-gray-800 dark:text-gray-200">Stílus:</span> Tailwind CSS</li>
                                    <li><span className="font-medium text-gray-800 dark:text-gray-200">Tartalomkezelés:</span> Headless CMS</li>
                                    <li><span className="font-medium text-gray-800 dark:text-gray-200">Térkép:</span> Leaflet.js</li>
                                </ul>
                            </div>
                            
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Készítő</h4>
                                <p>Az oldalt készítette és karbantartja Kiss Bercel.</p>
                            </div>


                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-right border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
