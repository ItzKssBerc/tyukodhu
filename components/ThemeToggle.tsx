"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <span className="sr-only">Dark mode toggle</span>
      <span
        className={`pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            isDark
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in"
          }`}
          aria-hidden="true"
        >
          <i className="bi bi-sun-fill text-yellow-500 text-sm"></i>
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            isDark
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out"
          }`}
          aria-hidden="true"
        >
          <i className="bi bi-moon-stars-fill text-gray-700 text-sm"></i>
        </span>
      </span>
    </button>
  );
}
