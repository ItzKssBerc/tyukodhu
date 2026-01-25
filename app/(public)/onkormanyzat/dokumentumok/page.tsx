import { client } from '@/tina/__generated__/client';
import DocumentsClient from "@/components/DocumentsClient";

export default async function DocumentsPage() {
  const tinaData = await client.queries.documentsConnection();
  const documents = tinaData.data.documentsConnection.edges?.map((edge) => edge?.node).filter(Boolean).map(item => ({
    slug: item?._sys.filename || '',
    entry: {
      title: item?.title || '',
      category: item?.category || '',
      description: item?.description || '',
      file: item?.file || '',
      publishedDate: item?.publishedDate,
      publishedTime: item?.publishedTime,
    }
  })) || [];
  console.log("Documents found by Tina:", documents);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Dokumentumok
      </h1>
      <DocumentsClient initialDocuments={documents} />
    </div>
  );
}
