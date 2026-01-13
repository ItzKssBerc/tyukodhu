"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS import
import dynamic from "next/dynamic";

interface Location {
  id: string;
  title: string;
  address: string;
  category: string;
  coords: [number, number];
  description: string;
  images: string[];
}

export default function MapPage() {
  // --- State Management ---
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Összes kategória");
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [markers, setMarkers] = useState<LeafletMarker[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Refs ---
  const mapRef = useRef<HTMLDivElement>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);

  // --- Fetch Locations ---
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Location[] = await response.json();
        setLocations(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  // --- Derived State ---
  const uniqueCategories = useMemo(() => {
    const categories = new Set(locations.map((loc) => loc.category));
    return ["Összes kategória", ...Array.from(categories)];
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch = loc.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Összes kategória" ||
        loc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, locations]);

  // --- Map Initialization ---
  useEffect(() => {
    let isMounted = true;
    let map: LeafletMap | null = null;

    if (mapRef.current && !mapInstance) {
      import("leaflet").then((L) => {
        if (!isMounted) return;
        
        // Check if map is already initialized
        if ((mapRef.current as any)?._leaflet_id) {
            return;
        }

        LRef.current = L;
        map = L.map(mapRef.current!, {
          scrollWheelZoom: false,
          zoomControl: true,
        }).setView([47.8530348, 22.5568265], 15);

        if (map) {
          map.on("click", () => map!.scrollWheelZoom.enable());
        }
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          maxZoom: 19,
        }).addTo(map!);
        
        if (isMounted) {
            setMapInstance(map);
        } else {
            map.remove();
        }
      });
    }

    return () => {
      isMounted = false;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []); // Run only once on mount

  // --- Update Markers ---
  useEffect(() => {
    if (!mapInstance || !LRef.current || loading || error) return;

    // Clear existing markers
    markers.forEach((marker) => marker.remove());

    const newMarkers: LeafletMarker[] = [];
    const L = LRef.current;
    
    // Define a default icon for categories not explicitly listed
    const defaultIcon = L.icon({
      iconUrl: 'https://api.iconify.design/mdi:map-marker.svg?color=%23f97316', // Orange color
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const categoryIcons: { [key: string]: L.Icon } = {
        'Önkormányzat': L.icon({ iconUrl: 'https://api.iconify.design/mdi:town-hall.svg?color=%234f46e5', iconSize: [32, 32], iconAnchor: [16, 32] }),
        'Kultúra': L.icon({ iconUrl: 'https://api.iconify.design/mdi:theater.svg?color=%2316a34a', iconSize: [32, 32], iconAnchor: [16, 32] }),
        'Oktatás': L.icon({ iconUrl: 'https://api.iconify.design/mdi:school.svg?color=%2306b6d4', iconSize: [32, 32], iconAnchor: [16, 32] }),
        'Egészségügy': L.icon({ iconUrl: 'https://api.iconify.design/mdi:hospital-building.svg?color=%23dc2626', iconSize: [32, 32], iconAnchor: [16, 32] }),
        'Sport': L.icon({ iconUrl: 'https://api.iconify.design/mdi:dumbbell.svg?color=%23eab308', iconSize: [32, 32], iconAnchor: [16, 32] }),
        // Add more categories as needed
    };

    filteredLocations.forEach((loc) => {
      const icon = categoryIcons[loc.category] || defaultIcon;
      const marker = L.marker(loc.coords, { icon })
        .addTo(mapInstance)
        .on("click", () => openModal(loc));
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [filteredLocations, mapInstance, loading, error]);

  // --- Modal Logic ---
  const openModal = (location: Location) => {
    setSelectedLocation(location);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const nextImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedLocation.images.length);
    }
  };

  const prevImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedLocation.images.length) % selectedLocation.images.length);
    }
  };

  const focusLocation = (location: Location) => {
    if (mapInstance) {
      mapInstance.flyTo(location.coords, 17, { duration: 1.5 });
      setTimeout(() => openModal(location), 1600);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-center">Térképadatok betöltése...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-center text-red-500">Hiba történt az adatok betöltésekor: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg shadow-indigo-100/50 dark:shadow-none overflow-hidden border border-indigo-50 dark:border-gray-700">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-900 dark:to-indigo-800 px-6 py-6">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Tyukod digitális térképe
          </h1>
          <p className="text-indigo-100 text-sm opacity-90">
            Helyi intézmények, üzletek és közösségi terek
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 bg-indigo-50/30 dark:bg-gray-900/30 border-r border-indigo-100 dark:border-gray-700">
            <div className="p-6 border-b border-indigo-100/60 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
              <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-4">
                Keresés
              </h2>
              <input
                type="text"
                placeholder="Keresés név alapján..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 rounded-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all text-gray-900 dark:text-white"
              >
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-[400px] lg:h-[480px] overflow-y-auto divide-y divide-indigo-100/60 dark:divide-gray-700 custom-scrollbar">
              <div className="px-6 py-3 text-xs font-bold text-indigo-400 dark:text-indigo-300 uppercase tracking-widest">
                Találatok ({filteredLocations.length})
              </div>
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => focusLocation(loc)}
                  className="group mx-3 my-2 rounded-2xl p-4 cursor-pointer transition-all hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {loc.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {loc.address}
                  </div>
                  <span className="inline-block mt-3 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                    {loc.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-4">
            <div className="rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 h-full">
              <div ref={mapRef} className="h-full w-full min-h-[600px] rounded-2xl z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedLocation && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/20 backdrop-blur-sm"
            onClick={closeModal}
        >
          <div 
            className="modal-content bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedLocation.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {selectedLocation.description}
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Galéria
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedLocation.images.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`${selectedLocation.title} - ${index + 1}`}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`rounded-md w-full h-auto object-cover cursor-pointer shadow-sm ${
                          index === currentImageIndex
                            ? "ring-2 ring-indigo-500"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedLocation.images[currentImageIndex]}
                  alt="Kiemelt kép"
                  className="rounded-lg w-full h-full object-cover shadow-md aspect-square"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}