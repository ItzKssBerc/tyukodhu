import Image from "next/image";
import Link from "next/link";

interface NewsCardClassicProps {
  slug: string;
  title: string;
  publishedDate: string | null;
  publishedTime: string | null; // Added publishedTime field
  featuredImage: string | null;
  category: string; // This is the display label
  categorySlug: string; // This is the raw value for the URL
}

export default function NewsCardClassic({ slug, title, publishedDate, publishedTime, featuredImage, category, categorySlug }: NewsCardClassicProps) {
  const postUrl = `/hirek/${categorySlug}/${slug}`;

  return (
    <Link href={postUrl} className="block group h-full">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
        {featuredImage ? (
          <div className="relative w-full overflow-hidden" style={{ paddingTop: '60%' /* 16:9-ish Aspect Ratio */ }}>
            <Image
              src={featuredImage}
              alt={title || "Kiemelt kép"}
              fill
              style={{ objectFit: 'cover' }}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600/90 text-white backdrop-blur-sm shadow-sm">
                {category}
              </span>
            </div>
          </div>
        ) : (
           <div className="pt-5 px-5 pb-0">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {category}
              </span>
           </div>
        )}
        
        <div className={`p-5 flex flex-col flex-grow ${!featuredImage ? 'pt-3' : ''}`}>
          
          <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-3 mb-4">
            {title}
          </h2>
          
          <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700/50">
             <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300">
               Elolvasom 
               <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </span>
             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
              {publishedDate ? `${new Date(publishedDate).toLocaleDateString('hu-HU')}` : ''}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
