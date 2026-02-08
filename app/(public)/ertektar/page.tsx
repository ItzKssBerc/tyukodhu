import EmptyState from "@/components/EmptyState";

export default function ErtektarPage() {
  const committeeMembers = [
    { name: "Farkas Ferencné", address: "4762 Tyukod, Ady Endre utca 34." },
    { name: "Tóthné Gorgyán Aliz", address: "4762 Tyukod, Kossuth utca 83." },
    { name: "Rácz Zsigmondné", address: "4762 Tyukod, Árpád út 71." },
    { name: "Lakatosné Varjasi Zsuzsa", address: "4762 Tyukod, Kis utca 24/B" },
    { name: "Kerezsi Józsefné", address: "4762 Tyukod, Rákóczi utca 62." },
  ];

  const relatedDocuments = [
    { name: "Tyukodi Értéktár Szervezeti és Működési Szabályzata", url: "/tyukodertektara/kapcsolododokumentumok/Értéktár szmsz 1.pdf" },
    { name: "Határozat", url: "/tyukodertektara/kapcsolododokumentumok/határozat.pdf" },
    { name: "Kivonat", url: "/tyukodertektara/kapcsolododokumentumok/kivonat.pdf" },
  ];

  const documentLinks = [
    { name: "Tyukodi Református templom", url: "/tyukodertektara/1. tyukodi református templom.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/1. tyukodi református templom.pdf" },
    { name: "Uray kastély", url: "/tyukodertektara/2. uray kastély.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/2. uray kastély.pdf" },
    { name: "Szalay ház-parasztház", url: "/tyukodertektara/3. szalay ház.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/3. szalay ház.pdf" },
    { name: "Tyukodi gyékényfonás", url: "/tyukodertektara/4. tyukodi gyékényfonás.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/4. tyukodi gyékényfonás.pdf" },
    { name: "Ezüst úrasztali pohár", url: "/tyukodertektara/5. ezüst Úr asztala pohár .pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/5. ezüst Úr asztala pohár .pdf" },
    { name: "Úrhimzéses úrasztali terítők", url: "/tyukodertektara/6. Úrihimzéses Úrasztali terítők.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/6. Úrihimzéses Úrasztali terítők.pdf" },
    { name: "Nyomott mintás úrasztali terítő", url: "/tyukodertektara/7. nyomott mintás Úrasztali terítő .pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/7. nyomott mintás Úrasztali terítő .pdf" },
    { name: "Úrasztali réz borgyűjtő kanna", url: "/tyukodertektara/8. Úrasztali réz borgyüjtő kanna.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/8. Úrasztali réz borgyüjtő kanna.pdf" },
    { name: "Kenyérosztó óntál", url: "/tyukodertektara/9. kenyérosztó ón tál.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/9. kenyérosztó ón tál.pdf" },
    { name: "Ezüst kenyérosztó tál", url: "/tyukodertektara/10. ezüst kenyérosztó tál.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/10. ezüst kenyérosztó tál.pdf" },
    { name: "Urvacsorai terítő 1878-ból", url: "/tyukodertektara/11. Úrvacsorai terítő 1878.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/11. Úrvacsorai terítő 1878.pdf" },
    { name: "Tatárjáráskori kincslelet Tyukod Bagolyvárról", url: "/tyukodertektara/12. tatárjáráskori kincslelet tyukod bagolyvár.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/12. tatárjáráskori kincslelet tyukod bagolyvár.pdf" },
    { name: "Szalay család temetkezési helye", url: "/tyukodertektara/13. szalay család temetkezési hely.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/13. szalay család temetkezési hely.pdf" },
    { name: "A Hősök tere I. és II. világháborús emlékműve", url: "/tyukodertektara/14. a hősök tere i. és ii. világháborús.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/14. a hősök tere i. és ii. világháborús.pdf" },
    { name: "Tyukod-1181-es említésének emlékműve", url: "/tyukodertektara/15. tyukod 1181-es említésének emlékműve.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/15. tyukod 1181-es említésének emlékműve.pdf" },
    { name: "A hortobágyi kitelepítettek emlékműve", url: "/tyukodertektara/16. a hortobágyi kitelepitettek emlékműve.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/16. a hortobágyi kitelepitettek emlékműve.pdf" },
    { name: "Dózsa György mellszobra", url: "/tyukodertektara/17. dózsa györgy mellszobra.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/17. dózsa györgy mellszobra.pdf" },
    { name: "Tyukodi táncok Kulturális érték", url: "/tyukodertektara/18. tyukodi táncok kulturális érték.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/18. tyukodi táncok kulturális érték.pdf" },
    { name: "Ezüst úrvacsorai kehely", url: "/tyukodertektara/19. ezüst úrvacsorai kehely .pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/19. ezüst úrvacsorai kehely .pdf" },
    { name: "Dr. Szalay Zsigmond helytörténeti kiállítás", url: "/tyukodertektara/20. dr. szalay zsigmond helytörténeti kiállítás.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/20. dr. szalay zsigmond helytörténeti kiállítás.pdf" },
    { name: "Dr. Szalay Zsigmond helytörténeti gyűjtemény", url: "/tyukodertektara/21. dr. szalay zsigmond helytörténeti gyüjtemény.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/21. dr. szalay zsigmond helytörténeti gyüjtemény.pdf" },
    { name: "Kossuth Lajos mellszobra", url: "/tyukodertektara/22. kossuth lajos mellszobra.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/22. kossuth lajos mellszobra.pdf" },
    { name: "Kádár József síremléke", url: "/tyukodertektara/23. kádár józsef síremléke.pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/23. kádár józsef síremléke.pdf" },
    { name: "Dr. Szalay Zsigmond: Tyukod története és néprajza", url: "/tyukodertektara/24.  dr. szalay zsigmondtyukodtyukod története és néprajza .pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/24.  dr. szalay zsigmondtyukodtyukod története és néprajza .pdf" },
    { name: "P. Szalay Emőke - Szalay Csilla: Tartozunk a múltnak c. kiadvány", url: "/tyukodertektara/25. p. szalay emöke-szalay csilla tartozunk a múltnak c. kiadvány .pdf", relatedUrl: "/tyukodertektara/kapcsolododokumentumok/25. p. szalay emöke-szalay csilla tartozunk a múltnak c. kiadvány .pdf" },
  ];



  return (

    <div className="container mx-auto px-4 py-8">

      <div className="mt-15 mb-12 text-center">

        <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-500 mb-4 tracking-tight">

          Tyukod Értéktára

        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">

          Tisztelt Tyukodiak! Kedves Tyukodról Elszármazottak!

        </p>

        <div className="bg-green-50 dark:bg-green-900/20 border-t-4 border-b-4 border-green-600 dark:border-green-500 p-6 my-8 text-left shadow-lg rounded-lg">

          <p className="text-gray-800 dark:text-gray-200 text-lg">

            🌟 A{" "}

            <span className="font-bold text-green-800 dark:text-green-400">

              Tyukod Nagyközség Önkormányzata

            </span>{" "}

            és a{" "}

            <span className="font-bold text-green-800 dark:text-green-400">

              "Tyukod Községért" Közalapítvány

            </span>{" "}

            örömmel tájékoztatja a lakosságot és minden érdeklődőt, hogy

            létrehozta <span className="font-bold">Tyukod Értéktárát</span> és

            megalakította az{" "}

            <span className="font-bold">Értéktár Bizottságot</span>.

          </p>

        </div>

      </div>



      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-gray-200 dark:border-gray-700">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-green-100 dark:border-gray-700">

          Jogszabályi háttér

        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">

          A magyar nemzeti értékek és hungarikumok értéktárba való felvételét

          és az értéktár bizottságok munkáját a{" "}

          <span className="font-semibold text-green-700 dark:text-green-500">

            324/2020. (VII. 1.) Korm. rendelet

          </span>{" "}

          szabályozza. Ez a rendelet határozza meg a nemzeti értékek

          szakterületenkénti kategóriáit, valamint az értéktárak

          létrehozásának és gondozásának kereteit.

        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg text-sm border border-gray-200 dark:border-gray-600">

          <p className="font-bold text-green-700 dark:text-green-400 mb-3 text-base">

            A nemzeti értékek fő kategóriái:

          </p>

          <ul className="list-disc pl-8 text-gray-600 dark:text-gray-300 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">

            <li>agrár- és élelmiszergazdaság</li>

            <li>egészség és életmód</li>

            <li>épített környezet</li>

            <li>ipari és műszaki megoldások</li>

            <li>kulturális örökség</li>

            <li>nemzetiséghez kapcsolódó érték</li>

            <li>sport</li>

            <li>természeti környezet</li>

            <li>turizmus és vendéglátás</li>

          </ul>

        </div>

      </div>



      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-green-600 dark:border-green-500">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-green-600/20 dark:border-green-500/20">

          Tyukod Települési Értéktár Bizottság

        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">

          Tyukod Nagyközség Önkormányzata Képviselő-testülete hozta létre a

          települési értéktárat, és döntött a bizottság tagjairól. A bizottság

          a "Tyukod Községért" Közalapítvánnyal szoros együttműködésben végzi a

          munkát.

        </p>



        <h3 className="text-2xl font-semibold text-green-800 dark:text-green-400 mb-4 flex items-center">

          <svg

            className="w-6 h-6 mr-2"

            fill="none"

            stroke="currentColor"

            viewBox="0 0 24 24"

            xmlns="http://www.w3.org/2000/svg"

          >

            <path

              strokeLinecap="round"

              strokeLinejoin="round"

              strokeWidth="2"

              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"

            ></path>

          </svg>

          A Bizottság tagjai

        </h3>

        <ul className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 space-y-4 border border-green-200 dark:border-green-800">

          {committeeMembers.map((member, index) => (

            <li

              key={index}

              className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300"

            >

              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full mr-4 flex-shrink-0 text-lg">

                {index + 1}

              </span>

              <div>

                <span className="font-bold text-gray-800 dark:text-white">

                  {member.name}

                </span>

                <br />

                <span className="text-gray-500 dark:text-gray-400 text-sm">

                  {member.address}

                </span>

              </div>

            </li>

          ))}

        </ul>

      </div>



      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-yellow-500">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">

            Tyukod Értéktárának elemei

          </h2>

          <span className="bg-yellow-600 text-white px-5 py-2 rounded-full font-extrabold text-lg shadow-lg">

            Összesen: {documentLinks.length} érték

          </span>

        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">

          A település értéktárába eddig <strong>{documentLinks.length} helyi érték és örökség</strong> került felvételre, melyet a Bizottság célja évről évre bővíteni a helyi közösség bevonásával.

        </p>



        <h3 className="text-2xl font-semibold text-green-800 dark:text-green-400 mb-5 flex items-center">

          <svg

            className="w-6 h-6 mr-2 text-yellow-600"

            fill="currentColor"

            viewBox="0 0 20 20"

          >

            <path

              fillRule="evenodd"

              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm5-2a1 1 0 100-2H4a1 1 0 000 2h4zm3 4a1 1 0 100-2h4a1 1 0 100 2h-4zm2 2a1 1 0 112 0v1a1 1 0 11-2 0v-1z"

              clipRule="evenodd"

            ></path>

          </svg>

          Kulturális örökség (Részletes lista)

        </h3>

        {documentLinks.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

            {documentLinks.map((value, index) => (

              <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150">

                <span className="font-extrabold text-green-700 dark:text-green-400 w-8 flex-shrink-0 text-lg">

                  {index + 1}.

                </span>

                <div>

                  <a href={value.url} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 font-medium hover:underline">

                    {value.name}

                  </a>

                  {value.relatedUrl && (

                    <div className="mt-1">

                      <a href={value.relatedUrl} target="_blank" rel="noopener noreferrer" className="text-sm italic text-blue-600 dark:text-blue-400 hover:underline">

                        Kapcsolódó dokumentum

                      </a>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        ) : (

          <EmptyState

            title="Nincsenek rögzített értékek"

            description="Az értéktár jelenleg feldolgozás alatt áll. Kérjük, javasoljon Ön is helyi értéket!"

            icon="bi-archive"

          />

        )}

      </div>



      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-blue-500">



        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-blue-500/20 dark:border-blue-400/20">



          Kapcsolódó dokumentumok



        </h2>



        <ul className="space-y-3">



          {relatedDocuments.map((doc, index) => (



            <li key={index}>



              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-lg p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-150 cursor-pointer">



                <svg



                  className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0"



                  fill="currentColor"



                  viewBox="0 0 20 20"



                >



                  <path



                    fillRule="evenodd"



                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zM11 6a1 1 0 10-2 0 1 1 0 002 0z"



                    clipRule="evenodd"



                  ></path>



                </svg>



                <span className="text-gray-800 dark:text-gray-200 font-medium">



                  {doc.name}



                </span>



              </a>



            </li>



          ))}



        </ul>



        <p className="mt-8 text-gray-600 dark:text-gray-400 text-sm italic border-t border-gray-200 dark:border-gray-700 pt-4">



          Megjegyzés: Az értékek részletes dokumentációja (1-25) az



          Önkormányzat rendelkezésére áll.



        </p>



      </div>



      <div className="mt-10 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-xl p-6 shadow-2xl">

        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center">

          <svg

            className="w-6 h-6 mr-2"

            fill="currentColor"

            viewBox="0 0 20 20"

          >

            <path

              fillRule="evenodd"

              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"

              clipRule="evenodd"

            ></path>

          </svg>

          További információ és javaslattétel

        </h3>

        <p className="text-gray-700 dark:text-gray-200 mb-5 leading-relaxed">

          Az Értéktár listája folyamatosan bővül. Ha olyan helyi értéket,

          örökséget ismer, amelyet érdemes lenne felvenni az értéktárba,

          kérjük, segítse munkánkat!

        </p>



        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-green-300 dark:border-green-700 shadow-inner">

          <p className="font-bold text-green-800 dark:text-green-300 text-lg mb-1">

            Javaslattétel és Kapcsolat:

          </p>

          <p className="text-gray-700 dark:text-gray-200">

            Kérjük, jelezze az Önkormányzatnál vagy közvetlenül az Értéktár

            Bizottság tagjainál:

          </p>

          <p className="font-semibold text-gray-800 dark:text-white mt-2">

            Tyukod Nagyközség Önkormányzata

            <br />

            és a "Tyukod Községért" Közalapítvány

          </p>

        </div>

      </div>

    </div>

  );

}


