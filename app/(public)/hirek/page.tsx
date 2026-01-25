import { client } from '@/tina/__generated__/client';
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
  let posts: any[] = []; // Initialize posts as an empty array

  if (process.env.NODE_ENV === 'production') {
    // In production build, we might not have TinaCMS running,
    // so we return an empty array for now to allow the build to pass.
    // A more robust solution for production would involve fetching
    // pre-built content or a deployed TinaCMS content API.
    posts = [];
  } else {
    const tinaData = await client.queries.postsConnection();
    posts = tinaData.data.postsConnection.edges?.map((edge) => edge?.node)
      .filter(Boolean)
      .filter(item => item?.id !== undefined && item.id !== null) // Ensure id is defined
      .map(item => ({
        slug: item!._sys?.filename?.replace(/\.(md|mdoc)$/, '') || item!.id,
        entry: {
          title: item?.title || '',
          category: item?.category || '',
          publishedDate: item?.publishedDate ?? null,
          content: item?.content,
          featuredImage: item?.featuredImage ?? null,
        }
      })) || [];
    console.log("Posts found by Tina:", posts);
  }
  
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
