# HANDOFF: Late Vijay Tulpule Trophy 2026

Live: https://vijay-tulpule-trophy.vercel.app
Repo: https://github.com/edenbuilds/vijay-tulpule-trophy (Vercel deploys from `main`, author must be omkar1sonawane@gmail.com)

## Stack
Next.js 15 App Router, React 19, Tailwind v4, GSAP 3.15 + ScrollTrigger, Lenis, next-transition-router.
Copy source of truth: `~/Downloads/VTT-2026-SECTION-PROMPTS.md` (banned phrases and no-invention rules live there).

## Design
BYQ design system **Human Intelligence** (`cmosw0lxo0005xof5w64cji7l`, light), recoloured to greens only:
paper `#f1f4ea` (flat chalk canvas, no texture or gradient), mist `#ffffff` (white cards), mint `#e2f0d8`, sage `#bfe0aa` tiles, pitch `#1f7a34` (grassy kit green, not emerald) for actions, ink `#141a16`. Light mode only (`color-scheme: light`).
16px-radius tiles inset 8px from the page edge, pill buttons, dashed rules (`.rule`). Satoshi only (no serif).
No Live page or Live button (removed by request). Red appears only on the cricket ball.

## Motion inventory
- Preloader: BYQ gem **iris-wipe-preloader-01** (`src/components/gems/Preloader.tsx`), first visit per session. The % counter is swapped for the ball rolling in (brief bans counters). Head script in `layout.tsx` sets `preloading` / `no-preload`.
- Home hero: BYQ **stringer-hero-4** in a mint tile, Hyperiux **rolling-text** title (waits for the preloader), wide parallax photo. Title leading must stay >= 1.25 (Satoshi content area) or reel glyphs bleed.
- Home: icon quick-link tiles (lucide-react), scoreboard ticker, stat tiles, BYQ **babka-bento-3** (`Bento`), fixtures list, BYQ gem **sticky-media-swap-01** for the knockout stages, Hyperiux **stacking-cards** with photos, scroll char reveal, sponsor tiers.
- Gems kept: magnetic-button-01 (pill), tab-underline-01 (fixtures, with clock/pin icons), curtain-image-reveal-01, spotlight-glow-cards-01 (lift only). Page sweep overlay in pitch green.

## News strip
`src/components/NewsStrip.tsx`, under the nav on every page. It rolls through `RESULTS` (newest first) then
fixtures still to come from `FIXTURES`, both in `src/lib/site.ts`. To post a result, append
`{ date: "18 Oct", match: "A v B", line: "A won by 20 runs" }` to `RESULTS` and deploy. Only confirmed results.
Pauses on hover/focus; static and scrollable under reduced motion.

Micro-interactions: `.press` (tap scale), `.lift` (hover rise), `.u-grow` (underline draw) in globals.css;
logo ball spins on hover; quick-link icons tilt.

## Source documents (added 30-09-2026)
From `~/Downloads`: `vijay tulpule trophy 2027.docx` (committee working book, 25-09-2026), `Appeal for Sponsorship 08.07.26 2.pdf`,
`Bomnay Advocates cricket Association 2.pdf` (scanned letter to NAREDCO, 30-01-2026; OCR'd with macOS Vision).
Public facts only went to the site (`EVENT`, `HISTORY`, `CEREMONIES`, `AWARDS`, `PARTNERS`, `TERMS`, fixture codes and grounds in
`src/lib/site.ts`). Kept off the site on purpose: the ₹1 crore budget, hotel room allotment, cash points, seating, Board agenda, to-do list.
Conflicts: the January letter says 35 overs and lower tier prices; the site follows the later documents (50 overs, July appeal tiers).
Pages: `/ceremonies` (opening, ceremonial sitting, trophy evening, animated `Timeline`), `/downloads`.

## Downloads
`public/downloads/vtt-2026-fixtures.pdf` and `vtt-2026-sponsorship.pdf` are built from `site.ts` by `npm run downloads`
(headless Chrome). Rerun and commit after changing fixtures, tiers or terms. `/vtt-2026.ics` is a static route built from `FIXTURES`.

## Photos
Placeholders are hotlinked from Wikimedia Commons (`PHOTOS` in `src/lib/site.ts`), credited in the footer. None shows a confirmed venue. Replace with the organisers' photos, move them to `public/img`, drop the credits line.

## Hyperiux
MCP registered at user scope: `claude mcp add -s user hyperiux -- npx -y hyperiux-mcp-server` (tools appear in a new session). CLI is logged in to Pro (`npx hyperiux whoami`). 10 installs per day.
Warning: `npx hyperiux init` rewrote `globals.css` to a bare `@import`. Never re-run init; if you do, `git checkout src/app/globals.css`.

## Blocked / TBC
- Real ground or match photography not supplied (Commons placeholders in use).
- Stream URL, team names, ground names: TBC. Ceremonial sitting date (16 or 17 Oct) not locked by the Board yet.
- Contact form: needs `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` on Vercel plus a verified Resend domain. Until then it returns an honest error naming the organiser's email.

## Paste-ready prompt for the next session
```
Work in ~/vijay-tulpule-trophy. Read HANDOFF.md first, then ~/Downloads/VTT-2026-SECTION-PROMPTS.md.
Keep the Fit Trainer tokens and the motion inventory. Never run `npx hyperiux init`.
Task: <paste task>. Verify on https://vijay-tulpule-trophy.vercel.app at desktop and 390px, commit to main
with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with `vercel deploy --prod`, update this file.
```
