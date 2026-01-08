"use client";

import { useState, useEffect } from "react";

// Live Stream Page Component
export default function LiveStreamPage() {
  // Ezt a változót kell majd dinamikusan beállítani a szerver oldali állapot alapján.
  // Pl. egy API hívás eredményéből.
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Itt lehetne egy API hívás, hogy ellenőrizzük, megy-e a stream
    // setIsLive(true); // Teszteléshez
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Élő közvetítés
      </h1>

      {/* Videó lejátszó konténer */}
      {isLive ? (
        <div className="bg-black aspect-video mb-8 w-full">
          {/* Ide ágyazd be a streaming szolgáltató (pl. YouTube, Twitch) iframe kódját */}
          {/* Példa YouTube beágyazás: */}
          {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/VIDEO_ID_IDE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
          <div className="w-full h-full flex items-center justify-center text-white">
            Stream helye
          </div>
        </div>
      ) : (
        /* Offline banner */
        <div
          className="relative bg-cover bg-center border border-gray-300 dark:border-gray-700 text-white rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/images/stream/streambanner.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>
          <div className="relative flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4">
            <img
              src="/images/cimer.png"
              alt="Címer"
              className="h-28 sm:h-32 mx-auto mb-6"
            />
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              A közvetítés jelenleg nem elérhető.
            </h2>
            <p className="text-xl sm:text-2xl text-gray-200">
              Kérjük, látogasson vissza később.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
