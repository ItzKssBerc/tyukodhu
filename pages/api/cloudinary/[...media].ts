import { isAuthorized } from "@tinacms/auth";
import { NextApiRequest, NextApiResponse } from "next";

// Force Node.js runtime
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log(`[Cloudinary API] Request: ${req.method} ${req.url}`);
  console.log(`[Cloudinary API] Query params:`, JSON.stringify(req.query));

  // Korai JSON válasz teszteléshez
  if (req.query.test === "true") {
    console.log("[Cloudinary API] Test endpoint reached");
    return res.status(200).json({
      status: "ok",
      message: "Cloudinary handler path reached",
      runtime: process.env.NEXT_RUNTIME || "unknown",
      env: {
        hasCloud: !!cloudName,
        hasKey: !!apiKey,
        hasSecret: !!apiSecret,
        cloudNameValue: cloudName ? `${cloudName.substring(0, 3)}...` : null,
      }
    });
  }

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("[Cloudinary API] Configuration missing:", {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret
    });
    return res.status(500).json({
      error: "Cloudinary configuration missing",
      env: {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      }
    });
  }

  try {
    console.log("[Cloudinary API] Importing media handler...");
    // Dinamikus import a top-level hiba elkerülése végett
    const { createMediaHandler } = await import("next-tinacms-cloudinary/dist/handlers");

    console.log("[Cloudinary API] Creating media handler...");
    const mediaHandler = createMediaHandler({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      authorized: async (req, _res) => {
        try {
          if (process.env.NODE_ENV === "development") {
            console.log("[Cloudinary API] Auth: development mode, authorized");
            return true;
          }
          const user = await isAuthorized(req);
          const isAuthed = !!(user && user.verified);
          console.log(`[Cloudinary API] Auth check: ${isAuthed ? "Authorized" : "Unauthorized"}`);
          return isAuthed;
        } catch (e) {
          console.error("[Cloudinary API] Auth error in callback:", e);
          return false;
        }
      },
    });

    console.log("[Cloudinary API] Executing media handler...");
    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("[Cloudinary API] Fatal error in handler:", error);
    return res.status(500).json({
      error: "Cloudinary API Handler Error",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
};

export default handler;
