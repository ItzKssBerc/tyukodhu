import Image from "next/image";
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
    { name: "Tyukodi Értéktár Szervezeti és Működési Szabályzata", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/%C3%89rt%C3%A9kt%C3%A1r%20szmsz%201.pdf" },
    { name: "Határozat", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/hat%C3%A1rozat.pdf" },
    { name: "Kivonat", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/kivonat.pdf" },
  ];

  const documentLinks = [
    { name: "Tyukodi Református templom", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/1.%20tyukodi%20reform%C3%A1tus%20templom.pdf" },
    { name: "Uray kastély", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/2.%20uray%20kast%C3%A9ly.pdf" },
    { name: "Szalay ház-parasztház", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/3.%20szalay%20h%C3%A1z.pdf" },
    { name: "Tyukodi gyékényfonás", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/4.%20tyukodi%20gy%C3%A9k%C3%A9nyfon%C3%A1s.pdf" },
    { name: "Ezüst úrasztali pohár", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/5.%20ez%C3%BCst%20%C3%9Ar%20asztala%20poh%C3%A1r%20.pdf" },
    { name: "Úrhimzéses úrasztali terítők", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/6.%20%C3%9Arihimz%C3%A9ses%20%C3%9Arasztali%20ter%C3%ADt%C5%91k.pdf" },
    { name: "Nyomott mintás úrasztali terítő", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/7.%20nyomott%20mint%C3%A1s%20%C3%9Arasztali%20ter%C3%ADt%C5%91%20.pdf" },
    { name: "Úrasztali réz borgyűjtő kanna", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/8.%20%C3%9Arasztali%20r%C3%A9z%20borgy%C3%BCjt%C5%91%20kanna.pdf" },
    { name: "Kenyérosztó óntál", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/9.%20keny%C3%A9roszt%C3%B3%20%C3%B3n%20t%C3%A1l.pdf" },
    { name: "Ezüst kenyérosztó tál", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/10.%20ez%C3%BCst%20keny%C3%A9roszt%C3%B3%20t%C3%A1l.pdf" },
    { name: "Urvacsorai terítő 1878-ból", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/11.%20%C3%9Arvacsorai%20ter%C3%ADt%C5%91%201878.pdf" },
    { name: "Tatárjáráskori kincslelet Tyukod Bagolyvárról", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/12.%20tat%C3%A1rj%C3%A1r%C3%A1skori%20kincslelet%20tyukod%20bagolyv%C3%A1r.pdf" },
    { name: "Szalay család temetkezési helye", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/13.%20szalay%20csal%C3%A1d%20temetkez%C3%A9si%20hely.pdf" },
    { name: "A Hősök tere I. és II. világháborús emlékműve", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/14.%20a%20h%C5%91s%C3%B6k%20tere%20i.%20%C3%A9s%20ii.%20vil%C3%A1gh%C3%A1bor%C3%BAs.pdf" },
    { name: "Tyukod-1181-es említésének emlékműve", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/15.%20tyukod%201181-es%20eml%C3%ADt%C3%A9s%C3%A9nek%20eml%C3%A9km%C5%B1ve.pdf" },
    { name: "A hortobágyi kitelepítettek emlékműve", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/16.%20a%20hortob%C3%A1gyi%20kitelepitettek%20eml%C3%A9km%C5%B1ve.pdf" },
    { name: "Dózsa György mellszobra", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/17.%20d%C3%B3zsa%20gy%C3%B6rgy%20mellszobra.pdf" },
    { name: "Tyukodi táncok Kulturális érték", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/18.%20tyukodi%20t%C3%A1ncok%20kultur%C3%A1lis%20%C3%A9rt%C3%A9k.pdf" },
    { name: "Ezüst úrvacsorai kehely", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/19.%20ez%C3%BCst%20%C3%BArvacsorai%20kehely%20.pdf" },
    { name: "Dr. Szalay Zsigmond helytörténeti kiállítás", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/20.%20dr.%20szalay%20zsigmond%20helyt%C3%B6rt%C3%A9neti%20ki%C3%A1ll%C3%ADt%C3%A1s.pdf" },
    { name: "Dr. Szalay Zsigmond helytörténeti gyűjtemény", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/21.%20dr.%20szalay%20zsigmond%20helyt%C3%B6rt%C3%A9neti%20gy%C3%BCjtem%C3%A9ny.pdf" },
    { name: "Kossuth Lajos mellszobra", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/22.%20kossuth%20lajos%20mellszobra.pdf" },
    { name: "Kádár József síremléke", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/23.%20k%C3%A1d%C3%A1r%20j%C3%B3zsef%20s%C3%ADreml%C3%A9ke.pdf" },
    { name: "Dr. Szalay Zsigmond: Tyukod története és néprajza", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/24.%20%20dr.%20szalay%20zsigmondtyukodtyukod%20t%C3%B6rt%C3%A9nete%20%C3%A9s%20n%C3%A9prajza%20.pdf" },
    { name: "P. Szalay Emőke - Szalay Csilla: Tartozunk a múltnak c. kiadvány", url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodertektara/25.%20p.%20szalay%20em%C3%B6ke-szalay%20csilla%20tartozunk%20a%20m%C3%BAltnak%20c.%20kiadv%C3%A1ny%20.pdf" },
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {documentLinks.map((value, index) => (
                <a
                  key={index}
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden"
                >

                  {/* Image Section */}
                  <div className="relative h-32 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-stone-50 dark:bg-stone-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors duration-500">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-stone-800 shadow-sm flex items-center justify-center text-blue-500/80 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500">
                        <i className="bi bi-file-earmark-pdf-fill text-2xl"></i>
                      </div>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60"></div>

                    {/* Index Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm flex items-center justify-center text-stone-900 dark:text-white font-black text-sm shadow-lg z-10">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                        {value.name}
                      </h3>
                    </div>
                    <div className="mt-3 space-y-1 pt-3 border-t border-stone-100 dark:border-stone-800">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-[10px] uppercase font-bold text-stone-600 dark:text-stone-400 group-hover:text-blue-600 transition-all">
                        <span>Dokumentum</span>
                        <div className="w-5 h-5 rounded bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm text-stone-400 group-hover:text-blue-600 transition-colors">
                          <i className="bi bi-file-earmark-arrow-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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
        <section className="bg-stone-50 dark:bg-stone-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-24 text-stone-900 dark:text-white relative overflow-hidden group border border-stone-200 dark:border-stone-800">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Hivatalos <span className="text-blue-600 dark:text-blue-500">Iratok</span>
              </h2>
              <div className="space-y-4">
                {relatedDocuments.map((doc, index) => (
                  <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-start p-4 md:p-6 bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 rounded-2xl md:rounded-3xl border border-stone-200 dark:border-white/10 transition-all duration-300 group/link shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors text-blue-600 dark:text-white flex-shrink-0 mt-1">
                      <i className="bi bi-file-earmark-text text-lg md:text-xl"></i>
                    </div>
                    <span className="font-bold flex-grow text-sm md:text-base text-stone-800 dark:text-white pt-1">{doc.name}</span>
                    <i className="bi bi-download text-stone-300 dark:text-white/20 group-hover/link:text-blue-600 dark:group-hover/link:text-white transition-colors pt-1 ml-2"></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-stone-200 dark:border-white/10 space-y-6 md:space-y-8 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-2xl shadow-blue-500/20 rotate-12 text-white">
                <i className="bi bi-info-circle"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-white">Javaslattétel</h3>
              <p className="text-stone-600 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
                Az Értéktár listája folyamatosan bővül. Ha olyan helyi értéket, örökséget ismer, amelyet érdemes lenne felvenni, kérjük, jelezze az Önkormányzatnál vagy a bizottság tagjainál.
              </p>
              <div className="pt-6 md:pt-8 border-t border-stone-100 dark:border-white/10">
                <p className="text-xs md:text-sm text-stone-400 dark:text-white/40 uppercase tracking-widest font-black mb-1">Kapcsolat</p>
                <p className="font-bold text-base md:text-lg text-stone-900 dark:text-white">Tyukod Nagyközség Önkormányzata</p>
                <p className="text-sm md:text-base text-stone-500 dark:text-white/60 font-light italic">"Tyukod Községért" Közalapítvány</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
