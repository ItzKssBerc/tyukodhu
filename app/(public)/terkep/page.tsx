import { client } from "@/sanity/lib/client";
import { HELYSZIN_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import MapClientPage from './client-page';

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

  try {
    const sanityLocations = await client.fetch(HELYSZIN_QUERY);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locations = sanityLocations.map((loc: any) => ({
      title: loc.helyszinnev,
      address: '', // Sanity schema doesn't have address yet? or assume coordinata is enough
      // If leiras is an array of objects {label, value}, map it.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      details: loc.leiras?.map((item: any) => ({
        label: item.cim || item.label, // Adjust based on actual schema
        value: item.tartalom || item.value
      })) || [],
      coordinates: loc.koordinata,
      markerIcon: loc.helyszinikon ? urlFor(loc.helyszinikon).url() : undefined,
      description: '', // Computed from details?
      category: 'egyeb', // Default category
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed to fetch locations from Sanity in Server Component:", err);
  }

  // Pass the locations (or an empty array if error) to the client component
  return <MapClientPage locations={locations} />;
}
