'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

// Fix for default icon not appearing - keep here as it's directly related to Leaflet setup
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});

interface MapWrapperProps {
  center: LatLngExpression;
  zoom: number;
  maxBounds: LatLngBoundsExpression;
  children: React.ReactNode; // To pass markers etc.
}

export default function MapWrapper({ center, zoom, maxBounds, children }: MapWrapperProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
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
      {children}
    </MapContainer>
  );
}
