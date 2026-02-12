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
  let locations: any[] = [];

  try {
    locations = await client.fetch(HELYSZIN_QUERY);
  } catch (err: any) {
    console.error("Failed to fetch locations from Sanity in Server Component:", err);
  }

  return <MapClientPage locations={locations} />;
}
