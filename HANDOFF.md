# HANDOFF: BACA 38th All India Advocates' Cricket Tournament 2026

Live: https://baca-cricket.com (also https://vijay-tulpule-trophy.vercel.app). Repo: edenbuilds/vijay-tulpule-trophy, Vercel deploys from `main`, git author must be omkar1sonawane@gmail.com.

## Visual direction restored (07-10-2026)

The warm-paper refresh was reverted at the owner’s request. The previous tournament brand presentation is restored; the separate GSAP team logo reveal remains. Tournament logo assets are unchanged.

## Redesign (07-10-2026, commit 43bf2cc, live)
Whole site rebuilt on the tournament brand kit (logo, palette, High Court illustration, ball, motion stroke, shape; no mockups). Geist headings and Inter body/UI, as specified by the owner.
Brief and truth table: `docs/REDESIGN.md` (read it first). Palette tokens in `src/app/globals.css`: navy #0B2A6B, royal #1E6BD6, red #E21B2D (ball and one short rule only), sky, snow, white. Light mode only.
Brand files: `public/brand/t26/` (logo, logo-bar, logo-reversed, mark, ball, stroke, shape), rebuilt by `scripts/brand-art.py` then `scripts/brand-art.mjs` (icons, OG).
Team logos: `public/teams/<slug>.png`, built by `scripts/team-logos.py` from `scripts/brand-source/teams`. Emblem only, no tiles or fringes. Bombay is the brown B.A.C.A seal.
Data: `src/lib/teams.ts` (16 teams, no captains or groups), `src/lib/schedule.ts` (14 grounds, 17 to 24 Oct, from the 06-10 sheet; no times, stages or match-ups). PDFs and ICS read from these: `npm run downloads`.
Facts set by the owner: 35 overs a side (`EVENT.overs`), location wording "Mumbai and Navi Mumbai" everywhere.
Rules still in force: "Adv." before every person (Sr. Adv. for Gupte and Patil), only the Shivaji Park address, plain headings, phone lists not card stacks, no widows or orphans (`tie()`, `nb()`), no em dashes, never `npx hyperiux init`, poem stays Noto Sans Devanagari, do not invent who Rizvi is.

## Verified (07-10-2026)
`next build` clean; 13 routes at 1440 and 390: no overflow, console errors, failed requests or broken images; live home, /teams, team logo and "35 overs" on /format return as expected on both domains.
NOT verified: wrap audit (`scripts/wrap-audit.js`; the iframe runner hit a cross-origin error, run it per page at 360/390/768/1024/1440), reduced-motion, a full-page eyeball of every route after the final logo polish, PDFs regenerated after the 35-overs change (run `npm run downloads`, commit).

## Layout reset (07-10-2026)

The owner rejected the full-screen sticky card treatment shown in the latest screenshot. Homepage destination cards and team logos are now regular responsive grids; the pinned card stack and gallery scroll-jacking are removed. Team marks reveal into their grid on scroll with reduced-motion support. The homepage follows the supplied visitor journey: tournament overview, four destination links, eight-day schedule, trophy story, teams, BACA history, gallery, poem, sponsorship, downloads and FAQs. Navigation is Home, Tournament (Fixtures, Teams, Format, Ceremonies), The Trophy, About BACA, Gallery and Sponsors, with View Fixtures as the main action; mobile uses the same hierarchy and puts View Fixtures first. Copy follows the owner's pasted wireframe, while the trophy page's existing copy is preserved.

Typography is Geist headings and Inter body/UI. BACA’s navy, royal blue and cricket red remain; the later heritage refresh warms the page ground. The existing BACA Instagram link remains in the footer. UI Skills references were retrieved and applied. BYQ MCP section retrieval and Hyperiux MCP effect retrieval are recorded in the Heritage editorial refresh above. Never record or expose credentials in this handoff.

Verified locally: `npm run build` succeeds. `npm run lint` reports no errors and two pre-existing warnings in `scripts/wrap-audit.js` and `DraggableMarqueeComp.tsx`. The local and live browser renders confirm the oversized stack is gone; the live homepage and `/fixtures` show the new hierarchy and schedule. At the available browser viewport, the responsive header shows a hamburger and the hero stacks cleanly; exact 390px interaction and overflow audit remain unverified. Production deploy `dpl_CTTXo2wav6DgZfHQMXkAx3em4SBS` is READY and aliased to https://baca-cricket.com.

## Open items
- Poster says 8 grounds, the sheet lists 14; the site follows the sheet and prints no total.
- Punjab is "Punjab and Haryana" (from its logo; sheet says Punjab High Court). 20 Oct "Chereshwar" row treated as Trombay.
- Captains cut off in the screenshot; groups, times, which final is at CCI or Wankhede are unknown.
- Format and Ceremonies copy comes from the 25-09 working book and may be stale.
- Logo sources: Lucknow, Aurangabad, Gujarat, Calcutta (red ring clipped in source), Indore (teeth slightly ragged) are limited; ask for vectors. Partner logos (AIA, BILS, CAAI) are low resolution.
- Footer at 768 wraps "About BACA" and the address; partner strip at 360 leaves one logo alone.
- Contact form needs RESEND_API_KEY, CONTACT_TO, CONTACT_FROM and a verified Resend domain.
- Rizvi Shield/Plate: "being confirmed" only.
- Older history (green palette passes 1 to 5) is in `docs/HANDOVER.md`; its colour and fixture sections are superseded by this file.

## Paste-ready prompt
```
Work in ~/vijay-tulpule-trophy. Read HANDOFF.md and docs/REDESIGN.md. Keep BACA’s navy, royal blue and cricket red; use the warm paper ground, Geist headings and Inter body/UI. BYQ is structure inspiration; adapt components to the existing identity. Data is in src/lib/teams.ts and src/lib/schedule.ts; only add match times, groups, captains or pairings from organiser sources. Matches are 35 overs, location wording is “Mumbai and Navi Mumbai”. Preserve the trophy page’s original copy and the poem. Use GSAP with scoped cleanup and reduced-motion support; no pinned stacks, scroll-jacking, gradients or pill buttons. Keep copy plain, avoid em dashes, and check wraps at 360/390/768/1024/1440. Verify all routes at 390px and desktop on https://baca-cricket.com; commit to main with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with vercel deploy --prod --yes, update this file.
```
