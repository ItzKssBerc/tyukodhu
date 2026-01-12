import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";

// Live Stream Page Component
export default async function LiveStreamPage() {
  const reader = createReader(process.cwd(), config);
  const liveStream = await reader.singletons.liveStream.read();

  // Ha nincs konfigurálva a liveStream, vagy nincs aktív, alapértelmezett offline állapot
  const isLive = liveStream?.isLive || false;
  const embedCode = liveStream?.embedCode || "";
  const streamUrl = liveStream?.streamUrl || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Élő közvetítés
      </h1>

      {/* Videó lejátszó konténer */}
      {isLive && embedCode ? (
        <div
          className="bg-black aspect-video mb-8 w-full"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      ) : isLive && streamUrl ? (
        <div className="bg-black aspect-video mb-8 w-full">
          <iframe
            className="w-full h-full"
            src={streamUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Élő közvetítés"
          ></iframe>
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
