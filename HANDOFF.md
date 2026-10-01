# HANDOFF: BACA 38th All India Advocates’ Cricket Tournament 2026 (site stays at vijay-tulpule-trophy)

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
- Home (see docs/HANDOVER.md): photo hero with countdown, quick links, scroll-converging team cards (Animmaster scroll 58), Schedule (pinned horizontal photo cards from lg, one dashed list below), trophy band, gallery zoom (Animmaster grid 7, 2x2 mosaic on phones), since-1989 intro with archive reel, poem teaser, FAQ, sponsors, downloads, contacts, closing photo tile. Sticky-media-swap, babka bento, stacking-cards, number-counter and scramble-text were removed.
- Gems kept: magnetic-button-01 (pill), tab-underline-01 (fixtures, with clock/pin icons), curtain-image-reveal-01, spotlight-glow-cards-01 (lift only). Page sweep overlay in pitch green.

## Nav and hero (30-09-2026)
`Nav.tsx`: floating white bar inset 8px, hides on scroll down past 240px and returns on scroll up (ignores <4px moves because
Lenis fires repeat events at rest). A mint pill slides to the hovered link and back to the current page; it measures the `<li>`.
Phone menu expands inside the same bar with staggered large links. Hero background (`Ground` in `Sections.tsx`): mowing stripes
plus boundary, 30-yard circle, pitch and creases drawn in once, drifting on scroll.
Copy follows petergyang/no-ai-slop: plain full sentences, specific facts, "to be announced" instead of TBC in visible copy.

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
(headless Chrome, with a throwaway profile so a running Chrome does not hang it). Rerun and commit after changing fixtures, tiers or terms. `/vtt-2026.ics` is a static route built from `FIXTURES`.

## Photos
BACA's own photographs (WhatsApp, 01-10-2026) live in `public/gallery` as `N.jpg` (1400px) and `N-s.jpg` (640px); `src/lib/gallery.ts`
lists 49 of them by category (teams, trophies, archive). Captions stay generic until BACA names people, grounds and years.
Photos are placed only through `src/lib/photos.ts` (`PH` roles, `CONVERGE`, `ZOOM`, `ARCHIVE`), each with a comment saying why; `PHOTOS` in `site.ts` is gone. Alt text describes only what is visible.
To add a photo: resize to both files, add a line to `SHOTS`, add its alt to `ALT` in `photos.ts`, then give it a role.

## Rebrand (01-10-2026)
The site is now the official site of the 38th All India Advocates’ Cricket Tournament 2026, hosted by BACA, until it reverts to the
BACA Official Website. Winners get **The Vijay Tulpule Trophy** (confirmed). **Rizvi Shield/Plate** is named on `/trophy` with a
"being confirmed" line only: nobody has said who Rizvi is or what it is awarded for. Do not invent either.
- Logo: `public/brand/*.png` (seal in colour, gold, ink, pitch, white; lockups) made from the supplied BACA-Logo.jpg. Icons, apple-icon and
  OG/Twitter images are in `src/app/`. Zip for download: `public/downloads/baca-logo-pack.zip`.
- Contacts from the poster: `CONTACTS` in `site.ts` (Sr. Adv. Rajiv Patil, Adv. Deepak Thakre, Adv. Meghashyam Kocharekar, Adv. Harshad Bhadbhade). Shown on home, `/contact`, footer, sponsors page and the sponsorship PDF.
- Poster says fixtures "will be announced shortly" and 8 grounds; the fixture grid (from the 25-09 working book) is kept but marked provisional
  and its venue reads "Grounds to be announced".
- `/about` (was `/baca`, permanent redirect in `next.config.ts`): facts, association with BBA / The Bombay Incorporated Law Society / AIA
  (as printed on the poster, AIA not expanded), history, the poem, committee with poster titles.
- `/gallery`: Hyperiux **parallax-gallery** reel (patched: landscape frame, alt text, shares the site's Lenis via `window.__lenis`) plus a
  filterable grid with wipe-open tiles and a native `<dialog>` lightbox (arrow keys).
- Poem: `src/lib/poem.ts` ("क्रिकेट और कोर्ट", Adv. Gurudas Sanjeev Gorwadkar), transcribed by eye from the supplied image (macOS OCR cannot
  read Devanagari). Spelling kept as printed. Hyperiux **mask-text-reveal** per verse, split by line, never by character (breaks conjuncts).
  Font: Noto Sans Devanagari via `next/font/google`, class `.deva`. Ask the author to confirm the line "मुवक्किल कड़े, मेरा ही कहना Correct" (verse 5).
- Hyperiux CLI `add` overwrote `globals.css` and `README.md` once: check `git status` after every add.

## Second pass (01-10-2026)
Full write-up in `docs/HANDOVER.md`: what was wrong, home section order, the photo registry and its rules, effects used and skipped (Hyperiux, Animmaster, BYQ), the `/poem` reading page, the token map for switching to BACA colours later, open items. Palette stays green until the BACA switch.
Nav and footer wordmark read "BACA" (no year). `/poem` is linked from the footer and the phone menu. `Block` headings use slide-text-reveal.

## Third pass (01-10-2026)
Full write-up in `docs/HANDOVER.md`. Rules to keep:
- **Phone layout:** three or more items on a phone are one dashed list in one tile, never a stack of cards (schedule, quick links, tiers, downloads, teams). Cards only from `sm`, `md` or `lg`. Standalone links at least 44px tall. Checked at 390, 768, 1440 with no horizontal overflow.
- **Names:** every person is "Adv." (or "Sr. Adv." for Shirish Gupte and Rajiv Patil, as the poster prints). The prefix is inside the `name` string in `CONTACTS` and `COMMITTEE`; `role` holds only a role the source gives. "The Vijay Tulpule Trophy" keeps its name; the person is Adv. Vijay Tulpule in captions and sentences (judgement call, to confirm).
- **Address:** only `ORG.address` (Krishna Kunj, 36 Shivaji Park, Mumbai 400 028). The Dadar address is deleted everywhere.
- **Copy:** plain labels for headings ("The teams", "Schedule", "Gallery"), no poetic numbers, no counters or big-number strips, no em dashes, no taglines. Numbers appear only as plain facts. Do not add a sentence that no source document backs.
- `npm run downloads` now gives each PDF its own Chrome profile and accepts a timeout after the file is written (headless Chrome did not exit and hung the second PDF).

## Hyperiux
MCP registered at user scope: `claude mcp add -s user hyperiux -- npx -y hyperiux-mcp-server` (tools appear in a new session). CLI is logged in to Pro (`npx hyperiux whoami`). 10 installs per day.
Warning: `npx hyperiux init` rewrote `globals.css` to a bare `@import`. Never re-run init; if you do, `git checkout src/app/globals.css`.

## Blocked / TBC
- Names, grounds and years for the gallery photos. Official BACA site: none found online, so About is built only from BACA's own papers.
- Stream URL, team names, ground names: TBC. Ceremonial sitting date (16 or 17 Oct) not locked by the Board yet.
- Contact form: needs `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` on Vercel plus a verified Resend domain. Until then it returns an honest error naming the organiser's email.

## Paste-ready prompt for the next session
```
Work in ~/vijay-tulpule-trophy. Read HANDOFF.md, then docs/HANDOVER.md (home order, photo registry, token map for the BACA colour switch).
Keep the green palette until told to switch. Place photos only via src/lib/photos.ts. Never run `npx hyperiux init`.
Rules from the third pass: phone lists not card stacks, "Adv." before every person (Sr. Adv. where the source says), only the Shivaji Park address,
plain headings and copy with no poetic numbers or em dashes. Run `npm run downloads` after changing CONTACTS, tiers, terms or fixtures.
Task: <paste task>. Open items: Rizvi Shield/Plate details, ground names and fixtures (poster says 8 grounds), AIA expansion,
whether the gold "Winner" cup is The Vijay Tulpule Trophy, whether "Adv. Vijay Tulpule" is right on the trophy page, poem verse 5 line 4. Verify on https://vijay-tulpule-trophy.vercel.app at desktop and 390px,
commit to main with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with `vercel deploy --prod --yes`, update this file.
```
