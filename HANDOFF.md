# BACA tournament: energetic homepage refresh

Live: https://baca-cricket.com
Repository: https://github.com/edenbuilds/vijay-tulpule-trophy
Checkout: /Users/omkar/vijay-tulpule-trophy

## Current owner direction (08-10-2026)
The owner explicitly rejected the restrained, text-heavy UI and requested a visual, animated, energetic cricket tournament experience. This supersedes the older restoration direction and conflicting visual restrictions in docs/REDESIGN.md. Keep Geist/Inter, navy #0B2A6B, royal #1E6BD6, red #E21B2D, and supplied logos unchanged. No invented event facts.

## Implementation
- Match-poster homepage hero with BACA archive cricket photography, large type, countdown and direct fixtures/teams actions.
- Hyperiux Stack Spread installed through the authenticated CLI, adapted for all 16 supplied team logos. Motion owns those elements; GSAP does not animate them. Natural scrolling, desktop spread, static mobile/reduced-motion layout, keyboard focus opens the grid.
- Interactive eight-day match week with keyboard navigation and organiser-provided grounds. Archive image explicitly labelled; not represented as a venue photograph.
- Existing GSAP trophy ticker reused; larger asymmetric gallery and shorter homepage copy.
- Team links target stable team slug anchors.
- Hyperiux installer replaced globals.css; original shared CSS was restored in full before adding scoped homepage styles.

## Source boundaries
17–24 October 2026. Mumbai and Navi Mumbai. 35 overs per side. Dates/grounds from src/lib/schedule.ts, teams from src/lib/teams.ts. Groups, pairings, match times and final assignments remain unknown. Vijay Tulpule biography unchanged. Brand assets unchanged.

## Verification
Build and browser verification in progress. Do not infer live completion from this file until the evidence below is recorded.

## Next prompt
Continue in /Users/omkar/vijay-tulpule-trophy. Read HANDOFF.md first. Preserve the owner's energetic sports direction and source facts. Verify actual browser interactions at desktop and 390px, including day tabs, team links, menu and reduced-motion behavior. Keep supplied logos immutable. Commit with omkar1sonawane@gmail.com, deploy production, and record actual live evidence.

## Local verification, 08-10-2026
Production build passed. At 1440px and 390px: no horizontal overflow; hero photograph/logo loaded; all 16 team cards present. Day 24 displayed CCI and Wankhede, day 18 displayed eight grounds, ArrowRight selected day 19 correctly. Mobile menu opened correctly. Browser error/warning log empty. Final small-screen spacing adjustment follows this check; production verification follows deployment.

## Production verification, 08-10-2026
- Commit 29501cb pushed to main with omkar1sonawane@gmail.com.
- Deployment dpl_6C6aTYHNi5dfJ4vgSe5z3CBHnaFX reached READY, target production.
- Live https://baca-cricket.com shows the new hero and match-week selector.
- Browser at 1440x1000 and 390x844: zero horizontal overflow, 16 team cards, loaded archive images, no console errors. Selected finals shows CCI/Brabourne and Wankhede; reserve day shows no matches; 18 October shows eight organiser-provided grounds.
- Local keyboard navigation, team anchor navigation, mobile menu and reduced-motion fallback verified. Live mobile hero spacing visually checked after the final adjustment.
- Existing unrelated draggable-marquee img lint warning remains. Biography and source assets were not changed.
