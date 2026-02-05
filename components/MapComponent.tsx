'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// We dynamically import markercluster because it's a client-side only plugin that attaches to L
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Icons
import { Search, Navigation } from 'lucide-react';

// --- Types & Constants ---

interface Location {
  title: string;
  address: string;
  description?: string;
  category?: string;
  markerIcon?: string;
  markerColor?: string;
  coordinates?: { lat: number; lng: number } | null;
  details?: { label?: string; value?: string }[];
}

interface GeocodedLocation extends Location {
  lat: number;
  lon: number;
}

const initialCenter: L.LatLngExpression = [47.8530348, 22.5568265];
const initialZoom = 14;

const bootstrapIconMap: Record<string, string> = {
  MapPin: 'bi-geo-alt-fill',
  Home: 'bi-house-door-fill',
  Building: 'bi-building-fill',
  Hospital: 'bi-hospital-fill',
  School: 'bi-book-fill',
  Star: 'bi-star-fill',
  Info: 'bi-info-circle-fill',
  'Önkormányzat': 'bi-building-fill',
  'Kultúra': 'bi-music-note-beamed',
  'Oktatás': 'bi-book-fill',
  'Egészségügy': 'bi-hospital-fill',
  'Sport': 'bi-trophy-fill',
  'Szolgáltatás': 'bi-crosshair',
  'Szabadidő': 'bi-tree-fill',
  'Vallás': 'bi-house-heart-fill',
};

// --- Helper Functions ---

const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Tyukod.hu Map Application (info@tyukod.hu)' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  } catch (error) {
    console.error(`Geocoding error for address "${address}":`, error);
  }
  return null;
};

const createCustomIcon = (iconName: string, color: string) => {
  const iconClass = bootstrapIconMap[iconName] || 'bi-geo-alt-fill';
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<i class="${iconClass}" style="font-size: 28px; color: ${color}; text-shadow: 0 0 3px rgba(255,255,255,0.5);"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// --- Main Component ---

export default function MapComponent({ locations }: { locations: Location[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const clusterGroup = useRef<any>(null);

  const [geocodedMarkers, setGeocodedMarkers] = useState<GeocodedLocation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Minden');
  const [loading, setLoading] = useState(true);

  // 1. Categories
  const categories = useMemo(() => {
    const cats = new Set(locations.map(loc => loc.category).filter((cat): cat is string => !!cat));
    return ['Minden', ...Array.from(cats).sort()];
  }, [locations]);

  // 2. Geocoding
  useEffect(() => {
    const fetchGeocodedLocations = async () => {
      setLoading(true);
      const markerPromises = locations.map(async (loc) => {
        if (loc.coordinates?.lat && loc.coordinates?.lng) {
          return { ...loc, lat: loc.coordinates.lat, lon: loc.coordinates.lng } as GeocodedLocation;
        }
        const coords = await geocodeAddress(loc.address);
        return coords ? { ...loc, lat: coords.lat, lon: coords.lon } as GeocodedLocation : null;
      });

      const results = await Promise.all(markerPromises);
      setGeocodedMarkers(results.filter((m): m is GeocodedLocation => m !== null));
      setLoading(false);
    };
    fetchGeocodedLocations();
  }, [locations]);

  // 3. Initialize Map
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    import('leaflet.markercluster');

    const map = L.map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    leafletMap.current = map;

    // RESPONSIVE FIX: Invalidate size on window resize
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // 4. Update Markers & Clusters
  useEffect(() => {
    if (!leafletMap.current) return;

    if (!clusterGroup.current && (L as any).markerClusterGroup) {
      clusterGroup.current = (L as any).markerClusterGroup({
        maxClusterRadius: 40,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        iconCreateFunction: (cluster: any) => {
          return L.divIcon({
            html: `<div class="bg-red-600/90 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg backdrop-blur-sm border-2 border-white/50 animate-pulse-subtle">${cluster.getChildCount()}</div>`,
            className: 'custom-cluster-marker',
            iconSize: [40, 40],
          });
        }
      });
      leafletMap.current.addLayer(clusterGroup.current);
    }

    if (!clusterGroup.current) {
      const retry = setTimeout(() => {
        if ((L as any).markerClusterGroup && leafletMap.current) {
          clusterGroup.current = (L as any).markerClusterGroup();
          leafletMap.current.addLayer(clusterGroup.current);
        }
      }, 500);
      return () => clearTimeout(retry);
    }

    clusterGroup.current.clearLayers();

    const filtered = geocodedMarkers.filter(m =>
      selectedCategory === 'Minden' || m.category === selectedCategory
    );

    filtered.forEach(marker => {
      const icon = createCustomIcon(marker.markerIcon || marker.category || 'MapPin', marker.markerColor || '#C62828');

      const detailsHtml = (marker.details || []).map(detail => `
        <div class="flex items-center gap-2">
          <i class="bi bi-info-circle text-gray-400" style="font-size: 10px;"></i>
          <span class="text-[10px] text-gray-600 dark:text-gray-400">
            <span class="font-semibold">${detail.label}:</span> ${detail.value}
          </span>
        </div>
      `).join('');

      const popupHtml = `
        <div class="custom-popup-content p-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0">
              <i class="bi ${bootstrapIconMap[marker.markerIcon || marker.category || 'MapPin'] || 'bi-geo-alt-fill'}" style="color: ${marker.markerColor || '#C62828'}"></i>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white leading-tight m-0 text-[13px]">${marker.title}</h3>
          </div>
          ${marker.description ? `<p class="text-[11px] text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 leading-tight">${marker.description}</p>` : ''}
          <div class="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
             <div class="flex items-center gap-2">
              <i class="bi bi-geo-alt text-gray-400" style="font-size: 10px;"></i>
              <span class="text-[10px] text-gray-500 font-medium">${marker.address}</span>
            </div>
            ${detailsHtml}
          </div>
        </div>
      `;

      L.marker([marker.lat, marker.lon], { icon })
        .bindPopup(popupHtml, {
          className: 'premium-popup',
          maxWidth: 220,
          minWidth: 160
        })
        .addTo(clusterGroup.current);
    });
  }, [geocodedMarkers, selectedCategory]);

  const handleResetView = () => {
    leafletMap.current?.flyTo(initialCenter, initialZoom, { duration: 1.5 });
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800/50">
      {/* Map Element */}
      <div ref={mapRef} className="w-full h-full z-0" style={{ cursor: 'grab' }} />

      {/* Floating Controls - FULLY RESPONSIVE */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-[1000] pointer-events-none flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Category Filter */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-800/50 p-1 rounded-xl shadow-lg pointer-events-auto flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
            <div className="px-2 sm:px-3 flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 mr-1 flex-shrink-0 py-1">
              <Search className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden xs:inline">Szűrés</span>
            </div>
            <div className="flex gap-1 pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetView}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 p-2 sm:p-2.5 rounded-xl shadow-lg pointer-events-auto flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-gray-800 transition-all group w-fit sm:w-auto px-4"
          >
            <Navigation className="h-4 w-4 text-red-600 transition-transform group-hover:rotate-12" />
            <span className="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-200">Központ</span>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-[2000] bg-white/40 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
        </div>
      )}

      <style jsx global>{`
        .leaflet-container {
          cursor: grab !important;
          pointer-events: auto !important;
          touch-action: pan-x pan-y !important;
        }
        .leaflet-container:active {
          cursor: grabbing !important;
        }
        .premium-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .dark .premium-popup .leaflet-popup-content-wrapper {
          background: rgba(17, 24, 39, 0.85);
          border-color: rgba(75, 85, 99, 0.3);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-pulse-subtle { animation: pulse-subtle 3s infinite ease-in-out; }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
