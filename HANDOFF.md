# Handoff: BACA 38th All India Advocates’ Cricket Tournament 2026

Live site: https://baca-cricket.com
Repository: https://github.com/edenbuilds/vijay-tulpule-trophy
Checkout: `/Users/omkar/vijay-tulpule-trophy`
Production deployment: `dpl_FCAfXciEbJ52wFTcibsRkQom337w` (READY; aliased to the live site)
Current branch: `main`; visual restoration commit: `4f7bd33`. Use git author `omkar1sonawane@gmail.com`.

## Current direction: follow exactly

The owner rejected the sepia/warm-paper treatment and asked to restore the earlier version. Keep this explicit design contract for all future visual work:

- **Display and headline type:** Geist.
- **Body and meta copy:** Inter.
- **Primary navy:** `#0B2A6B`.
- **Royal blue:** `#1E6BD6`.
- **Cricket red:** `#E21B2D`.
- **Sky blue:** `#E7F0FF`.
- **Light neutral:** `#F5F7FA`.
- Use clean white and light neutral space. Do not use sepia, aged-paper, or heritage-poster styling.
- Keep the tournament logo crisp, unchanged, and unmodified. Do not redraw it, recolor it, apply filters, or use it as a background texture.
- The intended character is a polished cricket tournament hosted by an established Bombay legal institution. Keep layouts clear, restrained, and useful. Avoid SaaS styling, gradients, glass effects, oversized rounded cards, bright sports graphics, pill buttons, and generic corporate templates.

The warm-paper refresh was reverted in `4f7bd33`. Preserve that restoration unless the owner explicitly asks for a new visual direction.

## Current implementation

- The site's tournament-focused navigation and page content are in place. Follow the supplied wireframe for the visitor journey; keep Fixtures easy to find and retain the Tournament grouping for Fixtures, Teams, Format, and Ceremonies.
- Homepage copy uses the supplied tournament brief. Keep the Vijay Tulpule page's original copy intact. Do not invent tournament details.
- GSAP team-logo reveals remain on the homepage and Teams page. They use `useGSAP`/ScrollTrigger and respect reduced-motion settings. Do not add pinned card stacks or scroll-jacking.
- Instagram: `https://instagram.com/bacacricket`.
- BYQ Supply and Hyperiux MCP were used for layout and effect references. Adapt structure to the fixed brand above; do not import another product's identity.

## Source of truth

- `docs/REDESIGN.md`: approved original tournament redesign brief and factual guardrails.
- `src/app/globals.css`: design tokens and global typography.
- `src/app/layout.tsx`: Geist and Inter font loading.
- `src/lib/site.ts`: site copy and event facts.
- `src/lib/teams.ts`: participating teams and logo paths.
- `src/lib/schedule.ts`: schedule source and known unknowns.
- `public/brand/t26/`: supplied tournament brand assets. Treat logo files as immutable.
- `HANDOFF.md`: current visual direction and working state. Older notes in `docs/HANDOVER.md` are historical and may be superseded.

Keep source facts bounded: the event is 17–24 October 2026 in Mumbai and Navi Mumbai; the format is 35 overs per side. Do not add match pairings, match times, captains, groups, or ground assignments beyond what the organiser-provided source data states. Preserve explicit unknowns in the UI.

## Verification snapshot (07-10-2026)

- Vercel production build completed and deployment `dpl_FCAfXciEbJ52wFTcibsRkQom337w` reached READY; `https://baca-cricket.com` is aliased to it.
- Live homepage and `/teams` returned HTTP 200 after the visual revert.
- The production build reported one existing Next.js `<img>` performance warning in `src/components/effects/draggable-marquee/DraggableMarqueeComp.tsx`; it did not fail the build.
- A fresh visual desktop and mobile review was **not** completed after the revert. Recheck the actual live render at desktop and 390px before claiming visual QA. Previous screenshots from the warm-paper version are not evidence for the restored site.
- The source tree was clean after the visual revert was pushed; this handoff updates the written project state.

## Next-session prompt

```text
Continue work in /Users/omkar/vijay-tulpule-trophy. Read HANDOFF.md and docs/REDESIGN.md first. The latest owner instruction is to restore the earlier visual version and keep this design contract: Geist for all display/headline typography; Inter for body/meta; navy #0B2A6B, royal blue #1E6BD6, cricket red #E21B2D, sky blue #E7F0FF, light neutral #F5F7FA; clean white/light-neutral space, never sepia heritage-poster styling. Keep the tournament logo crisp and unchanged. Preserve the restored version unless the owner asks for another direction. Maintain the tournament-focused wireframe and existing content; do not invent fixtures or alter the Vijay Tulpule page copy. Keep the responsive layout and GSAP team-logo reveal with reduced-motion support. Do not reintroduce pinned stacks, scroll-jacking, SaaS styling, gradients, glass effects, pill buttons, or oversized rounded cards. Before claiming completion, inspect the live site at desktop and 390px. If code changes are requested, preserve unrelated work, commit to main with GIT_AUTHOR_EMAIL=omkar1sonawane@gmail.com, deploy with `vercel deploy --prod --yes`, verify the live result, and update this handoff with evidence.
```
