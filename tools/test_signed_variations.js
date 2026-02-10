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
const version = "1770731045";

const tests = [
    {
        label: "Signed + Authenticated",
        url: cloudinary.url(publicId, {
            resource_type: 'image', format: 'pdf', sign_url: true, type: 'authenticated', version: version, secure: true
        })
    },
    {
        label: "Signed + Private",
        url: cloudinary.url(publicId, {
            resource_type: 'image', format: 'pdf', sign_url: true, type: 'private', version: version, secure: true
        })
    }
];

let log = "";

function check(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            log += `${test.label}: Status ${res.statusCode}\n`;
            log += `  URL: ${test.url}\n`;
            if (res.statusCode !== 200) {
                log += `  Headers: ${JSON.stringify(res.headers)}\n`;
            }
            resolve();
        }).on('error', (e) => {
            log += `${test.label}: Error ${e.message}\n`;
            resolve();
        });
    });
}

async function run() {
    for (const test of tests) {
        await check(test);
    }
    fs.writeFileSync('debug_types.txt', log);
    console.log("Written to debug_types.txt");
}

run();
