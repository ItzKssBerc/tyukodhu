import { client } from "@/sanity/lib/client";
import { HIREK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
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

// Fetch news from Sanity
const sanityPosts = await client.fetch(HIREK_QUERY);

// Map Sanity data to the structure expected by NewsClient
// structure: { slug, entry: { title, category, publishedDate, featuredImage } }
const posts = sanityPosts.map((post: any) => ({
  slug: post.slug.current,
  entry: {
    title: post.cim,
    category: post.hirkategoria,
    publishedDate: post.datum,
    featuredImage: post.hirindexkep ? urlFor(post.hirindexkep).url() : null,
    // content is not strictly needed for the list view if NewsClient doesn't use it for rendering the card
  }
}));

// Sort is handled by GROQ (order(datum desc)), but we can double check or just use the array
const sortedPosts = posts;

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
