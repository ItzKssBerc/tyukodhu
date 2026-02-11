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
    <div className="min-h-screen theme-transition glass-card">

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-transparent border-b border-stone-200 dark:border-stone-800/50 overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 dark:text-white tracking-tight mb-6">
            &quot;Tyukod Községért&quot; <span className="text-blue-600 font-light italic">Közalapítvány</span>
          </h1>
          <div className="max-w-3xl mx-auto border-y border-stone-100 dark:border-stone-800 py-8 relative">
            <i className="bi bi-quote absolute top-2 left-2 text-4xl text-blue-600/10"></i>
            <blockquote className="text-xl md:text-2xl italic text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              &quot;Mindenkinek kellene, hogy legyen valami, amit önzetlenül tesz, pusztán azért, hogy másoknak szerzett örömmel magát boldogítsa&quot;
            </blockquote>
            <p className="mt-4 font-bold text-stone-900 dark:text-stone-200 uppercase tracking-widest text-sm">— Becca Prior</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 md:py-20 space-y-16 md:space-y-32">

        {/* Intro Card */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white/40 dark:bg-stone-900/40 p-6 md:p-12 rounded-[2.5rem] border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">Üdvözlő gondolatok</h2>
            <div className="space-y-6 text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              <p>Tisztelt Tyukodiak! Kedves Tyukodról Elszármazottak! Kedves Érdeklődők!</p>
              <p className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border-l-4 border-blue-600 text-stone-800 dark:text-stone-200">
                A <strong className="font-semibold">Tyukod Községért Közalapítványt</strong> 1997-ben alapította Tyukod Nagyközség Önkormányzata <strong>Bereczky István Polgármester Úr</strong> kezdeményezésére. Azóta minden polgármester és a mindenkori Képviselő-testület támogatta munkánkat.
              </p>
            </div>
          </div>
        </section>

        {/* Goals & Achievements */}
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-10">
            <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight flex items-center">
              <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                <i className="bi bi-flag"></i>
              </span>
              Fő célkitűzéseink
            </h2>
            <div className="space-y-4">
              {mainGoals.map((goal, index) => (
                <div key={index} className="flex items-start p-5 bg-white/20 dark:bg-stone-900/20 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm group hover:border-blue-500/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-transparent rounded-[3rem] p-6 md:p-12 text-stone-900 dark:text-white shadow-sm dark:shadow-2xl border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-5 text-stone-900 dark:text-white group-hover:rotate-12 transition-transform duration-700">
              <i className="bi bi-bank text-9xl"></i>
            </div>
            <h2 className="text-3xl font-black mb-8 border-b border-stone-200 dark:border-white/10 pb-6">Eredményeink</h2>
            <div className="space-y-8 relative z-10">
              <p className="text-stone-600 dark:text-white/70 font-light leading-relaxed">
                Eltelt időszak alatt közel <strong className="text-stone-900 dark:text-white font-bold underline decoration-blue-500 decoration-4">száz egyetemi, főiskolai és középiskolai tanuló</strong> tanulmányait támogattuk.
              </p>
              <div className="grid gap-4">
                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Induló vagyon</p>
                  <p className="text-2xl font-black">1.000.000 Ft</p>
                  <p className="text-xs text-stone-400 dark:text-white/40 mt-1">Értékpapírban elhelyezve</p>
                </div>
                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Finanszírozás</p>
                  <p className="text-lg font-medium italic">&quot;Adó 1%-a és egyéni adományok&quot;</p>
                </div>
              </div>
              <p className="text-xs italic text-stone-400 dark:text-white/40 pt-4 border-t border-stone-200 dark:border-white/10 uppercase tracking-tight">
                Hálás köszönet minden adományozónak és az Önkormányzatnak!
              </p>
            </div>
          </div>
        </section>

        {/* Governing Bodies */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-stone-900 dark:text-white tracking-tight">Vezető Testületek</h2>
            <p className="max-w-2xl mx-auto text-stone-500 dark:text-stone-500 font-light italic">
              Tagjaink feladataikat önkéntesen, díjazás nélkül látják el, a falu iránti elköteleződésből.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Members */}
            <div className="bg-white/40 dark:bg-stone-900/40 p-6 md:p-10 rounded-[2.5rem] border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-wider">Jelenlegi tagok</h3>
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase">Aktív</span>
              </div>
              <div className="grid gap-6">
                <div>
                  <p className="text-xs font-black text-blue-600 uppercase mb-4 tracking-widest">Kuratórium</p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm font-medium text-stone-700 dark:text-stone-300">
                    {currentKuratorium.map((member, i) => (
                      <li key={i} className="flex items-center"><i className="bi bi-dot text-blue-600 text-xl"></i> {member}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
                  <p className="text-xs font-black text-blue-600 uppercase mb-4 tracking-widest">Ellenőrző Bizottság</p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm font-medium text-stone-700 dark:text-stone-300">
                    {currentEllenorzo.map((member, i) => (
                      <li key={i} className="flex items-center"><i className="bi bi-dot text-blue-600 text-xl"></i> {member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Former Members */}
            <div className="bg-stone-100/50 dark:bg-stone-900/30 p-6 md:p-10 rounded-[2.5rem] border border-stone-200 dark:border-stone-800 shadow-inner space-y-8">
              <h3 className="text-xl font-bold text-stone-400 dark:text-stone-600 uppercase tracking-wider">Alapítástól szolgált tagok</h3>
              <div className="grid gap-6">
                <div>
                  <p className="text-[10px] font-black text-stone-400 dark:text-stone-600 uppercase mb-4 tracking-widest">Kuratórium</p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-stone-500 dark:text-stone-500 italic">
                    {formerKuratorium.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                  <p className="text-[10px] font-black text-stone-400 dark:text-stone-600 uppercase mb-4 tracking-widest">Ellenőrző Bizottság</p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-stone-500 dark:text-stone-500 italic">
                    {formerEllenorzo.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing & Documents */}
        <section className="bg-white/40 dark:bg-stone-900/40 p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden relative">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl font-black text-stone-900 dark:text-white mb-4">Hasznos információk</h3>
              <p className="text-stone-600 dark:text-stone-400 font-light italic leading-relaxed">
                Bízunk benne, hogy ez a tájékoztató segít Önnek megismerni közalapítványunk fontos szerepét Tyukod mindennapi életében.
              </p>
            </div>
            <a
              href="https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/tyukodkozsegert/alap%C3%ADt%C3%B3%20okirat.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-stone-50 dark:bg-stone-800 rounded-[2.5rem] border border-stone-200 dark:border-stone-700 hover:border-blue-600 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white dark:bg-stone-700 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <i className="bi bi-file-earmark-pdf"></i>
              </div>
              <span className="font-bold text-stone-900 dark:text-white">Alapító okirat</span>
              <span className="text-xs text-stone-400 dark:text-stone-500 mt-1 uppercase tracking-widest font-black transition-colors group-hover:text-blue-600">PDF megnyitása</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
