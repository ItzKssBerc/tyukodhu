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
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const categories = Array.from(new Set(initialDocuments.map(doc => doc.entry.category))).filter(Boolean);

    const sortOptions = [
        { label: "Legfrissebb elöl", value: "date-desc" },
        { label: "Legrégebbi elöl", value: "date-asc" },
        { label: "Név szerint A-Z", value: "title-asc" },
        { label: "Név szerint Z-A", value: "title-desc" },
    ];

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    }

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

    const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDocs = filteredDocs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Keresés a dokumentumok között..."
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categories={categories.map(cat => ({ value: cat, label: cat }))}
                selectedSort={selectedSort}
                onSortChange={(sort) => { setSelectedSort(sort); setCurrentPage(1); }}
                sortOptions={sortOptions}
            />
            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                {paginatedDocs.map((doc) => (
                    <a
                        key={doc.slug}
                        href={doc.entry.file || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 p-6 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex justify-between items-center cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-stone-800/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <i className="bi bi-file-earmark-text text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.entry.title}</h3>
                                <div className="flex items-center gap-2 mt-1 text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-500">
                                    <span>{doc.entry.publishedDate}</span>
                                    <span className="w-1 h-1 bg-stone-300 dark:bg-stone-700 rounded-full"></span>
                                    <span>{doc.entry.category}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-stone-300 dark:text-stone-700 group-hover:text-blue-500 transition-colors">
                            <i className="bi bi-chevron-right text-xl"></i>
                        </div>
                    </a>
                ))}

                {filteredDocs.length > ITEMS_PER_PAGE && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-3 rounded-2xl bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-sm"
                        >
                            <i className="bi bi-chevron-left text-stone-600 dark:text-stone-400"></i>
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => {
                                    if (totalPages <= 7) return true;
                                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                                })
                                .map((page, index, array) => (
                                    <React.Fragment key={page}>
                                        {index > 0 && array[index - 1] !== page - 1 && (
                                            <span className="px-1 text-stone-400">...</span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === page
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    </React.Fragment>
                                ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-2xl bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-sm"
                        >
                            <i className="bi bi-chevron-right text-stone-600 dark:text-stone-400"></i>
                        </button>
                    </div>
                )}

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
