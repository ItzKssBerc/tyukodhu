require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const files = [
    {
        url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/6.%20%C3%9Arihimz%C3%A9ses%20%C3%9Arasztali%20ter%C3%ADt%C5%91k.pdf",
        public_id: "6._úrihimzéses_úrasztali_terítők" // simplified ID
    },
    {
        url: "https://iggprj7vxvjr1ueg.public.blob.vercel-storage.com/21.%20dr.%20szalay%20zsigmond%20helyt%C3%B6rt%C3%A9neti%20gy%C3%BCjtem%C3%A9ny.pdf",
        public_id: "21._dr._szalay_zsigmond_helytörténeti_gyűjtemény"
    }
];

async function upload() {
    for (const file of files) {
        console.log(`Uploading ${file.public_id}...`);
        try {
            const result = await cloudinary.uploader.upload(file.url, {
                public_id: file.public_id,
                resource_type: "image", // upload as image to enable PDF thumbnails? or 'auto'
                // PDF as 'image' allows page extraction. 'raw' does not.
                // Usually large PDFs might fail as 'image'. Let's try 'auto' or 'image'.
                // Cloudinary treats PDFs as images by default for transformation purposes.
            });
            console.log(`Success: ${result.public_id}`);
            console.log(result);
        } catch (e) {
            console.error(`Error uploading ${file.public_id}:`, e);
        }
    }
}

upload();
