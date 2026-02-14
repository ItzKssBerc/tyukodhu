'use client';

import React, { useState } from 'react';
import { urlFor } from '@/sanity/lib/image';
import SearchAndFilter from './SearchAndFilter';

type GalleryImage = {
    _id: string;
    kepcim?: string;
    album?: string;
    kep: unknown;
};
export default function GalleryClient({ images }: { images: GalleryImage[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');

    const [selectedSort, setSelectedSort] = useState('title-asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const ITEMS_PER_PAGE = 12;

    const albums = Array.from(new Set(images.map(img => img.album))).filter(Boolean);

    const sortOptions = [
        { label: "Név szerint A-Z", value: "title-asc" },
        { label: "Név szerint Z-A", value: "title-desc" },
        { label: "Album szerint A-Z", value: "album-asc" },
        { label: "Album szerint Z-A", value: "album-desc" },
    ];

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }

    const handleAlbumChange = (album: string) => {
        setSelectedAlbum(album);
        setCurrentPage(1);
    }

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

    const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedImages = filteredImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const openModal = (imgId: string) => {
        const index = filteredImages.findIndex(img => img._id === imgId);
        if (index !== -1) setSelectedIndex(index);
    };

    const closeModal = () => setSelectedIndex(null);

    const nextImage = React.useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! + 1) % filteredImages.length);
        }
    }, [selectedIndex, filteredImages.length]);

    const prevImage = React.useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
        }
    }, [selectedIndex, filteredImages.length]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedIndex, nextImage, prevImage]);

    return (
        <div>
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Keresés a galériában..."
                selectedCategory={selectedAlbum}
                onCategoryChange={handleAlbumChange}
                categories={albums.map(album => ({ value: album as string, label: album as string }))}
                categoryPlaceholder="Válasszon albumot"
                selectedSort={selectedSort}
                onSortChange={(sort) => { setSelectedSort(sort); setCurrentPage(1); }}
                sortOptions={sortOptions}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-4xl mx-auto">
                {paginatedImages.map((img) => (
                    <div
                        key={img._id}
                        className="group relative break-inside-avoid cursor-pointer"
                        onClick={() => openModal(img._id)}
                    >
                        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                            {img.kep ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                <img
                                    src={urlFor(img.kep as any).width(600).height(600).url()} // eslint-disable-line @typescript-eslint/no-explicit-any
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

            {filteredImages.length > ITEMS_PER_PAGE && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-2xl bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-sm"
                    >
                        <i className="bi bi-chevron-left text-stone-600 dark:text-stone-400"></i>
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                                if (totalPages <= 7) return true;
                                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                            })
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && (
                                        <span className="px-1 text-stone-400">...</span>
                                    )}
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === page
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-2xl bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-stone-200 dark:border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-sm"
                    >
                        <i className="bi bi-chevron-right text-stone-600 dark:text-stone-400"></i>
                    </button>
                </div>
            )}

            {filteredImages.length === 0 && (
                <div className="text-center py-24">
                    <div className="inline-block p-6 rounded-3xl bg-white/20 dark:bg-stone-900/20 mb-6">
                        <i className="bi bi-images text-4xl text-stone-300 dark:text-stone-700"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">A galéria jelenleg üres</h3>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 font-light">Próbálj más szűrőket vagy látogass vissza később.</p>
                </div>
            )}

            {/* Modal Lightbox */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 z-[60] p-4 text-white hover:text-blue-400 transition-colors text-3xl"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 md:left-8 z-[60] p-4 text-white/50 hover:text-white transition-colors text-4xl md:text-6xl"
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 md:right-8 z-[60] p-4 text-white/50 hover:text-white transition-colors text-4xl md:text-6xl"
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>

                    <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={closeModal}>
                        <div className="relative max-w-[95vw] max-h-[92vh] group shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <img
                                src={urlFor(filteredImages[selectedIndex].kep as any).url()} // eslint-disable-line @typescript-eslint/no-explicit-any
                                alt={filteredImages[selectedIndex].kepcim || "Kép részletei"}
                                className="max-w-full max-h-[92vh] object-contain"
                            />
                            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                                <h4 className="text-white font-bold text-2xl">{filteredImages[selectedIndex].kepcim || "Névtelen kép"}</h4>
                                {filteredImages[selectedIndex].album && <p className="text-white/60 text-sm uppercase tracking-widest mt-1">{filteredImages[selectedIndex].album}</p>}
                            </div>
                        </div>
                        <div className="mt-6 text-white/40 font-bold tracking-widest uppercase text-xs">
                            {selectedIndex + 1} / {filteredImages.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
