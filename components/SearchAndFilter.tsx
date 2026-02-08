'use client';

import React from 'react';
import CustomSelect from './CustomSelect';

type SearchAndFilterProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    selectedCategory?: string;
    onCategoryChange?: (value: string) => void;
    categories?: { label: string; value: string }[];
    categoryPlaceholder?: string;
    className?: string;
};

export default function SearchAndFilter({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Keresés...",
    selectedCategory,
    onCategoryChange,
    categories = [],
    categoryPlaceholder = "Válasszon kategóriát",
    className = ""
}: SearchAndFilterProps) {
    return (
        <div className={`mb-8 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto ${className}`}>
            <input
                type="text"
                placeholder={searchPlaceholder}
                className="flex-grow p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:text-white outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {onCategoryChange && (
                <div className="w-full sm:w-64">
                    <CustomSelect
                        options={[
                            { value: "", label: "Összes kategória" },
                            ...categories
                        ]}
                        value={selectedCategory}
                        onChange={onCategoryChange}
                        placeholder={categoryPlaceholder}
                        className="py-3"
                    />
                </div>
            )}
        </div>
    );
}
