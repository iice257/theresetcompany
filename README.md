# The Reset Company

A paper-and-ink highlight reel of Tibo’s 28-day Codex sprint and @poteto’s public running commentary. Unofficial. Built by Kingsley Aremu.

## Development

Node 22 or newer. Install with `npm ci`, run `npm run dev`. Production: `npm run build`. The static output is `out/`; `npm start` serves that directory at port 3000.

## Hosting handoff

- Repository: https://github.com/iice257/theresetcompany
- Branch: `main`
- Hosting framework preset: Other (the source is Next.js; serve its completed static export)
- Build command: `npm run build`
- Output directory: `out`
- Install command: `npm ci`
- Environment variables: none
- Canonical URL: https://theresetcompany.kingsleyaremu.com

Vercel, domains and DNS are managed in a separate session. This repository does not run a deployment CLI.

## Content and assets

`docs/SPEC.md` and `docs/timeline.md` are the source of truth. Typed content lives in `src/content/`. Unresolved original links are marked exact-text X searches. Screenshots are optional receipt disclosures. No X embeds or live third-party image requests.

To add a meme, add one object to `src/content/memes.ts`. The section stays absent while that list is empty.

Replace both `public/images/button-up.webp` and `button-down.webp` to update the reset object. They use identical 520 × 532 canvases, preserve transparency, and share an anchor. Source pair is in `assets/design/`. `scripts/prepare-assets.py` prepares delivery assets; requires Pillow and requests.

`npm run check:content` checks counts, day links, image budgets and placeholder exclusions. `npm run typecheck` checks TypeScript. Static content remains readable with JavaScript disabled. Touch devices use native scrolling; reduced motion skips all GSAP and Lenis setup.

## Static delivery

Next.js renders the page and metadata. The build then removes framework hydration and router scripts from exported HTML and adds one bundled TypeScript enhancement (`src/browser.ts`). This keeps the complete runtime, including GSAP, ScrollTrigger, Lenis and the analytics integration, under the 150KB gzip budget. No React hydration is needed for this one-page editorial. Use the full `npm run build` command, not `next build` alone. Local analytics is disabled; the single `@vercel/analytics` integration activates on the deployed hostname.
