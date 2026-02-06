import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { isAuthorized } from "@tinacms/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Media handler invoked", {
    method: req.method,
    query: req.query,
    hasCloudName: !!cloudName,
    hasApiKey: !!apiKey,
    hasApiSecret: !!apiSecret,
    nodeEnv: process.env.NODE_ENV
  });

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary configuration missing:", {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret,
    });
    res.status(500).json({
      error: "Cloudinary configuration missing on server",
      details: {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      }
    });
    return;
  }

  try {
    const mediaHandler = createMediaHandler({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      authorized: async (req, _res) => {
        try {
          if (process.env.NODE_ENV === "development") {
            return true;
          }

          const user = await isAuthorized(req);
          const authorized = !!(user && user.verified);

          console.log("Auth check results:", {
            authorized,
            isVerified: user?.verified,
            hasUser: !!user,
          });

          return authorized;
        } catch (e) {
          console.error("Media authorization error callback:", e);
          return false;
        }
      },
    });

    return await mediaHandler(req, res);
  } catch (error: any) {
    console.error("Fatal error in media handler:", error);
    res.status(500).json({
      error: "Internal Server Error in Media Handler",
      message: error.message
    });
  }
};

export default handler;
