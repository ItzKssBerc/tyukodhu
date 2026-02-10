require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listResources() {
    try {
        const images = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            max_results: 500
        });

        // Print as JSON array of public_ids
        const ids = images.resources.map(r => r.public_id);
        fs.writeFileSync('cloudinary_ids.json', JSON.stringify(ids, null, 2));
        console.log("IDs written to cloudinary_ids.json");

    } catch (error) {
        console.error("Error listing resources:", error);
    }
}

listResources();
