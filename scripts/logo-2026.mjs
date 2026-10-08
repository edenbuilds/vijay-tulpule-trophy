// Cuts the 08-10-2026 logo (scripts/brand-source/logo-2026-10-08.webp, white background) into transparent variants:
// logo-bar.png (with the "Hosted by" bar), logo.png (emblem only), the -reversed pair for navy (white sticker silhouette
// behind, the way the artwork's own white outline reads), and the square icon. Run: node scripts/logo-2026.mjs
import sharp from "sharp";
const SRC = "scripts/brand-source/logo-2026-10-08.webp", OUT = "public/brand/t26/";
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info, px = W * H;
// Flood-fill near-white pixels connected to the border: that is background; white inside the artwork (letter outlines) stays.
const bg = new Uint8Array(px), white = (i) => data[i * 4] > 232 && data[i * 4 + 1] > 232 && data[i * 4 + 2] > 232;
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) { const i = stack.pop(); if (bg[i] || !white(i)) continue; bg[i] = 1; const x = i % W;
  if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1); if (i >= W) stack.push(i - W); if (i < px - W) stack.push(i + W); }
const alpha = Buffer.alloc(px); for (let i = 0; i < px; i++) alpha[i] = bg[i] ? 0 : 255;
const soft = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).blur(0.7).extractChannel(0).raw().toBuffer();
for (let i = 0; i < px; i++) data[i * 4 + 3] = soft[i];
const cut = () => sharp(data, { raw: { width: W, height: H, channels: 4 } });
const BAR_TOP = 985; // the navy "Hosted by" bar starts below this row
// Crop to the bounding box of visible pixels (sharp's trim keys off the corner colour, which misfires on transparency).
async function save(name, img) {
  const { data: d, info: f } = await img.raw().toBuffer({ resolveWithObject: true });
  let x0 = f.width, y0 = f.height, x1 = 0, y1 = 0;
  for (let y = 0; y < f.height; y++) for (let x = 0; x < f.width; x++) if (d[(y * f.width + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const o = await sharp(d, { raw: f }).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png({ compressionLevel: 9 }).toBuffer({ resolveWithObject: true });
  await sharp(o.data).toFile(OUT + name); console.log(name, o.info.width, o.info.height); return o;
}
const bar = await save("logo-bar.png", cut());
const full = await save("logo.png", cut().extract({ left: 0, top: 0, width: W, height: BAR_TOP }));
// Reversed: white silhouette (alpha dilated ~10px) under the cut logo, for navy surfaces.
async function reversed(srcBuf, name) {
  const { width, height } = await sharp(srcBuf).metadata(), pad = 14;
  const a = await sharp(srcBuf).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).extractChannel(3).blur(7).threshold(8).toBuffer();
  const sil = await sharp({ create: { width: width + 2 * pad, height: height + 2 * pad, channels: 3, background: "#fff" } }).joinChannel(a).png().toBuffer();
  await sharp(sil).composite([{ input: srcBuf, left: pad, top: pad }]).png({ compressionLevel: 9 }).toFile(OUT + name);
  console.log(name, width + 2 * pad, height + 2 * pad);
}
await reversed(full.data, "logo-reversed.png"); await reversed(bar.data, "logo-bar-reversed.png");
// Icon: the High Court and the ball, on a white tile with a navy ring; also written as the app icons.
const emblem = await cut().extract({ left: 600, top: 170, width: 450, height: 455 }).png().toBuffer();
const em = await sharp(emblem).resize(420, 420, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="112" fill="#fff"/><rect x="10" y="10" width="492" height="492" rx="104" fill="none" stroke="#0B2A6B" stroke-width="20"/></svg>`);
const icon = await sharp(tile).composite([{ input: em, left: 46, top: 52 }]).png().toBuffer();
await sharp(icon).toFile(OUT + "icon.png"); await sharp(icon).toFile("src/app/icon.png"); await sharp(icon).resize(180, 180).toFile("src/app/apple-icon.png");
console.log("icon 512");
