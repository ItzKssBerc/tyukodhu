"use client";

import { useState, useMemo } from "react";

const images = [
  { src: "/images/cimer.png", alt: "Címer", album: "Címerek" },
  { src: "/images/Magyar_cimer.svg", alt: "Magyar Címer", album: "Címerek" },
  { src: "/images/european-union-svgrepo-com.svg", alt: "European Union", album: "Címerek" },
  { src: "/images/welcome/1.jpg", alt: "Üdvözlő kép 1", album: "Üdvözlő" },
  { src: "/images/welcome/2.jpg", alt: "Üdvözlő kép 2", album: "Üdvözlő" },
  { src: "/images/welcome/3.jpg", alt: "Üdvözlő kép 3", album: "Üdvözlő" },
  { src: "/images/stream/streambanner.jpg", alt: "Stream Banner", album: "Stream" },
];

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("All");

  const uniqueAlbums = useMemo(() => {
    const albums = new Set(images.map((image) => image.album));
    return ["All", ...Array.from(albums)];
  }, []);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch = image.alt
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesAlbum =
        selectedAlbum === "All" || image.album === selectedAlbum;
      return matchesSearch && matchesAlbum;
    });
  }, [searchQuery, selectedAlbum]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Galéria
      </h1>

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
        {filteredImages.map((image) => (
          <div
            key={image.src}
            className="gallery-item rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          Nincsenek találatok.
        </div>
      )}
    </div>
  );
}
