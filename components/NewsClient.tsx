"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import NewsGrid from "./NewsGrid";

// Assuming the Post type from NewsGrid.tsx
type Post = {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
    featuredImage: string | null;
    category: string; // This is the display label
    categorySlug: string; // This is the raw value
  };
};

interface NewsClientProps {
  initialPosts: Post[];
  categoryOptions: { label: string; value: string }[];
}

// Helper to format category names for display
const formatCategoryName = (
  category: string,
  options: { label: string; value: string }[]
): string => {
  if (category === "all") {
    return "Minden kategória";
  }
  const option = options.find((opt) => opt.value === category);
  return option ? option.label : category;
};

export default function NewsClient({
  initialPosts,
  categoryOptions,
}: NewsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategorySlugs = Array.from(
      new Set(initialPosts.map((post) => post.entry.categorySlug))
    );
    // Ensure "all" is always the first option
    return ["all", ...uniqueCategorySlugs];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        post.entry.categorySlug === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.entry.title.toLowerCase().includes(searchQuery.toLowerCase());
      // Add more fields if needed, e.g., post.entry.content.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, initialPosts]);

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
            id="search-news"
            placeholder="Keresés a hírek között..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

          <div className="relative h-full flex items-center min-w-[160px] max-w-[200px]">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              formatCategoryName={(cat) => formatCategoryName(cat, categoryOptions)}
            />
          </div>
        </div>
      </div>

      <NewsGrid posts={filteredPosts} />

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek a keresésnek megfelelő hírek
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Próbáljon más keresési feltételeket megadni.
          </p>
        </div>
      )}
    </div>
  );
}
