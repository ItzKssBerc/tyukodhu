import Carousel from "@/components/Carousel";
import { client } from '@/tina/__generated__/client';
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

interface Post {
  slug: string;
  entry: {
    title: string;
    category: string;
    publishedDate: string | null;
    publishedTime?: string | null;
    content?: any;
    featuredImage?: string | null;
  };
}

interface Document {
  slug: string;
  entry: {
    title: string;
    category: string;
    description?: string | null;
    file: string;
    publishedDate: string | null;
    publishedTime?: string | null;
  };
}

export default async function Home() {
  const tinaPostData = await client.queries.postsConnection();
  const posts = tinaPostData.data.postsConnection.edges?.map((edge) => edge?.node).filter(Boolean).map(item => ({
    slug: item?._sys.filename || '',
    entry: {
      title: item?.title || '',
      category: item?.category || '',
      publishedDate: item?.publishedDate || null,
      publishedTime: item?.publishedTime || null,
      content: item?.content,
      featuredImage: item?.featuredImage,
    }
  })) || [];

  const latestPosts = posts
    .sort((a: Post, b: Post) => {
      const dateA = a.entry.publishedDate ? new Date(a.entry.publishedDate).getTime() : 0;
      const dateB = b.entry.publishedDate ? new Date(b.entry.publishedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  const tinaDocumentData = await client.queries.documentsConnection();
  const documents = tinaDocumentData.data.documentsConnection.edges?.map((edge) => edge?.node).filter(Boolean).map(item => ({
    slug: item?._sys.filename || '',
    entry: {
      title: item?.title || '',
      category: item?.category || '',
      description: item?.description || null,
      file: item?.file || '',
      publishedDate: item?.publishedDate || null,
      publishedTime: item?.publishedTime || null,
    }
  })) || [];

  const latestDocuments = documents
    .sort((a: Document, b: Document) => {
      const dateA = a.entry.publishedDate ? new Date(a.entry.publishedDate).getTime() : 0;
      const dateB = b.entry.publishedDate ? new Date(b.entry.publishedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  // Local mapping for post categories to avoid importing the config
  const postCategoryLabels: Record<string, string> = {
    'hirek': 'Hírek',
    'kozlemenyek': 'Közlemények',
    'rendezvenyek': 'Rendezvények',
    'egyeb': 'Egyéb',
  };


  return (
    <>
      <Carousel />

      <div className="container mx-auto mt-5 py-2 flex flex-wrap justify-center gap-4 px-4">
        <a
          href="#koszonto"
          className="group flex items-center px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold
                    bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <i className="bi bi-house-door-fill text-lg mr-2"></i>
          Köszöntő
        </a>

        <a
          href="/ertektar"
          className="group flex items-center px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold
                    bg-yellow-500 text-gray-900 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800"
        >
          <i className="bi bi-archive-fill text-lg mr-2"></i>
          Tyukod Értéktára
        </a>

        <a
          href="/tyukodkozsegert"
          className="group flex items-center px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold
                    bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-500"
        >
          <i className="bi bi-people-fill text-lg mr-2"></i>
          Tyukod Községért
        </a>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-8 py-5 mt-5 px-4">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div id="koszonto" className="max-w-5xl">
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-2">
              Hivatalos Tájékoztatás
            </p>
            <div className="text-6xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight">
              <h1 className="mt-5 mb-5">Üdvözöljük</h1>
              <span className="text-blue-600 dark:text-blue-400">
                Tyukod Nagyközség
              </span>
              <h1 className="mt-5 mb-5">hivatalos oldalán!</h1>
            </div>

            <p className="text-2xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-3xl">
              Oldalunk segítséget nyújt abban, hogy gyorsan és könnyen hozzáférjen
              községünkkel kapcsolatos{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                minden fontos információhoz
              </span>
              .
            </p>

            <div className="bg-white dark:bg-gray-800 border-t-4 border-blue-600 dark:border-blue-500 p-8 rounded-xl shadow-2xl transition-colors duration-300">
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full flex-shrink-0">
                  <i className="bi bi-shield-check-fill text-3xl text-blue-700 dark:text-blue-400"></i>
                </div>

                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    <span className="text-blue-700 dark:text-blue-400">
                      Kiemelt Újdonságok
                    </span>{" "}
                    a megújult oldalon
                  </p>

                  <ul className="space-y-3 ml-2 text-lg text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <i className="bi bi-check-circle-fill text-blue-500 dark:text-blue-400 mr-2 mt-1 flex-shrink-0"></i>
                      <div>
                        <strong>Korszerű Hírközlés:</strong> Legfrissebb, szűrt
                        helyi hírek azonnali elérése.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="bi bi-check-circle-fill text-blue-500 dark:text-blue-400 mr-2 mt-1 flex-shrink-0"></i>
                      <div>
                        <strong>Élő Közvetítések:</strong> Képviselő-testületi
                        ülések élő követése online.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="bi bi-check-circle-fill text-blue-500 dark:text-blue-400 mr-2 mt-1 flex-shrink-0"></i>
                      <div>
                        <strong>Interaktív Térkép:</strong> Minden intézmény és
                        fontos helyszín egy kattintásra.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Legújabb dokumentumok
          </h3>
          {latestDocuments.length > 0 ? (
            <ul className="space-y-2">
              {latestDocuments.map((doc: Document) => (
                <li key={doc.slug}>
                  <Link
                    href={doc.entry.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                                {doc.entry.title} ({doc.entry.publishedDate ? new Date(doc.entry.publishedDate).toLocaleDateString('hu-HU') : 'N/A'})
                              </Link>
                            </li>
                          ))}
                        </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">Nincsenek feltöltött dokumentumok.</p>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Friss hírek
            </h3>
            {latestPosts.length > 0 ? (
              <div className="space-y-4">
                {latestPosts.map((post: Post) => (
                  <NewsCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.entry.title}
                    publishedDate={post.entry.publishedDate}
                    publishedTime={post.entry.publishedTime}
                    featuredImage={post.entry.featuredImage}
                    category={postCategoryLabels[post.entry.category] || post.entry.category}
                    categorySlug={post.entry.category}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">Nincsenek feltöltött hírek.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
