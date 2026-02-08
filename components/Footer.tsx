"use client";

import { useState, useEffect } from 'react';

export default function Footer({ siteEmblem }: { siteEmblem: string | null }) {
    const [currentDay, setCurrentDay] = useState<number | null>(null); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    useEffect(() => {
        setCurrentDay(new Date().getDay());
    }, []);

    const daysOfWeek = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const hungarianDays = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]; // Only weekdays for office hours

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md mt-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* FŐ TARTALOM - ACCORDION MOBILON */}
                <div className="lg:hidden">
                    {/* LOGÓ */}
                    <div className="py-6 px-4 border-b border-gray-100 dark:border-gray-700">
                        <a href="/" className="flex items-center justify-center">
                            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                                {siteEmblem ? (
                                    <img className="max-h-full max-w-full" src={siteEmblem} alt="Tyukod Címere" />
                                ) : (
                                    <i className="bi bi-shield-fill text-3xl text-gray-400 dark:text-gray-600"></i>
                                )}
                            </div>
                            <div className="ml-3 flex flex-col leading-none">
                                <span className="text-lg font-bold tracking-tight text-red-600 dark:text-red-500">TYUKOD</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">NAGYKÖZSÉG</span>
                            </div>
                        </a>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                            Szabolcs-Szatmár-Bereg megye szívében található településünk gazdag történelmi múlttal és élő hagyományokkal rendelkezik.
                        </p>
                    </div>

                    {/* ACCORDION SZAKASZOK */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {/* ÜGYFÉLFOGADÁS */}
                        <details className="group">
                            <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                                <span className="font-bold text-gray-800 dark:text-gray-200">Ügyfélfogadás</span>
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </summary>
                            <div className="px-4 pb-4">
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    {hungarianDays.map((day, index) => {
                                        // Monday is 1, Tuesday is 2, ..., Friday is 5
                                        const isCurrentDay = currentDay === (index + 1);
                                        return (
                                            <li key={day} className={`flex justify-between ${isCurrentDay ? 'font-bold text-red-600 dark:text-red-500' : ''}`}>
                                                <span>{day}</span>
                                                <span className="font-medium">
                                                    {day === "Szerda" ? "8:00 – 16:00" : "8:00 – 12:00"}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </details>

                        {/* KAPCSOLAT */}
                        <details className="group">
                            <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                                <span className="font-bold text-gray-800 dark:text-gray-200">Kapcsolat</span>
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </summary>
                            <div className="px-4 pb-4">
                                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="flex items-start">
                                        <i className="bi bi-geo-alt-fill text-red-600 dark:text-red-500 mr-3 mt-0.5 flex-shrink-0"></i>
                                        <span>4762 Tyukod, Árpád u. 33.</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="bi bi-telephone-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                        <span>+36 44 556 062</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="bi bi-printer-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                        <span>+36 44 556 064</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="bi bi-envelope-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                        <a href="mailto:tyukod@outlook.hu" className="hover:text-red-600 dark:hover:text-red-400">
                                            tyukod@outlook.hu
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </details>

                        {/* HASZNOS LINKEK */}
                        <details className="group">
                            <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                                <span className="font-bold text-gray-800 dark:text-gray-200">Hasznos linkek</span>
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </summary>
                            <div className="px-4 pb-4">
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    <li><a href="https://magyarorszag.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Magyarország.hu</a></li>
                                    <li><a href="https://kozigazgatas.magyarorszag.hu/kozigazgatas/kozadat-kereso" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Közadatkereső</a></li>
                                    <li><a href="https://www.valasztas.hu/ugyintezes" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Nemzeti Választási Iroda</a></li>
                                    <li><a href="https://csenger.jarasihivatal.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Csengeri Járási Hivatal</a></li>
                                    <li><a href="https://www.police.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Rendőrség honlapja</a></li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>

                {/* DESKTOP VÁLTOZAT */}
                <div className="hidden lg:block py-12 px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 text-gray-700 dark:text-gray-300">

                        {/* LOGÓ + LEÍRÁS */}
                        <div className="flex flex-col">
                            <a href="/" className="flex items-center mb-6">
                                <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                                    {siteEmblem ? (
                                        <img className="max-h-full max-w-full" src={siteEmblem} alt="Tyukod Címere" />
                                    ) : (
                                        <i className="bi bi-shield-fill text-3xl text-gray-400 dark:text-gray-600"></i>
                                    )}
                                </div>
                                <div className="ml-4 flex flex-col leading-none">
                                    <span className="text-xl font-bold tracking-tight text-red-600 dark:text-red-500">TYUKOD</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">NAGYKÖZSÉG</span>
                                </div>
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Szabolcs-Szatmár-Bereg megye szívében található településünk gazdag történelmi múlttal és élő hagyományokkal rendelkezik.
                            </p>
                        </div>

                        {/* ÜGYFÉLFOGADÁS */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-gray-900 dark:text-white">
                                Ügyfélfogadás
                            </h4>
                            <ul className="space-y-2 text-sm">
                                {hungarianDays.map((day, index) => {
                                    // Monday is 1, Tuesday is 2, ..., Friday is 5
                                    const isCurrentDay = currentDay === (index + 1);
                                    return (
                                        <li key={day} className={`flex justify-between ${isCurrentDay ? 'font-bold text-red-600 dark:text-red-500' : ''}`}>
                                            <span>{day}</span>
                                            <span className="font-medium">
                                                {day === "Szerda" ? "8:00 – 16:00" : "8:00 – 12:00"}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* KAPCSOLAT */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-gray-900 dark:text-white">
                                Kapcsolat
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start">
                                    <i className="bi bi-geo-alt-fill text-red-600 dark:text-red-500 mr-3 mt-0.5 flex-shrink-0"></i>
                                    <span>4762 Tyukod, Árpád u. 33.</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-telephone-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                    <span>+36 44 556 062</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-printer-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                    <span>+36 44 556 064</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-envelope-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                                    <a href="mailto:tyukod@outlook.hu" className="hover:text-red-600 dark:hover:text-red-400">
                                        tyukod@outlook.hu
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* LINKEK */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-gray-900 dark:text-white">
                                Hasznos linkek
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="https://magyarorszag.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Magyarország.hu</a></li>
                                <li><a href="https://kozadat.hu/kereso/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Közadatkereső</a></li>
                                <li><a href="https://www.valasztas.hu/ugyintezes" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Nemzeti Választási Iroda</a></li>
                                <li><a href="https://csenger.jarasihivatal.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Csengeri Járási Hivatal</a></li>
                                <li><a href="https://www.police.hu/" target="_blank" className="hover:text-red-600 dark:hover:text-red-400 block py-1">Rendőrség honlapja</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto py-4 px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {/* Left: Copyright */}
                        <p className="text-center md:text-left order-2 md:order-1">
                            &copy; {new Date().getFullYear()} Tyukod Nagyközség Önkormányzata. Minden jog fenntartva.
                        </p>

                        {/* Right: Links */}
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2">
                            <a href="/adatvedelem" className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 font-medium">Adatvédelmi nyilatkozat</a>
                            <a href="/akadalymentesseg" className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 font-medium">Akadálymentesség</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}