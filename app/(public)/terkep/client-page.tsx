"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import MapComponent to ensure client-side rendering
const DynamicMapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <p>Térkép betöltése...</p>,
});

interface Location {
  title: string;
  address: string;
  description?: string;
  category?: string;
}

interface MapPageProps {
  locations: Location[];
}

export default function MapPage({ locations }: MapPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          {/* Pass only locations to DynamicMapComponent */}
          {mounted ? (
            <DynamicMapComponent locations={locations || []} />
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              Térkép betöltése...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
