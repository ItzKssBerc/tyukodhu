"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type CategoryDropdownProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  formatCategoryName: (category: string) => string;
};

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  formatCategoryName,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (category: string) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 bg-transparent pl-3 pr-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {formatCategoryName(selectedCategory)}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition duration-150 ease-in-out transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 rounded-xl shadow-lg origin-top-left left-0">
          <div className="rounded-xl ring-1 ring-red-300 dark:ring-red-900 ring-opacity-50 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`flex items-center w-full px-4 py-2.5 text-sm rounded-lg transition duration-150 group ${
                  selectedCategory === category
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400"
                }`}
                role="menuitem"
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
