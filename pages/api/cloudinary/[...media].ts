import { NextApiRequest, NextApiResponse } from "next";

/**
 * Extrém robusztus TinaCMS Cloudinary API Handler
 * Megakadályozza a Next.js 15 indítási (top-level import) hibákat.
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Első sorban naplózunk, hogy lássuk: a függvény elindul
  console.log(`[Cloudinary API] Request received: ${req.method} ${req.url}`);

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("[Cloudinary API] Missing env vars!");
      return res.status(500).json({ error: "Missing Cloudinary configuration" });
    }

    // Paraméter tisztítás (TinaCMS bug)
    if (req.query.thumbnailSizes && JSON.stringify(req.query.thumbnailSizes).includes("[object Object]")) {
      delete req.query.thumbnailSizes;
    }

    // Dinamikus importok a top-level hibák elkerülésére
    console.log("[Cloudinary API] Loading dependencies...");
    const { isAuthorized } = await import("@tinacms/auth");
    const { createMediaHandler } = await import("next-tinacms-cloudinary/dist/handlers");

    console.log("[Cloudinary API] Creating handler...");
    const mediaHandler = createMediaHandler({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      authorized: async (req, _res) => {
        try {
          if (process.env.NODE_ENV === "development") return true;
          const user = await isAuthorized(req);
          return !!(user && user.verified);
        } catch (e) {
          console.error("[Cloudinary API] Auth catch:", e);
          return false;
        }
      },
    });

    console.log("[Cloudinary API] Executing...");
    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("[Cloudinary API] FATAL ERROR:", error);
    // Vészhelyzeti JSON válasz, hogy ne HTML-t kapjon a böngésző
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }
}
