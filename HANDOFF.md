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
