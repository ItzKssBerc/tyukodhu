'use client';

import React from 'react';

type Option = {
    label: string;
    value: string;
};

type CustomSelectProps = {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
    className?: string;
    disabled?: boolean;
};

export default function CustomSelect({ options, value, onChange, placeholder, name, className, disabled }: CustomSelectProps) {
    return (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`w-full p-4 pr-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm appearance-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:text-white outline-none transition-all duration-300 disabled:opacity-50 ${className || ''}`}
            >
                <option value="">{placeholder || 'Válasszon...'}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-stone-400 dark:text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
}
