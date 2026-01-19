"use client";

import NewsCardClassic from "./NewsCardClassic";
import {useEffect, useState} from "react";

// Assuming the post type from the page
type Post = {
    slug: string;
    entry: {
        title: string;
        publishedDate: string | null;
        publishedTime: string | null; // Added publishedTime
        featuredImage: string | null;
        category: string; // This is the display label
        categorySlug: string; // This is the raw value
    }
}

interface NewsGridProps {
    posts: Post[];
}

export default function NewsGrid({ posts }: NewsGridProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div
                        key={post.slug}
                        className={`transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <NewsCardClassic
                            slug={post.slug}
                            title={post.entry.title}
                            publishedDate={post.entry.publishedDate}
                            publishedTime={post.entry.publishedTime}
                            featuredImage={post.entry.featuredImage}
                            category={post.entry.category}
                            categorySlug={post.entry.categorySlug}
                        />
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                    Jelenleg nincsenek megjeleníthető hírek.
                </p>
            )}
        </div>
    );
}
