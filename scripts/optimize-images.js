const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'img', 'illustration');
const FULL_DIR = path.join(SRC_DIR, 'optimized');
const THUMB_DIR = path.join(SRC_DIR, 'thumbs');

const FULL_MAX_WIDTH = 1920;
const THUMB_MAX_WIDTH = 600;
const WEBP_QUALITY = 82;

fs.mkdirSync(FULL_DIR, { recursive: true });
fs.mkdirSync(THUMB_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f =>
  /\.(jpe?g|png)$/i.test(f)
);

async function processImage(filename) {
  const src = path.join(SRC_DIR, filename);
  const name = path.parse(filename).name;

  // Full-size WebP
  await sharp(src)
    .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(FULL_DIR, `${name}.webp`));

  // Thumbnail WebP
  await sharp(src)
    .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(THUMB_DIR, `${name}.webp`));

  const srcStat = fs.statSync(src);
  const fullStat = fs.statSync(path.join(FULL_DIR, `${name}.webp`));
  const thumbStat = fs.statSync(path.join(THUMB_DIR, `${name}.webp`));

  const savings = ((1 - fullStat.size / srcStat.size) * 100).toFixed(0);
  console.log(
    `  ${filename}: ${(srcStat.size / 1024).toFixed(0)}KB -> ` +
    `full ${(fullStat.size / 1024).toFixed(0)}KB (-${savings}%), ` +
    `thumb ${(thumbStat.size / 1024).toFixed(0)}KB`
  );
}

async function main() {
  console.log(`Optimizing ${files.length} images...\n`);
  for (const file of files) {
    await processImage(file);
  }
  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
