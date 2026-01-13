"use client";

import { useState, useEffect } from "react";
import MapComponent from "@/components/MapComponent"; // Import the new MapComponent

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
          <MapComponent 
            locations={locations} 
            defaultGoogleMapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85689.17445677644!2d22.45029434023525!3d47.84372541947771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47387366bb00609d%3A0x3881f0c947e81ede!2sTyukod%2C%204762%20Magyarorsz%C3%A1g!5e0!3m2!1shu!2sro!4v1768303009255!5m2!1shu!2sro"
          />
        </div>
      </div>
    </div>
  );
}