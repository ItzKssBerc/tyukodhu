export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          A község története
        </h1>
        <div className="grid md:grid-cols-2 md:gap-8">
          <div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Írásos emlékek 1181-ben említik először a község nevét. Több
              változatban is szerepel a későbbi években is: Tenykod, Tenykowd,
              Oechidkuttya, Egyedkuttya, Eketyukod, de pontos feljegyzés nem
              igazolta eddig, mióta ismert ezen a néven. A falu, mint település,
              valószínűleg már előtte is létezett, csak írásos feljegyzések nem
              készültek róla.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              A terület legnagyobb részét láp borította, mely nem összefüggő volt,
              hanem kisebb-nagyobb szigeteket képeztek, melyek igen alkalmasak
              voltak emberi letelepülésre. Ezek a települések az árvizek utáni
              időkben lassan megszűntek, lakói a községben telepedtek le.
            </p>

            <h2 className="text-2xl font-bold mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              Mit tudhatunk hát a Tyukod névről?
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Több változat él róla: "Ősi urai a Tyukodi nemzetség volt, de
              mellette a Kölcseyek is birtokosai voltak. A személynévként is
              alkalmazott magyar tyúk főnév -d képzős származékából való."
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              A tatárjárás településünket is feldúlta. Lakói a láp szigeteire
              menekültek, de hátrahagyott javaikat teljesen elvesztették. Az
              elesettek birtokait IV. Béla királyunk eladományozta.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Tyukod szinte mindegyik nemese részt vett a Dózsa-féle
              parasztháborúban. A paraszthadakhoz csatlakozott nemesek
              valamennyiét birtokelkobzással büntették. Egy oklevél tanúsága
              szerint a birtokok legnagyobb része a Báthoriak kezébe került.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              De hadba hívta a tyukodiakat Rákóczi hívó szava is. Ma is
              fellelhető írások név szerint sorolják a résztvevő nemeseket és
              gyalogos katonákat.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              E század végének egyik nagy eseménye volt a Szatmáron lezajlott
              boszorkányper, ahol két tyukodi boszorkányt - Kós Annát és
              Rekettyés Helénát - ítélték máglyára.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Az 1848-as szabadságharcban ugyancsak egy önálló alakulattal
              vettek részt a tyukodiak. A szabadságharc bukása után csak páran
              tértek haza, nagyobb részüket besorozták az osztrák hadseregbe.
              Ekkoriban jutott nagyobb birtokhoz az Uray család, akiket hűséges
              szolgálataikért bárói rangra emeltek. Emléküket ma a családi
              kastélyépületük őrzi.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mind az első, mind a második világháborúban sok-sok tyukodi
              vérzett el. Emléktáblák hirdetik nevüket az utókor számára azon
              emlékművön, amely az elsők között készült el megyénkben a háború
              befejezését követően.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              A nagy kivándorlások éveiben településünket is sokan hagyták el és
              kerestek jobb megélhetési lehetőséget más földrészeken - főleg
              Amerikában és Kanadában.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-6 md:mt-0 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              Néhány történelmi évforduló a község életéből:
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1899:
                    </strong>{" "}
                    elkészült az új községháza, és azóta van itt előljáróság.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1904:
                    </strong>{" "}
                    megépült a vasútvonal Porcsalma határában, de piacilag sokat
                    jelentett a tyukodiak számára is.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1913:
                    </strong>{" "}
                    az állami iskola 60 tanulója kiránduláson járt Nagybányán.
                    Ez volt az első iskolai kirándulás.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1925:
                    </strong>{" "}
                    februárjában megalakult a levente egyesület, később pedig az
                    önkéntes tűzoltó testület.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1929:
                    </strong>{" "}
                    elkezdődött a község közvilágítási hálózatának kiépítése.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1933:
                    </strong>{" "}
                    újabb iskolaépület készült el.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1937:
                    </strong>{" "}
                    óta van önálló orvosi gyógyellátása a községnek.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1942:
                    </strong>
                    -től működött területünkön egy kenderfeldolgozó-üzem,
                    melynek területén - annak megszűnése után - jött létre
                    1964-ben a Nyíregyházi Konzervgyár helyi leányvállalata.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1948:
                    </strong>{" "}
                    az újonnan földhözjutottak, de valamennyi földtulajdonos
                    gazdálkodásának eredményességét elősegítette a megalakult
                    Mezőgazdasági Gépállomás. 1970-től átvette ezt az akkor még
                    működő Kossuth TSZ.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1950:
                    </strong>{" "}
                    itt is megalakult a helyi tanács, mely 1973-tól 1990-ig
                    közös tanácsként működött Ura községgel együtt. Ezzel közel
                    egyidőben nyilvánították a települést Tyukod Nagyközséggé.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1969:
                    </strong>{" "}
                    augusztus 1. napjáig közigazgatási területünk a volt
                    csengeri járáshoz, ennek megszűnésével a mátészalkai
                    járáshoz tartozott.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1970-es évek:
                    </strong>{" "}
                    Az 1970-es árvíz utáni időszak - bár konkrétan nem érintette
                    községünket az ár - átformálta a település képét. A
                    hetvenes, nyolcvanas években alakult ki a község mai képe.
                    Közintézményeink sora mellett - iskola, óvoda, ABC-áruház,
                    gyógyszertár, tornaterem - lakóházak százai épültek újjá.
                    Mára emlékként sem maradt nádfedeles ház, kóró- vagy
                    palánkkerítésű porta, mely valamikor nem volt más, mint a
                    láp ajándéka.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      1992:
                    </strong>{" "}
                    befejeződött a település útjainak szilárd burkolattal
                    történő bevonása, megépült a vezetékes vízhálózat és lángra
                    lobbant a vezetékes gáz. A lakások közel kétharmada
                    vezetékes telefonnal van ellátva.
                  </p>
                </div>
              </li>
            </ul>

            <p className="mt-6 mb-4 text-gray-700 dark:text-gray-300">
              Az új évezred első nagy beruházása a szennyvízhálózat kiépítése
              volt.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Az évezred második évében megkezdődött a református templom
              felújítása, átformálták az ABC áruház, a gyógyszertár, a helyi
              takarékszövetkezet arculatát. Új burkolatot kapott a községen
              áthúzódó útvonal, folyamatban van az egykori vályogvető tó képének
              átalakítása.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mindez már új történelmi lap a település több mint 800 éves
              palettáján. A demokratikus választások óta jelenleg 6 tagú
              képviselő-testület irányítja a fejlődés új útján az itt is sok-sok
              nehéz gonddal küszködő közel 2000 tyukodi lakos életét.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
