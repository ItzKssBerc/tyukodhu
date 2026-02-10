require('dotenv').config();
const https = require('https');
const fs = require('fs');

const url = "https://res.cloudinary.com/dqauo3hlh/image/upload/v1770731045/1._tyukodi_reform%C3%A1tus_templom_d6vahh.pdf";

console.log("Testing:", url);

https.get(url, (res) => {
    let log = `Status: ${res.statusCode}\n`;
    if (res.statusCode !== 200) {
        log += `Headers: ${JSON.stringify(res.headers)}\n`;
    }
    fs.writeFileSync('debug_plain.txt', log);
    console.log("Written to debug_plain.txt");
}).on('error', (e) => {
    console.error(`Error:`, e);
    fs.writeFileSync('debug_plain.txt', `Error: ${e.message}`);
});
