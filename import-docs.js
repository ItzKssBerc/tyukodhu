const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'mentés', 'docs');
const PUBLIC_DOCS_DIR = path.join(__dirname, 'public', 'documents');
const CONTENT_DOCS_DIR = path.join(__dirname, 'content', 'documents');

// Kategória megfeleltetés
const CATEGORY_MAP = {
  'regulations_docs': 'rendeletek',
  'regulations_attach': 'rendeletek',
  'news': 'egyeb',
  'news_attach': 'egyeb',
  'events_docs': 'egyeb',
  'institutes_docs': 'egyeb',
};

// Mappák létrehozása
if (!fs.existsSync(PUBLIC_DOCS_DIR)) {
  fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });
}
if (!fs.existsSync(CONTENT_DOCS_DIR)) {
  fs.mkdirSync(CONTENT_DOCS_DIR, { recursive: true });
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      // Csak PDF és egyéb dokumentumokat dolgozunk fel
      const ext = path.extname(file).toLowerCase();
      if (['.pdf', '.doc', '.docx', '.xls', '.xlsx'].includes(ext)) {
        importFile(fullPath, file);
      }
    }
  });
}

function importFile(sourcePath, filename) {
  // Egyedi fájlnév generálása ütközések elkerülése végett
  // Használjuk az eredeti nevet, de ha már létezik, akkor sorszámozzuk?
  // Egyszerűbb, ha a mappanevet is belefűzzük a fájlnévbe, ha almappában volt,
  // de most egyszerűen csak átmásoljuk.
  
  const targetPath = path.join(PUBLIC_DOCS_DIR, filename);
  
  // Ha már létezik, nem írjuk felül, hanem kihagyjuk (vagy adhatnánk új nevet)
  if (fs.existsSync(targetPath)) {
    console.log(`Skipping existing file: ${filename}`);
    // return; // Ha ki akarjuk hagyni. De lehet, hogy a content-et újra kell generálni.
  } else {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied: ${filename}`);
  }

  // Kategória meghatározása
  const parentDir = path.basename(path.dirname(sourcePath));
  let category = CATEGORY_MAP[parentDir] || 'egyeb';
  
  // Ha a fájlnévben van utalás
  const lowerName = filename.toLowerCase();
  if (lowerName.includes('jegyzokonyv')) category = 'jegyzokonyvek';
  if (lowerName.includes('hatarozat')) category = 'hatarozatok';
  if (lowerName.includes('meghivo')) category = 'meghivok';

  // Slug generálása (fájlnév kiterjesztés nélkül, ékezetek nélkül)
  const nameWithoutExt = path.parse(filename).name;
  const slug = slugify(nameWithoutExt);

  // Content fájl létrehozása
  const contentPath = path.join(CONTENT_DOCS_DIR, `${slug}.mdoc`);
  
  const content = `---
title: "${nameWithoutExt}"
category: ${category}
description: "Importált dokumentum: ${filename}"
file: "/documents/${filename}"
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
    .normalize('NFD') // Ékezetek leválasztása
    .replace(/[\u0300-\u036f]/g, '') // Ékezetek törlése
    .replace(/\s+/g, '-')           // Szóközök cseréje kötőjelre
    .replace(/[^\w\-]+/g, '')       // Nem alfanumerikus karakterek törlése
    .replace(/\-\-+/g, '-')         // Dupla kötőjelek cseréje
    .replace(/^-+/, '')             // Eleji kötőjel törlése
    .replace(/-+$/, '');            // Végi kötőjel törlése
}

console.log('Starting import...');
processDirectory(SOURCE_DIR);
console.log('Import finished.');
