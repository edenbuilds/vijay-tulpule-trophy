// Builds the two A4 PDFs in public/downloads from src/lib/{site,schedule,teams}.ts, so the files never drift from the site.
// Run after changing the schedule, teams, tiers or terms:  npm run downloads  (Node 24, Google Chrome installed)
// The fixtures PDF is the sheet of 06-10-2026 and nothing more: days and grounds, no times, no stage names, no match-ups (groups are not drawn).
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { GROUNDS, SCHEDULE, groundLabel } from "../src/lib/schedule.ts";
import { TEAMS } from "../src/lib/teams.ts";
import { CONTACTS, EVENT, HOSTS, HOSTS_LINE, ORG, PARTNERS, TERMS, TIERS, nb } from "../src/lib/site.ts";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = resolve(import.meta.dirname, "..");
const font = pathToFileURL(join(root, "src/app/fonts/Satoshi-Variable.woff2")).href;
const file = (p: string) => pathToFileURL(join(root, "public", p)).href;
const tmp = mkdtempSync(join(tmpdir(), "vtt-"));

// Brand: navy #0B2A56, royal #1E6FBF, red #D62828, sky #E7F0FF (docs/REDESIGN.md section 3). Red is the "Final" marker only.
const page = (title: string, body: string) => `<!doctype html><meta charset="utf-8"><title>${title}</title><style>
@font-face{font-family:Satoshi;src:url(${font}) format("woff2");font-weight:300 900}
@page{size:A4;margin:14mm 14mm 16mm}
*{box-sizing:border-box;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font:10.5pt/1.45 Satoshi,sans-serif;color:#0B2A56;font-variant-numeric:tabular-nums}
header{position:relative;overflow:hidden;background:#0B2A56;color:#fff;border-radius:14px;padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;gap:22px;min-height:118px}
header .logo{height:84px;width:auto;flex:none;position:relative;z-index:1}
header .t{position:relative;z-index:1;max-width:300px}
header .stroke{position:absolute;right:-60px;bottom:-46px;width:300px;height:auto}
h1{font-size:26pt;line-height:1.05;font-weight:900;letter-spacing:-.03em;text-transform:uppercase}
header p{margin-top:6px;color:#ffffffcc;font-size:10pt}
p,li{text-wrap:balance}
h2{font-size:14pt;font-weight:900;letter-spacing:-.02em;text-transform:uppercase;margin:22px 0 8px;break-after:avoid}
.lead{color:#0B2A56b3;margin-bottom:10px}
.hosts{display:flex;align-items:center;gap:16px;margin-bottom:4px}.hosts img{height:38px;width:auto}.hosts p{font-size:9pt;color:#0B2A56b3;margin-left:auto;max-width:260px;text-align:right}
table{width:100%;border-collapse:collapse}
td,th{text-align:left;padding:7px 8px;border-bottom:1px dashed #0B2A5629;vertical-align:top}
th{font-size:9pt;font-weight:700;color:#0B2A56b3;border-bottom:1px solid #0B2A5640}
tr{break-inside:avoid}
.d{font-weight:800;white-space:nowrap;width:26mm}.d small{display:block;font-weight:400;color:#0B2A56b3;font-size:9pt}
.g{display:grid;grid-template-columns:1fr 1fr;gap:3px 18px}
.final{color:#D62828;font-weight:800;margin-left:6px}
.m{color:#0B2A56b3}
.note{margin-top:12px;background:#E7F0FF;border-radius:12px;padding:12px 16px;font-weight:700}
.teams{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 14px}
.team{display:flex;align-items:center;gap:10px;break-inside:avoid}
.team .w{width:34px;height:34px;flex:none;border-radius:50%;background:#fff;border:1px solid #CFE0FA;display:grid;place-items:center;overflow:hidden}
.team img{width:100%;height:100%;object-fit:contain}
.team b{font-weight:700;line-height:1.2}
.tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.tier{background:#E7F0FF;border-radius:12px;padding:14px}
.tier.top{background:#0B2A56;color:#fff}
.tier b{display:block;font-size:15pt;font-weight:900;letter-spacing:-.02em;margin-top:10px}
.tier span{display:block;margin-top:2px;font-size:9.5pt;opacity:.75}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px}
footer{margin-top:24px;padding-top:10px;border-top:1px dashed #0B2A5640;font-size:8.5pt;color:#0B2A56b3;text-wrap:balance}
</style><body>${body}<footer>${ORG.name} · ${nb(ORG.trust)} · ${ORG.email} · <span style="white-space:nowrap">${ORG.phone}</span> · vijay-tulpule-trophy.vercel.app</footer>`;

const head = (title: string, sub: string) =>
  `<header><img class="logo" src="${file("brand/t26/logo-reversed.png")}" alt="${EVENT.edition}, Mumbai 2026"><div class="t"><h1>${title}</h1><p>${sub}</p></div><img class="stroke" src="${file("brand/t26/stroke.svg")}" alt=""></header>`;

// A day with grounds lists them two to a line; a day without one says why. "Final" is printed only where the sheet marks it.
const days = SCHEDULE.map((d) => {
  const grounds = d.grounds.map((id) => `<span>${groundLabel(GROUNDS[id])}${d.finals?.includes(id) ? '<span class="final">Final</span>' : ""}</span>`).join("");
  const what = d.grounds.length ? `<div class="g">${grounds}</div>` : `<b>${d.title}.</b> <span class="m">${d.note ?? ""}</span>`;
  return `<tr><td class="d">${d.short}<small>${d.weekday}</small></td><td>${what}</td></tr>`;
}).join("");

const fixtures = page(
  "BACA 2026 Fixtures",
  head("Fixtures", `Mumbai · ${EVENT.overs} overs a side`) +
    `<h2>Schedule</h2><table><tr><th>Day</th><th>Grounds</th></tr>${days}</table>
    <p class="note">Match-ups will be published after the draw.</p>
    <section style="break-inside:avoid"><h2>The teams</h2><p class="lead">Practising Advocates from 15 High Courts of India and the Supreme Court of India. Groups will be announced after the draw.</p>
    <div class="teams">${TEAMS.map((t) => `<div class="team"><span class="w"><img src="${file(t.logo)}" alt=""></span><b>${t.name}</b></div>`).join("")}</div></section>
    <h2>Points</h2><p>Win 2. Tie or no result 1. Loss 0. Tie-break: net run rate, then head-to-head, then fewest wickets lost per run scored, then lots. How teams go through to the later rounds will be confirmed after the draw.</p>`,
);

// Host, co-hosts and aegis marks for the sponsorship brief, so a sponsor sees who it is partnering with.
const hosts = `<div class="hosts">${[HOSTS.host, ...HOSTS.cohosts, HOSTS.aegis].map((o) => `<img src="${file(o.logo)}" alt="${o.short}">`).join("")}<p>${HOSTS_LINE}</p></div>`;

const sponsorship = page(
  "BACA 2026 Sponsorship",
  head("Sponsorship", "Sixteen teams from fifteen High Courts and the Supreme Court of India · 17 to 24 October 2026") +
    `${hosts}<h2>Tiers</h2><div class="tiers">${[...TIERS].reverse().map((t) => `<div class="tier${t.name === "Platinum" ? " top" : ""}">${t.name}<b>${t.price}</b><span>${t.line}</span></div>`).join("")}</div>
    <p style="margin-top:10px">Every sponsor is named, by tier, at the opening, at the finals and at every ground. Sizes and placings follow the tier.</p>
    <h2>Partner roles</h2><div class="grid">${PARTNERS.map(([k, v]) => `<p><b>${k}.</b> ${v}</p>`).join("")}</div>
    <h2>Terms</h2><ol style="padding-left:18px">${TERMS.map((t) => `<li>${t}</li>`).join("")}</ol>
    <h2>Payment</h2><table><tr><td class="m">Payee</td><td>Bombay Advocates Cricket Association</td></tr><tr><td class="m">Bank</td><td>Bank of India, Main branch</td></tr><tr><td class="m">IFSC</td><td>BKID0000001</td></tr><tr><td class="m">Account</td><td>000110210000057</td></tr></table>
    <h2>Contact</h2><p>${CONTACTS[0].name}, ${CONTACTS[0].role}, BACA · ${ORG.address} · ${ORG.email} · ${ORG.phone}</p>`,
);

for (const [name, html] of [["vtt-2026-fixtures", fixtures], ["vtt-2026-sponsorship", sponsorship]]) {
  const src = join(tmp, `${name}.html`);
  writeFileSync(src, html);
  // Headless Chrome writes the PDF in a few seconds but sometimes does not exit (01-10-2026, Chrome open on the
  // machine), which hung the second PDF forever. Give each its own profile, cap the wait and accept a timeout.
  try {
    execFileSync(CHROME, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--user-data-dir=${join(tmp, `profile-${name}`)}`, `--print-to-pdf=${join(root, "public/downloads", `${name}.pdf`)}`, pathToFileURL(src).href], { stdio: "ignore", timeout: 25000 });
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ETIMEDOUT") throw e;
  }
  console.log(`public/downloads/${name}.pdf`);
}
// Each run leaves two Chrome profiles of about 12 MB in the temp folder; on 07-10-2026 the disk was full and the next write failed.
rmSync(tmp, { recursive: true, force: true });
