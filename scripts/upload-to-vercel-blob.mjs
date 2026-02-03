
import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import 'dotenv/config';

// --- Configuration ---
// This script requires the BLOB_READ_WRITE_TOKEN environment variable.
// ---

const filesToUpload = [
  'public/documents/1602.pdf',
  'public/documents/1619.pdf',
  'public/tyukodertektara/21. dr. szalay zsigmond helytörténeti gyüjtemény.pdf',
  'public/tyukodertektara/6. Úrihimzéses Úrasztali terítők.pdf',
  'public/tyukodertektara/kapcsolododokumentumok/21. dr. szalay zsigmond helytörténeti gyüjtemény.pdf',
  'public/tyukodertektara/kapcsolododokumentumok/6. Úrihimzéses Úrasztali terítők.pdf'
];

async function main() {
  console.log('Starting upload of large files to Vercel Blob...');

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('🛑 Error: Vercel Blob environment variable is not set.');
    console.error('Please add BLOB_READ_WRITE_TOKEN to your .env.local file.');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const [index, filePath] of filesToUpload.entries()) {
    const logPrefix = `[${index + 1}/${filesToUpload.length}] ${filePath}`;
    try {
      const fileBuffer = await fs.readFile(filePath);
      const fileName = path.basename(filePath);

      console.log(`${logPrefix} -> Uploading...`);

      const blob = await put(fileName, fileBuffer, {
        access: 'public',
      });

      console.log(`${logPrefix} -> ✅ Uploaded successfully: ${blob.url}`);
      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`${logPrefix} -> 🛑 Failed to upload:`, error.message || error);
    }
  }

  console.log('\n--- Vercel Blob Upload Summary ---');
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`🛑 Failed uploads: ${errorCount}`);
  
  if (errorCount === 0) {
    console.log('\nAll large files have been successfully migrated to Vercel Blob!');
  } else {
    console.log('\nSome files could not be uploaded. Please check the errors above.');
  }
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
});
