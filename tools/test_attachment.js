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

const attachmentUrl = cloudinary.url(publicId, {
    resource_type: 'image',
    format: 'pdf',
    flags: 'attachment',
    sign_url: true // try signed too just in case
});

const unsignedAttachmentUrl = cloudinary.url(publicId, {
    resource_type: 'image',
    format: 'pdf',
    flags: 'attachment'
});

let log = "";

function check(url, label) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            log += `${label} Status: ${res.statusCode}\n`;
            log += `  URL: ${url}\n`;
            if (res.statusCode !== 200) {
                log += `  Headers: ${JSON.stringify(res.headers)}\n`;
            }
            resolve();
        }).on('error', (e) => {
            log += `${label} Error: ${e.message}\n`;
            resolve();
        });
    });
}

async function run() {
    await check(attachmentUrl, "Signed Attachment");
    await check(unsignedAttachmentUrl, "Unsigned Attachment");
    fs.writeFileSync('debug_attachment.txt', log);
    console.log("Written to debug_attachment.txt");
}

run();
