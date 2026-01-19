'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default icon not appearing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});

// Mapping from Keystatic values to Bootstrap Icon class names
const bootstrapIconMap: Record<string, string> = {
  MapPin: 'bi-geo-alt-fill',
  Home: 'bi-house-door-fill',
  Building: 'bi-building-fill',
  Hospital: 'bi-hospital-fill',
  School: 'bi-book-fill',
  Star: 'bi-star-fill',
  Info: 'bi-info-circle-fill',
};

interface Location {
  title: string;
  address: string;
  description?: string;
  category?: string;
  markerIcon?: string;
  coordinates?: { lat: number; lng: number } | null;
}

interface GeocodedLocation extends Location {
  lat: number;
  lon: number;
}

interface MapComponentProps {
  locations: Location[];
}

const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
  console.log(`Geocoding address: "${address}"`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Tyukod.hu Map Application (info@tyukod.hu)'
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      console.log(`Geocoding success for "${address}":`, data[0].lat, data[0].lon);
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
        console.warn(`Geocoding failed (no results) for "${address}"`);
    }
  } catch (error) {
    console.error(`Geocoding error for address "${address}":`, error);
  }
  return null;
};

const createCustomIcon = (iconName: string) => {
  const iconClass = bootstrapIconMap[iconName] || 'bi-geo-alt-fill'; // Default to MapPin

  return L.divIcon({
    className: 'custom-map-marker', // This class can be used for base styling
    html: `<i class="${iconClass}" style="font-size: 28px; color: #C62828;"></i>`, // Using a strong red color
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

export default function MapComponent({ locations }: MapComponentProps) {
  const initialCenter: LatLngExpression = [47.8530348, 22.5568265]; // Tyukod, Hungary
  const initialZoom = 15;
  const maxBounds: LatLngBoundsExpression = [[47.84, 22.50], [47.88, 22.60]];

  const [geocodedMarkers, setGeocodedMarkers] = useState<GeocodedLocation[]>([]);

  useEffect(() => {
    const fetchGeocodedLocations = async () => {
      const newMarkers: GeocodedLocation[] = [];

      for (const loc of locations) {
        if (loc.coordinates && loc.coordinates.lat && loc.coordinates.lng) {
             newMarkers.push({ ...loc, lat: loc.coordinates.lat, lon: loc.coordinates.lng });
        } else {
            const coords = await geocodeAddress(loc.address);
            if (coords) {
                newMarkers.push({ ...loc, lat: coords.lat, lon: coords.lon });
            }
        }
      }
      setGeocodedMarkers(newMarkers);
    };

    if (locations && locations.length > 0) {
      fetchGeocodedLocations();
    }
  }, [locations]);

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
      dragging={true}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={true}
      attributionControl={true}
      maxBounds={maxBounds}
      maxBoundsViscosity={1.0}
      className="z-0"
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geocodedMarkers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lon]} icon={createCustomIcon(marker.markerIcon || 'MapPin')}>
          <Popup>
            <strong>{marker.title}</strong>
            {marker.description && <p>{marker.description}</p>}
            {marker.address && <p>{marker.address}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
