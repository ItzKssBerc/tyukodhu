import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import GalleryClient from "@/components/GalleryClient";

export default async function GalleryPage() {
  const reader = createReader(process.cwd(), config);
  // Ensure the reader is picking up the latest schema, including 'album'
  const galleryItems = await reader.collections.images.all();
  console.log("Gallery items found by reader.collections.images.all():", galleryItems);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Galéria
      </h1>
      <GalleryClient initialGalleryItems={galleryItems} />
    </div>
  );
}
