import { client } from "@/sanity/lib/client";
import { KEP_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import GalleryClient from "@/components/GalleryClient";
import EmptyState from "@/components/EmptyState";

export default async function GalleryPage() {
  // Fetch images from Sanity
  const sanityImages = await client.fetch(KEP_QUERY);

  // Map Sanity data to GalleryClient structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const galleryItems = sanityImages.map((item: any) => ({
    slug: item._id,
    entry: {
      title: item.kepcim || '',
      description: '', // Sanity schema doesn't have description yet, or assume empty
      album: item.album || 'Egyéb',
      image: item.kep ? urlFor(item.kep).url() : '',
      publishedDate: item._createdAt,
      publishedTime: null,
    }
  }));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Galéria
      </h1>
      {galleryItems.length > 0 ? (
        <GalleryClient images={galleryItems} />
      ) : (
        <EmptyState
          title="Nincsenek elérhető fotók"
          description="A galéria jelenleg üres. Kérjük, látogasson vissza később a friss felvételekért!"
          icon="bi-images"
        />
      )}
    </div>
  );
}
