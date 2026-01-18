"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import NewsGrid from "./NewsGrid";
import useDebounce from "@/hooks/useDebounce";
import NewsCardSkeleton from "./NewsCardSkeleton";
import SortDropdown from "./SortDropdown"; // Import SortDropdown

type Post = {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
    publishedTime: string | null; // Added publishedTime field
    featuredImage: string | null;
    category: string;
    categorySlug: string;
  };
};

interface NewsClientProps {
  initialPosts: Post[];
  categoryOptions: { label: string; value: string }[];
}

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

// Define sort options for news
const newsSortOptions = {
  'date-desc': 'Dátum (legújabb elöl)',
  'date-asc': 'Dátum (legrégebbi elöl)',
  'title-asc': 'Cím (A-Z)',
  'title-desc': 'Cím (Z-A)',
};

export default function NewsClient({
  initialPosts,
  categoryOptions,
}: NewsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<keyof typeof newsSortOptions>('date-desc'); // Add sortOrder state
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(initialPosts);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedSelectedCategory = useDebounce(selectedCategory, 300);
  const debouncedSortOrder = useDebounce(sortOrder, 300); // Debounce sortOrder

  const categories = useMemo(() => {
    const uniqueCategorySlugs = Array.from(
      new Set(initialPosts.map((post) => post.entry.categorySlug))
    );
    return ["all", ...uniqueCategorySlugs];
  }, [initialPosts]);

  useEffect(() => {
    setIsLoading(true);

    const processPosts = () => {
      let filtered = initialPosts.filter((post) => {
        const matchesCategory =
          debouncedSelectedCategory === "all" ||
          post.entry.categorySlug === debouncedSelectedCategory;
        const matchesSearch =
          debouncedSearchQuery.trim() === "" ||
          post.entry.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      // Apply sorting
      const sorted = [...filtered].sort((a, b) => {
        // Combine date and time for comparison
        const fullDateA = a.entry.publishedDate && a.entry.publishedTime ? `${a.entry.publishedDate}T${a.entry.publishedTime}:00` : null;
        const fullDateB = b.entry.publishedDate && b.entry.publishedTime ? `${b.entry.publishedDate}T${b.entry.publishedTime}:00` : null;

        // Handle null/incomplete dates: always put them at the end
        if (!fullDateA && !fullDateB) return 0; // Both null, maintain original order
        if (!fullDateA) return 1; // 'a' is null, 'b' is not, 'a' goes to end
        if (!fullDateB) return -1; // 'b' is null, 'a' is not, 'b' goes to end

        // Both dates are valid, proceed with comparison
        const dateTimeA = new Date(fullDateA).getTime();
        const dateTimeB = new Date(fullDateB).getTime();

        switch (debouncedSortOrder) {
          case 'date-asc':
            return dateTimeA - dateTimeB;
          case 'title-asc':
            return a.entry.title.localeCompare(b.entry.title, 'hu');
          case 'title-desc':
            return b.entry.title.localeCompare(a.entry.title, 'hu');
          case 'date-desc':
          default:
            return dateTimeB - dateTimeA; // Default to descending date
        }
      });
      
      setDisplayedPosts(sorted);
      setIsLoading(false);
    };

    const timer = setTimeout(processPosts, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, debouncedSelectedCategory, debouncedSortOrder, initialPosts]); // Add debouncedSortOrder to dependencies

  return (
    <div className="space-y-8">
      {/* --- Responsive Integrated Filter Bar --- */}
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 w-full h-auto md:h-14 p-2 md:p-0 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
          {/* Search Area */}
          <div className="flex items-center w-full h-12 md:h-full">
            <div className="grid place-items-center h-full w-14 text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <input
              className="h-full w-full outline-none text-base text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              id="search-news"
              placeholder="Keresés a hírek között..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="w-full md:w-px h-px md:h-8 my-1 md:my-0 bg-gray-200 dark:bg-gray-600 md:mx-2"></div>

          {/* Dropdowns Area */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2 px-0 md:pr-2">
            <div className="w-full sm:flex-1 md:flex-auto h-12">
              <CategoryDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                formatCategoryName={(cat) => formatCategoryName(cat, categoryOptions)}
              />
            </div>
            <div className="w-full sm:flex-1 md:flex-auto h-12">
              <SortDropdown
                sortOptions={newsSortOptions}
                currentSortOrder={sortOrder}
                onSelectSortOrder={(newOrder) => setSortOrder(newOrder as keyof typeof newsSortOptions)}
              />
            </div>
          </div>
        </div>
      </div>

      {initialPosts.length === 0 ? (
        <div className="text-center py-16 col-span-full">
          <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek feltöltött hírek.
          </h3>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : displayedPosts.length > 0 ? (
        <NewsGrid posts={displayedPosts} />
      ) : (
        <div className="text-center py-16 col-span-full">
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
