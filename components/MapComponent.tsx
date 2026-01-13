"use client";

import React, { useState, useEffect } from "react";

interface Location {
  id: string;
  title: string;
  address: string;
  category: string;
  googleMapsUrl: string;
  description: string;
  images: string[];
}

interface MapComponentProps {
  locations: Location[]; // Now accepts an array of locations
  defaultGoogleMapsUrl?: string; // Still useful for fallback
}

const MapComponent: React.FC<MapComponentProps> = ({ locations, defaultGoogleMapsUrl }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>(undefined);

  // Initialize selectedLocationId with the first location, or fall back to a default if none exist
  useEffect(() => {
    if (locations.length > 0 && !selectedLocationId) {
      setSelectedLocationId(locations[0].id);
    } else if (locations.length === 0 && selectedLocationId) {
      // Clear selection if no locations are available
      setSelectedLocationId(undefined);
    }
  }, [locations, selectedLocationId]);

  const selectedLocation = selectedLocationId
    ? locations.find((loc) => loc.id === selectedLocationId)
    : undefined;

  const mapSrc = selectedLocation?.googleMapsUrl || defaultGoogleMapsUrl;
  const mapTitle = selectedLocation?.title || "Google Map Embed";

  if (!mapSrc) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Nincs térkép a megjelenítéshez. Kérjük, válasszon egy helyszínt, vagy adjon hozzá Google Maps beágyazási linket a Keystatic-ban.
      </div>
    );
  }

  return (
    <div>
      {locations.length > 0 && (
        <div className="mb-4">
          <label htmlFor="location-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Válasszon helyszínt:
          </label>
          <select
            id="location-select"
            className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all text-gray-900 dark:text-white"
            value={selectedLocationId || ''}
            onChange={(e) => setSelectedLocationId(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.title}
              </option>
            ))}
          </select>
          {selectedLocation && (
            <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedLocation.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedLocation.address}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedLocation.description}</p>
            </div>
          )}
        </div>
      )}
      <iframe
        src={mapSrc}
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={mapTitle}
        className="rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700"
      ></iframe>
    </div>
  );
};

export default MapComponent;

