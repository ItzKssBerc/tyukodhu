"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Download, Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";

type DocumentItem = {
  slug: string;
  entry: {
    title: string;
    description: string | null;
    file: string;
    publishedDate: string | null;
    category: string;
  };
};

// Helper to format category names for display
const formatCategoryName = (category: string): string => {
  if (category === "all") {
    return "Minden kategória";
  }

  // A mapping for specific accent and capitalization rules
  const categoryDisplayNames: { [key: string]: string } = {
    palyazatok: "Pályázatok",
    rendeletek: "Rendeletek",
    hatarozatok: "Határozatok",
    jegyzokonyvek: "Jegyzőkönyvek",
    koltsegvetes: "Költségvetés",
  };

  // Use the mapped name if available, otherwise just capitalize the first letter
  return (
    categoryDisplayNames[category.toLowerCase()] ||
    category.charAt(0).toUpperCase() + category.slice(1)
  );
};

export default function DocumentsClient({
  initialDocuments,
}: {
  initialDocuments: DocumentItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const allCategories = initialDocuments.map((doc) => doc.entry.category);
    return ["all", ...Array.from(new Set(allCategories))];
  }, [initialDocuments]);

  const filteredDocuments = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesCategory =
        selectedCategory === "all" || doc.entry.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        doc.entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.entry.description &&
          doc.entry.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        doc.entry.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.entry.file
          .split("/")
          .pop()
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, initialDocuments]);

  return (
    <div className="space-y-8">
      {/* Combined Search and Filter Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400">
          <div className="grid place-items-center h-full w-12 text-gray-400">
            <Search className="h-5 w-5" />
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-400"
            type="text"
            id="search"
            placeholder="Keresés a dokumentumok között..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

          <div className="relative h-full flex items-center min-w-[160px] max-w-[200px] z-10">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              formatCategoryName={formatCategoryName}
            />
          </div>
        </div>
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.slug}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {formatCategoryName(doc.entry.category)}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {doc.entry.title}
                    </h2>
                    {doc.entry.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                        {doc.entry.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  {doc.entry.publishedDate
                    ? `Közzétéve: ${doc.entry.publishedDate}`
                    : ""}
                </p>
                {doc.entry.file && (
                  <Link
                    href={doc.entry.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Letöltés
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek a keresésnek megfelelő dokumentumok
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Próbáljon más keresési feltételeket megadni.
          </p>
        </div>
      )}
    </div>
  );
}
