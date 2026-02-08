


import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { OLDALBEALLITASOK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Carousel from "@/components/Carousel";

export default async function Home() {
  let posts: any[] = []; // Keep existing generic type usage
  let documents: any[] = []; // Keep existing generic type usage

  // Fetch Carousel Data
  const siteConfig = await client.fetch(OLDALBEALLITASOK_QUERY);
  const carouselImages = siteConfig?.fokepcarousel?.map((image: any) => urlFor(image).url()) || [];

  return (
    <>
      {/* Carousel Section */}
      <section className="w-full px-4 mb-8">
        <Carousel images={carouselImages} />
      </section>

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



        </div>
      </div>
    </>
  );
}
