import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import NewsCard from "@/components/NewsCard"; // Import NewsCard

// Hardcoded category options from keystatic.config.ts for runtime lookup
const categoryOptions = [
  { label: 'Hírek', value: 'news' },
  { label: 'Közlemények', value: 'announcements' },
  { label: 'Rendezvények', value: 'events' },
  { label: 'Egyéb', value: 'other' },
];

function getCategoryLabel(value: string): string {
  const option = categoryOptions.find(opt => opt.value === value);
  return option ? option.label : value; // Return label if found, otherwise return the value itself
}

export default async function NewsPage() {
  const reader = createReader(process.cwd(), config);
  const posts = await reader.collections.posts.all();

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <NewsCard
              key={post.slug}
              slug={post.slug}
              title={post.entry.title}
              publishedDate={post.entry.publishedDate}
              featuredImage={post.entry.featuredImage}
              category={getCategoryLabel(post.entry.category)} // Pass the Hungarian label
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Jelenleg nincsenek megjeleníthető hírek.
          </p>
        )}
      </div>
    </div>
  );
}
