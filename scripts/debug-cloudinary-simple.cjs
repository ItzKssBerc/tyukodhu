
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env' });

console.error('--- DEBUG SCRIPT START ---');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function run() {
    try {
        console.error('Fetching from Cloudinary...');
        const res = await cloudinary.search
            .expression('resource_type:image')
            .max_results(1)
            .execute();

        console.error('--- RESPONSE ---');
        console.error(JSON.stringify(res, null, 2));

        if (res.resources && res.resources.length > 0) {
            console.error('--- FIRST ITEM Secure URL ---');
            console.error(res.resources[0].secure_url);
        }

    } catch (e) {
        console.error('--- ERROR ---');
        console.error(e);
    }
}

run();
