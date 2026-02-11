"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] bg-stone-100 dark:bg-stone-900 animate-pulse rounded-[2rem] flex items-center justify-center">
            <p className="text-stone-400">Térkép betöltése...</p>
        </div>
    )
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomeMap({ locations }: { locations: any[] }) {
    return (
        <div className="relative h-[600px] w-full">
            <MapComponent markers={locations} />
        </div>
    );
}
