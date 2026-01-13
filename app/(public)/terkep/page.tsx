"use client";

import { useState, useEffect } from "react";
// Removed Leaflet imports and types
// import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import dynamic from "next/dynamic";

interface Location {
  id: string;
  title: string;
  address: string;
  category: string;
  googleMapsUrl: string; // Updated to use Google Maps URL directly
  description: string;
  images: string[];
}

export default function MapPage() {
  // --- State Management ---
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-center">Térképadatok betöltése...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-center text-red-500">Hiba történt az adatok betöltésekor: {error}</div>;
  }

  // Find the first location with a valid Google Maps URL to embed
  const locationToEmbed = locations.find(loc => loc.googleMapsUrl);

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

        <div className="p-4">
          {locationToEmbed ? (
            <iframe
              src={locationToEmbed.googleMapsUrl}
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={locationToEmbed.title || "Google Map Embed"}
              className="rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700"
            ></iframe>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              Nincs térkép a megjelenítéshez. Kérjük, adjon hozzá egy Google Maps beágyazási linket.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}