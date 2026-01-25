"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [isFocused, setIsFocused] = useState(false);

  // Simple debounce implementation inside the component
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchParams === null) return; // Add this null check
      if (query !== (searchParams.get("q") || "")) {
         if (query.trim()) {
            router.push(`/hirek?q=${encodeURIComponent(query)}`);
          } else {
            router.push("/hirek");
          }
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className={`relative group transition-all duration-300 ease-out ${isFocused ? 'scale-[1.02]' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full pl-12 pr-4 py-4 text-base border-2 rounded-2xl leading-5 bg-white/80 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 focus:bg-white shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:border-blue-400"
          placeholder="Keresés a hírek között..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFocused || query ? 'max-h-10 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          {query ? (
            <span>Keresés erre: <span className="text-blue-600 dark:text-blue-400 font-semibold">"{query}"</span></span>
          ) : (
            "Kezdjen el gépelni a kereséshez..."
          )}
        </p>
      </div>
    </div>
  );
}
