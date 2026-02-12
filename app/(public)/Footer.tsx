"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ siteEmblem }: { siteEmblem: string | null }) {
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    setCurrentDay(new Date().getDay());
  }, []);

  const hungarianDays = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];

  return (
    <footer className="bg-stone-50/50 dark:bg-stone-950/50 backdrop-blur-sm border-t border-stone-200 dark:border-stone-800 theme-transition">
      <div className="max-w-7xl mx-auto">
        {/* Mobilon Accordion (lg:hidden) */}
        <div className="lg:hidden">
          <div className="py-6 px-4 border-b border-stone-100 dark:border-stone-700">
            <Link href="/" className="flex items-center justify-center">
              <div className="h-16 w-16 bg-white dark:bg-stone-800 p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-stone-300 dark:border-stone-600">
                {siteEmblem ? (
                  <Image
                    className="max-h-full max-w-full object-contain"
                    src={siteEmblem}
                    alt="Tyukod Címere"
                    width={64}
                    height={64}
                  />
                ) : (
                  <i className="bi bi-shield-fill text-3xl text-stone-400 dark:text-stone-600"></i>
                )}
              </div>
              <div className="ml-3 flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-red-600 dark:text-red-500">
                  TYUKOD
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  NAGYKÖZSÉG
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400 text-center mt-4">
              Szabolcs-Szatmár-Bereg megye szívében található településünk
              gazdag történelmi múlttal és élő hagyományokkal rendelkezik.
            </p>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-700">
            <details className="group">
              <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Ügyfélfogadás
                </span>
                <svg
                  className="w-5 h-5 text-stone-500 dark:text-stone-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  {hungarianDays.map((day, index) => {
                    const isCurrentDay = currentDay === index + 1;
                    return (
                      <li
                        key={day}
                        className={`flex justify-between ${isCurrentDay ? "font-bold text-red-600 dark:text-red-500" : ""}`}
                      >
                        <span>{day}</span>
                        <span className="font-medium">
                          {day === "Szerda" ? "8:00  16:00" : "8:00  12:00"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Kapcsolat
                </span>
                <svg
                  className="w-5 h-5 text-stone-500 dark:text-stone-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <div className="space-y-3 text-sm text-stone-700 dark:text-stone-300">
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
                    <span>+36 44 556 064 (fax)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-envelope-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                    <a
                      href="mailto:tyukod@outlook.hu"
                      className="hover:text-red-600 dark:hover:text-red-400"
                    >
                      tyukod@outlook.hu
                    </a>
                  </div>
                </div>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Hasznos linkek
                </span>
                <svg
                  className="w-5 h-5 text-stone-500 dark:text-stone-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  <li>
                    <a
                      href="https://magyarorszag.hu/"
                      target="_blank"
                      className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                    >
                      Magyarország.hu
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://kozigazgatas.magyarorszag.hu/kozigazgatas/kozadat-kereso"
                      target="_blank"
                      className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                    >
                      Közadatkereső
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.valasztas.hu/ugyintezes"
                      target="_blank"
                      className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                    >
                      Nemzeti Választási Iroda
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://csenger.jarasihivatal.hu/"
                      target="_blank"
                      className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                    >
                      Csengeri Járási Hivatal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.police.hu/"
                      target="_blank"
                      className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                    >
                      Rendőrség honlapja
                    </a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:block py-12 px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 text-stone-700 dark:text-stone-300">
            <div className="flex flex-col">
              <Link href="/" className="flex items-center mb-6">
                <div className="h-16 w-16 bg-white dark:bg-stone-800 p-2 rounded-full shadow-lg flex items-center justify-center border-2 border-stone-300 dark:border-stone-600">
                  {siteEmblem ? (
                    <Image
                      className="max-h-full max-w-full object-contain"
                      src={siteEmblem}
                      alt="Tyukod Címere"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <i className="bi bi-shield-fill text-3xl text-stone-400 dark:text-stone-600"></i>
                  )}
                </div>
                <div className="ml-4 flex flex-col leading-none">
                  <span className="text-xl font-bold tracking-tight text-red-600 dark:text-red-500">
                    TYUKOD
                  </span>
                  <span className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                    NAGYKÖZSÉG
                  </span>
                </div>
              </Link>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Szabolcs-Szatmár-Bereg megye szívében található településünk
                gazdag történelmi múlttal és élő hagyományokkal rendelkezik.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-stone-900 dark:text-white">
                Ügyfélfogadás
              </h4>
              <ul className="space-y-2 text-sm">
                {hungarianDays.map((day, index) => {
                  const isCurrentDay = currentDay === index + 1;
                  return (
                    <li
                      key={day}
                      className={`flex justify-between ${isCurrentDay ? "font-bold text-red-600 dark:text-red-500" : ""}`}
                    >
                      <span>{day}</span>
                      <span className="font-medium">
                        {day === "Szerda" ? "8:00  16:00" : "8:00  12:00"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-stone-900 dark:text-white">
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
                  <span>+36 44 556 064 (fax)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-envelope-fill text-red-600 dark:text-red-500 mr-3 flex-shrink-0"></i>
                  <a
                    href="mailto:tyukod@outlook.hu"
                    className="hover:text-red-600 dark:hover:text-red-400"
                  >
                    tyukod@outlook.hu
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-red-600 dark:border-red-500 pb-2 text-stone-900 dark:text-white">
                Hasznos linkek
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://magyarorszag.hu/"
                    target="_blank"
                    className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                  >
                    Magyarország.hu
                  </a>
                </li>
                <li>
                  <a
                    href="https://kozigazgatas.magyarorszag.hu/kozigazgatas/kozadat-kereso"
                    target="_blank"
                    className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                  >
                    Közadatkereső
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.valasztas.hu/ugyintezes"
                    target="_blank"
                    className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                  >
                    Nemzeti Választási Iroda
                  </a>
                </li>
                <li>
                  <a
                    href="https://csenger.jarasihivatal.hu/"
                    target="_blank"
                    className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                  >
                    Csengeri Járási Hivatal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.police.hu/"
                    target="_blank"
                    className="hover:text-red-600 dark:hover:text-red-400 block py-1"
                  >
                    Rendőrség honlapja
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900/50 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-600 dark:text-stone-400">
            <p className="text-center md:text-left order-2 md:order-1 font-medium">
              &copy; {new Date().getFullYear()} Tyukod Nagyközség Önkormányzata.
              Minden jog fenntartva.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2">
              <Link
                href="/adatvedelem"
                className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 font-medium"
              >
                Adatvédelmi nyilatkozat
              </Link>
              <Link
                href="/akadalymentesseg"
                className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 font-medium"
              >
                Akadálymentesség
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
