"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";


export default function Nav({ siteEmblem }: { siteEmblem: string | null }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop Dropdown States
  const [mediaOpen, setMediaOpen] = useState(false);
  const [onkormanyzatOpen, setOnkormanyzatOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [interaktivOpen, setInteraktivOpen] = useState(false); // New state

  // Mobile Dropdown States
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const [mobileOnkormanyzatOpen, setMobileOnkormanyzatOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [mobileInteraktivOpen, setMobileInteraktivOpen] = useState(false); // New state

  // Refs for click outside
  const mediaRef = useRef<HTMLDivElement>(null);
  const onkormanyzatRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const interaktivRef = useRef<HTMLDivElement>(null); // New ref

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mediaRef.current && !mediaRef.current.contains(event.target as Node)) {
        setMediaOpen(false);
      }
      if (onkormanyzatRef.current && !onkormanyzatRef.current.contains(event.target as Node)) {
        setOnkormanyzatOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
      if (interaktivRef.current && !interaktivRef.current.contains(event.target as Node)) {
        setInteraktivOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string, exact = true) => {
    if (pathname === null) return false; // Handle null pathname
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const getLinkClasses = (active: boolean) => {
    return `flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${active
      ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20"
      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100/80 dark:hover:bg-stone-800/80 hover:text-stone-900 dark:hover:text-stone-200 border border-transparent"
      }`;
  };

  const getMobileLinkClasses = (active: boolean) => {
    return `flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${active
      ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20"
      : "bg-stone-50/50 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-100 dark:border-stone-800/50"
      }`;
  };

  const getMobileSubLinkClasses = (active: boolean) => {
    return `flex items-center pl-5 pr-3 py-3 rounded-md text-base font-medium transition-colors ${active
      ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
      }`;
  };

  return (
    <nav className="bg-white/70 dark:bg-stone-950/70 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 shadow-sm py-2 theme-transition sticky top-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center border-2 border-gray-400 dark:border-gray-700 overflow-hidden">
                {siteEmblem ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    className="w-full h-full object-contain"
                    src={siteEmblem}
                    alt="Tyukod Címere"
                  />
                ) : (
                  <i className="bi bi-shield-fill text-4xl text-gray-400 dark:text-gray-600"></i>
                )}
              </div>
              <div className="ml-3 flex flex-col items-start leading-none">
                <span className="text-2xl font-bold tracking-tight text-yellow-500 hover:text-yellow-600 transition-colors">
                  TYUKOD
                </span>
                <span className="text-sm font-normal tracking-normal mt-0.5 text-gray-600 dark:text-gray-400 hover:text-yellow-600 transition-colors">
                  NAGYKÖZSÉG
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/" className={getLinkClasses(isActive("/"))}>
                <i className="bi bi-house-door-fill mr-2"></i>Kezdőlap
              </Link>

              {/* Média Dropdown */}
              <div className="relative" ref={mediaRef}>
                <button
                  onClick={() => setMediaOpen(!mediaOpen)}
                  className={`${getLinkClasses(
                    isActive("/hirek") || isActive("/galeria")
                  )} inline-flex focus:outline-none`}
                >
                  <i className="bi bi-rss-fill mr-2"></i>Média
                  <svg
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${mediaOpen ? "rotate-180" : "rotate-0"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {mediaOpen && (
                  <div className="absolute z-10 mt-3 w-64 rounded-2xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2 animate-in fade-in zoom-in duration-200">
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl p-2 shadow-2xl">
                      <Link
                        href="/hirek"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/hirek")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setMediaOpen(false)}
                      >
                        <i className="bi bi-newspaper mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Hírek
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/galeria"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${isActive("/galeria")
                          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                        onClick={() => setMediaOpen(false)}
                      >
                        <i className="bi bi-images mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Képgaléria
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Önkormányzat Dropdown */}
              <div className="relative" ref={onkormanyzatRef}>
                <button
                  onClick={() => setOnkormanyzatOpen(!onkormanyzatOpen)}
                  className={`${getLinkClasses(
                    isActive("/onkormanyzat", false)
                  )} inline-flex focus:outline-none`}
                >
                  <i className="bi bi-building-fill mr-2"></i>Önkormányzat
                  <svg
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${onkormanyzatOpen ? "rotate-180" : "rotate-0"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {onkormanyzatOpen && (
                  <div className="absolute z-10 mt-3 w-64 rounded-2xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2 animate-in fade-in zoom-in duration-200">
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl p-2 shadow-2xl">
                      <Link
                        href="/onkormanyzat/kepviselo-testulet"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/onkormanyzat/kepviselo-testulet")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setOnkormanyzatOpen(false)}
                      >
                        <i className="bi bi-people-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Képviselő testület
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/onkormanyzat/bizottsagok"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${isActive("/onkormanyzat/bizottsagok")
                          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                        onClick={() => setOnkormanyzatOpen(false)}
                      >
                        <i className="bi bi-person-check-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Bizottságok
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/onkormanyzat/dokumentumok"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${isActive("/onkormanyzat/dokumentumok")
                          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                        onClick={() => setOnkormanyzatOpen(false)}
                      >
                        <i className="bi bi-file-earmark-text-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Dokumentumok
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Interaktív Dropdown (ÚJ) */}
              <div className="relative" ref={interaktivRef}>
                <button
                  onClick={() => setInteraktivOpen(!interaktivOpen)}
                  className={`${getLinkClasses(
                    isActive("/elokozvetites") || isActive("/terkep") || isActive("/szavazasok")
                  )} inline-flex focus:outline-none`}
                >
                  <i className="bi bi-cursor-fill mr-2"></i>Interaktív
                  <svg
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${interaktivOpen ? "rotate-180" : "rotate-0"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {interaktivOpen && (
                  <div className="absolute z-10 mt-3 w-64 rounded-2xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2 animate-in fade-in zoom-in duration-200">
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl p-2 shadow-2xl">
                      <Link
                        href="/elokozvetites"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/elokozvetites")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setInteraktivOpen(false)}
                      >
                        <i className="bi bi-camera-video-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Élő közvetítés
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/terkep"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${isActive("/terkep")
                          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                        onClick={() => setInteraktivOpen(false)}
                      >
                        <i className="bi bi-map-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Térkép
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/szavazasok"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${isActive("/szavazasok")
                          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                        onClick={() => setInteraktivOpen(false)}
                      >
                        <i className="bi bi-bar-chart-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Szavazások
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Információk Dropdown */}
              <div className="relative" ref={infoRef}>
                <button
                  onClick={() => setInfoOpen(!infoOpen)}
                  className={`${getLinkClasses(
                    isActive("/kozsegunkrol") || isActive("/tyukodkozsegert") || isActive("/ertektar")
                  )} inline-flex focus:outline-none`}
                >
                  <i className="bi bi-info-circle-fill mr-2"></i>Információk
                  <svg
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${infoOpen ? "rotate-180" : "rotate-0"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {infoOpen && (
                  <div className="absolute z-10 mt-3 w-64 rounded-2xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2 animate-in fade-in zoom-in duration-200">
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl p-2 shadow-2xl">
                      <Link
                        href="/kozsegunkrol"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/kozsegunkrol")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setInfoOpen(false)}
                      >
                        <i className="bi bi-info-square-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Községünkről
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/tyukodkozsegert"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/tyukodkozsegert")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setInfoOpen(false)}
                      >
                        <i className="bi bi-heart-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Tyukod Községért
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/ertektar"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive("/ertektar")
                          ? "bg-stone-100 dark:bg-stone-800 text-blue-600 dark:text-blue-400"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-stone-100"
                          }`}
                        onClick={() => setInfoOpen(false)}
                      >
                        <i className="bi bi-gem mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Tyukod Értéktára
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/kapcsolat"
                className={getLinkClasses(isActive("/kapcsolat"))}
              >
                <i className="bi bi-envelope-fill mr-2"></i>Kapcsolat
              </Link>
            </div>
          </div>

          {/* Right Side: Dark Mode & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden bg-transparent inline-flex items-center justify-center p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-2xl border-t border-stone-200 dark:border-stone-800 animate-in slide-in-from-top duration-300"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={getMobileLinkClasses(isActive("/"))}
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="bi bi-house-door-fill mr-2"></i>Kezdőlap
            </Link>

            {/* Mobile Média */}
            <div className="">
              <button
                onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive("/hirek") || isActive("/galeria")
                  ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-rss-fill mr-2"></i>Média
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${mobileMediaOpen ? "rotate-180" : "rotate-0"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {mobileMediaOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    href="/hirek"
                    className={getMobileSubLinkClasses(isActive("/hirek"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-newspaper mr-2"></i>Hírek
                  </Link>
                  <Link
                    href="/galeria"
                    className={getMobileSubLinkClasses(isActive("/galeria"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-images mr-2"></i>Képgaléria
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Önkormányzat */}
            <div>
              <button
                onClick={() => setMobileOnkormanyzatOpen(!mobileOnkormanyzatOpen)}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive("/onkormanyzat", false)
                  ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-building-fill mr-2"></i>Önkormányzat
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${mobileOnkormanyzatOpen ? "rotate-180" : "rotate-0"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {mobileOnkormanyzatOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    href="/onkormanyzat/kepviselo-testulet"
                    className={getMobileSubLinkClasses(isActive("/onkormanyzat/kepviselo-testulet"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-people-fill mr-2"></i>Képviselő testület
                  </Link>
                  <Link
                    href="/onkormanyzat/bizottsagok"
                    className={getMobileSubLinkClasses(isActive("/onkormanyzat/bizottsagok"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-person-check-fill mr-2"></i>Bizottságok
                  </Link>
                  <Link
                    href="/onkormanyzat/dokumentumok"
                    className={getMobileSubLinkClasses(isActive("/onkormanyzat/dokumentumok"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-file-earmark-text-fill mr-2"></i>Dokumentumok
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Interaktív (ÚJ) */}
            <div>
              <button
                onClick={() => setMobileInteraktivOpen(!mobileInteraktivOpen)}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive("/elokozvetites") || isActive("/terkep") || isActive("/szavazasok")
                  ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-cursor-fill mr-2"></i>Interaktív
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${mobileInteraktivOpen ? "rotate-180" : "rotate-0"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {mobileInteraktivOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    href="/elokozvetites"
                    className={getMobileSubLinkClasses(isActive("/elokozvetites"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-camera-video-fill mr-2"></i>Élő közvetítés
                  </Link>
                  <Link
                    href="/terkep"
                    className={getMobileSubLinkClasses(isActive("/terkep"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-map-fill mr-2"></i>Térkép
                  </Link>
                  <Link
                    href="/szavazasok"
                    className={getMobileSubLinkClasses(isActive("/szavazasok"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-bar-chart-fill mr-2"></i>Szavazások
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Információk */}
            <div>
              <button
                onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive("/kozsegunkrol") || isActive("/tyukodkozsegert") || isActive("/ertektar")
                  ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-info-circle-fill mr-2"></i>Információk
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${mobileInfoOpen ? "rotate-180" : "rotate-0"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {mobileInfoOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    href="/kozsegunkrol"
                    className={getMobileSubLinkClasses(isActive("/kozsegunkrol"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-info-square-fill mr-2"></i>Községünkről
                  </Link>
                  <Link
                    href="/tyukodkozsegert"
                    className={getMobileSubLinkClasses(isActive("/tyukodkozsegert"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-heart-fill mr-2"></i>Tyukod Községért
                  </Link>
                  <Link
                    href="/ertektar"
                    className={getMobileSubLinkClasses(isActive("/ertektar"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-gem mr-2"></i>Tyukod Értéktára
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/kapcsolat"
              className={getMobileLinkClasses(isActive("/kapcsolat"))}
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="bi bi-envelope-fill mr-2"></i>Kapcsolat
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
