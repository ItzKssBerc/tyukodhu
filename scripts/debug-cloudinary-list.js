
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env' });

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function listMedia() {
    try {
        console.log('Fetching media from Cloudinary...');
        const results = await cloudinary.search
            .expression('resource_type:image')
            .sort_by('created_at', 'desc')
            .max_results(5)
            .execute();

        console.log('--- Raw First Item ---');
        if (results.resources.length > 0) {
            console.log(JSON.stringify(results.resources[0], null, 2));
            console.log('----------------------');
            console.log('Checking secure_url:', results.resources[0].secure_url);
        } else {
            console.log('No images found.');
        }

    } catch (error) {
        console.error('Error listing media:', error);
    }
}

listMedia();
