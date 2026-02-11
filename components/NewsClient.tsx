'use client';

import React from 'react';
import Link from 'next/link';
import SearchAndFilter from './SearchAndFilter';

type Post = {
    slug: string;
    entry: {
        title: string;
        category: string;
        categorySlug: string;
        publishedDate: string;
        featuredImage: string | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
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

    const sortOptions = [
        { label: "Legfrissebb elöl", value: "date-desc" },
        { label: "Legrégebbi elöl", value: "date-asc" },
        { label: "Név szerint A-Z", value: "title-asc" },
        { label: "Név szerint Z-A", value: "title-desc" },
    ];

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

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categoryOptions}
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
                sortOptions={sortOptions}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <Link href={`/hirek/${post.entry.categorySlug}/${post.slug}`} key={post.slug} className="group bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col h-full transform hover:-translate-y-1 block">
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
