'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { renderToString } from 'react-dom/server';
import { MapPin, Plus, Minus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import MapPopup from './MapPopup';

export interface MapMarker {
    _id: string;
    helyszinnev: string;
    kategoria?: string;
    koordinata: {
        lat: number;
        lng: number;
    };
    leiras?: { cim?: string; tartalom?: string }[];
    helyszinikon?: {
        name: string;
        provider?: string;
    };
}

export interface MapRef {
    focusOnMarker: (lat: number, lng: number, title: string) => void;
    resetView: () => void;
}

export interface MapComponentProps {
    markers?: MapMarker[];
}

interface IMarkerClusterGroup extends L.LayerGroup {
    refreshClusters: (clusters?: unknown) => void;
}

interface ICluster {
    getChildCount: () => number;
}

const MapComponent = forwardRef<MapRef, MapComponentProps>(({ markers = [] }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersLayerRef = useRef<IMarkerClusterGroup | null>(null);
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
        },
        resetView: () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([47.85280970494161, 22.55567259744638], 14, { animate: true });
                mapInstanceRef.current.closePopup();
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

        const LeafletWithClusters = L as unknown as { markerClusterGroup: (options: object) => IMarkerClusterGroup };

        markersLayerRef.current = LeafletWithClusters.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            zoomToBoundsOnClick: true,
            iconCreateFunction: (cluster: unknown) => {
                const count = (cluster as ICluster).getChildCount();
                return L.divIcon({
                    html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold shadow-lg border-2 border-white dark:border-stone-800">
                             ${count}
                           </div>`,
                    className: 'custom-cluster-icon',
                    iconSize: [40, 40]
                });
            }
        }).addTo(map);

        // Handle custom close button in popups
        map.on('popupopen', (e) => {
            const container = e.popup.getElement();
            if (container) {
                const closeTrigger = container.querySelector('.popup-close-trigger');
                if (closeTrigger) {
                    closeTrigger.addEventListener('click', () => {
                        map.closePopup();
                    });
                }
            }
        });

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
                    // Refresh clusters to update theme-dependent styles if any (like borders)
                    if (markersLayerRef.current) {
                        markersLayerRef.current.refreshClusters();
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
                    // Robust icon resolution
                    let IconComponent: React.ElementType = MapPin;
                    const rawName = marker.helyszinikon?.name || '';

                    type IconMap = Record<string, React.ElementType>;
                    const FaIconsMap = FaIcons as unknown as IconMap;
                    const MdIconsMap = MdIcons as unknown as IconMap;
                    const IoIconsMap = IoIcons as unknown as IconMap;
                    const LucideIconsMap = LucideIcons as unknown as IconMap;

                    if (rawName) {
                        // 1. Try exact match in provider set if available
                        const provider = marker.helyszinikon?.provider;
                        if (provider === 'fa' && FaIconsMap[rawName]) IconComponent = FaIconsMap[rawName];
                        else if (provider === 'mdi' && MdIconsMap[rawName]) IconComponent = MdIconsMap[rawName];
                        else if (provider === 'io' && IoIconsMap[rawName]) IconComponent = IoIconsMap[rawName];

                        // 2. Fallback to existing Lucide mapping if not found in specific provider
                        if (IconComponent === MapPin) {
                            let cleanedName = rawName
                                .replace(/^(Fa|Md|Lu|Ri|Bi|Hi|Si|Ti|Go|Vsc|Io|Bs|Im|Gi|Wi|Di|Ai|Fc)/, '')
                                .replace(/-/g, '');
                            cleanedName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);

                            const resolvedIcon = LucideIconsMap[cleanedName] || LucideIconsMap[rawName];
                            if (resolvedIcon) {
                                IconComponent = resolvedIcon;
                            }
                        }
                    }

                    const iconHtml = renderToString(
                        <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-full shadow-lg border-2 border-white dark:border-stone-800 text-white flex items-center justify-center">
                            <IconComponent size={20} strokeWidth={2.5} />
                        </div>
                    );

                    const customIcon = L.divIcon({
                        html: iconHtml,
                        className: 'custom-leaflet-icon',
                        iconSize: [36, 36],
                        iconAnchor: [18, 18],
                        popupAnchor: [0, -18],
                    });

                    const popupContent = renderToString(<MapPopup marker={marker} />);

                    const leafletMarker = L.marker([marker.koordinata.lat, marker.koordinata.lng], { icon: customIcon })
                        .addTo(markersLayer)
                        .bindPopup(popupContent, {
                            className: 'custom-popup',
                            maxWidth: 320,
                            minWidth: 260,
                            autoPanPadding: [20, 20],
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
                    box-shadow: none !important;
                    border: 1px solid #e7e5e4; /* stone-200 */
                }
                .custom-popup {
                    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.05));
                }
                .dark .custom-popup {
                    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));
                }
                .dark .custom-popup .leaflet-popup-content-wrapper {
                    background: #1c1917;
                    color: #fafaf9;
                    border: 1px solid #292524;
                }
                .custom-popup .leaflet-popup-content {
                    margin: 12px;
                    width: auto !important;
                    min-width: 260px !important;
                    display: block !important;
                }
                .custom-popup .leaflet-popup-tip-container {
                    margin-top: -1.5px; /* Deeper overlap */
                    z-index: 1;
                }
                .custom-popup .leaflet-popup-tip {
                    background: white;
                    box-shadow: none !important;
                    border: 1px solid #e7e5e4 !important;
                    border-top: none !important;
                    border-left: none !important;
                }
                .dark .custom-popup .leaflet-popup-tip {
                    background: #1c1917;
                    border: 1px solid #292524 !important;
                    border-top: none !important;
                    border-left: none !important;
                }
                .custom-popup .leaflet-popup-close-button {
                    display: none !important;
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
