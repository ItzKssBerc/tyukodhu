import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  slug: string;
  title: string;
  publishedDate: string | null;
  featuredImage: string | null;
  category: string; // Add category prop
}

export default function NewsCard({ slug, title, publishedDate, featuredImage, category }: NewsCardProps) {
  // A4 ratio is approx 1:1.414. We can use padding-bottom trick or aspect-ratio utility.
  // For simplicity and good responsiveness, we'll try a fixed width and aspect-ratio inside.
  // We'll set a base width and let the aspect ratio manage height.
  // Or, more generically, just ensure content flows well within a flexible card.

  return (
    <Link href={`/hirek/${slug}`} className="block">
      <div className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
        {featuredImage && (
          <div className="relative w-full overflow-hidden rounded-t-lg" style={{ paddingTop: '75%' /* 4:3 Aspect Ratio */ }}>
            <Image
              src={featuredImage}
              alt={title || "Kiemelt kép"}
              fill // Use fill to make image cover the parent div
              style={{ objectFit: 'cover' }} // Cover the parent div
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow"> {/* Added padding here */}
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">{category}</p> {/* Render category */}
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-500 text-sm mt-auto">{publishedDate}</p> {/* mt-auto pushes date to bottom */}
        </div>
      </div>
    </Link>
  );
}