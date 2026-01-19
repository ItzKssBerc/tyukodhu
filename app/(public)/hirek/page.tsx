import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import NewsClient from "@/components/NewsClient";

// Hardcoded category options from keystatic.config.ts for runtime lookup
const categoryOptions = [
  { label: 'Hírek', value: 'hirek' },
  { label: 'Közlemények', value: 'kozlemenyek' },
  { label: 'Rendezvények', value: 'rendezvenyek' },
  { label: 'Egyéb', value: 'egyeb' },
];

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewsPage({ searchParams }: PageProps) {
  const reader = createReader(process.cwd(), config);
  const posts = await reader.collections.posts.all();
  console.log("Posts found by reader.collections.posts.all():", posts);
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Hírek
      </h1>

      <NewsClient initialPosts={sortedPosts.map(post => {
        const { content, ...restEntry } = post.entry;
        return {
          ...post,
          entry: {
            ...restEntry,
            category: getCategoryLabel(restEntry.category),
            categorySlug: restEntry.category,
          }
        };
      })} categoryOptions={categoryOptions} />

    </div>
  );
}

function getCategoryLabel(value: string): string {
  const option = categoryOptions.find(opt => opt.value === value);
  return option ? option.label : value;
}
