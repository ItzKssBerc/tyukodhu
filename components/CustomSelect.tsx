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
};

export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800"
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
