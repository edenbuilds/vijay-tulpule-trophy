# Handover: home and poem rebuild (01-10-2026, second pass)

HANDOFF.md stays the running log and the paste-ready prompt. This file explains the second pass in detail:
what was wrong, what was built, why each photograph sits where it does, which effects came from where, and how to
change the colours later. Read it before touching the home page.

Live: https://vijay-tulpule-trophy.vercel.app

## 1. What was wrong, and what changed

The brief: "something is wrong about the look and feel", remove 2026 from the nav bar, add sections, make the pictures
logical, use the effects we have access to, keep it responsive, make the poem read naturally.

| Problem found | Change |
|---|---|
| Photos were arbitrary team shots used as illustrations (a team photo for "Group B", another for "Quarter-finals") | One registry, `src/lib/photos.ts`. Pages never name a file. Every placement has a comment saying why. |
| Home hero had no real photo and nothing to look at | Photo-led hero: team on a ground, countdown to the opening, three facts. Photo lifted so faces sit above the title; on phones it is a band above the title. |
| Home was 14.8k px of two photo-heavy sections | 12.2k px, 11 distinct sections, each doing a different job (see section 3). |
| Nav read "BACA 2026" | Wordmark is "BACA" plus the sub line "38th All India Advocates’ Cricket". Footer wordmark matches. Browser tab titles still say 2026 (deliberate: tabs are for finding the page). |
| Text appeared with no animation | Slide, mask, scramble, scrub and rolling text, see section 5. |
| The poem was a block of verses on About | Own page, `/poem`, built for reading, see section 6. About and home carry a one-verse teaser. |
| Palette | Kept the original green on request. BACA colours are a later, token-only swap, see section 8. |

## 2. Page map

| Route | Photo role (`PH.*`) | Notes |
|---|---|---|
| `/` | hero, court, opening, league, quarter, semi, final, cheer, plus `CONVERGE`, `ZOOM`, `ARCHIVE` sets | see section 3 |
| `/fixtures` | fixtures (72, a team at a stadium) | |
| `/teams` | teams (11, one team lined up) | |
| `/format` | format (46, batsman and wicketkeeper) | |
| `/trophy` | none | portraits of Vijay Tulpule only |
| `/gallery` | gallery (23, trophies laid out) | |
| `/about` | about (8, blazers and flags) | poem section is now a teaser |
| `/poem` (new) | none | the poem, typography only |
| `/ceremonies` | page hero 65; one photo per ceremony (109, 81, 75) | |
| `/sponsors` | sponsors (80, a hall gathering) | |
| `/contact` | contact (20, people at a desk) | |
| `/downloads` | none | quiet tile with the drawn ground |

## 3. Home page, in order

1. **Hero** (`Hero` with `tall`, `Sections.tsx`). Photo 85. Hyperiux rolling-text title, `Countdown.tsx` to the 17 Oct 07:00 opening (Asia/Kolkata, renders after mount, switches to "Under way" and "Has ended"), three facts.
2. **Quick links.** Four tiles: Fixtures, Teams, Format, Sponsors.
3. **Stats** (`home/Stats.tsx`). 16 teams, 8 grounds, 32 matches, 8 days. Hyperiux number-counter, one counter per tile.
4. **Converge** (`home/Converge.tsx`). "Sixteen teams. One trophy." Eight team photographs fly in from the centre as you scroll. Ported from Animmaster Awwwards Pack, Scroll Animation 58. Four cards exist only from md up.
5. **Programme** (`home/Programme.tsx`). Six cards for the eight days (17 opening, 18-20 league, 21 reserve, 22 quarters, 23 semis, 24 final). From lg the section pins and the row slides sideways (ScrollTrigger pin and scrub, the horizontal pattern in the Awwwards scroll demos). Below lg it is a plain grid. The reserve day has no photo on purpose.
6. **Trophy band.** The Vijay Tulpule Trophy, the portrait of Vijay Tulpule, the Rizvi line ("being confirmed"). No photo is presented as the trophy.
7. **Gallery zoom** (`home/GalleryZoom.tsx`). A 5x3 grid of 15 photographs; the middle one scales to fill the screen and "49 photographs" fades in over it. Ported from Animmaster grid-7 (zoom to fullscreen). Phones and reduced motion get a six-photo mosaic.
8. **Since 1989.** Photo 79 (advocates in court gowns) with a scrubbed sentence, a scramble-text "1989", Mumbai hosting years, then the **archive reel** (`home/ArchiveReel.tsx`, Hyperiux draggable-marquee) of old prints only.
9. **Poem teaser.** Verse 2 with the mask reveal, link to `/poem`.
10. **Questions** (`home/Faq.tsx`, Hyperiux animated-faq). Six answers, each only from facts already on the site. Add a question only when the answer is in `site.ts`.
11. **Sponsors, Downloads, Contact details**, then the closing tile with photo 89 and "Come, support the legal fraternity!".

## 4. Photograph registry (`src/lib/photos.ts`)

All 49 files are BACA's (`public/gallery/N.jpg` at 1400px, `N-s.jpg` at 640px; dimensions in `gallery.ts`). `photo(id)` throws if the id is
not in `gallery.ts`. Alt text is a literal description of what is visible (`ALT` table); nobody has named people, grounds or years, so
captions never do.

Kinds, by looking at the prints: archive and film prints (6, 7, 8, 25, 26, 35, 45, 46, 52 to 55, 67, 78, 106, 112); recent teams in blue,
red, light-blue and pink kit; trophy and ceremony pictures (17, 21, 22, 32, 40, 65, 74, 75, 79 to 81, 84, 125, 129).

Rules used: a team photo only where a team is the subject; archive prints only in history places; no photo twice on one page; the
cup photographs only where a cup is on screen in the photograph and the alt text says "gold cup".

**Assumption to confirm with BACA:** several photographs show a gold cup labelled "Winner" (75, 84, 125, 22). Nobody has said it is
The Vijay Tulpule Trophy, so none is captioned or placed as that trophy. If BACA confirms, add `trophy: photo(125)` to `PH` and
use it on `/trophy` and in the home trophy band.

To add a photo: resize to both files, add a line to `SHOTS`, add its visible description to `ALT`, then give it a role in `PH`.

## 5. Effects, where each came from

Hyperiux Vault (Pro, 10 installs a day, `npx hyperiux add <one effect>`, never `init`; after each add run `git status` and restore
`globals.css`, `README.md`, `package.json` if touched). Installed and used: sweep-lift-transition (adapted, page sweep), rolling-text (hero
title), mask-text-reveal (poem, teasers), parallax-gallery (`/gallery`), number-counter (stats), slide-text-reveal (every `Block` heading
and the home headings), scramble-text (patched to take a `text` prop; the "1989"), animated-faq, draggable-marquee. stacking-cards was
installed earlier and **removed**: it only existed to put photos in a stack and no longer has a place. Vendored files carry
`eslint-disable no-explicit-any` at the top, kept as published. `hyperiux.json` still lists stacking-cards.

Animmaster library (`/Users/omkar/Animmaster`, Awwwards Pack): used scroll 58 (Converge), grid 7 (gallery zoom), the horizontal pin pattern
(Programme). Not used, and why: scroll 5, 8, 16, 17, 21 (parallax and text-split variants that duplicate what the Hyperiux effects already
do); `02-vite-template` and `03-3d-portfolio` (Vite and three.js, wrong stack and weight for a fixtures site); `05-vscode-setup` (editor
setup); the catalog HTML (index only).

BYQ Supply (earlier pass): magnetic-button-01, tab-underline-01, curtain-image-reveal-01, spotlight-glow-cards-01, iris-wipe-preloader-01,
kelvin-footer-4. `sticky-media-swap-01` and babka-bento-3 were removed from home (their photo logic was the problem). `MagneticButton` has
tones dark, light and onDark only.

Text animation rule: a heading may animate in once as it enters; a paragraph may reveal by line; nothing animates when
`prefers-reduced-motion` is set (each effect has its own reduced branch, and the pinned sections fall back to grids).
Never run GSAP and Framer Motion on one element (Framer Motion is not installed).

## 6. The poem (`/poem`)

`src/lib/poem.ts` is the transcription (by eye, Devanagari cannot be OCR'd on macOS). Spelling and the English words are as printed.
`PoemReader.tsx`: one centred column; each verse is an `<article lang="hi">` with a large faint Devanagari numeral behind it; the verse
crossing the middle of the screen is lit and the others sit at 30%; a thin line on the left fills with scroll; lines wipe in per verse
(mask reveal splits by line, never by character, so conjuncts are safe); every second line steps in on tablets and up so pairs read as call
and answer. Without JavaScript every verse is fully lit. Do not add `text-indent` hanging indents: SplitText makes every line its own block
and the indent would hit each line.
Open question for the author: verse 5, line 4, "मुवक्किल कड़े, मेरा ही कहना Correct".
A translation was not added because none was supplied; do not add one without the author.

## 7. Verified and not verified

Verified locally on the production build (`next start`): home at 1440 and 390 (no horizontal overflow, scrollWidth equals clientWidth),
hero, Converge, Programme pin, trophy band, gallery zoom, archive reel, poem teaser, FAQ, footer; `/poem` at 390 and 1440; `/ceremonies`,
`/teams`. `npm run build` clean (22 routes). See HANDOFF.md for the live check after deploy.
Not verified: a real tablet at 768 (checked by breakpoint logic only), reduced-motion in a browser (checked in code), Safari.

## 8. Switching to BACA colours later

Only `src/app/globals.css` `@theme` changes (plus the two literal gradients below):

| Token | Now (green) | Role | Becomes |
|---|---|---|---|
| `--color-pitch` | #1f7a34 | actions, dark tiles | BACA navy |
| `--color-hover` | #17602a | action hover | deeper navy |
| `--color-mint` | #e2f0d8 | soft tile | warm sand |
| `--color-sage` | #bfe0aa | stronger tile, text on dark | champagne or gold |
| `--color-paper` | #f1f4ea | canvas | warm off-white |
| `--color-ink` | #141a16 | text | near-black navy |
| `--color-mist` | #fff | cards | unchanged |

Sample the real values from `public/brand/baca-seal.png` first; do not guess. The two hero gradients use
`rgb(20_26_22/..)` (ink) in `Sections.tsx` and `app/page.tsx`; change them with `--color-ink`. The Ground drawing and the green
`ParallaxPhoto` frames follow the tokens. The red ball stays red.

## 9. Open items (nothing invented for any of them)

- Rizvi Shield/Plate: who it honours and how it is played for.
- Grounds and fixtures: poster says "announced shortly"; venue reads "Grounds to be announced".
- AIA is printed as AIA on the poster and is not expanded.
- Which BACA address is current: About says 167/E Poonawadi, Dr Ambedkar Road, Dadar; the footer says Krishna Kunj, 36 Shivaji Park.
- Gold "Winner" cup: is it the Vijay Tulpule Trophy (section 4).
- Names, grounds and years for gallery photos.
- Contact form needs `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` and a verified Resend domain.

## 10. Deploy

```
cd ~/vijay-tulpule-trophy
npm run build
git add -A && GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com GIT_COMMITTER_EMAIL=omkar1sonawane@gmail.com git commit -m "<plain sentence>"
git push origin main
vercel deploy --prod --yes
```
The commit author must be omkar1sonawane@gmail.com or Vercel silently fails the deploy. Then check the live URL at 1440 and 390.
