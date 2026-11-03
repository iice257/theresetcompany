# Verification — November 3, 2026

Tested the production static export at http://127.0.0.1:3000.

| Check | Result |
|---|---|
| `npm run build` | Pass; Next.js static export with one enhancement bundle |
| `npm run typecheck` | Pass |
| `npm run check:content` | Pass; 28 unique day status links, 15 ship / 13 reset days, two banked resets, asset and JavaScript budgets |
| 390 × 844 | All chapters inspected; no horizontal document overflow, broken images or page errors |
| 1440 × 900 | All chapters inspected; no horizontal document overflow, broken images or page errors |
| Final HUD | DAY 28 / 28 · SHIPS 15 · RESETS 13 at both sizes |
| Reduced motion | All 28 days readable; no pin spacers, Lenis, shake or animated reveal |
| JavaScript disabled | All 28 days and complete editorial content present |
| Controls | Hero scroll, keyboard Enter presses, sound toggle, ten-press Easter egg, native dialog Escape, receipt disclosure and copy confirmation pass |
| Lighthouse mobile Performance | **98** |
| Lighthouse Accessibility | **100** |
| Lighthouse Best Practices | **100** |
| Lighthouse SEO | **100** |
| Mobile LCP (simulated mobile throttling) | **2.35 s** |
| CLS | **0** |
| Complete JavaScript, gzip | **54,473 bytes**, including GSAP, ScrollTrigger, Lenis and analytics integration |
| Hero up / down WebP | 34 / 33 KB; transparent, matching canvas and anchor |
| All delivery images | Below 200 KB each |
| Share card | Designed 1200 × 630; OG and Twitter use the same card |
| Canonical / sharing | Single `SITE_URL`, custom hostname as specified |

Built-in browser used for visual and control checks. Playwright Chromium used for automated viewport sweeps, screenshot capture, reduced-motion and JavaScript-disabled contexts; these latter contexts are not exposed by the built-in browser API. Lighthouse ran with headless Microsoft Edge against the local static server. Runtime console and Lighthouse console audits are clean.

## Source links

The rendered page has 46 post cards plus 28 day source links. Sixty-one distinct status IDs were cross-checked against the collected archive HTML and the known original links in `docs/timeline.md` / `assets/captures/SOURCES.txt`. These are source-target checks, not a claim that authenticated X content was manually inspected for every link.

Three excerpts were absent from the archives and exact-text web searches: the Day 6 propagated reset, street reset cards, and AJ's complaints reply. As the spec allows, they link to exact-text X searches scoped to the author and are labeled “Find exact text on X.” No status IDs were guessed. Likes and views remain frozen snapshots from the supplied research.

## Scope of the checks

The X iOS / Android in-app webviews and the final deployed origin were not available for direct testing. Touch behavior was exercised in mobile emulation, with native scrolling and no mobile pins. Analytics is disabled on localhost and activates on the deployed hostname. Vercel, deployments, DNS and domains were not accessed.

## Hosting

Use **Other** as the hosting framework preset, `npm ci` for install, `npm run build` for build, and **out** as the output directory. The source is Next.js; the Other preset serves the completed static export, including its JavaScript optimization, rather than consuming `.next` directly. No environment variables are required.
