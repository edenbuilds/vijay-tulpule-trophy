# Handover: phone layout, names, address, copy, the Tulpule profile and text wrapping (02-10-2026, fourth pass)

HANDOFF.md stays the running log and the paste-ready prompt. This file is the detail behind the third and fourth passes (the
fourth is section 14): what was changed on request, the rules the site now follows, where each thing lives, and how to switch to BACA colours later.
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
- **Vijay Tulpule** is written Adv. Vijay Tulpule in captions and sentences. The fourth pass confirmed from the Bombay High Court
  reference that he was enrolled as an advocate on 27 March 1968, so the prefix is sourced, not assumed. The trophy's own name, "The Vijay Tulpule Trophy", is unchanged. Sunil Gavaskar and
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
| `/trophy` | none | portraits of Adv. Vijay Tulpule only. Sourced profile: intro, His life, Sport, At the Bar, In his name, then Rizvi and Presentation (section 14) |
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

Fourth pass, locally on the production build:
- `wrapAudit` at 360, 390, 768, 1024 and 1440 across all 12 routes: no single-word last lines and no lone last items after the fixes in section 14
  (the audit ignores a last item that spans the full row on purpose). No sideways overflow at any width.
- `/trophy` at 390 and 1440: timeline, both portraits, sections and the external PDF link render.
- `npm run build` (22 routes) and `npx tsc --noEmit` pass.
- Live (https://vijay-tulpule-trophy.vercel.app, commit `2ba4157`): `wrapAudit` at 390 and 1440 over all 12 routes is clean. Home "spill" hits are GSAP start offsets (checked: "The teams" sits inside its box after the reveal).
- Not verified: a real phone, Safari, reduced motion in a browser. PDFs were not regenerated (visible text unchanged; `CONTACTS` and `ORG.address` now hold non-breaking spaces, so check the PDF text after the next `npm run downloads`).
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
- Whether the BACA committee members named in the reference (section 14) are the same people as the committee on `/about`.
- Whether the Advocates’ Association of Western India's Vijay Tulpule Cricket Championship Trophy and this Vijay Tulpule Trophy are related. Nothing says so and no page claims it.
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

## 14. Fourth pass (02-10-2026): the Vijay Tulpule profile, and no widows or orphans

Request: take the context about Vijay Tulpule from the Bombay High Court PDF and add more details about him; make sure no
text, element or UI element is orphaned or widowed on desktop or mobile; deploy.

### The profile (`/trophy`)
- **Source:** the Full Court Reference held in his memory at the Bombay High Court on 17 November 2017 (27 pages): the Chief
  Justice's address and tributes from the Advocate General, the Additional Solicitor General, and the presidents of the Bombay Bar
  Association, the Advocates' Association of Western India (AAWI) and the Bombay Incorporated Law Society.
  https://bombayhighcourt.gov.in/bhc/libweb/references/TulpuleVT.pdf is linked from the page ("Read the Full Court Reference (PDF)").
- **Where it lives:** `TULPULE` in `src/lib/site.ts` (name, source link, the dated `life` list). Everything else is copy in
  `src/app/trophy/page.tsx`. Order: intro with the informal portrait, His life (dated list; year above the text on phones, beside it from `md`),
  Sport, At the Bar (formal portrait), In his name, Rizvi Shield/Plate, Presentation. The home trophy band and a new home FAQ
  ("Who was Adv. Vijay Tulpule?") point to it.
- **What the page says** (all from the reference): born in Mumbai 22 September 1943, died 29 September 2017 aged 74; King George High
  School, Elphinstone then St. Xavier's (graduated 1964), LL.B. Government Law College 1967; enrolled 27 March 1968, chamber of
  Adv. Ramrao Adik, Dadar Court, criminal side; six-day hunger strike (1992 to 1994) for City Civil Court jurisdiction; President and
  Patron of the Indian Advocates Cricket Association 1994 to 1999 ("Guruji"); Government Pleader and Public Prosecutor 1998 to 2000;
  Bombay Ranji Trophy probable, university champion, played with Gavaskar and Vengsarkar (the Bombay Bar Association president's tribute),
  led the Advocates' team in the Indian High Courts Cricket Tournament, 90 runs in an all India advocates' final in Bangalore (recalled by
  Adv. Deepak Thakre); presidencies of volleyball, carrom and badminton associations; Lentin and Srikrishna Commissions; the murder
  appeal where he asked for life imprisonment and the Supreme Court endorsed it; almost 45 juniors; Adv. Uma Wagle on the
  sportsman-or-artist rule; the AAWI and Mumbai Cricket Association (under-13) Vijay Tulpule Cricket Championship Trophies running in 2017.
- **Left out on purpose:** his children and where they live (private, living people), the gangster and Malegaon-blast anecdotes
  (wrong register for a tournament site), the Vijay Merchant story, and the cheque and share-sale donations.
- **Where the speakers disagree, and the choice made:** his middle name is Traymbak, Trimbak and Tryambak (the Chief Justice's
  Traymbak is used); the Government Pleader term is "1990s", "late 90s" and "1998 till 2000" (1998 to 2000 used, from the AAWI president);
  the volleyball body is named differently by two speakers (the page says "volleyball, carrom and badminton associations");
  the Mumbai Cricket Association under-13 trophy is dated 2015 by one speaker, so the page gives no start year.
- **Names in the reference that are also on BACA's committee:** Senior Advocate Shirish Gupte, Senior Advocate Rajiv Patil, Advocate Deepak Thakre
  and Senior Advocate Prasad Dhakephalkar all recall him. The page quotes only Thakre and Wagle, by name as the document does, and does not
  say they are the BACA committee members. Confirm identity before saying so (never match people by name alone).

### Widows and orphans
- **Rule:** `body { text-wrap: balance }` in `globals.css`. It is inherited, so every block of up to six lines is balanced (headings
  already were). `text-wrap: pretty` was tried first and Chrome 152 still left single words on three-line paragraphs on `/trophy` at 768.
- **Longer paragraphs:** balance stops at six lines, so `tie()` in `site.ts` joins the last two words with a non-breaking space. It is
  used on the `/trophy` copy. `nb()` joins every word, and is used for people's names (`CONTACTS`, `COMMITTEE`, advisors) and
  `ORG.address`, so a name or the pincode never splits.
- **Unbreakable text needs room.** After `nb()` the contact rows overflowed a 360px phone (name plus number was wider than the row).
  `Contacts.tsx` now stacks name above number below `lg`. If you add an `nb()` string, test it at 360.
- **Lone items fixed:** four download tiles were 3+1 at `lg` (columns now follow the count, `COLS` in `Downloads.tsx`); sponsor tier
  cards go four across only from `xl`, so the Platinum button fits its card (button labels are `whitespace-nowrap`); sponsors
  chips and the About host chips are grids (2x2, 4x2); odd last rows in Partner roles, Rights and the 11-name Committee list span both columns; the footer has a
  Home link so its 2-column list is even; the gallery filter is four equal pills on phones.
- **The check:** `scripts/wrap-audit.js` loads every route in an iframe at each width and reports single-word last lines, lone last
  items in grids and wrapping flex rows, text spilling out of its box, and sideways overflow. Serve it (`cd scripts && python3 -m http.server 8765`),
  open the site, inject it with a script tag, then `await wrapAudit({ widths: [360, 390, 768, 1024, 1440] })`. Judge each hit; a lone
  last card can be deliberate. It reads the DOM, so run it against `next start`, not `next dev`.

## 15. Fifth pass (03-10-2026): hosts, logos and the Tulpule page
- **Hosts structure** (from the co-hosts screenshot): Host BACA; Co-hosts AAWI, BBA, BILS; Under the aegis of CAAI. `HOSTS` and `HOSTS_LINE` in `src/lib/site.ts`.
  Shown in `components/Hosts.tsx`: `Hosts` on home (cream block, paper tiles), on `/about#hosts` (paper block, mist tiles) and `HostsStrip` in the footer with the one-line statement. The sponsorship PDF
  (`scripts/downloads.mts`) carries the five logos and the line above the tiers. The old "association with BBA, BILS and AIA" sentence on `/about` is gone. The "AIA not expanded" open item is closed: the crest reads AIA, the body is the Advocates' Association of Western India.
- **Logos** are built by `scripts/logos.py` from `scripts/logo-source/` (re-run it when better files arrive): `public/brand/partners/{aia,bba,bils,caai}.png` (transparent, trimmed and padded; BBA and BILS are discs, AIA keeps its wide crest, CAAI is circle-fitted) and `public/brand/baca-seal-{dark,light}.png`
  (`dark` is the original navy and gold disc; `light` is a paper disc with ink linework made through an art alpha so the transparent edge stays clean). The BACA logo pack zip now holds both. Partner logos are for light tiles only.
  Source resolution is the limit: AIA 512px, BILS 200px upscaled, CAAI about 230px cropped from a screenshot. Ask the bodies for vectors.
- **`/adv-vijay-tulpule`:** from the supplied `content.ts`, `trophy-teaser.tsx`, `WIREFRAME.md`. `/trophy` keeps its sections, replaces the intro with the teaser (informal portrait, short text, link) and drops the PDF link there; the profile page links the PDF in its source note instead.
  The wireframe's four-number strip is a plain dashed list (rule: no big-number strips). Phones get dashed lists in one tile, cards from `md`, a sticky contents rail from `lg`. The portrait stacks above the name until `lg`.
- **Fact check against `TulpuleVT.pdf`:** all dates, posts and quotes were read back against `pdftotext` output. Two edits: the Sathe tribute is now his exact sentence ("Truly an all-rounder in life, both in legal practice as well as his other pursuits.") and the Sakhare remark follows the source wording instead of "uncompromising". "3 to 4 a.m." is in the PDF as "3-4 a.m.".
  Still true from section 14: children left out on purpose; BACA committee members are not identified with the speakers.
- **Sitemap and footer:** `src/app/sitemap.ts` is built from `FOOTER_LINKS` (hash stripped, duplicates removed). The footer gained Hosts and Adv. Vijay Tulpule links (14 links, so both list layouts end even).
- **Verified locally on `next start`:** `npx tsc --noEmit`, `npm run lint` (0 errors, 2 old warnings), `npm run build` (24 routes). `wrapAudit` at 360, 390, 768, 1024 and 1440 over all 13 routes: no widows, no orphans, no overflow.
  First run found five things, all fixed: footer logo strip wrapped 4+1 at 360 and 390 (now `h-10` below `sm`), "Adv. Vijay Tulpule" widow in the footer list and in the profile h1 (`tie()`), "Bombay Bar Association" widow in Hosts (`tie()`), the "Who hosts it?" answer ending on "(CAAI)." (`tie()`),
  profile hero name too big for its column at 768 (stacks until `lg`, `md:text-6xl xl:text-7xl`).
  Remaining audit hit: a "spill" of 10px on the profile page's "See the trophy" wrapper. It is the magnetic button's invisible hit area (`-m-2.5`), not visible overflow. Home "spill" hits are GSAP start offsets as before.
- **Not verified:** a real phone, Safari, the partner logos on a physical print. The logo-pack zip was rebuilt but not opened in a design tool.
- **Environment note:** `node_modules` had x64 `lightningcss` and `@tailwindcss/oxide` on an arm64 Node, so the build failed. `npm i --no-save lightningcss-darwin-arm64@1.32.0 @tailwindcss/oxide-darwin-arm64@4.3.3` fixed it without touching package.json. The audit's python http.server route did not work in the sandbox; copy the script into `public/` for a run, restart `next start`, and delete the copy afterwards.
- **Open:** vector logos from AAWI, BILS and CAAI; whether to trim His life, Sport, At the Bar and In his name on `/trophy` now that the profile page carries them; Rizvi Shield/Plate details; ground names and fixtures.
