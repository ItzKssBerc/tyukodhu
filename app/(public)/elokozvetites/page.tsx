import { client } from '@/tina/__generated__/client';

// Helper function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  let videoId: string | null = null;
  const watchRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/;
  const shortRegex = /(?:youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;

  let match = url.match(watchRegex);
  if (match && match[1]) {
    videoId = match[1];
  } else {
    match = url.match(shortRegex);
    if (match && match[1]) {
      videoId = match[1];
    }
  }

  if (videoId) {
    // Add rel=0 to prevent related videos from showing after the video ends
    // Add autoplay=1 to auto-play the video (optional, but common for live streams)
    // Add modestbranding=1 to remove YouTube logo (optional)
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  }

  return null;
}

// Live Stream Page Component
export default async function LiveStreamPage() {
  let liveStream: { isLive?: boolean | null; embedCode?: string | null; streamUrl?: string | null; } | null = null;

  const tinaData = await client.queries.liveStream({ relativePath: 'config.md' });
  liveStream = tinaData.data.liveStream;

  // Ha nincs konfigurálva a liveStream, vagy nincs aktív, alapértelmezett offline állapot
  const isLive = liveStream?.isLive || false;
  const embedCode = liveStream?.embedCode || "";
  const streamUrl = liveStream?.streamUrl || "";

  const finalStreamUrl = getYouTubeEmbedUrl(streamUrl);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Élő közvetítés
      </h1>

      {/* Videó lejátszó konténer */}
      {isLive && embedCode ? (
        <div className="bg-black aspect-video mb-8 w-full">
          {/*
            Fontos: Az ide beágyazott iframe-nek is rendelkeznie kell
            `width="100%"` és `height="100%"` attribútumokkal
            vagy a megfelelő Tailwind CSS osztályokkal (`w-full h-full`),
            hogy pontosan illeszkedjen a konténerbe.
            Ellenkező esetben a beágyazott kód felülírhatja a reszponzív viselkedést.
          */}
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: embedCode }} />
        </div>
      ) : isLive && finalStreamUrl ? (
        <div className="bg-black aspect-video mb-8 w-full">
          <iframe
            className="w-full h-full"
            src={finalStreamUrl}
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
