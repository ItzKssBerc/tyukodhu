import { client } from "@/sanity/lib/client";
import { HELYSZIN_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import MapClientPage from './client-page';

// Interface for the Tina entry structure
interface TinaLocationEntry {
  id: string; // Tina nodes usually have an id
  title: string;
  address: string;
  coordinates?: { lat: number; lng: number } | null;
  category: string; // Tina categories are strings, not necessarily fixed enums
  markerIcon: string;
  markerColor: string;
  description?: string;
  images?: { image?: string | null }[];
  details?: { label?: string; value?: string }[];
}

// Interface for the simplified Location object passed to the client component
interface LocationProps {
  title: string;
  address: string;
  description?: string;
  category?: string;
  coordinates?: { lat: number; lng: number } | null;
  markerIcon?: string;
  markerColor?: string;
  details?: { label?: string; value?: string }[];
}

export default async function MapPage() {
  let locations: LocationProps[] = [];
  let error: string | null = null;

  try {

    const sanityLocations = await client.fetch(HELYSZIN_QUERY);

    locations = sanityLocations.map((loc: any) => ({
      title: loc.helyszinnev,
      address: '', // Sanity schema doesn't have address yet? or assume coordinata is enough
      // If leiras is an array of objects {label, value}, map it.
      details: loc.leiras?.map((item: any) => ({
        label: item.cim || item.label, // Adjust based on actual schema
        value: item.tartalom || item.value
      })) || [],
      coordinates: loc.koordinata,
      markerIcon: loc.helyszinikon ? urlFor(loc.helyszinikon).url() : undefined,
      description: '', // Computed from details?
      category: 'egyeb', // Default category
    }));
  } catch (err: any) {
    console.error("Failed to fetch locations from Sanity in Server Component:", err);
    error = "Hiba történt a helyszínek betöltésekor.";
  }

  // Pass the locations (or an empty array if error) to the client component
  return <MapClientPage locations={locations} />;
}
