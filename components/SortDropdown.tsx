"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type SortDropdownProps = {
  sortOptions: Record<string, string>;
  currentSortOrder: string;
  onSelectSortOrder: (sortOrder: string) => void;
};

export default function SortDropdown({
  sortOptions,
  currentSortOrder,
  onSelectSortOrder,
}: SortDropdownProps) {
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

  const handleSelect = (sortOrder: string) => {
    onSelectSortOrder(sortOrder);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 bg-transparent pl-3 pr-2 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {sortOptions[currentSortOrder]}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition duration-150 ease-in-out transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 rounded-xl shadow-lg origin-top-left left-0">
          <div className="rounded-xl ring-1 ring-blue-300 dark:ring-blue-900 ring-opacity-50 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 space-y-1">
            {Object.entries(sortOptions).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition duration-150 group ${
                  currentSortOrder === key
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                role="menuitem"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
