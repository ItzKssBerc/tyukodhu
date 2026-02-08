import { client } from "@/sanity/lib/client";
import { HIR_SLUG_QUERY, HIREK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';


type PageProps = {
    params: Promise<{
        slug: string;
        category: string;
    }>
}

const categoryLabels: Record<string, string> = {
    kozerdeku: 'Közérdekű',
    onkormanyzati: 'Önkormányzati',
    kulturalis: 'Kulturális',
    sport: 'Sport',
    egyeb: 'Egyéb',
};

const categoryColors: Record<string, string> = {
    hirek: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    kozlemenyek: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    rendezvenyek: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    egyeb: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

export async function generateStaticParams() {
    const posts = await client.fetch(HIREK_QUERY);

    if (!posts) {
        return [];
    }

    return posts.map((post: any) => ({
        slug: post.slug.current,
        category: post.hirkategoria,
    }));
}

export default async function PostPage({ params }: PageProps) {
    const { slug, category } = await params;

    const sanityPost = await client.fetch(HIR_SLUG_QUERY, { slug });

    if (!sanityPost || sanityPost.hirkategoria !== category) {
        notFound();
    }

    const post = {
        title: sanityPost.cim,
        category: sanityPost.hirkategoria,
        publishedDate: sanityPost.datum,
        featuredImage: sanityPost.hirindexkep ? urlFor(sanityPost.hirindexkep).url() : null,
        content: sanityPost.hirtartalom,
    };

    const categoryLabel = categoryLabels[post.category] || post.category;
    const categoryColor = categoryColors[post.category] || categoryColors.egyeb;

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link
                    href="/hirek"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition-colors duration-200 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Vissza a hírekhez
                </Link>

                <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {post.featuredImage && (
                        <div className="relative w-full aspect-video max-h-[300px]">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
                            <h1 className="absolute bottom-6 left-6 right-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {post.title}
                            </h1>
                        </div>
                    )}

                    <div className="p-6 md:p-10 lg:p-12">
                        <header className="mb-8">
                            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-medium">
                                <span className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${categoryColor}`}>
                                    <Tag className="w-3.5 h-3.5" />
                                    {categoryLabel}
                                </span>
                                <span className="flex items-center text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-4 h-4 mr-1.5" />
                                    {post.publishedDate && new Date(post.publishedDate).toLocaleDateString('hu-HU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <hr className="border-gray-200 dark:border-gray-700" />
                        </header>

                        <div className="prose prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-xl prose-img:shadow-lg
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-ul:list-disc prose-ul:pl-6
                            prose-ol:list-decimal prose-ol:pl-6">
                            {post.content && <PortableText value={post.content} />}
                        </div>                    </div>
                </article>
            </div>
        </div>
    );
}