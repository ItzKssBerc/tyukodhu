import { isAuthorized } from "@tinacms/auth";
import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Szabványos TinaCMS Cloudinary API Handler
 * Next.js 15 kompatibilis (Pages Router)
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

    // Debug opció: /api/cloudinary/media?debug=true
    if (req.query.debug === "true") {
      return res.status(200).json({
        message: "Debug info",
        env: {
          cloudName: cloudName ? "Set" : "Missing",
          apiKey: apiKey ? "Set" : "Missing",
          apiSecret: apiSecret ? "Set" : "Missing",
        },
        query: req.query,
      });
    }

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({
        error: "Missing Cloudinary configuration",
        details: "Check your Vercel Environment Variables"
      });
    }

    // 1. TinaCMS / Cloudinary bug workaround: 
    // A Media Manager néha hibás '[object Object]' stringet küld a thumbnailSizes paraméterben,
    // ami 500-as hibát okozhat a Cloudinary SDK-ban.
    if (req.query.thumbnailSizes && JSON.stringify(req.query.thumbnailSizes).includes("[object Object]")) {
      delete req.query.thumbnailSizes;
    }

    // 2. Media Handler létrehozása a standard környezeti változókkal
    const mediaHandler = createMediaHandler({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      authorized: async (req, _res) => {
        try {
          // Fejlesztői környezetben engedélyezzük
          if (process.env.NODE_ENV === "development") return true;

          // Vercelen (Production) ellenőrizzük a Tina Cloud jogosultságot
          const user = await isAuthorized(req);
          return !!(user && user.verified);
        } catch (e) {
          console.error("Cloudinary Auth Error:", e);
          return false;
        }
      },
    });

    // 3. Kérés továbbítása a handlernek
    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("CRITICAL API ERROR:", error);
    return res.status(500).json({
      error: "Critical Server Error",
      message: error.message,
      path: req.url
    });
  }
}
