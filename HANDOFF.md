# HANDOFF: BACA 38th All India Advocates' Cricket Tournament 2026

Live: https://baca-cricket.com (also https://vijay-tulpule-trophy.vercel.app). Repo: edenbuilds/vijay-tulpule-trophy, Vercel deploys from `main`, git author must be omkar1sonawane@gmail.com.

## Redesign (07-10-2026, commit 43bf2cc, live)
Whole site rebuilt on the tournament brand kit (logo, palette, High Court illustration, ball, motion stroke, shape; no mockups). Satoshi kept.
Brief and truth table: `docs/REDESIGN.md` (read it first). Palette tokens in `src/app/globals.css`: navy #0B2A6B, royal #1E6BD6, red #E21B2D (ball and one short rule only), sky, snow, white. Light mode only.
Brand files: `public/brand/t26/` (logo, logo-bar, logo-reversed, mark, ball, stroke, shape), rebuilt by `scripts/brand-art.py` then `scripts/brand-art.mjs` (icons, OG).
Team logos: `public/teams/<slug>.png`, built by `scripts/team-logos.py` from `scripts/brand-source/teams`. Emblem only, no tiles or fringes. Bombay is the brown B.A.C.A seal.
Data: `src/lib/teams.ts` (16 teams, no captains or groups), `src/lib/schedule.ts` (14 grounds, 17 to 24 Oct, from the 06-10 sheet; no times, stages or match-ups). PDFs and ICS read from these: `npm run downloads`.
Facts set by the owner: 35 overs a side (`EVENT.overs`), location wording "Mumbai and Navi Mumbai" everywhere.
Rules still in force: "Adv." before every person (Sr. Adv. for Gupte and Patil), only the Shivaji Park address, plain headings, phone lists not card stacks, no widows or orphans (`tie()`, `nb()`), no em dashes, never `npx hyperiux init`, poem stays Noto Sans Devanagari, do not invent who Rizvi is.

## Verified (07-10-2026)
`next build` clean; 13 routes at 1440 and 390: no overflow, console errors, failed requests or broken images; live home, /teams, team logo and "35 overs" on /format return as expected on both domains.
NOT verified: wrap audit (`scripts/wrap-audit.js`; the iframe runner hit a cross-origin error, run it per page at 360/390/768/1024/1440), reduced-motion, a full-page eyeball of every route after the final logo polish, PDFs regenerated after the 35-overs change (run `npm run downloads`, commit).

## Layout pass (07-10-2026)
Desktop navigation now keeps Fixtures, Teams, Format and Trophy visible, with the existing secondary destinations under More; the mobile menu retains every destination. The active indicator uses BYQ Pro's Tab Underline gem, restyled to the tournament's royal blue. The homepage's full-screen pinned photo reveal is now a short draggable archive strip, and the second BACA archive strip is shorter. Homepage copy and factual data are unchanged.

Verified locally: production build, targeted ESLint, homepage at 1440px and 390px with no horizontal overflow, and expanded desktop and mobile menus. The More menu exposes Gallery, About BACA, Sponsors, Downloads, Ceremonies and Poem; Contact remains the header action. Commit `95e2c1b` is live at the apex domain; desktop and phone layout were checked, with no horizontal overflow or broken images. The `www` alias is attached and serves the homepage over HTTPS; it stays on the `www` hostname. MCP servers are registered in the user's `~/.codex/config.toml`: BYQ Supply, Hyperiux and UI Skills. BYQ's live gem catalog and UI Skills guidance were retrieved. The Hyperiux local server connects and returns Pro effect metadata; its large source payload was omitted by the response limit. Codex needs a fresh session to load the updated global MCP configuration.

## Motion pass (07-10-2026)

The homepage hero now reveals the tournament logo with a short left-to-right mask, draws the existing red rule, then brings in the date, location, countdown and links in sequence. The existing brush and shape parallax remains. The reveal uses GSAP already in the site and is skipped when `prefers-reduced-motion` is set. No copy, images or facts changed.

Verified locally: `npm run build` passes; the homepage renders at 1440px and 390px with the logo, date, location, countdown and both links visible. Commit `16dddac` is deployed to production (`dpl_AEWqQXavtMadPBnPKqpjvEDzH2K6`, READY) at https://baca-cricket.com. The live hero was checked at 1440px and 390px; all hero content remains visible and the archive imagery stays secondary.

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
Work in ~/vijay-tulpule-trophy. Read HANDOFF.md, then docs/REDESIGN.md. Palette is navy/royal/red on sky and snow, Satoshi only. Data lives in src/lib/teams.ts and src/lib/schedule.ts; add times, groups, captains or match-ups only from organiser sources. Matches are 35 overs, location is "Mumbai and Navi Mumbai". Keep the Adv. prefix, plain copy, no em dashes, no widows or orphans (run wrap-audit at 360/390/768/1024/1440). Motion should stay restrained, use the existing GSAP setup and respect reduced motion. Task: <paste task>. First: run npm run downloads and commit, run the wrap audit, attach www.baca-cricket.com. Verify on https://baca-cricket.com at desktop and 390px, commit to main with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with vercel deploy --prod --yes, update this file.
```
