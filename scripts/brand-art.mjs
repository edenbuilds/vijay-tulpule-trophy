// Rasterise the brand mark and logo into the Next.js metadata images. Run after scripts/brand-art.py and any edit to mark.svg:
//   BRAND_PUPPETEER=/path/to/node_modules/puppeteer-core node scripts/brand-art.mjs
// Chrome, not sharp, draws the date line so it uses the site's own Satoshi file (an SVG text render would fall back to a system font).
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const puppeteer = require(process.env.BRAND_PUPPETEER || "puppeteer-core");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = path.resolve(import.meta.dirname, "..");
const t26 = path.join(root, "public/brand/t26");
const app = path.join(root, "src/app");

const markSvg = fs.readFileSync(path.join(t26, "mark.svg"), "utf8");
const png = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

// App icon keeps the rounded corners; the Apple touch icon is full-bleed because iOS applies its own mask and would show black corners.
await sharp(await png(markSvg, 512)).toFile(path.join(app, "icon.png"));
await sharp(await png(markSvg.replace('rx="112"', 'rx="0"'), 180)).toFile(path.join(app, "apple-icon.png"));

// ICO container with three PNG frames (16, 32, 48); browsers read PNG-in-ICO since Vista.
const frames = await Promise.all([16, 32, 48].map((s) => png(markSvg, s)));
const head = Buffer.alloc(6 + 16 * frames.length);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(frames.length, 4);
let offset = head.length;
frames.forEach((f, i) => {
  const s = [16, 32, 48][i];
  head.writeUInt8(s, 6 + i * 16);
  head.writeUInt8(s, 7 + i * 16);
  head.writeUInt16LE(1, 10 + i * 16);
  head.writeUInt16LE(32, 12 + i * 16);
  head.writeUInt32LE(f.length, 14 + i * 16);
  head.writeUInt32LE(offset, 18 + i * 16);
  offset += f.length;
});
fs.writeFileSync(path.join(app, "favicon.ico"), Buffer.concat([head, ...frames]));

// Social card: sky canvas, logo, one date line.
const html = path.join(os.tmpdir(), "vtt-og.html");
fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Satoshi;src:url("file://${root}/src/app/fonts/Satoshi-Variable.woff2");font-weight:300 900}
html,body{margin:0;width:1200px;height:630px;background:#E7F0FF}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
img{height:440px}
p{margin:0;font:900 46px/1 Satoshi;color:#0B2A6B;letter-spacing:.01em}
</style><img src="file://${t26}/logo.png"><p>17 to 24 October 2026</p>`);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto("file://" + html);
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: "png" });
await browser.close();
fs.writeFileSync(path.join(app, "opengraph-image.png"), shot);
fs.writeFileSync(path.join(app, "twitter-image.png"), shot);
