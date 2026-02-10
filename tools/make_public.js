require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = "1._tyukodi_református_templom_d6vahh";

async function makePublic() {
    try {
        console.log(`Updating ${publicId} to public...`);
        const result = await cloudinary.api.update(publicId, {
            access_mode: 'public',
            resource_type: 'image'
        });
        console.log("Result:", JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

makePublic();
