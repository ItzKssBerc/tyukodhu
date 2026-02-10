'use client';

import React, { useState } from 'react';
import { urlFor } from '@/sanity/lib/image';
import SearchAndFilter from './SearchAndFilter';

type GalleryImage = {
    _id: string;
    kepcim?: string;
    album?: string;
    kep: any;
};
export default function GalleryClient({ images }: { images: GalleryImage[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');

    const [selectedSort, setSelectedSort] = useState('title-asc');

    const albums = Array.from(new Set(images.map(img => img.album))).filter(Boolean);

    const sortOptions = [
        { label: "Név szerint A-Z", value: "title-asc" },
        { label: "Név szerint Z-A", value: "title-desc" },
        { label: "Album szerint A-Z", value: "album-asc" },
        { label: "Album szerint Z-A", value: "album-desc" },
    ];

    const filteredImages = (images?.filter((img) => {
        const term = searchTerm.toLowerCase();
        const matchesTitle = img.kepcim?.toLowerCase().includes(term);
        const matchesAlbumText = img.album?.toLowerCase().includes(term);
        const matchesSearch = !term || matchesTitle || matchesAlbumText;

        const matchesAlbumSelect = selectedAlbum ? img.album === selectedAlbum : true;

        return matchesSearch && matchesAlbumSelect;
    }) || []).sort((a, b) => {
        if (selectedSort === 'title-asc') {
            return (a.kepcim || "").localeCompare(b.kepcim || "", 'hu');
        }
        if (selectedSort === 'title-desc') {
            return (b.kepcim || "").localeCompare(a.kepcim || "", 'hu');
        }
        if (selectedSort === 'album-asc') {
            return (a.album || "").localeCompare(b.album || "", 'hu');
        }
        if (selectedSort === 'album-desc') {
            return (b.album || "").localeCompare(a.album || "", 'hu');
        }
        return 0;
    });

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Keresés a galériában..."
                selectedCategory={selectedAlbum}
                onCategoryChange={setSelectedAlbum}
                categories={albums.map(album => ({ value: album as string, label: album as string }))}
                categoryPlaceholder="Válasszon albumot"
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
                sortOptions={sortOptions}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredImages.map((img) => (
                    <div key={img._id} className="group relative break-inside-avoid">
                        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                            {img.kep ? (
                                <img
                                    src={urlFor(img.kep).width(600).height(600).url()}
                                    alt={img.kepcim || "Galéria kép"}
                                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-stone-400 dark:text-stone-600">
                                    <i className="bi bi-image text-4xl"></i>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <p className="text-white font-bold text-lg leading-tight truncate">{img.kepcim || "Névtelen kép"}</p>
                                {img.album && <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1 truncate">{img.album}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredImages.length === 0 && (
                <div className="text-center py-24">
                    <div className="inline-block p-6 rounded-3xl bg-stone-100 dark:bg-stone-900 mb-6">
                        <i className="bi bi-images text-4xl text-stone-300 dark:text-stone-700"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">A galéria jelenleg üres</h3>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 font-light">Próbálj más szűrőket vagy látogass vissza később.</p>
                </div>
            )}
        </div>
    );
}
