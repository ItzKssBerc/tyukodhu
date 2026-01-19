import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  slug: string;
  title: string;
  publishedDate: string | null;
  publishedTime: string | null; // Added publishedTime field
  featuredImage: string | null;
  category: string; // This is the display label
  categorySlug: string; // This is the raw value for the URL
}

export default function NewsCard({ slug, title, publishedDate, publishedTime, featuredImage, category, categorySlug }: NewsCardProps) {
  const postUrl = `/hirek/${categorySlug}/${slug}`;

  return (
    <Link href={postUrl} className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-row overflow-hidden h-24">
      {featuredImage && (
        <div className="block w-1/3 flex-shrink-0 relative h-full overflow-hidden">
          <Image
            src={featuredImage}
            alt={title || "Kiemelt kép"}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className={`p-3 flex flex-col justify-between flex-grow ${featuredImage ? 'w-2/3' : 'w-full'}`}>
        <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {publishedDate ? `${new Date(publishedDate).toLocaleDateString('hu-HU')}` : ''}
            </p>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            {category}
          </span>
        </div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
      </div>
    </Link>
  );
}
