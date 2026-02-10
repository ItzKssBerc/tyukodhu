"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
    className?: string;
    disabled?: boolean;
    label?: string; // Optional label for the dropdown
};

export default function Dropdown({
    options,
    value,
    onChange,
    placeholder = "Válasszon...",
    name,
    className = "",
    disabled = false,
    label,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string) => {
        if (disabled) return;
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div
            className={`relative ${className}`}
            ref={dropdownRef}
        >
            {label && (
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {label}
                </label>
            )}

            {/* Hidden input for form submission if name is provided */}
            {name && <input type="hidden" name={name} value={value || ""} />}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    } ${isOpen ? "ring-2 ring-blue-600 border-blue-600" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span
                    className={`block truncate ${selectedOption ? "text-stone-900 dark:text-white" : "text-stone-400 dark:text-stone-500"
                        }`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-stone-400 dark:text-stone-600 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <ul
                    className="absolute z-50 w-full mt-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl max-h-60 overflow-auto focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200"
                    role="listbox"
                >
                    {/* Optional: Add an option to clear selection if value implies filtering */}
                    {/* Note: In this project, empty value usually means "All" or "Default" */}

                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`relative cursor-pointer select-none py-3 pl-4 pr-10 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 ${option.value === value
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-stone-900 dark:text-stone-300"
                                }`}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            <span className="block truncate">{option.label}</span>
                            {option.value === value && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 dark:text-blue-400">
                                    <Check className="w-5 h-5" />
                                </span>
                            )}
                        </li>
                    ))}
                    {options.length === 0 && (
                        <li className="relative cursor-default select-none py-3 pl-4 pr-4 text-stone-500 dark:text-stone-400 italic">
                            Nincs elérhető opció
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}
