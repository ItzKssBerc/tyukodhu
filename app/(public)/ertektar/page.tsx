export default function ErtektarPage() {
  const committeeMembers = [
    { name: "Farkas Ferencné", address: "4762 Tyukod, Ady Endre utca 34." },
    { name: "Tóthné Gorgyán Aliz", address: "4762 Tyukod, Kossuth utca 83." },
    { name: "Rácz Zsigmondné", address: "4762 Tyukod, Árpád út 71." },
    { name: "Lakatosné Varjasi Zsuzsa", address: "4762 Tyukod, Kis utca 24/B" },
    { name: "Kerezsi Józsefné", address: "4762 Tyukod, Rákóczi utca 62." },
  ];

  const values = [
    "Tyukodi Református templom",
    "Uray kastély",
    "Szalay ház-parasztház",
    "Tyukodi gyékényfonás",
    "Ezüst úrasztali pohár",
    "Úrhimzéses úrasztali terítők",
    "Nyomott mintás úrasztali terítő",
    "Úrasztali réz borgyűjtő kanna",
    "Kenyérosztó óntál",
    "Ezüst kenyérosztó tál",
    "Urvacsorai terítő 1878-ból",
    "Tatárjáráskori kincslelet Tyukod Bagolyvárról",
    "Szalay család temetkezési helye",
    "A Hősök tere I. és II. világháborús emlékműve",
    "Tyukod-1181-es említésének emlékműve",
    "A hortobágyi kitelepítettek emlékműve",
    "Dózsa György mellszobra",
    "Tyukodi táncok Kulturális érték",
    "Ezüst úrvacsorai kehely",
    "Dr. Szalay Zsigmond helytörténeti kiállítás",
    "Dr. Szalay Zsigmond helytörténeti gyűjtemény",
    "Kossuth Lajos mellszobra",
    "Kádár József síremléke",
    "Dr. Szalay Zsigmond: Tyukod története és néprajza",
    "P. Szalay Emőke - Szalay Csilla: Tartozunk a múltnak c. kiadvány",
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
            Összesen: {values.length} érték
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          A település értéktárába eddig <strong>{values.length} helyi érték és örökség</strong> került felvételre, melyet a Bizottság célja évről évre bővíteni a helyi közösség bevonásával.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {values.map((value, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150">
              <span className="font-extrabold text-green-700 dark:text-green-400 w-8 flex-shrink-0 text-lg">
                {index + 1}.
              </span>
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-blue-500/20 dark:border-blue-400/20">
          Kapcsolódó dokumentumok
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center text-lg p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-150 cursor-pointer">
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
              Tyukodi Értéktár Szervezeti és Működési Szabályzata
            </span>
          </li>
          <li className="flex items-center text-lg p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-150 cursor-pointer">
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
              Határozat
            </span>
          </li>
          <li className="flex items-center text-lg p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-150 cursor-pointer">
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
              Kivonat
            </span>
          </li>
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
