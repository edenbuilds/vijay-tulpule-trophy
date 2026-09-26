# HANDOFF: Late Vijay Tulpule Trophy 2026

Live: https://vijay-tulpule-trophy.vercel.app
Repo: https://github.com/edenbuilds/vijay-tulpule-trophy (Vercel deploys from `main`, author must be omkar1sonawane@gmail.com)

## Stack
Next.js 15 App Router, React 19, Tailwind v4, GSAP 3.15 + ScrollTrigger, Lenis, next-transition-router.
Copy source of truth: `~/Downloads/VTT-2026-SECTION-PROMPTS.md` (banned phrases and no-invention rules live there).

## Design
BYQ design system **Fit Trainer** (`cmosuwexv000nxo9xyc3zy9ko`), recoloured only:
obsidian `#070908` / graphite `#101512` / iron `#1a201c` surfaces, one accent outfield green `#2ec05f`
(replaces cobalt), red `#d4322c` for LIVE only. Square corners. Oswald display (uppercase), Satoshi body
(`src/app/fonts`, Fontshare free licence). No serif, no brass. Tokens: `src/app/globals.css` `@theme`.
Old token names (paper, cream, ink) are kept but map onto the dark stack, so pages needed no rewrites.

## Motion inventory
- Hero (`src/components/Sections.tsx`): layered cricket-field parallax (mown stripes, boundary rope, pitch with creases and stumps, white ball spinning on scroll); title rolls in on Hyperiux **rolling-text** reels (`RollingWords`).
- Page transitions: Hyperiux **sweep-lift-transition** clip polygons + power4.inOut, run as an overlay (`PageSweep` in `src/components/Motion.tsx`). The vendored version pinned the site in a fixed frame and broke scroll, so it was removed.
- Home groups: Hyperiux **stacking-cards** (`src/components/effects/stacking-cards`), fed from `GROUPS`; outline group letter replaces photos.
- BYQ gems: magnetic-button-01, tab-underline-01, scroll-timeline-01, curtain-image-reveal-01, spotlight-glow-cards-01, text-rotate-01. BYQ sections: babka-hero-1, cultureexchange-structured-data-2, kelvin-footer-4.
- Lenis smooth scroll on the GSAP ticker; scoreboard ticker; Nexus-style scroll char reveal on the trophy line.
- Everything respects `prefers-reduced-motion`. No blur animations, no animated counters (brief rules).

## Hyperiux
MCP registered at user scope: `claude mcp add -s user hyperiux -- npx -y hyperiux-mcp-server` (tools appear in a new session). CLI is logged in to Pro (`npx hyperiux whoami`). 10 installs per day.
Warning: `npx hyperiux init` rewrote `globals.css` to a bare `@import`. Never re-run init; if you do, `git checkout src/app/globals.css`.

## Blocked / TBC
- Ground or match photography not supplied (hero is drawn in SVG/CSS).
- Stream URL, team names, grounds: TBC in the brief.
- Contact form: needs `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` on Vercel plus a verified Resend domain. Until then it returns an honest error naming the organiser's email.

## Paste-ready prompt for the next session
```
Work in ~/vijay-tulpule-trophy. Read HANDOFF.md first, then ~/Downloads/VTT-2026-SECTION-PROMPTS.md.
Keep the Fit Trainer tokens and the motion inventory. Never run `npx hyperiux init`.
Task: <paste task>. Verify on https://vijay-tulpule-trophy.vercel.app at desktop and 390px, commit to main
with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with `vercel deploy --prod`, update this file.
```
