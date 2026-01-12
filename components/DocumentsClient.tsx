"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";

type DocumentItem = {
  slug: string;
  entry: {
    title: string;
    description: string | null;
    file: string; // Assuming file field directly gives the public path as a string
    publishedDate: string | null;
  };
};

export default function DocumentsClient({ initialDocuments }: { initialDocuments: DocumentItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesSearch =
        doc.entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.entry.description && doc.entry.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery, initialDocuments]);

  return (
    <>
      <div className="my-8 max-w-xl mx-auto">
        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.slug} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{doc.entry.title}</h2>
              {doc.entry.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {doc.entry.description}
                </p>
              )}
              {doc.entry.publishedDate && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Közzétéve: {doc.entry.publishedDate}
                </p>
              )}
              {doc.entry.file && (
                <Link
                  href={doc.entry.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Megtekintés / Letöltés
                </Link>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nincsenek találatok.
          </p>
        )}
      </div>
    </>
  );
}