import { client } from '@/tina/__generated__/client';
import GalleryClient from "@/components/GalleryClient";

export default async function GalleryPage() {
  const tinaData = await client.queries.imagesConnection();
  const galleryItems = tinaData.data.imagesConnection.edges?.map(
    (edge) => edge?.node
  ).filter(Boolean).map(item => ({
    slug: item?.id, // Use Tina's id as slug
    entry: {
      title: item?.title || '',
      description: item?.description || '',
      album: item?.album || '',
      image: item?.image || '',
      publishedDate: item?.publishedDate,
      publishedTime: item?.publishedTime,
    }
  })) || [];
  console.log("Gallery items found by Tina:", galleryItems);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Galéria
      </h1>
      <GalleryClient initialGalleryItems={galleryItems} />
    </div>
  );
}
