// Generates the black site logo from the official color artwork (brand/logo-color.png).
// Keeps the exact professional shape + transparency, just recolors to ink black.
// Run: node scripts/make-logo.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../brand/logo-color.png', import.meta.url));
const size = 512;
const INK = { r: 10, g: 9, b: 8 };

// 1) Resize the artwork onto a square transparent canvas
const resized = await sharp(src)
  .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

// 2) Use its alpha channel as a mask, recolor to ink black
const alphaRaw = await sharp(resized).ensureAlpha().extractChannel(3).raw().toBuffer();

const outPng = fileURLToPath(new URL('../public/logo.png', import.meta.url));
await sharp({ create: { width: size, height: size, channels: 3, background: INK } })
  .joinChannel(alphaRaw, { raw: { width: size, height: size, channels: 1 } })
  .png()
  .toFile(outPng);

// 3) Also keep the full-color logo available (served) for any future use
const outColor = fileURLToPath(new URL('../public/logo-color.png', import.meta.url));
await sharp(src).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(outColor);

// 4) Side-by-side preview (black on light + inverted on dark) for review
const black = await sharp(outPng).resize(300, 300).png().toBuffer();
const white = await sharp(outPng).resize(300, 300).negate({ alpha: false }).png().toBuffer();
await sharp({ create: { width: 760, height: 380, channels: 4, background: { r: 250, g: 250, b: 247, alpha: 1 } } })
  .composite([
    { input: { create: { width: 380, height: 380, channels: 4, background: { r: 5, g: 5, b: 5, alpha: 1 } } }, left: 380, top: 0 },
    { input: black, left: 40, top: 40 },
    { input: white, left: 420, top: 40 },
  ])
  .png()
  .toFile(fileURLToPath(new URL('../logo-preview.png', import.meta.url)));

console.log('OK: public/logo.png (black) + public/logo-color.png + logo-preview.png');
