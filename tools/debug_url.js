require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const prefix = "1._tyukodi_református_templom";

async function checkResource() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: prefix,
            max_results: 10,
            context: true,
            tags: true,
            moderation: true
        });

        fs.writeFileSync('debug_access.txt', JSON.stringify(result, null, 2));
        console.log("Result written to debug_access.txt");

    } catch (error) {
        console.error("Error:", error);
        fs.writeFileSync('debug_access.txt', "Error: " + JSON.stringify(error));
    }
}

checkResource();
