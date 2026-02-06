import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        message: "Debug API is working",
        env: {
            hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            hasApiKey: !!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
            hasTinaClientId: !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
            hasTinaToken: !!process.env.TINA_TOKEN,
            nodeEnv: process.env.NODE_ENV,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "not set"
        },
        headers: {
            host: req.headers.host,
        }
    });
}
