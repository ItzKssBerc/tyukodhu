
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

console.error('--- MANUAL ENV LOAD START ---');

const envPath = path.resolve(__dirname, '../.env');
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            if (key && value && !key.startsWith('#')) {
                process.env[key] = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
            }
        }
    });
    console.error('--- ENV LOADED ---');
} catch (e) {
    console.error('Error loading .env:', e);
}

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
        if (res.resources.length > 0) {
            console.error('First item:', JSON.stringify(res.resources[0], null, 2));
        } else {
            console.error('No items found');
        }

    } catch (e) {
        console.error('--- ERROR ---');
        console.error(e);
    }
}

run();
