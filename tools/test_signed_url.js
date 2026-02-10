require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const https = require('https');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = "1._tyukodi_református_templom_d6vahh";

const signedUrl = cloudinary.url(publicId, {
    resource_type: 'image',
    format: 'pdf',
    sign_url: true,
    secure: true
});

let log = `Testing Signed URL: ${signedUrl}\n`;

function check(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            log += `Status: ${res.statusCode}\n`;
            if (res.statusCode !== 200) {
                log += `Headers: ${JSON.stringify(res.headers)}\n`;
            }
            resolve();
        }).on('error', (e) => {
            log += `Error: ${e.message}\n`;
            resolve();
        });
    });
}

async function run() {
    await check(signedUrl);
    fs.writeFileSync('debug_signed_result.txt', log);
    console.log("Written to debug_signed_result.txt");
}

run();
