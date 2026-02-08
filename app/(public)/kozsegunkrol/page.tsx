"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const timelineEvents = [
    { year: "1181", text: "Írásos emlékek említik először a község nevét Tenykod formában.", icon: "bi-feather" },
    { year: "1899", text: "Elkészült az új községháza, és azóta van itt előljáróság.", icon: "bi-building-gear" },
    { year: "1904", text: "Megépült a vasútvonal Porcsalma határában, mely piacilag sokat jelentett a tyukodiak számára is.", icon: "bi-train-front" },
    { year: "1913", text: "Az állami iskola 60 tanulója kiránduláson járt Nagybányán.", icon: "bi-bus-front" },
    { year: "1925", text: "Megalakult a levente egyesület és az önkéntes tűzoltó testület.", icon: "bi-shield-check" },
    { year: "1929", text: "Elkezdődött a község közvilágítási hálózatának kiépítése.", icon: "bi-lightbulb" },
    { year: "1933", text: "Újabb iskolaépület készült el.", icon: "bi-mortarboard" },
    { year: "1937", text: "Megkezdődött az önálló orvosi gyógyellátás.", icon: "bi-heart-pulse" },
    { year: "1942", text: "Kenderfeldolgozó-üzem indult, a későbbi Konzervgyár elődje.", icon: "bi-buildings" },
    { year: "1948", text: "Megalakult a Mezőgazdasági Gépállomás.", icon: "bi-gear-wide-connected" },
    { year: "1950", text: "A települést Nagyközséggé nyilvánították.", icon: "bi-flag" },
    { year: "1969", text: "A mátészalkai járáshoz került a község.", icon: "bi-geo-alt" },
    { year: "1970-es évek", text: "A nagy építkezések korszaka, kialakult a község mai képe.", icon: "bi-house-heart" },
    { year: "1992", text: "Befejeződött az utak aszfaltozása, kiépült a vezetékes víz és gáz.", icon: "bi-droplet" },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the timeline section
      // Start when the top of the timeline reaches the middle of the screen
      // End when the bottom of the timeline reaches the middle of the screen
      const start = rect.top - windowHeight * 0.5;
      const totalHeight = rect.height;

      const progress = Math.max(0, Math.min(1, -start / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 transition-colors duration-500">

      {/* Hero Section */}
      <section className="relative py-32 bg-stone-50 dark:bg-stone-900/40 border-b border-stone-200 dark:border-stone-800/50 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 dark:text-white tracking-tight mb-6">
            Tyukod <span className="text-blue-600 font-light italic">múltja</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Időutazás a középkortól napjainkig. Ismerje meg közösségünk lenyűgöző történetét és fejlődését.
          </p>
          <div className="mt-12 h-1.5 w-24 bg-blue-600 rounded-full mx-auto"></div>
        </div>
      </section>

      {/* Main Narrative - Linear Flow */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32">

        {/* Section 1: Eredet */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-blue-600">
            <i className="bi bi-feather text-3xl"></i>
            <h2 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white">A történet kezdete</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              Írásos emlékek <strong className="font-semibold text-stone-900 dark:text-white underline decoration-blue-500/30 decoration-4">1181-ben</strong> említik először a község nevét. Az évszázadok során számos változatban fordult elő: Tenykod, Tenykowd, Egyedkuttya, Eketyukod.
            </p>
            <p>
              A név eredete a Tyukodi nemzetséghez köthető, mely a magyar tyúk főnév "-d" képzős változata. Bár a név 1181-ben tűnik fel először, a település valószínűleg már évszázadokkal korábban is létezett a láp szigetein.
            </p>
          </div>
        </section>

        {/* Section 2: Láp */}
        <section className="grid md:grid-cols-[100px_1fr] gap-8">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 border border-blue-200 dark:border-blue-800">
              <i className="bi bi-water text-2xl"></i>
            </div>
            <div className="flex-grow w-px bg-gradient-to-b from-blue-600/20 to-transparent mt-4"></div>
          </div>
          <div className="bg-stone-50 dark:bg-stone-900/40 p-10 rounded-[2.5rem] border border-stone-100 dark:border-stone-800/50 shadow-sm">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">Az Ecsedi-láp világa</h3>
            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              A terület legnagyobb részét valaha láp borította. Ez a vidék nem összefüggő víztükör volt, hanem kisebb-nagyobb szigetek hálózata, melyek ideális letelepedési helyet biztosítottak. A tatárjárás idején a lakók ezekre a szigetekre menekültek, hátrahagyva javaikat a pusztító hordáknak.
            </p>
          </div>
        </section>

        {/* Section 3: Küzdelmek */}
        <section className="grid md:grid-cols-[1fr_100px] gap-8 text-right">
          <div className="bg-stone-50 dark:bg-stone-900/40 p-10 rounded-[2.5rem] border border-stone-100 dark:border-stone-800/50 shadow-sm">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">Hadseregek útján</h3>
            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              A tyukodiak minden fontos szabadságharcban ott voltak. Részt vettek a Dózsa-féle parasztháborúban, ami után birtokelkobzással sújtották a nemeseket. Hadba hívta őket Rákóczi is, majd az 1848-as szabadságharcban önálló alakulattal küzdöttek. A két világháború áldozataira ma emlékművek hívják fel a figyelmet.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 border border-blue-200 dark:border-blue-800">
              <i className="bi bi-shield-shaded text-2xl"></i>
            </div>
            <div className="flex-grow w-px bg-gradient-to-b from-blue-600/20 to-transparent mt-4"></div>
          </div>
        </section>

        {/* Timeline Section - Animated */}
        <section className="space-y-12 py-12 border-t border-stone-100 dark:border-stone-800">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-stone-900 dark:text-white uppercase tracking-widest">Idővonal</h2>
            <p className="text-stone-500 dark:text-stone-400 font-light mt-2">Görgessen lefelé a történelem felfedezéséhez</p>
          </div>

          <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
            {/* Background Base Line */}
            <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 w-0.5 bg-stone-100 dark:bg-stone-800/50"></div>

            {/* Active Drawing Line */}
            <div
              className="absolute left-[23px] md:left-[27px] top-6 w-0.5 bg-blue-600 transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress * 100}%`, maxHeight: 'calc(100% - 48px)' }}
            ></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const itemThreshold = index / (timelineEvents.length - 1);
                const isActive = scrollProgress >= itemThreshold;

                return (
                  <div key={index} className="relative grid grid-cols-[48px_1fr] md:grid-cols-[60px_1fr] gap-x-6 md:gap-x-12 items-start group">
                    {/* Left Column: Point/Icon */}
                    <div className="relative z-10 flex justify-center">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${isActive
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-110'
                          : 'bg-white dark:bg-stone-900 text-stone-300 dark:text-stone-700 border-2 border-stone-100 dark:border-stone-800'
                        }`}>
                        <i className={`bi ${event.icon} text-lg md:text-xl`}></i>
                      </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-700 ${isActive
                        ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xl translate-x-1'
                        : 'bg-stone-50/30 dark:bg-stone-900/5 border-transparent opacity-50'
                      }`}>
                      <div className={`font-black text-xl md:text-2xl mb-2 tracking-tighter transition-colors duration-700 ${isActive ? 'text-blue-600' : 'text-stone-400 dark:text-stone-700'
                        }`}>
                        {event.year}
                      </div>
                      <p className={`font-light leading-relaxed text-sm md:text-base transition-colors duration-700 ${isActive ? 'text-stone-600 dark:text-stone-300' : 'text-stone-400 dark:text-stone-700'
                        }`}>
                        {event.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="py-24 text-center bg-stone-50 dark:bg-stone-900 p-12 md:p-18 rounded-[3rem] border border-stone-100 dark:border-stone-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-white mb-8 tracking-tight">
            Új évezred, <span className="text-blue-600">új remények</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-6 font-light text-lg text-stone-600 dark:text-stone-400">
            <p>
              A 21. század első évtizedei a teljes infrastrukturális megújulásról szólnak. Megújult utak, templomok és közösségi terek várják a közel 2000 tyukodi lakost.
            </p>
            <p className="font-medium text-stone-900 dark:text-stone-200">
              Múltunk tisztelete és a jövőbe vetett hit vezérel minket ezen az úton.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
