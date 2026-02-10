require('dotenv').config();
const https = require('https');
const fs = require('fs');

const versionedUrl = "https://res.cloudinary.com/dqauo3hlh/image/upload/v1770731045/1._tyukodi_reform%C3%A1tus_templom_d6vahh.pdf";
const unversionedUrl = "https://res.cloudinary.com/dqauo3hlh/image/upload/1._tyukodi_reform%C3%A1tus_templom_d6vahh.pdf";

let log = "";

function check(url, label) {
    return new Promise(resolve => {
        https.get(url, (res) => {
            log += `${label} Status: ${res.statusCode}\n`;
            if (res.statusCode !== 200) {
                log += `${label} Headers: ${JSON.stringify(res.headers)}\n`;
            }
            resolve();
        }).on('error', (e) => {
            log += `${label} Error: ${e.message}\n`;
            resolve();
        });
    });
}

async function run() {
    await check(versionedUrl, "Versioned");
    await check(unversionedUrl, "Unversioned");
    fs.writeFileSync('debug_versions_result.txt', log);
    console.log("Written to debug_versions_result.txt");
}

run();
