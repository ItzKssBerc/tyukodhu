require('dotenv').config();
const https = require('https');
const fs = require('fs');

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const vercelUrl = "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/6.%20%C3%9Arihimz%C3%A9ses%20%C3%9Arasztali%20ter%C3%ADt%C5%91k.pdf";

// Try to use Cloudinary Fetch to get page 1 as JPG
const fetchUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/pg_1,f_jpg/${vercelUrl}`;

console.log("Testing Fetch URL:", fetchUrl);

https.get(fetchUrl, (res) => {
    let log = `Status: ${res.statusCode}\n`;
    if (res.statusCode !== 200) {
        log += `Headers: ${JSON.stringify(res.headers)}\n`;
    }
    fs.writeFileSync('debug_fetch.txt', log);
    console.log("Written to debug_fetch.txt");
}).on('error', (e) => {
    console.error(`Error:`, e);
    fs.writeFileSync('debug_fetch.txt', `Error: ${e.message}`);
});
