'use client';

import React, { useState } from 'react';

type DocumentItem = {
    slug: string;
    entry: {
        title: string;
        category: string;
        description: string;
        file: string;
        publishedDate: string;
        publishedTime: string;
    };
};

export default function DocumentsClient({ initialDocuments }: { initialDocuments: DocumentItem[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = Array.from(new Set(initialDocuments.map(doc => doc.entry.category))).filter(Boolean);

    const filteredDocs = initialDocuments.filter(doc => {
        const matchesSearch = doc.entry.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? doc.entry.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Keresés..."
                    className="border p-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border p-2 rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Összes kategória</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="space-y-4">
                {filteredDocs.map((doc) => (
                    <div key={doc.slug} className="border p-4 rounded shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{doc.entry.title}</h3>
                            <p className="text-sm text-gray-500">{doc.entry.publishedDate} {doc.entry.publishedTime} | {doc.entry.category}</p>
                        </div>
                        {doc.entry.file && (
                            <a href={doc.entry.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Letöltés
                            </a>
                        )}
                    </div>
                ))}
                {filteredDocs.length === 0 && <p className="text-gray-500">Nincs találat.</p>}
            </div>
        </div>
    );
}
