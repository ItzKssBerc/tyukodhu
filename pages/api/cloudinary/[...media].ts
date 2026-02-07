import { NextApiRequest, NextApiResponse } from "next";

/**
 * Végleges, robusztus TinaCMS Cloudinary API Handler
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ error: "Cloudinary configuration missing in Vercel env" });
    }

    // Paraméter tisztítás (TinaCMS bug: thumbnailSizes=[object Object] küldése)
    if (req.query.thumbnailSizes && JSON.stringify(req.query.thumbnailSizes).includes("[object Object]")) {
      delete req.query.thumbnailSizes;
    }

    // Dinamikus importok a Next.js 15 indítási hibák elkerülésére
    const { isAuthorized } = await import("@tinacms/auth");
    const { createMediaHandler } = await import("next-tinacms-cloudinary/dist/handlers");

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
          console.error("Auth helper error:", e);
          return false;
        }
      },
    });

    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("FATAL API ERROR:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      });
    }
  }
}
