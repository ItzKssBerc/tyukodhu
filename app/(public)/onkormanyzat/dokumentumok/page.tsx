import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";
import DocumentsClient from "@/components/DocumentsClient";

export default async function DocumentsPage() {
  const reader = createReader(process.cwd(), config);
  const documents = await reader.collections.documents.all();
  console.log("Documents found by reader.collections.documents.all():", documents);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Dokumentumok
      </h1>
      <DocumentsClient initialDocuments={documents} />
    </div>
  );
}
