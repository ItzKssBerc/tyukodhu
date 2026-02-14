import { client } from "@/sanity/lib/client";
import { HIREK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import NewsClient from "@/components/NewsClient";
import EmptyState from "@/components/EmptyState";

// Hardcoded category options from keystatic.config.ts for runtime lookup
const categoryOptions: { label: string; value: string }[] = [
  { title: 'Közérdekű', value: 'kozerdeku' },
  { title: 'Önkormányzati', value: 'onkormanyzati' },
  { title: 'Kulturális', value: 'kulturalis' },
  { title: 'Sport', value: 'sport' },
  { title: 'Egyéb', value: 'egyeb' },
].map(opt => ({ label: opt.title, value: opt.value }));

interface SanityPost {
  _id: string;
  cim: string;
  hirkategoria: string;
  datum: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hirindexkep: any; // suppression or literal type needed if urlFor still complains
  slug: { current: string };
}

export default async function NewsPage() {
  // Fetch news from Sanity
  const sanityPosts: SanityPost[] = await client.fetch(HIREK_QUERY);

  // structure: { slug, entry: { title, category, publishedDate, featuredImage } }
  const posts = sanityPosts.map((post) => ({
    id: post._id,
    slug: post.slug.current,
    entry: {
      title: post.cim,
      category: post.hirkategoria,
      publishedDate: post.datum,
      featuredImage: post.hirindexkep ? urlFor(post.hirindexkep).url() : null,
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
        <NewsClient initialPosts={(() => {
          const seenSlugs = new Set();
          return sortedPosts
            .map((post: { id: string; slug: string; entry: { title: string; category: string; publishedDate: string; featuredImage: string | null } }) => ({
              ...post,
              entry: {
                ...post.entry,
                category: getCategoryLabel(post.entry.category),
                categorySlug: post.entry.category,
              }
            }))
            .filter((post: { id: string; slug: string; entry: { title: string; category: string; publishedDate: string; featuredImage: string | null } }) => {
              if (seenSlugs.has(post.slug)) {
                return false;
              }
              seenSlugs.add(post.slug);
              return true;
            });
        })()} categoryOptions={categoryOptions} />
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
