import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default function NewsPage() {
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

      {/* Placeholder for news list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* News items will go here */}
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
          Jelenleg nincsenek megjeleníthető hírek.
        </p>
      </div>
    </div>
  );
}
