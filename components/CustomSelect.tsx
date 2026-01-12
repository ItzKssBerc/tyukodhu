"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string; // Add name prop for form submission
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Válasszon...",
  disabled = false,
  name,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* Hidden input to ensure form submission includes the value if not handled by JS directly */}
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        className={`mt-1 flex justify-between items-center w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-lg font-medium transition-shadow duration-150 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'focus:ring-amber-500 focus:border-amber-500'
        } ${value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`ml-2 h-5 w-5 transition duration-150 ease-in-out transform ${
            isOpen ? "rotate-180" : "rotate-0"
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

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  option.value === value
                    ? "bg-amber-100 dark:bg-amber-700 text-amber-900 dark:text-amber-100"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}