'use client';

import React from 'react';

type PollCardProps = {
    id: string;
    question: string;
    options: string[];
    initialResults?: any;
    userVote?: number | null;
    allowChange?: boolean;
};

export default function PollCard({ id, question, options, initialResults, userVote, allowChange }: PollCardProps) {
    return (
        <div className="border p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4">{question}</h3>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer">
                        <span className="flex items-center">
                            <input
                                type="radio"
                                name={`poll-${id}`}
                                className="mr-3"
                                checked={userVote === index}
                                readOnly
                            />
                            {option}
                        </span>
                        {/* Placeholder for results bar or percentage */}
                    </div>
                ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
                Szavazás funkció jelenleg fejlesztés alatt.
            </p>
        </div>
    );
}
