import { client } from "@/sanity/lib/client";
import { DOKUMENTUM_QUERY } from "@/sanity/lib/queries";
import DocumentsClient from "@/components/DocumentsClient";
import EmptyState from "@/components/EmptyState";

export default async function DocumentsPage() {
  // Fetch documents from Sanity
  const sanityDocs = await client.fetch(DOKUMENTUM_QUERY);

  // Map Sanity data to DocumentsClient structure
  const documents = sanityDocs.map((item: any) => {
    const publishedDateTime = new Date(item._createdAt);
    return {
      slug: item._id,
      entry: {
        title: item.dokumentumcim || '',
        category: item.kategoria || '',
        description: '', // Desc not in schema yet
        file: item.fajlUrl || '',
        publishedDate: publishedDateTime.toISOString().split('T')[0],
        publishedTime: publishedDateTime.toTimeString().split(' ')[0].substring(0, 5),
      }
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Dokumentumok
      </h1>
      {documents.length > 0 ? (
        <DocumentsClient initialDocuments={documents} />
      ) : (
        <EmptyState
          title="Nincsenek letölthető dokumentumok"
          description="Jelenleg nincs feltöltött dokumentum ebben a szekcióban. Kérjük, látogasson vissza később!"
          icon="bi-file-earmark-text"
        />
      )}
    </div>
  );
}
