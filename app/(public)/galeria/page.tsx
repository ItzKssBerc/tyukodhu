import { client } from "@/sanity/lib/client";
import { KEP_QUERY } from "@/sanity/lib/queries";
import GalleryClient from "@/components/GalleryClient";
import EmptyState from "@/components/EmptyState";

export default async function GalleryPage() {
  // Fetch images from Sanity
  const sanityImages = await client.fetch(KEP_QUERY);

  return (
    <div className="container mx-auto py-8 px-4 theme-transition bg-transparent">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Galéria
      </h1>
      {sanityImages.length > 0 ? (
        <GalleryClient images={sanityImages} />
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
