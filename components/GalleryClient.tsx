"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import GalleryCardSkeleton from "./GalleryCardSkeleton";
import CategoryDropdown from "./CategoryDropdown"; // Can be repurposed for AlbumDropdown
import SortDropdown from "./SortDropdown";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"; // Import new icons

type GalleryItem = {
  slug: string;
  entry: {
    title: string;
    description: string | null;
    album: string | null; // Added album field
    image: string;
    publishedDate: string | null;
    publishedTime: string | null; // Added publishedTime field
  };
};

// Define sort options for gallery
const gallerySortOptions = {
  'date-desc': 'Feltöltés dátuma (legújabb elöl)',
  'date-asc': 'Feltöltés dátuma (legrégebbi elöl)',
  'title-asc': 'Cím (A-Z)',
  'title-desc': 'Cím (Z-A)',
};

export default function GalleryClient({ initialGalleryItems }: { initialGalleryItems: GalleryItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("all");
  const [sortOrder, setSortOrder] = useState<keyof typeof gallerySortOptions>('date-desc');
  const [isLoading, setIsLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>(initialGalleryItems);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedSelectedAlbum = useDebounce(selectedAlbum, 300);
  const debouncedSortOrder = useDebounce(sortOrder, 300);

  const uniqueAlbums = useMemo(() => {
    const albums = new Set(initialGalleryItems.map(item => item.entry.album || "Egyéb"));
    return ["all", ...Array.from(albums)];
  }, [initialGalleryItems]);

  // Helper for CategoryDropdown (repurposed for albums)
  const formatAlbumName = (album: string): string => {
    if (album === "all") return "Minden album";
    return album; // Albums are direct names
  };

  useEffect(() => {
    setIsLoading(true);

    const processGalleryItems = () => {
      let filtered = initialGalleryItems.filter((item) => {
        const matchesAlbum = debouncedSelectedAlbum === "all" || item.entry.album === debouncedSelectedAlbum;
        const matchesSearch =
          debouncedSearchQuery.trim() === "" ||
          item.entry.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          (item.entry.description && item.entry.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
          (item.entry.album && item.entry.album.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
        return matchesAlbum && matchesSearch;
      });

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
      
      setDisplayedItems(sorted);
      setIsLoading(false);
    };

    const timer = setTimeout(processGalleryItems, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, debouncedSelectedAlbum, debouncedSortOrder, initialGalleryItems]);

  // Modal Functions
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayedItems.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayedItems.length) % displayedItems.length);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (event.key === 'ArrowRight') {
        showNextImage();
      } else if (event.key === 'ArrowLeft') {
        showPrevImage();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, displayedItems, showNextImage, showPrevImage, closeModal]);


  const currentImage = displayedItems[currentImageIndex];

  return (
    <>
      {/* --- Integrated Responsive Filter Bar --- */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 w-full h-auto md:h-14 p-2 md:p-0 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300">
          {/* Search Area */}
          <div className="flex items-center w-full h-12 md:h-full">
            <div className="grid place-items-center h-full w-14 text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <input
              className="h-full w-full outline-none text-base text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              placeholder="Keresés a galériában..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="w-full md:w-px h-px md:h-8 my-1 md:my-0 bg-gray-200 dark:bg-gray-600 md:mx-2"></div>

          {/* Dropdowns Area */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2 px-0 md:pr-2">
            <div className="w-full sm:flex-1 md:flex-auto h-12">
              <CategoryDropdown // Repurposed for albums
                categories={uniqueAlbums}
                selectedCategory={selectedAlbum}
                onSelectCategory={setSelectedAlbum}
                formatCategoryName={formatAlbumName}
              />
            </div>
            <div className="w-full sm:flex-1 md:flex-auto h-12">
              <SortDropdown
                sortOptions={gallerySortOptions}
                currentSortOrder={sortOrder}
                onSelectSortOrder={(newOrder) => setSortOrder(newOrder as keyof typeof gallerySortOptions)}
              />
            </div>
          </div>
        </div>
      </div>

      {initialGalleryItems.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-8">
          <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek feltöltött képek.
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            A galéria jelenleg üres.
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <GalleryCardSkeleton key={index} />
          ))}
        </div>
      ) : displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedItems.map((item, index) => ( // Added index here
            <div
              key={item.slug}
              className="gallery-item rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 cursor-pointer" // Added cursor-pointer
              onClick={() => openModal(index)} // Open modal on click
            >
              <Image
                src={item.entry.image}
                alt={item.entry.description || item.entry.title || "Galéria kép"}
                width={500}
                height={300}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              {item.entry.description && (
                <p className="p-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.entry.description}
                </p>
              )}
              {item.entry.album && (
                <p className="p-2 text-xs text-gray-500 dark:text-gray-400 italic">
                  Album: {item.entry.album}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-8">
          <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Nincsenek találatok.
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Próbáljon más keresési feltételeket megadni.
          </p>
        </div>
      )}

      {/* --- Modal --- */}
      {isModalOpen && currentImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
          onClick={closeModal} // Close on overlay click
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              onClick={closeModal}
              aria-label="Bezárás"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative w-full flex-grow flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 150px)' }}> {/* Adjust max height */}
              <Image
                src={currentImage.entry.image}
                alt={currentImage.entry.description || currentImage.entry.title || "Galéria kép"}
                width={1000} // Example large width
                height={600} // Example large height, maintain aspect ratio if possible
                className="object-contain max-w-full max-h-full" // Ensure it fits the container
                priority
              />
            </div>

            {/* Navigation Buttons */}
            {displayedItems.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                  onClick={showPrevImage}
                  aria-label="Előző kép"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                  onClick={showNextImage}
                  aria-label="Következő kép"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Description */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex justify-between items-center flex-wrap gap-2">
              <div className="flex-grow">
                {currentImage.entry.title && (
                  <h4 className="font-bold text-lg">{currentImage.entry.title}</h4>
                )}
                {currentImage.entry.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentImage.entry.description}</p>
                )}
                {currentImage.entry.album && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">Album: {currentImage.entry.album}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}