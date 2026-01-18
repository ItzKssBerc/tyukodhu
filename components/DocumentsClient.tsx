"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FileText, Download, Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import useDebounce from "@/hooks/useDebounce";
import DocumentCardSkeleton from "./DocumentCardSkeleton";

type DocumentItem = {
  slug: string;
  entry: {
    title: string;
    description: string | null;
    file: string;
    publishedDate: string | null;
    publishedTime: string | null; // Added publishedTime field
    category: string;
  };
};

const formatCategoryName = (category: string): string => {
  if (category === "all") return "Minden kategória";
  const categoryDisplayNames: { [key: string]: string } = {
    palyazatok: "Pályázatok",
    rendeletek: "Rendeletek",
    hatarozatok: "Határozatok",
    jegyzokonyvek: "Jegyzőkönyvek",
    koltsegvetes: "Költségvetés",
  };
  return categoryDisplayNames[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);
};

const sortOptions = {
  'date-desc': 'Dátum (legújabb elöl)',
  'date-asc': 'Dátum (legrégebbi elöl)',
  'title-asc': 'Cím (A-Z)',
  'title-desc': 'Cím (Z-A)',
};

export default function DocumentsClient({ initialDocuments }: { initialDocuments: DocumentItem[] }) {
  // State for immediate user input
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<keyof typeof sortOptions>('date-desc');
  
  // State for loading and final list
  const [isLoading, setIsLoading] = useState(true);
  const [displayedDocuments, setDisplayedDocuments] = useState<DocumentItem[]>(initialDocuments);

  // Debounce inputs
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedSelectedCategory = useDebounce(selectedCategory, 300);
  const debouncedSortOrder = useDebounce(sortOrder, 300);

  const categories = useMemo(() => {
    const allCategories = initialDocuments.map((doc) => doc.entry.category);
    return ["all", ...Array.from(new Set(allCategories))];
  }, [initialDocuments]);

  // Effect to handle filtering and sorting when debounced values change
  useEffect(() => {
    setIsLoading(true);

    const processDocuments = () => {
      let filtered = initialDocuments.filter((doc) => {
        const matchesCategory = debouncedSelectedCategory === "all" || doc.entry.category === debouncedSelectedCategory;
        const matchesSearch =
          debouncedSearchQuery.trim() === "" ||
          doc.entry.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          (doc.entry.description && doc.entry.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
          doc.entry.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          doc.entry.file.split("/").pop()?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      const sorted = [...filtered].sort((a, b) => {
        // Combine date and time for comparison
        const fullDateA = a.entry.publishedDate && a.entry.publishedTime ? `${a.entry.publishedDate}T${a.entry.publishedTime}:00` : null;
        const fullDateB = b.entry.publishedDate && b.entry.publishedTime ? `${b.entry.publishedDate}T${b.entry.publishedTime}:00` : null;

        console.log('--- Document Sorting Debug ---');
        console.log('A Date:', a.entry.publishedDate, 'Time:', a.entry.publishedTime, 'Full ISO A:', fullDateA);
        console.log('B Date:', b.entry.publishedDate, 'Time:', b.entry.publishedTime, 'Full ISO B:', fullDateB);
        console.log('----------------------------');
        console.log('--- Document Sorting Debug ---');
        console.log('A Date:', a.entry.publishedDate, 'Time:', a.entry.publishedTime, 'Full ISO A:', fullDateA);
        console.log('B Date:', b.entry.publishedDate, 'Time:', b.entry.publishedTime, 'Full ISO B:', fullDateB);
        console.log('----------------------------');
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
      
      setDisplayedDocuments(sorted);
      setIsLoading(false);
    };
    
    // Using a timeout to ensure skeleton is visible for a minimum duration
    const timer = setTimeout(processDocuments, 100); 

    return () => clearTimeout(timer);
    
  }, [debouncedSearchQuery, debouncedSelectedCategory, debouncedSortOrder, initialDocuments]);

  return (
    <div className="space-y-8">
      {/* --- Responsive Integrated Filter Bar --- */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 w-full h-auto md:h-14 p-2 md:p-0 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
          {/* Search Area */}
          <div className="flex items-center w-full h-12 md:h-full">
            <div className="grid place-items-center h-full w-14 text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <input
              className="h-full w-full outline-none text-base text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              id="search"
              placeholder="Keresés a dokumentumok között..."
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
                formatCategoryName={formatCategoryName}
              />
            </div>
            <div className="w-full sm:flex-1 md:flex-auto h-12">
              <SortDropdown
                sortOptions={sortOptions}
                currentSortOrder={sortOrder}
                onSelectSortOrder={(newOrder) => setSortOrder(newOrder as keyof typeof sortOptions)}
              />
            </div>
          </div>
        </div>
      </div>

      {initialDocuments.length === 0 ? (
        <div className="text-center py-16 col-span-full">
          <FileText className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek feltöltött dokumentumok.
          </h3>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <DocumentCardSkeleton key={index} />
          ))}
        </div>
      ) : displayedDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDocuments.map((doc) => (
            <div key={doc.slug} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{formatCategoryName(doc.entry.category)}</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{doc.entry.title}</h2>
                    {doc.entry.description && <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{doc.entry.description}</p>}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  {doc.entry.publishedDate ? new Date(doc.entry.publishedDate).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </p>
                {doc.entry.file && (
                  <Link href={doc.entry.file} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold transition-colors">
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
