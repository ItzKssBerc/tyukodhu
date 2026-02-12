"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin, Navigation, Info, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dynamically import MapComponent to ensure client-side rendering
const DynamicMapComponent = dynamic<any>(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-900 animate-pulse">
      <div className="text-stone-500">Térkép betöltése...</div>
    </div>
  ),
});

interface Location {
  _id: string;
  helyszinnev: string;
  koordinata: {
    lat: number;
    lng: number;
  };
  leiras?: { cim?: string; tartalom?: string }[];
  helyszinikon?: any;
  kategoria?: string;
}

const CATEGORIES = [
  { label: "Összes", value: "all" },
  { label: "Közintézmény", value: "kozintezmeny" },
  { label: "Bolt / Szolgáltatás", value: "bolt_szolgaltatas" },
  { label: "Kultúra / Szabadidő", value: "kultura_szabadido" },
  { label: "Vallás", value: "vallas" },
  { label: "Sport", value: "sport" },
  { label: "Egyéb", value: "egyeb" },
];

interface MapPageProps {
  locations: Location[];
}

export default function MapPage({ locations }: MapPageProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch = loc.helyszinnev.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || loc.kategoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [locations, searchQuery, selectedCategory]);

  const handleLocationClick = (loc: Location) => {
    setSelectedLocation(loc._id);
    if (mapRef.current) {
      mapRef.current.focusOnMarker(loc.koordinata.lat, loc.koordinata.lng, loc.helyszinnev);
    }
    // On mobile, we might want to scroll to map, but let's keep it simple for now
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 h-full min-h-[calc(100vh-200px)] flex flex-col">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">
          Tyukod digitális térképe
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Fedezze fel községünk fontosabb helyszíneit, intézményeit és látnivalóit.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 bg-white dark:bg-stone-900 rounded-[2rem] shadow-xl overflow-hidden border border-stone-200 dark:border-stone-800 p-2 md:p-4">

        {/* Sidebar / List area */}
        <div className="w-full md:w-80 flex flex-col h-[500px] md:h-auto border-b md:border-b-0 md:border-r border-stone-100 dark:border-stone-800 pr-0 md:pr-4">

          <div className="px-2 pt-2 space-y-4 mb-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border shrink-0",
                    selectedCategory === cat.value
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none"
                      : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-indigo-300 dark:hover:border-indigo-900"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder="Keresés..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-stone-900 dark:text-white text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-2 pb-4">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <button
                  key={loc._id}
                  onClick={() => handleLocationClick(loc)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all duration-200 group flex items-start gap-3",
                    selectedLocation === loc._id
                      ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 shadow-sm"
                      : "hover:bg-stone-50 dark:hover:bg-stone-800 border border-transparent"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl shrink-0 transition-colors",
                    selectedLocation === loc._id
                      ? "bg-indigo-600 text-white"
                      : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600"
                  )}>
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "font-bold text-sm leading-tight transition-colors",
                      selectedLocation === loc._id ? "text-indigo-900 dark:text-indigo-100" : "text-stone-800 dark:text-stone-200"
                    )}>
                      {loc.helyszinnev}
                    </h3>
                    {loc.kategoria && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mt-0.5">
                        {CATEGORIES.find(c => c.value === loc.kategoria)?.label}
                      </span>
                    )}
                    {loc.leiras && loc.leiras[0]?.tartalom && (
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1">
                        {loc.leiras[0].tartalom}
                      </p>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-stone-500 text-sm">Nincs találat</p>
              </div>
            )}
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 relative min-h-[400px] md:h-[600px] rounded-[1.5rem] overflow-hidden shadow-inner bg-stone-50 dark:bg-stone-950">
          {mounted ? (
            <DynamicMapComponent ref={mapRef} markers={locations || []} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-stone-500">Térkép betöltése...</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2d3748;
        }
      `}</style>
    </div>
  );
}
