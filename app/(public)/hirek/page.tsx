import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import NewsGrid from "@/components/NewsGrid";

// Hardcoded category options from keystatic.config.ts for runtime lookup
const categoryOptions = [
  { label: 'Hírek', value: 'hirek' },
  { label: 'Közlemények', value: 'kozlemenyek' },
  { label: 'Rendezvények', value: 'rendezvenyek' },
  { label: 'Egyéb', value: 'egyeb' },
];

function getCategoryLabel(value: string): string {
  const option = categoryOptions.find(opt => opt.value === value);
  return option ? option.label : value;
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewsPage({ searchParams }: PageProps) {
  const reader = createReader(process.cwd(), config);
  const posts = await reader.collections.posts.all();
  
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  const filteredPosts = posts.filter((post) => {
    if (!query) return true;
    
    const title = post.entry.title.toLowerCase();
    const searchLower = query.toLowerCase();
    
    // Simple inclusion check
    return title.includes(searchLower);
  });

  // Sort posts by date (newest first)
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Hírek
      </h1>

      <div className="my-8 max-w-xl mx-auto">
        <Suspense fallback={<div>Betöltés...</div>}>
          <SearchBar />
        </Suspense>
      </div>

      <NewsGrid posts={sortedPosts.map(post => {
        const { content, ...restEntry } = post.entry;
        return {
          ...post,
          entry: {
            ...restEntry,
            category: getCategoryLabel(restEntry.category),
            categorySlug: restEntry.category,
          }
        };
      })} />

    </div>
  );
}
