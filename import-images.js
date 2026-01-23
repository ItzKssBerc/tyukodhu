const fs = require('fs');
const path = require('path');

const SOURCE_BANNERS = path.join(__dirname, 'mentés', 'banners');
const SOURCE_PICS = path.join(__dirname, 'mentés', 'pics');
const PUBLIC_GALLERY_DIR = path.join(__dirname, 'public', 'images', 'gallery');
const CONTENT_IMAGES_DIR = path.join(__dirname, 'content', 'images');

// Mappák létrehozása
if (!fs.existsSync(PUBLIC_GALLERY_DIR)) {
  fs.mkdirSync(PUBLIC_GALLERY_DIR, { recursive: true });
}
if (!fs.existsSync(CONTENT_IMAGES_DIR)) {
  fs.mkdirSync(CONTENT_IMAGES_DIR, { recursive: true });
}

function processDirectory(dir, albumName) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, albumName);
    } else {
      // Csak képfájlokat dolgozunk fel
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'].includes(ext)) {
        importFile(fullPath, file, albumName);
      }
    }
  });
}

function importFile(sourcePath, filename, albumName) {
  const targetPath = path.join(PUBLIC_GALLERY_DIR, filename);
  
  // Ha már létezik, nem írjuk felül
  if (fs.existsSync(targetPath)) {
    console.log(`Skipping existing file: ${filename}`);
  } else {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied: ${filename}`);
  }

  // Slug generálása
  const nameWithoutExt = path.parse(filename).name;
  const slug = slugify(nameWithoutExt);

  // Content fájl létrehozása
  const contentPath = path.join(CONTENT_IMAGES_DIR, `${slug}.mdoc`);
  
  const content = `---
title: "${nameWithoutExt}"
album: "${albumName}"
description: "Importált kép: ${filename}"
image: "/images/gallery/${filename}"
publishedDate: ${new Date().toISOString().split('T')[0]}
publishedTime: "12:00"
---
`;

  fs.writeFileSync(contentPath, content);
  console.log(`Created content: ${slug}.mdoc`);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

console.log('Starting image import...');
processDirectory(SOURCE_BANNERS, 'Bannerek');
processDirectory(SOURCE_PICS, 'Hírek képek');
console.log('Image import finished.');
