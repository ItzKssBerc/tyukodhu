require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = "1._tyukodi_református_templom_d6vahh";

async function run() {
    try {
        console.log(`Setting anonymous access for ${publicId}...`);
        // access_control is an array of objects
        // start_date, end_date, access_type
        const result = await cloudinary.api.update(publicId, {
            access_control: [{ access_type: 'anonymous' }],
            resource_type: 'image'
        });
        console.log("Result:", JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

run();
