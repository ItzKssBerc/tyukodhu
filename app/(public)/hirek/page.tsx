import { client } from "@/sanity/lib/client";
import { HIREK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import NewsClient from "@/components/NewsClient";
import EmptyState from "@/components/EmptyState";

// Hardcoded category options from keystatic.config.ts for runtime lookup
const categoryOptions = [
  { title: 'Közérdekű', value: 'kozerdeku' },
  { title: 'Önkormányzati', value: 'onkormanyzati' },
  { title: 'Kulturális', value: 'kulturalis' },
  { title: 'Sport', value: 'sport' },
  { title: 'Egyéb', value: 'egyeb' },
].map(opt => ({ label: opt.title, value: opt.value }));

export default async function NewsPage() {
  // Fetch news from Sanity
  const sanityPosts = await client.fetch(HIREK_QUERY);

  // Map Sanity data to the structure expected by NewsClient
  // structure: { slug, entry: { title, category, publishedDate, featuredImage } }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  function getCategoryLabel(value: string): string {
    const option = categoryOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl theme-transition bg-transparent">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Hírek
      </h1>

      {sortedPosts.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <NewsClient initialPosts={sortedPosts.map((post: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      ) : (
        <EmptyState
          title="Nincsenek friss hírek"
          description="Ebbe a kategóriába még nem érkeztek bejegyzések. Kérjük, nézzen vissza később a legújabb tájékoztatásokért!"
          icon="bi-megaphone"
        />
      )}
    </div>
  );
}
