import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[Cloudinary API] Minimal handler reached:", req.url);
  return res.status(200).json({
    message: "Minimal catch-all handler is working",
    query: req.query,
    path: req.url
  });
}
