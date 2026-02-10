'use client';

import React from 'react';
import Dropdown from './Dropdown';

type SearchAndFilterProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    selectedCategory?: string;
    onCategoryChange?: (value: string) => void;
    categories?: { label: string; value: string }[];
    categoryPlaceholder?: string;
    className?: string;
    selectedSort?: string;
    onSortChange?: (value: string) => void;
    sortOptions?: { label: string; value: string }[];
};

export default function SearchAndFilter({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Keresés...",
    selectedCategory,
    onCategoryChange,
    categories = [],
    categoryPlaceholder = "Válasszon kategóriát",
    className = "",
    selectedSort,
    onSortChange,
    sortOptions
}: SearchAndFilterProps) {
    return (
        <div className={`mb-8 grid grid-cols-2 gap-4 max-w-4xl mx-auto ${className}`}>
            <input
                type="text"
                placeholder={searchPlaceholder}
                className="col-span-2 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:text-white outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {(onSortChange || onCategoryChange) && (
                <div className="col-span-2 flex flex-row gap-4">
                    {onSortChange && sortOptions && (
                        <div className="w-1/2 md:w-48">
                            <Dropdown
                                options={sortOptions}
                                value={selectedSort}
                                onChange={onSortChange}
                                placeholder="Rendezés"
                                className="w-full"
                            />
                        </div>
                    )}
                    {onCategoryChange && (
                        <div className="w-1/2 md:w-64">
                            <Dropdown
                                options={[
                                    { value: "", label: "Összes kategória" },
                                    ...categories
                                ]}
                                value={selectedCategory}
                                onChange={onCategoryChange}
                                placeholder={categoryPlaceholder}
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
