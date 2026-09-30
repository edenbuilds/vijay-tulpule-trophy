// Builds the two A4 PDFs in public/downloads from src/lib/site.ts, so the files never drift from the site.
// Run after changing fixtures, tiers or terms:  node scripts/downloads.mts  (Node 24, Google Chrome installed)
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { EVENT, FIXTURES, ORG, PARTNERS, TERMS, TIERS } from "../src/lib/site.ts";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = resolve(import.meta.dirname, "..");
const font = pathToFileURL(join(root, "src/app/fonts/Satoshi-Variable.woff2")).href;
const tmp = mkdtempSync(join(tmpdir(), "vtt-"));

const page = (title: string, body: string) => `<!doctype html><meta charset="utf-8"><title>${title}</title><style>
@font-face{font-family:Satoshi;src:url(${font}) format("woff2");font-weight:300 900}
@page{size:A4;margin:16mm 14mm}
*{box-sizing:border-box;margin:0}
body{font:10.5pt/1.45 Satoshi,sans-serif;color:#141a16;font-variant-numeric:tabular-nums}
header{background:#e2f0d8;border-radius:12px;padding:18px 20px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
h1{font-size:26pt;line-height:1.05;letter-spacing:-.02em}
h2{font-size:13pt;margin:18px 0 8px;break-after:avoid}
.k{font-size:8pt;text-transform:uppercase;letter-spacing:.08em;color:#141a16a0}
.ball{width:26px;height:26px;border-radius:50%;background:#b3261e;flex:none}
table{width:100%;border-collapse:collapse}
td,th{text-align:left;padding:5px 8px;border-bottom:1px dashed #141a1630;vertical-align:top}
th{font-size:8pt;text-transform:uppercase;letter-spacing:.06em;color:#141a1690;font-weight:500}
tr{break-inside:avoid}
.d,.c,.t{font-weight:700;white-space:nowrap}.c{font-weight:400}.t{color:#1f7a34;font-weight:700}.m{color:#141a16a0}
.tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.tier{background:#fff;border:1px solid #141a1620;border-radius:12px;padding:12px}
.tier.top{background:#1f7a34;color:#f1f4ea;border-color:#1f7a34}
.tier b{display:block;font-size:15pt;margin-top:8px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px}
footer{margin-top:22px;padding-top:10px;border-top:1px dashed #141a1640;font-size:8.5pt;color:#141a16a0}
</style><body>${body}<footer>${ORG.name} · ${ORG.trust} · ${ORG.email} · ${ORG.phone} · vijay-tulpule-trophy.vercel.app</footer>`;

const head = (title: string, sub: string) =>
  `<header><div><p class="k">${EVENT.edition}</p><h1>${title}</h1><p style="margin-top:6px">${sub}</p></div><div class="ball"></div></header>`;

const fixtures = page(
  "VTT 2026 Fixtures",
  head("Late Vijay Tulpule Trophy 2026: Fixtures", `Mumbai and Navi Mumbai · 17–24 October 2026 · ${EVENT.overs} overs a side · ground names to be announced`) +
    `<table><tr><th>Day</th><th>Time</th><th>No.</th><th>Fixture</th><th>Ground</th></tr>${FIXTURES.flatMap((d) =>
      d.slots.map((s, i) => `<tr><td class="d">${i ? "" : `${d.day} ${d.date}`}</td><td class="t">${s.time ?? "All day"}</td><td class="m c">${s.code ?? ""}</td><td>${(s.matches ?? [s.note]).join(" · ")}</td><td class="m">${s.venue ?? ""}</td></tr>`),
    ).join("")}</table>
    <h2>Points</h2><p>Win 2. Tie or no result 1. Loss 0. Tie-break: NRR, then head-to-head, then fewest wickets lost per run scored, then lots. Top two in each group reach the quarter-finals. The 14:30 league sessions run only if the lights are certified.</p>`,
);

const sponsorship = page(
  "VTT 2026 Sponsorship",
  head("Sponsor the Late Vijay Tulpule Trophy 2026", "Sixteen teams from fifteen High Courts and the Supreme Court of India · 17–24 October 2026") +
    `<h2>Tiers</h2><div class="tiers">${[...TIERS].reverse().map((t) => `<div class="tier${t.name === "Platinum" ? " top" : ""}">${t.name}<b>${t.price}</b></div>`).join("")}</div>
    <p style="margin-top:10px">Every sponsor is named, by tier, at the opening, the end of the league, the final and at every venue.</p>
    <h2>Partner roles</h2><div class="grid">${PARTNERS.map(([k, v]) => `<p><b>${k}.</b> ${v}</p>`).join("")}</div>
    <h2>Terms</h2><ol style="padding-left:18px">${TERMS.map((t) => `<li>${t}</li>`).join("")}</ol>
    <h2>Payment</h2><table><tr><td class="m">Payee</td><td>Bombay Advocates Cricket Association</td></tr><tr><td class="m">Bank</td><td>Bank of India, Main branch</td></tr><tr><td class="m">IFSC</td><td>BKID0000001</td></tr><tr><td class="m">Account</td><td>000110210000057</td></tr></table>
    <h2>Contact</h2><p>Rajiv Patil, Senior Advocate, Hon. Secretary, BACA · ${ORG.address} · ${ORG.email} · ${ORG.phone}</p>`,
);

for (const [name, html] of [["vtt-2026-fixtures", fixtures], ["vtt-2026-sponsorship", sponsorship]]) {
  const src = join(tmp, `${name}.html`);
  writeFileSync(src, html);
  execFileSync(CHROME, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${join(root, "public/downloads", `${name}.pdf`)}`, pathToFileURL(src).href], { stdio: "ignore" });
  console.log(`public/downloads/${name}.pdf`);
}
