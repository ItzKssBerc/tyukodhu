'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { MapPin, Plus, Minus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export interface MapMarker {
    _id: string;
    helyszinnev: string;
    koordinata: {
        lat: number;
        lng: number;
    };
    leiras?: { cim?: string; tartalom?: string }[];
    helyszinikon?: { name: string };
}

export interface MapRef {
    focusOnMarker: (lat: number, lng: number, title: string) => void;
}

export interface MapComponentProps {
    markers?: MapMarker[];
}

const MapComponent = forwardRef<MapRef, MapComponentProps>(({ markers = [] }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersLayerRef = useRef<L.LayerGroup | null>(null);
    const markersMapRef = useRef<{ [key: string]: L.Marker }>({});

    useImperativeHandle(ref, () => ({
        focusOnMarker: (lat, lng, title) => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([lat, lng], 16, { animate: true });
                const marker = markersMapRef.current[title];
                if (marker) {
                    marker.openPopup();
                }
            }
        }
    }));

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const isDarkMode = document.documentElement.classList.contains('dark');

        const map = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
        }).setView([47.85280970494161, 22.55567259744638], 14);

        mapInstanceRef.current = map;

        const lightTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });

        const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });

        if (isDarkMode) {
            darkTiles.addTo(map);
        } else {
            lightTiles.addTo(map);
        }

        markersLayerRef.current = L.layerGroup().addTo(map);

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    if (isDark) {
                        map.removeLayer(lightTiles);
                        darkTiles.addTo(map);
                    } else {
                        map.removeLayer(darkTiles);
                        lightTiles.addTo(map);
                    }
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        const timeoutId = setTimeout(() => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;
        const markersLayer = markersLayerRef.current;

        if (map && markersLayer) {
            markersLayer.clearLayers();
            markersMapRef.current = {};

            markers.forEach((marker) => {
                if (marker.koordinata?.lat && marker.koordinata?.lng) {

                    // Simple custom icon using Lucide
                    const iconName = marker.helyszinikon?.name as keyof typeof LucideIcons;
                    const IconComponent = (LucideIcons[iconName] as React.ElementType) || MapPin;

                    const iconHtml = renderToString(
                        <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-full shadow-lg border-2 border-white dark:border-stone-800 text-white flex items-center justify-center">
                            <IconComponent size={20} />
                        </div>
                    );

                    const customIcon = L.divIcon({
                        html: iconHtml,
                        className: 'custom-leaflet-icon',
                        iconSize: [36, 36],
                        iconAnchor: [18, 18],
                        popupAnchor: [0, -18],
                    });

                    const popupContent = renderToString(
                        <div className="p-1 min-w-[200px] font-sans">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white m-0 mb-2 leading-tight">
                                {marker.helyszinnev}
                            </h3>
                            {marker.leiras && marker.leiras.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    {marker.leiras.map((item, idx) => (
                                        <div key={idx} className="text-sm">
                                            {item.cim && <span className="font-semibold text-stone-700 dark:text-stone-300 block">{item.cim}</span>}
                                            {item.tartalom && <span className="text-stone-600 dark:text-stone-400">{item.tartalom}</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );

                    const leafletMarker = L.marker([marker.koordinata.lat, marker.koordinata.lng], { icon: customIcon })
                        .addTo(markersLayer)
                        .bindPopup(popupContent, {
                            className: 'custom-popup',
                            maxWidth: 300,
                        });

                    markersMapRef.current[marker.helyszinnev] = leafletMarker;
                }
            });
        }
    }, [markers]);

    return (
        <div className="w-full h-full relative group">
            {/* Custom Zoom Controls */}
            <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => {
                        if (mapInstanceRef.current) {
                            mapInstanceRef.current.zoomIn();
                        }
                    }}
                    className="w-12 h-12 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all duration-200"
                    title="Nagyítás"
                >
                    <Plus size={24} />
                </button>
                <button
                    onClick={() => {
                        if (mapInstanceRef.current) {
                            mapInstanceRef.current.zoomOut();
                        }
                    }}
                    className="w-12 h-12 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all duration-200"
                    title="Kicsinyítés"
                >
                    <Minus size={24} />
                </button>
            </div>
            <style jsx global>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    background: white;
                    color: #1c1917;
                    border-radius: 1rem;
                    padding: 0;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                }
                .dark .custom-popup .leaflet-popup-content-wrapper {
                    background: #1c1917;
                    color: #fafaf9;
                    border: 1px solid #292524;
                }
                .custom-popup .leaflet-popup-content {
                    margin: 12px;
                }
                .custom-popup .leaflet-popup-tip {
                    background: white;
                }
                .dark .custom-popup .leaflet-popup-tip {
                    background: #1c1917;
                }
                .custom-leaflet-icon {
                    background: transparent;
                    border: none;
                }
            `}</style>
            <div ref={mapRef} className="w-full h-full z-10" />
        </div>
    );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
