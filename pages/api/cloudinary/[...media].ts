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

  // Korai JSON válasz teszteléshez
  if (req.query.test === "true") {
    return res.status(200).json({
      status: "ok",
      message: "Cloudinary handler path reached (simple)",
      env: {
        hasCloud: !!cloudName,
        hasKey: !!apiKey,
        hasSecret: !!apiSecret,
      }
    });
  }

  if (!cloudName || !apiKey || !apiSecret) {
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
    // Dinamikus import a top-level hiba elkerülése végett
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
          console.error("Auth error:", e);
          return false;
        }
      },
    });

    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("Fatal error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

export default handler;
