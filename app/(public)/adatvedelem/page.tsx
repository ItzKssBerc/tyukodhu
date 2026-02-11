import React from 'react';

export default function AdatvedelemPage() {
  const lastUpdated = "2026-01-13";
  const introText = "Ez az adatvédelmi nyilatkozat leírja, hogy a Tyukod.hu hogyan gyűjti, használja és osztja meg az Ön adatait, amikor Ön a weboldalunkat használja. Elkötelezettek vagyunk az Ön személyes adatainak védelme mellett.";

  const sections = [
    {
      id: "gyujtott-informaciok",
      title: "1. Gyűjtött információk",
      icon: "bi-info-circle-fill",
      content: (
        <>
          <p>Nem gyűjtünk személyazonosításra alkalmas információkat Önről, amikor Ön a weboldalunkat látogatja. A weboldalunk látogatása során azonban bizonyos nem személyes adatok automatikusan gyűjtésre kerülhetnek. Ezek közé tartozhatnak:</p>
          <ul>
            <li>Az Ön IP-címe.</li>
            <li>A használt böngésző típusa és verziója.</li>
            <li>Az Ön által használt operációs rendszer.</li>
            <li>A látogatás dátuma és ideje.</li>
            <li>A meglátogatott oldalak.</li>
            <li>A weboldalunkra való hivatkozás oldala.</li>
          </ul>
        </>
      )
    },
    {
      id: "informaciok-felhasznalasa",
      title: "2. Az információk felhasználása",
      icon: "bi-gear-fill",
      content: (
        <p>Az automatikusan gyűjtött nem személyes adatokat a weboldalunk működésének és minőségének javítására, valamint a felhasználói élmény elemzésére és optimalizálására használjuk fel. Ezeket az adatokat statisztikai célokra használjuk fel, és nem kapcsoljuk össze az Ön személyes adataival.</p>
      )
    },
    {
      id: "informaciomegosztas",
      title: "3. Információmegosztás",
      icon: "bi-share-fill",
      content: (
        <p>Nem osztunk meg semmilyen gyűjtött információt harmadik felekkel, kivéve, ha erre törvény kötelez minket, vagy ha ez szükséges a weboldalunk működéséhez és szolgáltatásaink nyújtásához.</p>
      )
    },
    {
      id: "cookie-k",
      title: "4. Cookie-k",
      icon: "bi-cookie",
      content: (
        <p>A weboldalunk használhat sütiket (cookie-kat) a felhasználói élmény javítása érdekében. A sütik kis szöveges fájlok, amelyeket a böngészője tárol az Ön eszközén. Önnek lehetősége van a sütik elfogadására vagy elutasítására. A legtöbb böngésző automatikusan elfogadja a sütiket, de Ön módosíthatja böngészője beállításait, hogy elutasítsa a sütiket, ha úgy kívánja. Ez azonban befolyásolhatja a weboldal bizonyos funkcióinak működését.</p>
      )
    },
    {
      id: "harmadik-fel",
      title: "5. Harmadik féltől származó linkek",
      icon: "bi-link-45deg",
      content: (
        <p>Weboldalunk tartalmazhat harmadik felek weboldalaira mutató linkeket. Ezeknek a külső oldalaknak a tartalmáért és adatvédelmi gyakorlatáért nem vállalunk felelősséget. Javasoljuk, hogy olvassa el az általuk közzétett adatvédelmi nyilatkozatokat.</p>
      )
    },
    {
      id: "modositasok",
      title: "6. Módosítások",
      icon: "bi-arrow-repeat",
      content: (
        <p>Fenntartjuk a jogot, hogy bármikor módosítsuk ezt az adatvédelmi nyilatkozatot. A módosítások a közzétételük pillanatában lépnek életbe a weboldalon. Javasoljuk, hogy rendszeresen ellenőrizze ezt az oldalt az esetleges változásokért.</p>
      )
    },
    {
      id: "kapcsolat",
      title: "7. Kapcsolat",
      icon: "bi-envelope-fill",
      content: (
        <p>Ha bármilyen kérdése van ezzel az adatvédelmi nyilatkozattal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot a &quot;Kapcsolat&quot; oldalunkon található elérhetőségeinken.</p>
      )
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Top Decorative Bar */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">

          {/* Sidebar / Header Area (Sticky on Desktop) */}
          <div className="lg:col-span-4 xl:col-span-3 mb-12 lg:mb-0">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl mb-6 mx-auto lg:mx-0">
                  <i className="bi bi-shield-lock-fill text-3xl text-indigo-600 dark:text-indigo-400"></i>
                </div>

                <h1 className="text-2xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 text-center lg:text-left">
                  Adatvédelmi Nyilatkozat
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center lg:text-left">
                  <i className="bi bi-clock-history mr-2"></i>
                  Utoljára frissítve: <span className="font-medium text-gray-700 dark:text-gray-300">{lastUpdated}</span>
                </p>

                <hr className="border-gray-100 dark:border-gray-700 my-6" />

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
                      {section.title.split('. ')[1]} {/* Show only the name, not the number */}
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
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
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 scroll-mt-8 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <i className={`bi ${section.icon} text-xl`}></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
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
