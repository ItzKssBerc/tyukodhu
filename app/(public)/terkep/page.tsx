import { client } from "@/sanity/lib/client";
import { HELYSZIN_QUERY } from "@/sanity/lib/queries";
import MapClientPage from './client-page';

interface Location {
  _id: string;
  helyszinnev: string;
  koordinata: {
    lat: number;
    lng: number;
  };
  leiras?: { cim?: string; tartalom?: string }[];
  helyszinikon?: { name: string };
  kategoria?: string;
}

export default async function MapPage() {
  let locations: Location[] = [];

  try {
    locations = await client.fetch(HELYSZIN_QUERY);
  } catch (err) {
    console.error("Failed to fetch locations from Sanity in Server Component:", err);
  }

  return <MapClientPage locations={locations} />;
}
