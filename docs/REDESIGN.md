# Redesign brief: the 38th All India Advocates' Cricket Tournament identity (07-10-2026)

Single source of truth for every agent working on this redesign. Read all of it before editing. Where this file and an older doc
(HANDOFF.md, docs/HANDOVER.md) disagree, this file wins for look and feel; the older docs still win for names, address and copy rules in section 7.

## 0. The request, verbatim
"Redesign the entire website based on this branding. Don't use the mockups from the brand kit, and retain our website's font."
The user also supplied the 16 team names (the CAPTAINS tab of the organisers' sheet), the date-and-ground sheet, the team logos, and the Bombay logo.
"Retain the font" means **Satoshi stays** (src/app/fonts/Satoshi-Variable.woff2, weights 300 to 900). The brand kit lists Montserrat/Inter and a second board lists Geist/Inter; ignore both. No other font except Noto Sans Devanagari for the poem.
"Don't use the mockups" means: no stationery, ID cards, certificates, social-media templates, jerseys, caps, bottles, gates, arches, sponsor stands, trophies or any other mock-up from the kit or from the two reference boards, whether placed on the site or redrawn. Use only the logo, the palette and the five graphic elements (High Court illustration, cricket ball, batsman, motion stroke, geometric shape).
The user's mood references (the two 1536x1024 boards) are for tone only: a light airy sky-white page, navy panels with very heavy white type, a short red rule, the red ball as the single hot spot, generous space.

## 1. Sources on disk (all absolute)
| What | Path |
|---|---|
| Poster (1493x2000): logo + dates + "Practising Advocates from 15 High Courts..." | ~/vijay-tulpule-trophy/scripts/brand-source/poster.webp |
| Logo with "Hosted by..." bar (1254x1254) | scripts/brand-source/logo-with-bar.webp |
| Brand kit board 1 (palette, logo variations, graphic elements, mock-ups) | scripts/brand-source/kit-board.webp |
| Brand board 2 (palette incl. Sky Blue and Light Neutral, avatar, app icon) | scripts/brand-source/board-v2.png |
| Social-template reference board (mood only) | /private/tmp/claude-501/-Users-omkar-Downloads-BACA---Images--Old/939ac58c-9666-4cf4-8161-44fcdf6f82c8/scratchpad/social-templates-inspiration.png |
| Team logos as received (17 files; see section 4) | scripts/brand-source/teams/ |
| BACA seal, navy and gold (the existing seal) | scripts/brand-source/baca-seal-navy-gold.jpg |
| Dates and grounds sheet | scripts/brand-source/grounds-and-dates.xlsx (already transcribed in src/lib/schedule.ts) |
| Captains tab screenshot (cut off, no captain names usable) | scripts/brand-source/captains-screenshot.jpg |
| BACA's own photographs | public/gallery, registry src/lib/photos.ts |

Do not Read the PDF or image sources repeatedly; each image costs a lot of context. Look once, note what you need.

## 2. Data the site may state (truth table)
Written in src/lib/teams.ts and src/lib/schedule.ts. Import from there; never retype team or ground names.
- Tournament: 38th All India Advocates' Cricket Tournament, Mumbai 2026, 17 to 24 October 2026, hosted by the Bombay Advocates' Cricket Association (BACA). Poster line: "Practising Advocates from 15 High Courts of India and The Supreme Court of India".
- 16 teams: `TEAMS`. Groups are not drawn ("Groups are not yet drawn", organiser, 06-10-2026). So: no group letters, no pools, no "A1 v B2", no match-ups, no points table. Say "Groups will be announced after the draw." Never say when the draw is.
- Schedule: `SCHEDULE`, `GROUNDS`, `GROUND_DAYS`, `groundLabel()`. Per day only date plus grounds; 24 October both grounds are marked Final; 21 October has no matches (reserve day). **No match times, no stage names (league, quarter-final, semi-final) for 18 to 23 October, no stated number of grounds in total.**
- CONFLICTS the redesign must resolve by deleting the old claim and using the sheet or "to be announced" (list every one you remove in your report):
  1. Poster and old copy say "8 grounds in Mumbai and Navi Mumbai". The sheet names 14 grounds, including Thane and Lonavla, 8 a day on 18 to 20 October. Do not state a total ground count; "8 grounds a day" is allowed only for 18, 19 and 20 October and only as a derived fact of the sheet.
  2. Old copy: "Main Ground", "Ground 2", match times 07:00, 09:00, 14:30, 17:15, "Four groups of four", codes like A1 v B2, "Quarter-finals 22 Oct", "Semi-finals 23 Oct", "Final at the Main Ground". All come from the 25-09 working book and conflict with the 06-10 sheet or with "groups not drawn". Remove or reword to "to be announced". The sheet has 4 grounds on 22 and 4 on 23 October, which does not fit the old stage story, so no stage names there.
  3. Format page: keep what is sourced and not contradicted (50 overs a side, 15-player squad, points, tie-breaks, awards) but mark anything that depends on groups or stages as "to be confirmed after the draw".
- Open, never invent: who Rizvi is and what the Rizvi Shield/Plate is for (keep the existing "being confirmed" line), team captains, match-ups, times, the final-by-ground assignment, a vector logo from AAWI/BILS, the Bombay team's own logo.

## 3. Brand
### Colour tokens (Tailwind v4 `@theme` in src/app/globals.css, names are final)
| Token | Hex | Use |
|---|---|---|
| `navy` | #0B2A56 | All text on light surfaces; navy sections; nav CTA |
| `navy-deep` | #071B3A | Hover/press on navy; footer base |
| `royal` | #1E6FBF | Links, active states, icons on light, secondary buttons |
| `red` | #D62828 | The ball, one short rule, the Final marker, error states. Under 2% of any screen |
| `sky` | #E7F0FF | Tinted tiles, hero panel, hover wash |
| `sky-deep` | #CFE0FA | Pressed/selected tint, dividers on sky |
| `snow` | #F5F7FA | Page background |
| `white` | #FFFFFF | Cards on snow, text on navy |
The old green tokens (`paper`, `mist`, `mint`, `sage`, `pitch`, `hover`, `ink`) are retired. Map: paper->snow, mist->white, mint->sky, sage->sky-deep, pitch->royal (or navy when it was a big band), hover->navy-deep, ink->navy. No green anywhere, no `#1f7a34`, `#141a16`, `rgb(31 122 52`, `rgb(20 26 22`, `#e2f0d8`, `#f1f4ea`.
Balance per screen: about 55% white/snow/sky, 35% navy, 8% royal, red a speck. Alternate light and navy bands down a page; never a page of one colour. No gradients except a flat photo-darkening overlay in navy. No gold.
Contrast (checked): white on royal 5.1, white on red 5.0, navy on white 14, navy on sky 12. **Never** royal or red text on navy (2.8 or lower). On navy use white, or white at 70% for secondary text, or sky.

### Graphic elements and their files (agreed names, created by the asset agent in public/brand/t26/)
- `logo.png` primary logo, transparent, no bar. `logo-bar.png` with the "Hosted by the Bombay Advocates Cricket Association" bar. `logo-reversed.png` for navy surfaces. `mark.svg` square app-icon style mark (ball and strokes on navy). `ball.svg`, `stroke.svg` (the red and blue dry-brush motion stroke), `shape.svg` (the blue and red geometric shape), `building.png` (High Court illustration) if a clean cut exists.
- Wrapped in src/components/brand/ (foundation agent): `Logo`, `Mark`, `Ball`, `Stroke`, `Shape`. Use these components; do not inline brand art in pages.
- The logo is the title of the home page. Do not retype "38th All India Advocates' Cricket Tournament" beside it in display type; the h1 may be visually the logo with `sr-only` text.
- Red ball: one per screen at most. Strokes and shape are decoration, always `aria-hidden`, always clipped by their tile, never behind body text.
- BACA seal and partner logos (public/brand/baca-seal-*.png, public/brand/partners/*.png) stay as they are and sit on white or sky tiles only.

## 4. Team logos (public/teams/<slug>.png, 512x512, transparent, round or squared as the artwork is)
Mapping of received files to teams (from the contact sheet; verify by eye while cutting):
allahabad=00003010, andhra-pradesh=00003011, aurangabad=00003012, chhattisgarh=00003014, delhi=00003015, gwalior=00003016, gujarat=00003017 (small circle on a big white canvas), indore=00003018, karnataka=00003019 (black rectangle with the emblem), lucknow=00003020, orissa=00003021, punjab-haryana=00003022, supreme-court=00003023, telangana=00003024, calcutta=00003025 (phone screenshot of a group icon; crop the circle).
00003041 is the CAAI logo (the aegis body, not a team): replaces public/brand/partners/caai.png. 00003013 is the BACA seal on wood.
`bombay` has no logo among the received set. The user just sent a brown and cream BACA seal in chat (inline only, not saved to disk). Until that file exists, `public/teams/bombay.png` is a round cut of scripts/brand-source/baca-seal-navy-gold.jpg and `logoPending` stays true in src/lib/teams.ts. When the user drops the brown seal as a file, replace the one PNG and flip `logoPending`.
UI rule for logos: show each team logo in a round white well (never squash, never recolour, `object-contain`), alt text "<Name> team logo". Logos have mixed artwork; the white well keeps them even.

## 5. Type
- Satoshi only. Display: weight 900 (800 for longer lines), tracking -0.03em, leading 0.95 to 1.05. Short section headings (three words or fewer) may be uppercase (the wordmark in the logo is uppercase and heavy); longer headings stay sentence case. Body 400/500, 16px minimum on phones, line-height 1.5.
- No italics (the file has none; never fake them), no monospace, no tiny letter-spaced caption rows, no status pills, no "01 02 03" numerals, no orbit dots, no em dashes, no emojis, no sparkle or wand icons.
- Headings are plain labels: "The teams", "Schedule", "Grounds", "Sponsors". No poetic numbers ("16 teams, one trophy"). Numbers appear only as plain facts.
- Keep `text-wrap: balance` on body and `tie()` / `nb()` from src/lib/site.ts for long paragraphs and names.

## 6. Layout and UI language
Keep from the current site: floating white nav bar inset 8px, tiles inset 8px with 16px radius (`rounded-2xl`), pill buttons, 1px dashed rules (now navy at 16%), Lenis smooth scroll, GSAP reveals (one animation system per element: never GSAP and CSS transitions on the same property), reduced-motion fallbacks, page sweep (now navy), preloader (first visit per session: navy overlay, red ball rolls in, iris wipe).
Change:
- Palette, weights and imagery as above; heavy navy display type is the new voice.
- Brand strokes and shape enter as large clipped decoration at tile edges (hero, navy bands, footer, page headers). One decorative element per tile.
- Inner-page header (the shared `Hero` in Sections.tsx): a compact navy tile with the page title in heavy white, a stroke crossing the lower right, the logo mark top-left optional. Home gets its own light hero (section 7).
- Phones (390): three or more items are one dashed list inside one white tile, never a stack of cards; links and buttons at least 44px tall; no horizontal scroll at 360, 390, 768, 1024, 1440. A logo grid on a phone may be a 3-column grid inside one tile (it is not a card stack).
- "Anything that looks clickable is clickable." Dialogs are in-app (native `<dialog>` or components), never `prompt()` or `confirm()`.
- Premium and understated: less text, bigger type, more space. Do not add features nobody asked for.

## 7. Page direction
**Home** (`/`): (1) light hero on sky: `Logo` large (about 55% width on desktop), beside it "17 to 24 October 2026", "Mumbai and Navi Mumbai", hosted-by line, days-to-go (days only, ends at the start; "Under way" until 24 Oct, then "Concluded"), two buttons Fixtures and Teams; strokes and shape clipped at the tile edge; no photo behind the logo. (2) Four quick links. (3) **The teams**: navy band with the 16 logos in white wells, converging into a 4x4 grid on desktop (reuse the Converge scroll effect idea with logos instead of photos; photos may stay as a second, quieter row); phone: 3-column grid in one tile. (4) **Schedule**: the 8 days with their grounds from `SCHEDULE` (pinned horizontal scroller from lg is fine, list below lg), no times, no stage names. (5) Trophy band (navy, portrait, Rizvi line unchanged). (6) gallery zoom, since-1989 history with archive reel, hosts, poem teaser, FAQ (answers corrected per section 2), sponsors, downloads, contacts, closing tile with the cheer photo under a navy overlay.
**Teams** (`/teams`): 16 teams, logo wells, name and court, alphabetical as in `TEAMS`; one sentence that groups follow the draw. No captains.
**Fixtures** (`/fixtures`): day tabs for 17 to 24 October; each day lists its grounds (name large, area beside it); 24 October shows both grounds with the word Final; 21 October says no matches; a by-ground view (`GROUND_DAYS`) so a player can see which days a ground is used; downloads (PDF, calendar). A line: "Match-ups will be published after the draw." Retire `FIXTURES`, `Slot`, old `Day`, `GROUPS` consumers.
**Format, Ceremonies, Sponsors, Downloads, Contact, About, Trophy, Adv. Vijay Tulpule, Poem, Gallery**: same content structure as now with the new look; section 2 conflicts resolved; no new claims.
**Footer**: navy, `logo-reversed`, hosts strip on white tiles (partner logos need light tiles), links in white, one red ball.
**News strip** (under the nav): navy bar, white text, red ball separators, rolls results (none yet) then the coming days from `SCHEDULE` in the form "18 Oct, 8 grounds" and "24 Oct, Finals at CCI and Wankhede".
**Sitemap, ICS, PDFs**: built from `SCHEDULE` / `TEAMS`, in brand colours (PDF styles in scripts/downloads.mts use navy and royal now).

## 8. Rules carried over from earlier passes (do not break)
- Every person is written with a prefix: "Adv." (or "Sr. Adv." where the source says so: Shirish Gupte, Rajiv Patil). The trophy keeps its name "The Vijay Tulpule Trophy"; the person is "the late Adv. Vijay Tulpule". Cricketers (Sunil Gavaskar, Dilip Vengsarkar) carry no prefix. Dilip Vengsarkar is also a ground name, which is not a person.
- The only address is Krishna Kunj, 36 Shivaji Park, Mumbai 400 028 (`ORG.address`). Never the Dadar/Poonawadi one.
- Copy is plain, short, specific. Banned: "battle it out", "proudly invites", "together for", "journey", "unforgettable", "celebrate" as filler, taglines, rhetorical questions in headings.
- Do not invent or "improve" legal, historical or biographical facts. If data is missing say "to be announced" or "being confirmed".
- The poem stays in Noto Sans Devanagari, text unchanged.
- No widows or orphans: `tie()` on long paragraphs, `nb()` on names and the address; `scripts/wrap-audit.js` at 360, 390, 768, 1024, 1440.
- Dates read like "18 Oct", "17 to 24 October 2026" (existing convention). Timezone Asia/Kolkata for anything computed.
- Never run `npx hyperiux init`. Never echo or commit secrets (.env.local exists; do not print it). Commit author is the lead's job, not yours: **do not run git commit, push or deploy.**

## 9. File ownership (edit only your own files; propose changes to others in your report)
| Owner | Files |
|---|---|
| asset-teams | public/teams/*, public/brand/partners/caai.png, scripts/team-logos.py (or .mjs) |
| asset-brand | public/brand/t26/*, src/app/{icon.png,apple-icon.png,favicon.ico,opengraph-image.png,twitter-image.png}, scripts/brand-art.py |
| foundation | src/app/globals.css, src/app/layout.tsx, src/lib/site.ts (NAV, FOOTER_LINKS, ORG, EVENT only), src/components/{Nav,Footer,NewsStrip,Motion,Sections,Countdown}.tsx, src/components/gems/{MagneticButton,Preloader}.tsx, src/components/brand/*, the colour-token rename sweep across the whole repo (mechanical only) |
| home | src/app/page.tsx, src/components/home/*, new src/components/home/HomeHero.tsx |
| teams-fixtures | src/app/teams/*, src/app/fixtures/*, src/components/gems/FixtureTabs.tsx, src/app/vtt-2026.ics/route.ts |
| format-ceremonies | src/app/format/*, src/app/ceremonies/* |
| commercial | src/app/{sponsors,downloads,contact}/*, src/components/{Tiers,Downloads,Contacts}.tsx, scripts/downloads.mts, public/downloads/* (regenerate with `npm run downloads`), src/app/api/contact/* only if a colour is referenced |
| about-trophy | src/app/{about,trophy,adv-vijay-tulpule,poem}/*, src/components/{Hosts,Poem,PoemReader}.tsx |
| gallery-effects | src/app/gallery/*, src/components/effects/**, src/components/gems/{CurtainPortrait,SpotlightCard}.tsx |
| lead | docs/*, HANDOFF.md, package.json, src/lib/{teams,schedule}.ts, src/lib/site.ts (FIXTURES/GROUPS removal at the end), git, deploy |

## 10. Tooling
- Shared dev server for the page phase: http://localhost:3070 (started by the lead, `next dev -p 3070`). Do **not** run `next build` or `next start` while the dev server is up (both write .next); the verification phase stops the dev server first. Typecheck with `cd ~/vijay-tulpule-trophy && npx tsc --noEmit 2>&1 | head -40`; errors in files you do not own are someone else's work in progress, ignore them.
- Screenshot tool (scrolls the whole page so GSAP reveals fire, skips the preloader, reports overflow, console errors, failed requests, broken images, writes contact sheets):
  `node /private/tmp/claude-501/-Users-omkar-Downloads-BACA---Images--Old/939ac58c-9666-4cf4-8161-44fcdf6f82c8/scratchpad/shot/shot.mjs <url> <outPrefix> <d|m|dm>`
  Put outputs under `.../scratchpad/shot/out/<your-agent-name>/` (mkdir it). It prints JSON; then Read the sheet images (desktop sheets are 2x3 tiles at half size, phone sheets 4x2). Read only the sheets, never single full-size screenshots. Take one pass at both widths per page, fix, then one confirming pass.
- Token budget: cap command output (`| tail -40`), do not dump files you already know, do not re-read unchanged files.
- Report format: what you changed (file list), what you removed because of section 2 conflicts, anything you could not do and why, and a verdict on your own pages at 1440 and 390 (overflow 0, console errors, broken images).
