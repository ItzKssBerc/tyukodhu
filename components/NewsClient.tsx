'use client';

import React from 'react';
import CustomSelect from './CustomSelect';
import SearchAndFilter from './SearchAndFilter';

type Post = {
    slug: string;
    entry: {
        title: string;
        category: string;
        publishedDate: string;
        featuredImage: string | null;
        [key: string]: any;
    };
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

    const filteredPosts = initialPosts.filter((post) => {
        const matchesSearch = post.entry.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? post.entry.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categoryOptions}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.map((post) => (
                    <div key={post.slug} className="group bg-white dark:bg-stone-900 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col h-full">
                        <div className="relative h-56 overflow-hidden">
                            {post.entry.featuredImage ? (
                                <img
                                    src={post.entry.featuredImage}
                                    alt={post.entry.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                                    <span className="text-stone-300 dark:text-stone-700 text-5xl"><i className="bi bi-image"></i></span>
                                </div>
                            )}
                            <div className="absolute top-6 right-6 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                                {post.entry.category}
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-4">
                                <i className="bi bi-calendar3 mr-2 text-blue-600"></i>
                                {new Date(post.entry.publishedDate).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>

                            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.entry.title}
                            </h3>

                            <div className="mt-auto pt-6 border-t border-stone-100 dark:border-stone-800">
                                <a href={`/hirek/${post.entry.category}/${post.slug}`} className="inline-flex items-center text-stone-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link">
                                    Tovább olvasom
                                    <i className="bi bi-arrow-right ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-24">
                    <div className="inline-block p-6 rounded-3xl bg-stone-100 dark:bg-stone-900 mb-6">
                        <i className="bi bi-search text-4xl text-stone-300 dark:text-stone-700"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Nincs találat</h3>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 font-light">Próbálj más keresési feltételeket a híreink között.</p>
                </div>
            )}
        </div>
    );
}
