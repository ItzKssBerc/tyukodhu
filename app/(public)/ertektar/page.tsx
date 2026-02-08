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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-24 bg-white dark:bg-stone-900/40 border-b border-stone-200 dark:border-stone-800/50 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 dark:text-white tracking-tight mb-6">
            Tyukod <span className="text-blue-600 font-light italic">Értéktára</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Tisztelt Tyukodiak! Ismerjék meg közösségünk kiemelkedő nemzeti értékeit, hagyományait és épített örökségét.
          </p>
          <div className="mt-12 h-1.5 w-24 bg-blue-600 rounded-full mx-auto"></div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 space-y-32">
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-[2.5rem] border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <i className="bi bi-bookmark-star absolute -top-4 -right-4 text-9xl text-blue-500/5 transition-transform duration-700 group-hover:rotate-12"></i>
            <p className="text-lg md:text-xl text-stone-700 dark:text-stone-300 leading-relaxed font-light">
              A <strong className="font-semibold text-stone-900 dark:text-white">Tyukod Nagyközség Önkormányzata</strong> és a <strong className="font-semibold text-stone-900 dark:text-white">"Tyukod Községért" Közalapítvány</strong> büszkén mutatja be a település értéktárát, melyet a helyi közösség hivatott gondozni és bővíteni.
            </p>
          </div>
        </section>

        {/* Categories / Legal background */}
        <section className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight flex items-center">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                <i className="bi bi-journal-text"></i>
              </span>
              Jogszabályi háttér
            </h2>
            <div className="prose prose-stone dark:prose-invert font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                A magyar nemzeti értékek és hungarikumok értéktárba való felvételét a <strong className="text-stone-900 dark:text-white font-semibold">324/2020. (VII. 1.) Korm. rendelet</strong> szabályozza.
              </p>
              <p>
                Ez a rendelet határozza meg a nemzeti értékek szakterületenkénti kategóriáit, valamint az értéktárak létrehozásának és gondozásának kereteit.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Agrár- és élelmiszer",
                "Egészség és életmód",
                "Épített környezet",
                "Ipari megoldások",
                "Kulturális örökség",
                "Sport",
                "Természet",
                "Turizmus"
              ].map((cat, i) => (
                <div key={i} className="flex items-center p-4 bg-white dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800 text-sm text-stone-600 dark:text-stone-400 shadow-sm">
                  <i className="bi bi-check2-circle text-blue-600 mr-3"></i>
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 bg-white dark:bg-stone-900/40 p-10 rounded-[2.5rem] border border-stone-200 dark:border-stone-800/50 shadow-sm">
            <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight flex items-center">
              <span className="w-12 h-12 bg-stone-50 dark:bg-stone-800 text-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-stone-100 dark:border-stone-700">
                <i className="bi bi-people"></i>
              </span>
              Értéktár Bizottság
            </h2>
            <p className="text-stone-600 dark:text-stone-400 font-light text-sm">A bizottság tagjai felelnek a javaslatok elbírálásáért és az értéktár kezeléséért.</p>
            <div className="space-y-4">
              {committeeMembers.map((member, index) => (
                <div key={index} className="flex items-center p-4 bg-stone-50/50 dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mr-4 font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-sm">{member.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500">{member.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main List of Values */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-stone-200 dark:border-stone-800 pb-12">
            <div>
              <h2 className="text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
                Települési Értékeink
              </h2>
              <p className="text-stone-500 dark:text-stone-400 font-light">
                A tyukodi értéktárba eddig felvett kulturális kincsek listája.
              </p>
            </div>
            <div className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20">
              {documentLinks.length} Érték
            </div>
          </div>

          {documentLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentLinks.map((value, index) => (
                <div key={index} className="group bg-white dark:bg-stone-900 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-800 hover:border-blue-500/50 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-3xl font-black text-stone-400 dark:text-stone-500 group-hover:text-blue-600 transition-colors duration-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <i className="bi bi-file-earmark-pdf"></i>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                      {value.name}
                    </h3>
                  </div>
                  <div className="mt-8 space-y-2">
                    <a href={value.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-stone-400 dark:text-stone-500 hover:text-blue-600 transition-colors uppercase tracking-wider">
                      Dokumentum megnyitása
                      <i className="bi bi-arrow-up-right ml-2"></i>
                    </a>
                    {value.relatedUrl && (
                      <a href={value.relatedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs italic text-blue-600/60 dark:text-blue-400/40 hover:text-blue-600 transition-colors">
                        Kapcsolódó irat megtekintése
                      </a>
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
        </section>

        {/* Related Documents Footer */}
        <section className="bg-stone-50 dark:bg-stone-900 rounded-[3rem] p-12 md:p-24 text-stone-900 dark:text-white relative overflow-hidden group border border-stone-200 dark:border-stone-800">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tight">
                Hivatalos <span className="text-blue-600 dark:text-blue-500">Iratok</span>
              </h2>
              <div className="space-y-4">
                {relatedDocuments.map((doc, index) => (
                  <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 rounded-3xl border border-stone-200 dark:border-white/10 transition-all duration-300 group/link shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-white/10 rounded-2xl flex items-center justify-center mr-6 group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors text-blue-600 dark:text-white">
                      <i className="bi bi-file-earmark-text text-xl"></i>
                    </div>
                    <span className="font-bold flex-grow text-stone-800 dark:text-white">{doc.name}</span>
                    <i className="bi bi-download text-stone-300 dark:text-white/20 group-hover/link:text-blue-600 dark:group-hover/link:text-white transition-colors"></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-10 rounded-[2.5rem] border border-stone-200 dark:border-white/10 space-y-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-blue-500/20 rotate-12 text-white">
                <i className="bi bi-info-circle"></i>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Javaslattétel</h3>
              <p className="text-stone-600 dark:text-white/60 font-light leading-relaxed">
                Az Értéktár listája folyamatosan bővül. Ha olyan helyi értéket, örökséget ismer, amelyet érdemes lenne felvenni, kérjük, jelezze az Önkormányzatnál vagy a bizottság tagjainál.
              </p>
              <div className="pt-8 border-t border-stone-100 dark:border-white/10">
                <p className="text-sm text-stone-400 dark:text-white/40 uppercase tracking-widest font-black mb-1">Kapcsolat</p>
                <p className="font-bold text-lg text-stone-900 dark:text-white">Tyukod Nagyközség Önkormányzata</p>
                <p className="text-stone-500 dark:text-white/60 font-light italic">"Tyukod Községért" Közalapítvány</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
