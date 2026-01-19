// app/(public)/terkep/page.tsx (Server Component)
import { reader } from '@/keystatic/reader'; // Adjust path if necessary
import MapClientPage from './client-page'; // Import the client component

// Interface for the Keystatic entry structure
interface KeystaticLocationEntry {
  slug: string;
  entry: {
    title: string;
    // Structured address fields
    zipCode: string;
    city: string;
    streetName: string;
    streetType: string;
    houseNumber?: string;
    
    category: 'Önkormányzat' | 'Kultúra' | 'Oktatás' | 'Egészségügy' | 'Sport' | 'Egyéb';
    markerIcon: 'MapPin' | 'Home' | 'Building' | 'Hospital' | 'School' | 'Star' | 'Info';
    description: string; 
    images: readonly (string | null)[]; 
  };
}

// Interface for the simplified Location object passed to the client component
interface LocationProps {
  title: string;
  address: string;
  description?: string;
  category?: string;
  markerIcon?: string;
}

export default async function MapPage() {
  let locations: LocationProps[] = [];
  let error: string | null = null;

  try {
    // @ts-ignore - Keystatic types can be tricky
    const keystaticLocations = await reader.collections.locations.all() as unknown as KeystaticLocationEntry[];
    
    locations = keystaticLocations.map((loc) => {
        // Construct full address from parts
        const fullAddress = `${loc.entry.zipCode} ${loc.entry.city}, ${loc.entry.streetName} ${loc.entry.streetType} ${loc.entry.houseNumber || ''}`.trim();

        return {
            title: loc.entry.title,
            address: fullAddress,
            description: loc.entry.description,
            category: loc.entry.category,
            markerIcon: loc.entry.markerIcon,
        };
    });
  } catch (err: any) {
    console.error("Failed to fetch locations from Keystatic in Server Component:", err);
    error = "Hiba történt a helyszínek betöltésekor.";
  }

  // Pass the locations (or an empty array if error) to the client component
  return <MapClientPage locations={locations} />;
}
