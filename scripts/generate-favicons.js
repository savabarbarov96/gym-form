const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
  };

  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/dumbbell.svg'));

  // Generate PNG favicons for each size
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, '../public/', filename));
  }

  // Generate OG image
  const ogSvgBuffer = await fs.readFile(path.join(__dirname, '../public/og-image.svg'));
  await sharp(ogSvgBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));

  console.log('Generated all favicon and OG image files successfully!');
}

generateFavicons().catch(console.error); 