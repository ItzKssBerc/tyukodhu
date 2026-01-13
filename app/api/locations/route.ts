import { NextResponse } from 'next/server';
import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";

// Helper function to extract coordinates from Google Maps URL
function extractCoordinatesFromGoogleMapsUrl(url: string): [number, number] {
  let lat = 0;
  let lng = 0;

  // Regex for new Google Maps URLs (e.g., /@lat,lng,zoomz)
  const regexNew = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  let match = url.match(regexNew);
  if (match && match[1] && match[2]) {
    lat = parseFloat(match[1]);
    lng = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }

  // Regex for old Google Maps URLs or search queries (e.g., /search/?api=1&query=lat,lng)
  const regexOld = /(?:q=)(-?\d+\.?\d*)(?:%2C|,)(-?\d+\.?\d*)/;
  match = url.match(regexOld);
  if (match && match[1] && match[2]) {
    lat = parseFloat(match[1]);
    lng = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }

  // Fallback for general URLs that might just have lat,lon in the path
  const regexGeneral = /(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  match = url.match(regexGeneral);
  if (match && match[1] && match[2]) {
    lat = parseFloat(match[1]);
    lng = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }

  console.warn('Could not extract coordinates from URL:', url);
  return [0, 0]; // Default or error coordinates
}

export async function GET() {
  try {
    const reader = createReader(process.cwd(), config);
    const locations = await reader.collections.locations.all();

    const formattedLocations = locations.map((loc) => ({
      id: loc.slug,
      title: loc.entry.title,
      address: loc.entry.address,
      category: loc.entry.category,
      coords: extractCoordinatesFromGoogleMapsUrl(loc.entry.googleMapsUrl),
      description: loc.entry.description,
      images: loc.entry.images.filter(img => img !== null) as string[],
    }));

    return NextResponse.json(formattedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
