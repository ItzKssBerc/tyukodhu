
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { exec as legacyExec } from 'child_process';
import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import path from 'path';

const exec = promisify(legacyExec);

// --- Configuration ---
// Make sure your .env.local file has:
// CLOUDINARY_CLOUD_NAME=...
// CLOUDINARY_API_KEY=...
// CLOUDINARY_API_SECRET=...
// ---

async function main() {
  console.log('Starting migration from Git LFS to Cloudinary...');

  if (!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) && !process.env.CLOUDINARY_URL) {
    console.error('🛑 Error: Cloudinary environment variables are not set.');
    console.error('Please ensure either CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET OR CLOUDINARY_URL are in your .env.local file.');
    return;
  }
  
  // Cloudinary SDK is automatically configured by environment variables.

  let lfsFiles = [];
  try {
    console.log('Fetching list of files from Git LFS...');
    const { stdout } = await exec('git lfs ls-files');
    lfsFiles = stdout
      .trim()
      .split('\n')
      .map(line => line.split('* ')[1]?.trim())
      .filter(Boolean);

    if (lfsFiles.length === 0) {
      console.log('✅ No files found in Git LFS. Nothing to migrate.');
      return;
    }
    console.log(`Found ${lfsFiles.length} files to migrate.`);

  } catch (error) {
    console.error('🛑 Error fetching Git LFS files:', error);
    return;
  }

  const migrationMap = {};
  let successCount = 0;
  let errorCount = 0;

  console.log('\nStarting upload process...');

  for (const [index, filePath] of lfsFiles.entries()) {
    const logPrefix = `[${index + 1}/${lfsFiles.length}] ${filePath}`;
    try {
      // Create a public_id that preserves the folder structure from 'public' onwards
      // e.g., 'public/documents/file.pdf' -> 'documents/file'
      const publicId = filePath
        .replace(/^public[\\\/]/, '') // Remove 'public/' prefix
        .replace(/\.[^/.]+$/, '') // Remove file extension
        .trim(); // Trim trailing whitespace

      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'auto',
        folder: 'lfs-migration', // Optional: put all migrated files in a specific folder
        overwrite: true,
      });

      migrationMap[filePath] = result.secure_url;
      successCount++;
      console.log(`${logPrefix} -> ✅ Uploaded successfully: ${result.secure_url}`);

    } catch (error) {
      errorCount++;
      console.error(`${logPrefix} -> 🛑 Failed to upload:`, error.message || error);
      migrationMap[filePath] = { error: error.message || 'Unknown error' };
    }
  }
  
  console.log('\n--- Migration Summary ---');
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`🛑 Failed uploads: ${errorCount}`);
  
  try {
    await writeFile('lfs-migration-map.json', JSON.stringify(migrationMap, null, 2));
    console.log('\n📝 Migration map saved to lfs-migration-map.json');
  } catch (error) {
    console.error('🛑 Error saving migration map file:', error);
  }

  console.log('\nMigration script finished.');
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
});
