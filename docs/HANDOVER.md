# Handover: phone layout, names, address and copy (01-10-2026, third pass)

HANDOFF.md stays the running log and the paste-ready prompt. This file is the detail behind the third pass: what was
changed on request, the rules the site now follows, where each thing lives, and how to switch to BACA colours later.
Read it before touching the home page, any name, or any heading.

Live: https://vijay-tulpule-trophy.vercel.app

## 1. The request and what changed

| Request | Change |
|---|---|
| Phone UI was cluttered with stacked cards | Every stack of cards on a phone is now one dashed list inside one tile. Cards stay from tablet and desktop up. See section 2. |
| Address people with "Adv." always | Every named person carries Adv. (Sr. Adv. where the source says so). See section 3. |
| Stick to the Shivaji Park address | Only `Krishna Kunj, 36 Shivaji Park, Mumbai 400 028` (`ORG.address`). The 167/E Poonawadi, Dadar address is gone from `/about`. |
| No poetic numbers ("49 photos", "8 days") | Headings are plain labels. The big stat strips are removed. See section 4. |
| Less AI tone | Copy rewritten short and plain. See section 4. |
| Handover and handoff files, deploy | This file, HANDOFF.md, deployed to the URL above. |

Home page height at 390px went from about 12.2k px to about 10.0k px. Sections that were card stacks on a phone before: the
schedule (6 cards), stats (4), quick links (4), sponsor tiers (4), downloads (4), and on Teams 16 team cards. All are lists now.

## 2. Phone layout rules

- A list of three or more things on a phone is a dashed list (`.rule` and `.row-line`, `border-dashed`) inside one `bg-mist`
  rounded tile, not one card each. Cards (tiles with photos, spotlight, lift) appear from `sm`, `md` or `lg`.
- Standalone links and buttons are at least 44px tall (`min-h-11` or `min-h-16` rows). Links inside a sentence are exempt.
- No horizontal page scroll at 390, 768 or 1440 (checked, section 7). Wide things scroll inside their own box (the archive reel).
- Components that switch layout by width render both versions and hide one with `hidden` or `sm:hidden`:
  `Tiers.tsx` (list below `sm`, cards from `sm`) and `Downloads.tsx` (same). `Programme.tsx` and the home quick links use one
  markup with responsive classes.

## 3. Names, titles and the address

- Every person is written with the prefix: `Adv. Deepak Thakre`, `Sr. Adv. Rajiv Patil`. The data lives in three places:
  `CONTACTS` in `src/lib/site.ts` (home FAQ, contact page, footer, sponsors page, both PDFs), `COMMITTEE` and the Advisors line
  in `src/app/about/page.tsx`, and the portrait captions and alt text for Vijay Tulpule (`src/app/page.tsx`, `src/app/trophy/page.tsx`).
- The prefix is part of the `name` string, and `role` holds only a role the source gives (Hon. Secretary, President, Vice
  President, Treasurer). `Contacts.tsx` hides an empty role.
- Sr. Adv. for Shirish Gupte and Rajiv Patil, as printed on the poster. Everyone else is Adv. because the instruction was
  "always", though the source gives no title for most of them.
- Judgement call to confirm: **Vijay Tulpule** is written Adv. Vijay Tulpule in captions and sentences, because the trophy page
  already says he practised at the Bombay Bar. The trophy's own name, "The Vijay Tulpule Trophy", is unchanged. Sunil Gavaskar and
  Dilip Vengsarkar are cricketers and carry no prefix. The poet keeps the Hindi अधिवक्ता already printed in `POEM.by`.
- The sponsorship PDF contact line now reads "Sr. Adv. Rajiv Patil, Hon. Secretary, BACA". Regenerate both PDFs with
  `npm run downloads` after any change to `CONTACTS`, tiers, terms or fixtures.
- Address: `ORG.address` is the only address. `/about`, `/sponsors`, the footer and the sponsorship PDF all read from it.

## 4. Copy rules now in force

- Headings name the thing: "The teams", "Schedule", "Gallery", "Questions", "Sponsors", "Downloads". Not "Sixteen teams. One
  trophy.", "Eight days in October" or "49 photographs".
- A number appears only as a plain fact in a sentence or table: 16 teams, 15 High Courts, 8 grounds, 50 overs a side, 15-player
  squad, times and dates. No counters, no big-number strips, no counts of photographs.
- Removed stat strips: home counters (and `home/Stats.tsx`), Fixtures, Format (the award totals are now one plain sentence),
  About (Mumbai hosting years are now a sentence). `StatBar` is deleted from `Sections.tsx`. The Fixtures strip also said "4 grounds"
  while everything else says 8: see open items.
- Removed the `01 02 03` numerals on the Ceremonies tiles, the small caption labels above headings that repeated the heading
  ("Good to know", "Partners", "Poem", "The trophy", "Since 1989", "Also awarded"), and wording such as "battle it out",
  "proudly invites", "together for eight days".
- No em dashes anywhere in the site copy. The one on `/poem` is the author's own punctuation in the verse and stays.
- Two poster phrases remain, trimmed: "BACA invites you to the 38th" and "Come and support the legal fraternity."
- Do not add a tagline, a superlative, or a sentence that only decorates a heading. If the fact is not in a source document, leave it out.

## 5. Page map

| Route | Photo role (`PH.*`) | Notes |
|---|---|---|
| `/` | hero, court, opening, league, quarter, semi, final, cheer, plus `CONVERGE`, `ZOOM`, `ARCHIVE` | section 6 |
| `/fixtures` | fixtures (72) | tabs by day, no stat strip |
| `/teams` | teams (11) | four group tiles with rows "Team A, To be announced"; squad size said once |
| `/format` | format (46) | three cards, points, awards sentence |
| `/trophy` | none | portraits of Adv. Vijay Tulpule only |
| `/gallery` | gallery (23) | pinned reel, then every photograph |
| `/about` | about (8) | facts, committee with Adv. names, poem teaser |
| `/poem` | none | the poem, typography only |
| `/ceremonies` | page hero 65; one per ceremony (109, 81, 75) | |
| `/sponsors` | sponsors (80) | tiers list on phones, partner roles and rights as lists |
| `/contact` | contact (20) | |
| `/downloads` | none | rows on phones, tiles from `sm` |

## 6. Home page, in order

1. **Hero** (`Hero` with `tall`). Photo 85, rolling-text title, `Countdown.tsx` to 17 Oct 07:00 (Asia/Kolkata), three facts.
2. **Quick links.** Fixtures, Teams, Format, Sponsors. One dashed list in a single tile on phones; four tiles from `md` (two across at 768, four from `lg`).
3. **The teams** (`home/Converge.tsx`). Team photographs fly in from the centre as you scroll (Animmaster scroll 58). Four cards exist only from `md`.
4. **Schedule** (`home/Programme.tsx`). Phones and tablets: one dashed list, date on the left, title and line on the right, each row a link. From `lg`: the section pins and a row of photo cards slides sideways (ScrollTrigger pin and scrub). With reduced motion at `lg` the cards wrap instead of pinning. The reserve day has no photo.
5. **Trophy band.** The Vijay Tulpule Trophy, the portrait of Adv. Vijay Tulpule, the Rizvi line ("being confirmed"). No photo is presented as the trophy.
6. **Gallery** (`home/GalleryZoom.tsx`). Desktop and tablet: a 5x3 grid, the middle photograph scales to fill the screen and the heading fades in (Animmaster grid 7). Phones and reduced motion: four photographs in a 2x2 mosaic.
7. **Since 1989.** Photo 79, a scrubbed sentence, one plain line on Mumbai's hosting years, then the archive reel (Hyperiux draggable-marquee, old prints only).
8. **Poem teaser.** Verse 2 with the mask reveal, link to `/poem`.
9. **Questions** (Hyperiux animated-faq). Six answers, each only from facts already in `site.ts`.
10. **Sponsors, Downloads, Contact details**, then the closing photo tile (89).

## 7. Photograph registry (`src/lib/photos.ts`)

Unchanged from the second pass. Pages never name a file; `PH`, `CONVERGE`, `ZOOM`, `ARCHIVE` hold the roles and every placement has a
comment saying why. `photo(id)` throws if the id is not in `gallery.ts`. Alt text literally describes what is visible, and now says
"Adv. Vijay Tulpule" for his portraits. Rules: a team photo only where a team is the subject; archive prints only in history
places; no photo twice on one page; the gold "Winner" cup photographs (75, 84, 125, 22) are never captioned or placed as the Vijay
Tulpule Trophy because nobody has confirmed that. To add a photo: resize to both files, add a line to `SHOTS`, add its alt to `ALT`, give it a role.

## 8. Effects

Hyperiux Vault (Pro, 10 installs a day, `npx hyperiux add <one effect>`, never `init`; run `git status` after each add): rolling-text
(hero title), mask-text-reveal (poem, teasers), parallax-gallery (`/gallery`), slide-text-reveal (every `Block` heading and the home
headings), animated-faq, draggable-marquee. **Deleted this pass:** number-counter and scramble-text, because the counters and the
scrambled "1989" were the poetic numbers; `hyperiux.json` may still list them and stacking-cards. Animmaster Awwwards Pack: scroll 58
(teams), grid 7 (gallery), the horizontal pin pattern (schedule). BYQ gems: magnetic-button-01, tab-underline-01, curtain-image-reveal-01,
spotlight-glow-cards-01 (now used only on `Tiers`, from `sm` up), iris-wipe-preloader-01, kelvin-footer-4.
Rule: a heading may animate once as it enters; nothing animates under `prefers-reduced-motion`; never GSAP and Framer Motion on one element.

## 9. The poem (`/poem`)

Unchanged. `src/lib/poem.ts` is the transcription by eye (Devanagari cannot be OCR'd on macOS), spelling as printed. `PoemReader.tsx`
lights the verse crossing the middle of the screen. No `text-indent` hanging indents (SplitText makes every line a block). Open question
for the author: verse 5, line 4, "मुवक्किल कड़े, मेरा ही कहना Correct". No translation was supplied, so none was added.

## 10. Verified and not verified

Verified locally on the production build (`next start`) in the browser pane:
- Home at 390: no horizontal overflow, schedule, quick links, sponsors, downloads as lists, gallery as a 2x2 mosaic, trophy band, since-1989 block, no broken images.
- Every other page at 390 (teams, sponsors, about, trophy, format, fixtures, ceremonies, contact, poem, gallery, downloads): no overflow, no broken images, no unprefixed person name, no old address, no stat-strip leftovers.
- Standalone links and buttons at least 44px tall at 390.
- Home at 768: no overflow, two quick-link columns, schedule list. Home at 1440: no overflow, four quick-link tiles, the schedule pins (two pin spacers) and slides.
- `npm run build` (22 routes), `npx tsc --noEmit`, `npm run lint` (one vendored `<img>` warning in draggable-marquee).
- Both PDFs regenerated; the sponsorship PDF shows "Sr. Adv. Rajiv Patil, Hon. Secretary" and the Shivaji Park address.

Live results are in HANDOFF.md under "Third pass".
Not verified: a real phone (390px was emulated in the browser pane), Safari, reduced motion in a browser (checked in code only).

## 11. Switching to BACA colours later

Only `src/app/globals.css` `@theme` changes (plus the two literal gradients below). Sample the real values from
`public/brand/baca-seal.png`; do not guess.

| Token | Now (green) | Role | Becomes |
|---|---|---|---|
| `--color-pitch` | #1f7a34 | actions, dark tiles | BACA navy |
| `--color-hover` | #17602a | action hover | deeper navy |
| `--color-mint` | #e2f0d8 | soft tile | warm sand |
| `--color-sage` | #bfe0aa | stronger tile, text on dark | champagne or gold |
| `--color-paper` | #f1f4ea | canvas | warm off-white |
| `--color-ink` | #141a16 | text | near-black navy |
| `--color-mist` | #fff | cards and list tiles | unchanged |

The hero gradients use `rgb(20_26_22/..)` (ink) in `Sections.tsx` and `app/page.tsx`; change them with `--color-ink`. The PDF script
(`scripts/downloads.mts`) has the same green as literals in its CSS. The red ball stays red.

## 12. Open items (nothing invented for any of them)

- Rizvi Shield/Plate: who it honours and how it is played for.
- Grounds and fixtures: the poster says "announced shortly" and names 8 grounds; the fixture grid runs four matches per slot. Until
  the grounds are named, no page claims a number of grounds other than the poster's 8.
- AIA is printed as AIA on the poster and is not expanded.
- Gold "Winner" cup: is it the Vijay Tulpule Trophy.
- Whether Adv. Vijay Tulpule is the right form on the trophy page (section 3).
- Names, grounds and years for gallery photos.
- Contact form needs `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` and a verified Resend domain.
- Closed this pass: which BACA address is current (Shivaji Park).

## 13. Deploy

```
cd ~/vijay-tulpule-trophy
npm run build
git add -A && GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com GIT_COMMITTER_EMAIL=omkar1sonawane@gmail.com git commit -m "<plain sentence>"
git push origin main
vercel deploy --prod --yes
```
The commit author must be omkar1sonawane@gmail.com or Vercel silently fails the deploy. Do not pipe `vercel deploy` into `head`.
Then check the live URL at 1440 and 390, and `vercel ls` for Ready.
`npm run downloads` needs Chrome; headless Chrome can write the PDF and then not exit, so the script gives each PDF its own profile,
waits at most 25 seconds and accepts the timeout.
