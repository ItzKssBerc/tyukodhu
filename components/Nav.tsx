"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop Dropdown States
  const [mediaOpen, setMediaOpen] = useState(false);
  const [onkormanyzatOpen, setOnkormanyzatOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Mobile Dropdown States
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const [mobileOnkormanyzatOpen, setMobileOnkormanyzatOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  // Refs for click outside
  const mediaRef = useRef<HTMLDivElement>(null);
  const onkormanyzatRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string, exact = true) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const getLinkClasses = (active: boolean) => {
    return `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition duration-150 ${
      active
        ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
    }`;
  };

  const getMobileLinkClasses = (active: boolean) => {
    return `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
      active
        ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
        : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
    }`;
  };
  
  const getMobileSubLinkClasses = (active: boolean) => {
      return `flex items-center pl-5 pr-3 py-3 rounded-md text-base font-medium transition-colors ${
        active
          ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
          : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
      }`;
    };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md py-2 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 p-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center border-2 border-gray-400 dark:border-gray-700">
                <img
                  className="max-h-full max-w-full"
                  src="/images/cimer.png"
                  alt="Tyukod Címere"
                />
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
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                      mediaOpen ? "rotate-180" : "rotate-0"
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
                  <div className="absolute z-10 mt-2 w-64 rounded-xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2">
                    <div className="rounded-xl ring-1 ring-red-300 dark:ring-red-900 ring-opacity-50 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
                      <Link
                        href="/hirek"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/hirek")
                            ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                        onClick={() => setMediaOpen(false)}
                      >
                        <i className="bi bi-newspaper mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Hírek
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/galeria"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/galeria")
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
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                      onkormanyzatOpen ? "rotate-180" : "rotate-0"
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
                  <div className="absolute z-10 mt-2 w-64 rounded-xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2">
                    <div className="rounded-xl ring-1 ring-red-300 dark:ring-red-900 ring-opacity-50 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
                      <Link
                        href="/onkormanyzat/kepviselo-testulet"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/onkormanyzat/kepviselo-testulet")
                            ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                        onClick={() => setOnkormanyzatOpen(false)}
                      >
                        <i className="bi bi-people-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Képviselő testület
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/onkormanyzat/bizottsagok"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/onkormanyzat/bizottsagok")
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
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/onkormanyzat/dokumentumok")
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

              <Link
                href="/elokozvetites"
                className={getLinkClasses(isActive("/elokozvetites"))}
              >
                <i className="bi bi-camera-video-fill mr-2"></i>Élő közvetítés
              </Link>

              {/* Információk Dropdown */}
              <div className="relative" ref={infoRef}>
                <button
                  onClick={() => setInfoOpen(!infoOpen)}
                  className={`${getLinkClasses(
                    isActive("/terkep") || isActive("/kozsegunkrol")
                  )} inline-flex focus:outline-none`}
                >
                  <i className="bi bi-info-circle-fill mr-2"></i>Információk
                  <svg
                    className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                      infoOpen ? "rotate-180" : "rotate-0"
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
                  <div className="absolute z-10 mt-2 w-64 rounded-xl shadow-2xl origin-top-center left-1/2 transform -translate-x-1/2">
                    <div className="rounded-xl ring-1 ring-red-300 dark:ring-red-900 ring-opacity-50 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
                      <Link
                        href="/kozsegunkrol"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/kozsegunkrol")
                            ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                        onClick={() => setInfoOpen(false)}
                      >
                        <i className="bi bi-info-square-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Községünkről
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                      <Link
                        href="/terkep"
                        className={`flex items-center px-4 py-3 text-base rounded-lg transition duration-150 group ${
                          isActive("/terkep")
                            ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                        onClick={() => setInfoOpen(false)}
                      >
                        <i className="bi bi-map-fill mr-3 text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"></i>
                        Térkép
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
          <div className="flex items-center">
            {/* Desktop Dark Mode Toggle */}
            <div className="hidden lg:flex items-center ml-4">
              <ThemeToggle />
            </div>

            <div className="-mr-2 flex lg:hidden items-center gap-2">
              {/* Mobile Dark Mode Toggle */}
              <ThemeToggle />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
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
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive("/hirek") || isActive("/galeria")
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-rss-fill mr-2"></i>Média
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                    mobileMediaOpen ? "rotate-180" : "rotate-0"
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
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive("/onkormanyzat", false)
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-building-fill mr-2"></i>Önkormányzat
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                    mobileOnkormanyzatOpen ? "rotate-180" : "rotate-0"
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

            <Link
              href="/elokozvetites"
              className={getMobileLinkClasses(isActive("/elokozvetites"))}
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="bi bi-camera-video-fill mr-2"></i>Élő közvetítés
            </Link>

            {/* Mobile Információk */}
            <div>
              <button
                onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive("/terkep") || isActive("/kozsegunkrol")
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                }`}
              >
                <span className="flex items-center">
                  <i className="bi bi-info-circle-fill mr-2"></i>Információk
                </span>
                <svg
                  className={`ml-1 h-5 w-5 transition duration-150 ease-in-out transform ${
                    mobileInfoOpen ? "rotate-180" : "rotate-0"
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
                    href="/terkep"
                    className={getMobileSubLinkClasses(isActive("/terkep"))}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-map-fill mr-2"></i>Térkép
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
