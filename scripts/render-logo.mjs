// Regenerates public/logo.png (raster, transparent) from public/logo.svg.
// Used for favicon, og:image and schema.org logo. Run: node scripts/render-logo.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const svg = readFileSync(new URL('../public/logo.svg', import.meta.url));
const out = fileURLToPath(new URL('../public/logo.png', import.meta.url));

await sharp(svg, { density: 384 })
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(out);

console.log('OK: public/logo.png regenerated from logo.svg');
