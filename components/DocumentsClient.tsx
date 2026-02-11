'use client';

import React, { useState } from 'react';

import SearchAndFilter from './SearchAndFilter';

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

    const [selectedSort, setSelectedSort] = useState('date-desc');

    const categories = Array.from(new Set(initialDocuments.map(doc => doc.entry.category))).filter(Boolean);

    const sortOptions = [
        { label: "Legfrissebb elöl", value: "date-desc" },
        { label: "Legrégebbi elöl", value: "date-asc" },
        { label: "Név szerint A-Z", value: "title-asc" },
        { label: "Név szerint Z-A", value: "title-desc" },
    ];

    const filteredDocs = initialDocuments.filter(doc => {
        const matchesSearch = doc.entry.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? doc.entry.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (selectedSort === 'date-desc') {
            return new Date(b.entry.publishedDate).getTime() - new Date(a.entry.publishedDate).getTime();
        }
        if (selectedSort === 'date-asc') {
            return new Date(a.entry.publishedDate).getTime() - new Date(b.entry.publishedDate).getTime();
        }
        if (selectedSort === 'title-asc') {
            return a.entry.title.localeCompare(b.entry.title, 'hu');
        }
        if (selectedSort === 'title-desc') {
            return b.entry.title.localeCompare(a.entry.title, 'hu');
        }
        return 0;
    });

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Keresés a dokumentumok között..."
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories.map(cat => ({ value: cat, label: cat }))}
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
                sortOptions={sortOptions}
            />
            <div className="grid grid-cols-1 gap-4">
                {filteredDocs.map((doc) => (
                    <div key={doc.slug} className="group bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 p-6 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-stone-800/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <i className="bi bi-file-earmark-text text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-white leading-tight">{doc.entry.title}</h3>
                                <div className="flex items-center gap-2 mt-1 text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-500">
                                    <span>{doc.entry.publishedDate}</span>
                                    <span className="w-1 h-1 bg-stone-300 dark:bg-stone-700 rounded-full"></span>
                                    <span>{doc.entry.category}</span>
                                </div>
                            </div>
                        </div>
                        {doc.entry.file && (
                            <a
                                href={doc.entry.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all duration-300"
                            >
                                <i className="bi bi-download"></i>
                                <span className="hidden sm:inline">Letöltés</span>
                            </a>
                        )}
                    </div>
                ))}
                {filteredDocs.length === 0 && (
                    <div className="text-center py-16 bg-white/10 dark:bg-stone-900/20 rounded-[2rem] border border-dashed border-stone-200 dark:border-stone-800">
                        <i className="bi bi-search text-3xl text-stone-300 dark:text-stone-700 mb-3 block"></i>
                        <p className="text-stone-500 dark:text-stone-400 font-medium">Nincs a keresésnek megfelelő dokumentum.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
