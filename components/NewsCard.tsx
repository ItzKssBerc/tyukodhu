import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  slug: string;
  title: string;
  publishedDate: string | null;
  featuredImage: string | null;
  category: string; // This is the display label
  categorySlug: string; // This is the raw value for the URL
}

export default function NewsCard({ slug, title, publishedDate, featuredImage, category, categorySlug }: NewsCardProps) {
  const postUrl = `/hirek/${categorySlug}/${slug}`;

  return (
    <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden">
      {featuredImage && (
        <Link href={postUrl} className="block overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: '75%' /* 4:3 Aspect Ratio */ }}>
            <Image
              src={featuredImage}
              alt={title || "Kiemelt kép"}
              fill
              style={{ objectFit: 'cover' }}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-amber-200 dark:text-amber-900">
            {category}
          </span>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{publishedDate}</p>
        </div>
        <Link href={postUrl} className="flex-grow">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
            {title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
