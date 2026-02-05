import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { isAuthorized } from "@tinacms/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
  throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
}
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_CLOUDINARY_API_KEY is not set");
}
if (!apiSecret) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

export default createMediaHandler({
  cloud_name: cloudName as string,
  api_key: apiKey as string,
  api_secret: apiSecret as string,
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return true;
      }
      const user = await isAuthorized(req);
      return !!(user && user.verified); // Explicitly cast to boolean
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
