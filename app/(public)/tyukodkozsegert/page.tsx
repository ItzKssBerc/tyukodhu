export default function TyukodKozsegertPage() {
  const mainGoals = [
    "A tehetséges, de szociálisan rászorult fiatalok közép- és felsőfokú oktatásban való továbbtanulásának anyagi támogatása.",
    "Az általános iskolai oktatás, óvodai nevelés tárgyi és személyi feltételeinek javítása.",
    "Súlyos betegségben szenvedő rászorult fiatalok gyógyíttatásának, tanulásának támogatása.",
    "A község jó hírnevét öregbítő személyek elismerése (Díszpolgárok, Tyukodért kitüntetettek).",
    "Tyukod tárgyi és szellemi örökségének megőrzése (pl. köztéri szobrok felújítása).",
  ];

  const currentKuratorium = [
    "Rácz Zsigmondné (Elnök, 2018-tól)",
    "Farkas Ferencné",
    "Kócsi Norbert",
    "Rácz Pálné",
    "Szűcs András",
    "Vargáné Németh Nóra",
  ];

  const currentEllenorzo = [
    "Tóthné Gorgyán Aliz (Elnök)",
    "Mlincsek-Balogh Szilvia",
    "Ráczné Bohács Beatrix",
  ];

  const formerKuratorium = [
    "Juhász Jánosné (Elnök 1997-2018-ig)",
    "Erni László (Elnök helyettes 1997-2023-ig)",
    "Magos Béla",
    "Majorics János",
    "Molnár Imre",
    "Németh Kiss Pálma",
    "Dr. Nyéki Gyuláné",
    "Rácz Pálné",
    "Szabóné Szőke Beáta",
    "Szűcs András",
  ];

  const formerEllenorzo = [
    "Balla Zsigmondné",
    "Bereczky Erika",
    "Nagy Gyula",
    "Ráczné Bohács Beatrix",
    "Rácz Zsigmondné",
    "Somlyainé Szabad Emese",
    "Tóthné Gorgyán Aliz",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-15 mb-12 text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-yellow-600 dark:border-yellow-500">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-wide">
          "Tyukod Községért" Közalapítvány
        </h1>
        <hr className="w-24 mx-auto border-t-2 border-yellow-600 dark:border-yellow-500 my-4" />
        <blockquote className="italic text-lg text-gray-600 dark:text-gray-300">
          "Mindenkinek kellene, hogy legyen valami, amit önzetlenül tesz,
          pusztán azért, hogy másoknak szerzett örömmel magát boldogítsa"
          <footer className="mt-2 font-semibold text-gray-700 dark:text-gray-200">
            /Becca Prior/
          </footer>
        </blockquote>
      </div>

      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          Üdvözlő gondolatok
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Tisztelt Tyukodiak! Kedves Tyukodról Elszármazottak! Kedves
          Érdeklődők!
        </p>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-lg border-l-4 border-gray-400 dark:border-gray-500">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            A <b>Tyukod Községért Közalapítványt</b> 1997-ben alapította Tyukod
            Nagyközség Önkormányzata <b>Bereczky István Polgármester Úr</b>{" "}
            kezdeményezésére. Azóta minden polgármester (<b>Nagy Miklós</b>,{" "}
            <b>Czibere József</b>) és a mindenkori Képviselő Testület támogatta
            és segítette a Kuratórium munkáját.
          </p>
        </div>
      </div>

      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-gray-800 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-yellow-600/50 dark:border-yellow-500/50 flex items-center">
          <svg
            className="w-6 h-6 text-yellow-600 dark:text-yellow-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Fő célkitűzéseink
        </h2>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          {mainGoals.map((goal, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 dark:text-yellow-500 font-extrabold text-2xl mr-3 leading-none">
                •
              </span>
              <span dangerouslySetInnerHTML={{ __html: goal }}></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-12 bg-gray-800 text-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-yellow-500 mb-5 pb-3 border-b-2 border-yellow-500/50">
          Munkánk eredményei és finanszírozás
        </h2>
        <p className="mb-6 leading-relaxed text-gray-300">
          Ezeket a célokat figyelembe véve az eltelt időszak alatt közel{" "}
          <b>száz egyetemi, főiskolai és középiskolai tanuló</b> tanulmányait
          támogattuk. Több alkalommal segítettük a súlyos betegségben szenvedő
          gyermekek gyógyíttatását. Jelentős összeggel járultunk hozzá az
          Általános Iskola és Óvoda programjaihoz, és folyamatosan törekszünk
          a helyi értékek megóvására, felújítására.
        </p>
        <div className="bg-gray-700 p-5 rounded-lg shadow-inner">
          <p className="font-bold text-lg text-yellow-500 mb-2">
            Pénzügyi adatok:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>
              Az alapítvány induló vagyona: <b>1.000.000 Ft</b> (egymillió
              forint), értékpapírban elhelyezve.
            </li>
            <li>
              Finanszírozás forrásai: <b>Adó 1%-ából</b> kapott támogatások és{" "}
              <b>adományok</b>.
            </li>
          </ul>
          <p className="mt-4 text-sm italic text-yellow-200">
            Ezért hálás köszönet jár minden adományozónak és Tyukod Nagyközség
            Önkormányzatának!
          </p>
        </div>
      </div>

      <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-red-600 dark:border-red-500">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 pb-3 border-b-2 border-red-600/50 dark:border-red-500/50">
          Vezető testületek
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          A Kuratórium 7, az Ellenőrző Bizottság 3 főből áll. Tagjaink
          feladataikat <b>önkéntesen, díjazás nélkül</b> látják el. Munkánkat a
          falunk iránti elköteleződésünk és kötődésünk vezérli.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 border-b-2 border-red-100 dark:border-red-800 pb-1">
              Jelenlegi tagjaink
            </h3>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-800 dark:text-red-300 mb-1">
                Kuratórium tagjai:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                {currentKuratorium.map((member, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: member }} />
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="font-bold text-red-800 dark:text-red-300 mb-1">
                Ellenőrző Bizottság tagjai:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                {currentEllenorzo.map((member, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: member }} />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3 border-b-2 border-gray-300 dark:border-gray-600 pb-1">
              Az Alapítástól szolgált tagok (1997 óta)
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <p className="font-bold text-gray-800 dark:text-white mb-1">
                Kuratórium korábbi tagjai:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                {formerKuratorium.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-bold text-gray-800 dark:text-white mb-1">
                Ellenőrző Bizottság korábbi tagjai:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                {formerEllenorzo.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 italic mb-4">
          Bízunk benne, hogy Önkormányzat honlapján alapítványunkról megjelent
          tájékoztató hasznos információkkal, érdekességekkel segíti a
          település iránt érdeklődő látogatókat!
        </p>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 pb-1 border-gray-200 dark:border-gray-700">
          Kapcsolódó dokumentumok
        </h3>
        <ul className="space-y-2">
          <a href="/tyukodkozsegeertalapitvany/alapító okirat.pdf" target="_blank" rel="noopener noreferrer">
            <li className="flex items-center text-red-600 dark:text-red-400 font-semibold hover:underline cursor-pointer">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Alapító okirat (PDF)
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}
