'use client';

import React from 'react';

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
    return (
        <div>
            <h2>News List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialPosts.map((post) => (
                    <div key={post.slug} className="border p-4 rounded shadow-sm dark:border-gray-700">
                        {post.entry.featuredImage && (
                            <img src={post.entry.featuredImage} alt={post.entry.title} className="w-full h-48 object-cover mb-4 rounded" />
                        )}
                        <h3 className="text-xl font-bold mb-2">{post.entry.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{post.entry.publishedDate}</p>
                        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 text-xs">
                            {post.entry.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
