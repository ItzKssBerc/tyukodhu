import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        message: "Cloudinary folder is accessible",
        path: req.url
    });
}
