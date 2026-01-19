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
    <div className="relative h-full" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center w-full h-full outline-none text-base text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-xl whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="truncate mr-2">{formatCategoryName(selectedCategory)}</span>
        <ChevronDown
          className={`flex-shrink-0 h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full min-w-[200px] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-100 origin-top">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={`flex items-center w-full px-4 py-2.5 text-sm rounded-lg transition-colors duration-150 ${
                selectedCategory === category
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
              role="menuitem"
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
