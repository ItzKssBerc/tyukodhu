'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import * as LucideIcons from 'lucide-react';
import ReactDOM from 'react-dom'; // Will be used in useEffect for custom icon

const IconComponents: Record<string, React.ElementType> = {
  MapPin: LucideIcons.MapPin,
  Home: LucideIcons.Home,
  Building: LucideIcons.Building,
  Hospital: LucideIcons.Hospital,
  School: LucideIcons.School,
  Star: LucideIcons.Star,
  Info: LucideIcons.Info,
};

// Fix for default icon not appearing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});

interface Location {
  title: string;
  address: string;
  description?: string;
  category?: string;
  markerIcon?: string; // Add markerIcon field
}

interface GeocodedLocation extends Location {
  lat: number;
  lon: number;
}

interface MapComponentProps {
  locations: Location[];
}

const geocodeAddress = async (address: string): Promise<{ lat: number; lon: number } | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Tyukod.hu Map Application (info@tyukod.hu)' // IMPORTANT: Replace with your actual contact email
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error(`Geocoding error for address "${address}":`, error);
  }
  return null;
};

const createCustomIcon = (iconName: string) => {
  const IconComponent = IconComponents[iconName] || LucideIcons.MapPin; // Default to MapPin

  const iconDiv = document.createElement('div');
  // Render the Lucide icon into the created div
  ReactDOM.render(<IconComponent size={24} color="red" />, iconDiv);

  return L.divIcon({
    className: 'custom-map-marker', // Apply custom styling if needed
    html: iconDiv.innerHTML,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

export default function MapComponent({ locations }: MapComponentProps) {
  // Use hardcoded values for center and zoom
  const initialCenter: LatLngExpression = [47.8530348, 22.5568265]; // Tyukod, Hungary
  const initialZoom = 15; // A higher zoom for a locked view (more zoomed in)

    const maxBounds: LatLngBoundsExpression = [[47.84, 22.50], [47.88, 22.60]]; // Approx. bounds around Tyukod

  

    const [geocodedMarkers, setGeocodedMarkers] = useState<GeocodedLocation[]>([]);

  

    useEffect(() => {

      const fetchGeocodedLocations = async () => {

        const newMarkers: GeocodedLocation[] = [];

        for (const loc of locations) {

          const coords = await geocodeAddress(loc.address);

          if (coords) {

            newMarkers.push({ ...loc, lat: coords.lat, lon: coords.lon });

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

        maxBounds={maxBounds}          // Restrict panning

        maxBoundsViscosity={1.0}       // Make bounds hard

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
