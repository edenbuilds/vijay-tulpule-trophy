# BACA tournament site: handoff (08-10-2026)

Live: https://baca-cricket.com · Repo: edenbuilds/vijay-tulpule-trophy · Checkout: /Users/omkar/vijay-tulpule-trophy

## Done this pass
- Fonts: Archivo (variable width, condensed 64-78%, weight 800-900) for display; Satoshi body (the site's own font). src/app/layout.tsx.
- Hero rebuilt: full-bleed archive photo with slow zoom + scroll parallax (CSS scroll-timeline), headline is the tournament name with line-mask rise, red ball bowls in and rolls, countdown, red team-name marquee.
- Teams: broken Stack Spread (single card + empty void on live) replaced by two opposite-drifting logo marquees linking to /teams#slug; pauses on hover/focus; static grid under reduced motion.
- Copy brought back to the core idea: plain headings (The teams, Match week, Since 1989, Sponsorship, Downloads, Questions); stat strips and the generic guide cards removed.
- Palette unchanged (navy #0B2A6B, royal #1E6BD6, red #E21B2D).

## Verified
Production build passes; local 1440 and 390: no overflow, no console errors.
Note: the Claude browser pane blocks this site's assets (ERR_BLOCKED_BY_CLIENT); use headless Playwright for checks.
Local build needed `npm i --no-save lightningcss-darwin-arm64` (only x64 binary was installed).

## Next (not done)
Lower sections still old layout: trophy band, Since 1989, gallery, poem, sponsorship, downloads, FAQ, CTA. Match week tabs untouched apart from heading. BYQ/Hyperiux pieces not yet pulled in for those.

## Paste-ready prompt
Continue in /Users/omkar/vijay-tulpule-trophy. Read HANDOFF.md. Carry the new hero language (condensed Archivo .display-xl, CSS motion with --ease-snap, reduced-motion fallbacks) down the rest of the homepage: trophy band, Since 1989, gallery, poem, sponsorship, downloads, FAQ, CTA. Use BYQ Supply gems and Hyperiux effects where they fit; one animation system per element. Plain copy, Adv. before every name, no invented facts, no stat strips. Verify 1440 and 390 with headless Playwright, commit as omkar1sonawane@gmail.com, deploy, update this file.

## Pass 2 (08-10-2026)
Done:
- Telecast hero: SVG pitch, floodlights, ball loop, scorebug. No BACA photos.
- Replay stinger loader, shown once per session and skipped under reduced motion.
- Match week is a red board plus a ball rail. The day number punches in and the grounds stagger in.
- Hyperiux parallax footer with a "Mumbai 2026" outline marquee. Hyperiux perspective text reveal on the big headings.
- New logo: transparent light, reversed and icon versions (scripts/logo-2026.mjs), applied through Logo and Mark.
- Poem stanza 5 fix: कहे.
- main is stacked above the fixed footer (globals.css, end of file).
Not used: BYQ, because its MCP disconnected mid-session.
Next: check the stinger on a real phone; delete the unused /brand/mark.svg.

Paste-ready prompt:
"In ~/vijay-tulpule-trophy read HANDOFF.md. Verify baca-cricket.com at 1440 and 390 (stinger, hero, match week tabs, footer reveal). Fix only what is broken, commit as omkar1sonawane@gmail.com, push, verify live."

## Pass 3 (12-10-2026)
- Hero: the 16 teams as a sliding name carousel with the logo card (BYQ stringer-hero-10). It auto-advances and pauses on hover, focus and reduced motion.
- Match week: one expandable row per day (BYQ cultureexchange-structured-data-2, native details). The day tabs and red board are gone.
- Stinger: light panel with the light logo.
- Pass 3b (12-10-2026): the hero is a full-bleed night stadium photo (Pexels 36230651, Narendra Modi Stadium; never caption it as a venue) with a neutral scrim. Match week is 8 day cards (opening navy, finals red). The Pexels API key is not in the repo; ask the owner for it.

## Pass 4 (13-10-2026)
- Match week is now the Hyperiux `timeline` effect (src/components/effects/timeline, adapted: props-driven, no nested Lenis), fed from SCHEDULE.
- About: blue-jersey 2023 champions photo (public/img/bombay-champions-2023.jpg), six titles from HISTORY.titles (client table, 13-10-2026).
- Tulpule: "late" and "criminal" removed, Senior Advocate at the Bombay High Court, formal portrait is the main picture, Ranji probable line under the image on /trophy, /adv-vijay-tulpule and home.
- Kept verbatim: the tribute quote "stalwart of the criminal bar", the Full Court Reference citation title, the Dadar trial-court history line.
- Gallery tiles and title cards reveal on scroll (CSS view timeline).
Next prompt: "Verify baca-cricket.com match week timeline at 390px; tighten mobile text if any line clips."

## Pass 5 (13-10-2026)
- Type: Bebas Neue (display), Antonio slanted red with white outline for "ONE TROPHY." only (.hero-accent / .accent-slant), Barlow body. Archivo and Satoshi removed. font-synthesis off so Bebas never fake-bolds.
- Team photo is now the 37th AIACT Colombo 2025 winners (public/img/bombay-champions-2025.jpg) on About and the match week timeline.
- Match week mobile text narrowed so it no longer clips at 390px.
- Hero background unchanged (owner's call). Hero mockups with the High Court photo were rejected.
Next prompt: "Check every page at 390px for headings that look too tall or tight in Bebas Neue and adjust sizes."

## Pass 6 (13-10-2026)
- Hero h2 "Who takes it home?" rotates the 16 team names (effects/rotating-text, after React Bits). Hero pushes in and copy lifts away on scroll (CSS view timeline, after motion.dev scroll zoom hero).
- Nav: sliding sky pill on hover/current page and a red scroll progress line (after motion.dev scroll highlight).
- Gallery: 3D unfurl + column parallax showcase above the archive (effects/unfurl-gallery). The 21st.dev original needs a 21st.dev login, so this is a local rebuild.

## Pass 7 (16-10-2026): highlight reel
- Home, directly under the hero: "From the tournament" (src/components/home/HomeHighlights.tsx), data in src/lib/highlights.ts.
- To add a photo: put it in public/highlights/ (webp, ~1200-1600px), add an entry at the TOP of HIGHLIGHTS with src, w, h, caption, alt (date only if BACA gives it). Newest becomes the big framed photo; older ones move to the grid beside it.
Paste-ready prompt: "Add this photo to the BACA highlight reel with caption '<caption>'. Save it in public/highlights/, add it at the top of src/lib/highlights.ts, build, check home at 1440 and 390, deploy."

## Pass 8 (16-10-2026)
- Highlight caption reworded; optional `tagline` field on `Highlight` (red slanted Antonio line).
- Photo enters with a clip-path wipe plus blur-to-sharp; caption words rise in sequence (`.hl-w`). Reduced motion disables both.

## Pass 9 (18-10-2026)
- Organisers' Fixtures PDF (18-10-2026) is now the source: `MATCHES` and derived `GROUPS` in `src/lib/schedule.ts`; grounds replaced to match it. The PDF itself is `public/downloads/vtt-2026-fixtures.pdf`.
- Fixtures page shows every match with team logos, plus a Groups block. ICS, home timeline, teams/format/home copy updated (groups are drawn).
- PDF quirks: SF and final days reuse match numbers 25-28, so those show stage only; "Ari India" read as Air India; "Looser" written as Loser. No start times yet.

## Pass 10 (18-10-2026)
- Home shows a Scores section under the hero (`HomeLive`), read in the browser from https://match.baca-cricket.com/api/live (CricHeroes via the tournament desk, CORS open) every 30 s. Shows today's and live matches only; hidden when the feed is empty or down. Desk team ids map to site slugs in the component.
- Known: a 2px horizontal overflow at 390px predates this pass (present on the baseline build).

## Pass 11 (18-10-2026): home scores for phones
- `HomeLive.tsx`: Live / Results / Later tabs with counts; phones swipe one card at a time (scroll-snap), 2 then 4 columns from sm/lg. Card shows start time or status, ground, logos, score + overs, losing side dimmed, summary line.
- Note: Vercel's bot checkpoint is on for baca-cricket.com, so headless Playwright gets 403; verify in a real browser.
- Paste-ready next prompt: "Check today's saved results in the match centre and add batting/bowling cards if organisers want them."

## Pass 12 (19-10-2026): results posts, ticker, photos
- `/social/results/YYYY-MM-DD`: 1080x1350 Instagram results post (next/og), built from the live feed, so each day's post exists once its matches finish. Assets in `src/app/social/assets` (fonts, t26 logo, 120px team logos, skyline cropped from the owner's Day 1 reference). Linked as "Results post" in the home match centre.
- Not done: publishing to Instagram itself needs a Meta Graph API token for the BACA business account.
- Hero ticker (`HeroTicker.tsx`): match number + date for the previous day's results, today's matches and the next day's fixtures. Never "yesterday/today".
- Home match centre: inset 16px card like the hero; tabs labelled by date; cards stagger in, scores roll on change, live cards pulse; swipe row with arrows.
- Photos: `scripts/add-photos.sh <folder> <YYYY-MM-DD>` writes 2000px copies to `public/matchday/<date>/`; the carousel (adapted from BYQ cultureexchange-image-gallery-1) lists them at build. Commit + push to publish.
- Paste-ready next prompt: "Add today's photos from ~/Downloads/<folder> with scripts/add-photos.sh and deploy; check /social/results/<today> once the last match ends."

## Pass 13 (19-10-2026): score cards
- Cards are white with navy text on the navy match centre (16px shell, 12px cards); live cards get a red border and top strip.
- Scroll motion (CSS scroll-driven, Chrome/Edge/Safari 26+, no-op elsewhere): the row rises in as it scrolls into view; cards easing off either edge of the swipe row shrink and fade.
- Scores are odometer reels (idea from BYQ gem odometer-counter-01, rebuilt in CSS, no GSAP): digits spin to value left to right and spin again on change. Reduced motion turns all of this off.
- Paste-ready next prompt: "Open baca-cricket.com at 390px and desktop, scroll to the match centre, confirm the odometer scores and edge fade, then add today's photos with scripts/add-photos.sh."

## Pass 14 (22-10-2026): more photos, press
- 18 photos sent in chat (no shoot date in the files) live in `public/matchday/more/`; the carousel shows them first with no date. Move them into a `YYYY-MM-DD` folder if the organisers confirm the day.
- `HomeMedia.tsx`: "In the press" cards linking out to VIE Stories (22-10-2026) and Hindustan Metro (Oct 2026). Add new coverage to the top of `PRESS`.
- Paste-ready next prompt: "Search for new press on the 38th All India Advocates Cricket Tournament and add any real articles to PRESS in HomeMedia.tsx, then deploy and check at 390px."
