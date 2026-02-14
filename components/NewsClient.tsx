'use client';

import React from 'react';
import Link from 'next/link';
import SearchAndFilter from './SearchAndFilter';

type Post = {
    id: string;
    slug: string;
    entry: {
        title: string;
        category: string;
        categorySlug: string;
        publishedDate: string;
        featuredImage: string | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: unknown;
    };
    // Index signature for dynamic properties if needed
    [key: string]: unknown;
};

type CategoryOption = {
    label: string;
    value: string;
};

type NewsClientProps = {
    initialPosts: Post[];
    categoryOptions: CategoryOption[];
};

export default function NewsClient({ initialPosts, categoryOptions }: NewsClientProps) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [selectedSort, setSelectedSort] = React.useState('date-desc');
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 9;

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

    const filteredPosts = initialPosts.filter((post) => {
        const matchesSearch = post.entry.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? post.entry.categorySlug === selectedCategory : true;
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

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categories={categoryOptions}
                selectedSort={selectedSort}
                onSortChange={(sort) => { setSelectedSort(sort); setCurrentPage(1); }}
                sortOptions={sortOptions}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                    <Link href={`/hirek/${post.entry.categorySlug}/${post.slug}`} key={post.id} className="group bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col h-full transform hover:-translate-y-1 block">
                        <div className="relative h-48 overflow-hidden">
                            {post.entry.featuredImage ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={post.entry.featuredImage}
                                    alt={post.entry.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-stone-100/50 dark:bg-stone-800/50 flex items-center justify-center">
                                    <span className="text-stone-300 dark:text-stone-700 text-5xl"><i className="bi bi-image"></i></span>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                                {post.entry.category}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-3">
                                <i className="bi bi-calendar3 mr-2 text-blue-600 text-[10px]"></i>
                                {new Date(post.entry.publishedDate).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>


                            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.entry.title}
                            </h3>

                            <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
                                <span className="inline-flex items-center text-stone-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                                    Tovább olvasom
                                    <i className="bi bi-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredPosts.length > ITEMS_PER_PAGE && (
                <div className="mt-12 flex justify-center items-center gap-2">
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

            {filteredPosts.length === 0 && (
                <div className="text-center py-24">
                    <div className="inline-block p-6 rounded-3xl bg-white/20 dark:bg-stone-900/20 mb-6">
                        <i className="bi bi-search text-4xl text-stone-300 dark:text-stone-700"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Nincs találat</h3>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 font-light">Próbálj más keresési feltételeket a híreink között.</p>
                </div>
            )}
        </div>
    );
}
