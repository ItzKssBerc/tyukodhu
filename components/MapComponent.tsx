'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapMarker {
    _id: string;
    helyszinnev: string;
    koordinata: {
        lat: number;
        lng: number;
    };
    leiras?: string;
}

export default function MapComponent({ markers = [] }: { markers?: MapMarker[] }) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersLayerRef = useRef<L.LayerGroup | null>(null);

    // Initial map setup
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const map = L.map(mapRef.current).setView([47.85280970494161, 22.55567259744638], 14);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        markersLayerRef.current = L.layerGroup().addTo(map);

        // Force a resize calculation after a short delay
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Update markers when they change
    useEffect(() => {
        const map = mapInstanceRef.current;
        const markersLayer = markersLayerRef.current;

        if (map && markersLayer) {
            markersLayer.clearLayers();

            const DefaultIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            });

            markers.forEach((marker) => {
                if (marker.koordinata?.lat && marker.koordinata?.lng) {
                    L.marker([marker.koordinata.lat, marker.koordinata.lng], { icon: DefaultIcon })
                        .addTo(markersLayer)
                        .bindPopup(`
                            <div style="font-family: inherit;">
                                <h3 style="margin: 0; font-weight: bold; color: #1c1917;">${marker.helyszinnev}</h3>
                                ${marker.leiras ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #57534e;">${marker.leiras}</p>` : ''}
                            </div>
                        `);
                }
            });
        }
    }, [markers]);

    return (
        <div className="w-full h-[600px] rounded-[2rem] overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl bg-stone-100">
            <div ref={mapRef} className="w-full h-full z-10" />
        </div>
    );
}
