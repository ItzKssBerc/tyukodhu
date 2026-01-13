import { NextResponse } from 'next/server';
import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";

export async function GET() {
  try {
    const reader = createReader(process.cwd(), config);
    const locations = await reader.collections.locations.all();

    const formattedLocations = locations.map((loc) => ({
      id: loc.slug,
      title: loc.entry.title,
      address: loc.entry.address,
      category: loc.entry.category,
      coords: [loc.entry.latitude, loc.entry.longitude],
      description: loc.entry.description,
      images: loc.entry.images.filter(img => img !== null) as string[],
    }));

    return NextResponse.json(formattedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
