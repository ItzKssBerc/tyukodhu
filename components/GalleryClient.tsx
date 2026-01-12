"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type GalleryItem = {
  slug: string;
  entry: {
    title: string;
    description: string | null;
    image: string; // Assuming image field directly gives the public path as a string
    publishedDate: string | null;
  };
};

export default function GalleryClient({ initialGalleryItems }: { initialGalleryItems: GalleryItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("All");

  // For now, let's assume 'album' is derived from a part of the description or title,
  // or we might need to add an album field to keystatic.config.ts if it's not dynamic.
  // For simplicity, let's create a dummy album for now.
  const uniqueAlbums = useMemo(() => {
    // This part needs adjustment if albums are to be dynamic from Keystatic data
    const albums = new Set(initialGalleryItems.map(item => item.entry.title.split(' ')[0])); // Dummy album
    return ["All", ...Array.from(albums)];
  }, [initialGalleryItems]);

  const filteredImages = useMemo(() => {
    return initialGalleryItems.filter((item) => {
      const matchesSearch =
        item.entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.entry.description && item.entry.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Dummy album matching
      const itemAlbum = item.entry.title.split(' ')[0]; // Dummy album
      const matchesAlbum = selectedAlbum === "All" || itemAlbum === selectedAlbum;
      
      return matchesSearch && matchesAlbum;
    });
  }, [searchQuery, selectedAlbum, initialGalleryItems]);


  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Keresés..."
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm w-full md:w-1/3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {uniqueAlbums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-md shadow-sm transition-colors duration-200 ${
                selectedAlbum === album
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {album}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((item) => (
            <div
              key={item.slug}
              className="gallery-item rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800"
            >
              <Image
                src={item.entry.image}
                alt={item.entry.description || "Galéria kép"}
                width={500}
                height={300}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              {item.entry.description && (
                <p className="p-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.entry.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-8">
            Nincsenek találatok.
          </div>
        )}
      </div>
    </>
  );
}