import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.entry.title}</h2>
              <p>{post.entry.publishedDate}</p>
              {/* You might want to render content. Keystatic documents require a renderer. */}
              {/* For now, let's just show the title and date */}
            </div>
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
