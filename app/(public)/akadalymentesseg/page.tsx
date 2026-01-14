// app/(public)/akadalymentesseg/page.tsx
import React from 'react';

export default function AkadalymentessegPage() {
  const lastUpdated = "2026-01-13";
  const introText = "Tyukod Nagyközség Önkormányzata elkötelezett amellett, hogy honlapját a lehető legszélesebb körben hozzáférhetővé tegye minden felhasználó számára, tekintet nélkül a fogyatékosságra vagy az alkalmazott technológiára. Jelen akadálymentesítési nyilatkozat a tyukod.hu weboldalra vonatkozik.";

  const sections = [
    {
      id: "megfelelosegi-statusz",
      title: "1. Megfelelőségi státusz",
      icon: "bi-check-circle-fill",
      content: (
        <p>
          Ez a weboldal <strong className="font-semibold text-gray-900 dark:text-white">részben megfelel</strong> a közszférabeli szervezetek honlapjainak és mobilalkalmazásainak akadálymentesítéséről szóló 2018. évi LXXV. törvénynek, valamint az MSZ EN 301 549 szabványnak, az alábbiakban felsorolt kivételek miatt.
        </p>
      )
    },
    {
      id: "nem-akadalymentes-tartalom",
      title: "2. Nem akadálymentes tartalom",
      icon: "bi-exclamation-triangle-fill",
      content: (
        <>
          <p className="mb-4">Az alábbiakban felsorolt tartalmak a következő okok miatt nem akadálymentesek:</p>
          <ul className="list-disc pl-5 space-y-3 marker:text-indigo-500">
            <li>
              <strong className="font-semibold text-gray-900 dark:text-white">Szkennelt PDF dokumentumok:</strong> A weboldalon található régebbi dokumentumok egy része szkennelt képként került feltöltésre, így azok képernyőolvasó programokkal nem olvashatók. Folyamatosan dolgozunk ezen dokumentumok cseréjén vagy szöveges alternatíváinak biztosításán.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-white">Térképek:</strong> A weboldalon található interaktív térképek nem minden esetben kezelhetők kizárólag billentyűzettel, és nem rendelkeznek minden esetben megfelelő szöveges alternatívával.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-white">Külső tartalmak:</strong> A weboldal tartalmazhat olyan külső forrásból származó tartalmakat (pl. beágyazott videók, közösségi média modulok), amelyek felett nincs teljes ellenőrzésünk, és esetlegesen nem felelnek meg az akadálymentesítési követelményeknek.
            </li>
          </ul>
        </>
      )
    },
    {
      id: "nyilatkozat-elkeszitese",
      title: "3. Az akadálymentesítési nyilatkozat elkészítése",
      icon: "bi-file-earmark-text-fill",
      content: (
        <p>
          Ezt a nyilatkozatot 2024. május 20-án készítettük. A nyilatkozatot a szervezet által végzett önértékelés alapján állítottuk össze.
        </p>
      )
    },
    {
      id: "visszajelzes",
      title: "4. Visszajelzés és elérhetőségek",
      icon: "bi-envelope-fill",
      content: (
        <>
          <p className="mb-6">
            Mindent megteszünk annak érdekében, hogy weboldalunk akadálymentes legyen. Ha mégis olyan problémát észlel, amely nem szerepel a fenti felsorolásban, vagy ha bármilyen információra van szüksége, amely nem hozzáférhető az Ön számára, kérjük, jelezze felénk az alábbi elérhetőségeken:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm text-indigo-600 dark:text-indigo-400 mr-4 group-hover:scale-110 transition-transform">
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">E-mail</span>
                <a href="mailto:onkormanyzat@tyukod.hu" className="text-gray-900 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">onkormanyzat@tyukod.hu</a>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm text-indigo-600 dark:text-indigo-400 mr-4 group-hover:scale-110 transition-transform">
                <i className="bi bi-telephone"></i>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Telefon</span>
                <a href="tel:+3644366001" className="text-gray-900 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">+36 44 366 001</a>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-sm text-indigo-600 dark:text-indigo-400 mr-4 group-hover:scale-110 transition-transform">
                <i className="bi bi-geo-alt"></i>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cím</span>
                <span className="text-gray-900 dark:text-white font-medium">4762 Tyukod, Kossuth Lajos utca 23.</span>
              </div>
            </li>
          </ul>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
            <i className="bi bi-info-circle mr-2"></i>
            Visszajelzését 30 napon belül feldolgozzuk és megválaszoljuk.
          </p>
        </>
      )
    },
    {
      id: "vegrehajtasi-eljaras",
      title: "5. Végrehajtási eljárás",
      icon: "bi-gavel-fill",
      content: (
        <>
          <p className="mb-6">
            Amennyiben a visszajelzésére adott válaszunkkal nem elégedett, vagy nem kapott választ határidőn belül, panasszal fordulhat a Kormányzati Informatikai Fejlesztési Ügynökséghez (KIFÜ), mint ellenőrző szervezethez.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <i className="bi bi-building mr-2 text-indigo-600 dark:text-indigo-400"></i>
              Kormányzati Informatikai Fejlesztési Ügynökség
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Székhely</span>
                <span className="text-gray-900 dark:text-white">1134 Budapest, Váci út 35.</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Levelezési cím</span>
                <span className="text-gray-900 dark:text-white">1134 Budapest, Váci út 35.</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">E-mail</span>
                <a href="mailto:ugyfelszolgalat@kifu.hu" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">ugyfelszolgalat@kifu.hu</a>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Weboldal</span>
                <a href="https://kifu.gov.hu" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">https://kifu.gov.hu</a>
              </div>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* Sidebar / Header Area (Sticky on Desktop) */}
          <div className="lg:col-span-4 xl:col-span-3 mb-8 lg:mb-0">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl mb-6 mx-auto lg:mx-0">
                  <i className="bi bi-universal-access-circle text-3xl text-indigo-600 dark:text-indigo-400"></i>
                </div>
                
                <h1 className="text-2xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 text-center lg:text-left">
                  Akadálymentesítési Nyilatkozat
                </h1>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center lg:text-left">
                  <i className="bi bi-clock-history mr-2"></i>
                  Utoljára frissítve: <span className="font-medium text-gray-700 dark:text-gray-300">{lastUpdated}</span>
                </p>

                <hr className="border-gray-100 dark:border-gray-700 my-6 hidden lg:block" />

                {/* Table of Contents (Desktop) */}
                <nav className="hidden lg:block space-y-1" aria-label="Tartalomjegyzék">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tartalom</p>
                  {sections.map((section) => (
                    <a 
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    >
                      <i className={`bi ${section.icon} mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors`}></i>
                      {section.title.split('. ')[1]}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile Navigation (Wrapping) */}
          <div className="lg:hidden mb-8">
             <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm"
                  >
                    <i className={`bi ${section.icon} mr-2 text-indigo-500`}></i>
                    {section.title.split('. ')[1]}
                  </a>
                ))}
             </div>
          </div>

          {/* Main Content Area */}
          <main className="lg:col-span-8 xl:col-span-9">
            {/* Intro Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {introText}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 scroll-mt-24 lg:scroll-mt-8 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <i className={`bi ${section.icon} text-xl`}></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
