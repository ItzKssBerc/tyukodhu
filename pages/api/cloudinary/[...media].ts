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

    // 1. Környezeti változók ellenőrzése
    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({
        error: "Step 1 fail: Missing Cloudinary env vars",
        received: { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret }
      });
    }

    // 2. Csoportosítás és tisztítás
    if (req.query.thumbnailSizes && JSON.stringify(req.query.thumbnailSizes).includes("[object Object]")) {
      delete req.query.thumbnailSizes;
    }

    // 3. Függőségek betöltése külön-külön
    let isAuthorizedHelper;
    try {
      const authModule = await import("@tinacms/auth");
      isAuthorizedHelper = authModule.isAuthorized;
    } catch (e: any) {
      return res.status(500).json({ error: "Step 2 fail: Failed to load @tinacms/auth", message: e.message });
    }

    let createMedia;
    try {
      const cloudinaryModule = await import("next-tinacms-cloudinary/dist/handlers");
      createMedia = cloudinaryModule.createMediaHandler;
    } catch (e: any) {
      return res.status(500).json({ error: "Step 3 fail: Failed to load next-tinacms-cloudinary", message: e.message });
    }

    // 4. Handler létrehozása (Auth nélkül a teszt idejére)
    let mediaHandler;
    try {
      mediaHandler = createMedia({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        authorized: async (_req, _res) => true, // Átmenetileg kikapcsolva a tesztig
      });
    } catch (e: any) {
      return res.status(500).json({ error: "Step 4 fail: Failed to createMediaHandler", message: e.message });
    }

    // 5. Végrehajtás
    try {
      return await mediaHandler(req, res);
    } catch (e: any) {
      return res.status(500).json({ error: "Step 5 fail: Media handler execution error", message: e.message });
    }
  } catch (globalError: any) {
    return res.status(500).json({ error: "Global catch reached", message: globalError.message });
  }
}
