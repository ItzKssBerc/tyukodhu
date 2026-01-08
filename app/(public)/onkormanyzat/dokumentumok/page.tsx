import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Dokumentumok
      </h1>

      <div className="my-8 max-w-xl mx-auto">
        <Suspense fallback={<div>Betöltés...</div>}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Placeholder for documents list */}
      <div className="grid gap-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Jelenleg nincsenek megjeleníthető dokumentumok.
        </p>
      </div>
    </div>
  );
}
