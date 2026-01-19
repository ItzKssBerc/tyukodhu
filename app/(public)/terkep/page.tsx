// app/(public)/terkep/page.tsx (Server Component)
import { reader } from '@/keystatic/reader'; // Adjust path if necessary
import MapClientPage from './client-page'; // Import the client component

// Interface for the Keystatic entry structure
interface KeystaticLocationEntry {
  slug: string;
  entry: {
    title: string;
    address: string;
    category: 'Önkormányzat' | 'Kultúra' | 'Oktatás' | 'Egészségügy' | 'Sport' | 'Egyéb';
    markerIcon: 'MapPin' | 'Home' | 'Building' | 'Hospital' | 'School' | 'Star' | 'Info';
    description: string; // fields.text returns string (empty string if not set)
    images: readonly (string | null)[]; // Correct type based on Keystatic config
  };
}

// Interface for the simplified Location object passed to the client component
interface LocationProps {
  title: string;
  address: string;
  description?: string;
  category?: string;
}

export default async function MapPage() {
  let locations: LocationProps[] = [];
  let error: string | null = null;

  try {
    // @ts-ignore - Keystatic types can be tricky, casting to unknown first if needed, but interface update should fix it
    const keystaticLocations = await reader.collections.locations.all() as unknown as KeystaticLocationEntry[];
    
    locations = keystaticLocations.map((loc) => ({
      title: loc.entry.title,
      address: loc.entry.address,
      description: loc.entry.description,
      category: loc.entry.category,
    }));
  } catch (err: any) {
    console.error("Failed to fetch locations from Keystatic in Server Component:", err);
    error = "Hiba történt a helyszínek betöltésekor.";
  }

  // Pass the locations (or an empty array if error) to the client component
  return <MapClientPage locations={locations} />;
}
