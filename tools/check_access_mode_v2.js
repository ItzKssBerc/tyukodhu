require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = "1._tyukodi_református_templom_d6vahh";

async function check() {
    try {
        const resource = await cloudinary.api.resource(publicId);
        let out = "";
        out += `ID: ${resource.public_id}\n`;
        out += `Type: ${resource.type}\n`;
        out += `Access Mode: ${resource.access_mode}\n`;
        out += `Access Control: ${JSON.stringify(resource.access_control)}\n`;
        out += `URL: ${resource.url}\n`;
        out += `Secure URL: ${resource.secure_url}\n`;

        fs.writeFileSync('debug_access_v2.txt', out);
        console.log("Written to debug_access_v2.txt");
    } catch (err) {
        console.error(err);
        fs.writeFileSync('debug_access_v2.txt', "Error: " + JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
}

check();
