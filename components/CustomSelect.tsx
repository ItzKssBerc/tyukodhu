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
        <select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800 ${className || ''}`}
        >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
