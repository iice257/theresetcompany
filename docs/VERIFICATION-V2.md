# v2 verification — November 3, 2026

Built from `docs/LEVEL-UP.md` and `docs/SPEC.md`. Production export served locally at `http://127.0.0.1:3100`.

## Mobile Lighthouse

Final Microsoft Edge run, mobile emulation, simulated 4G and 4× CPU slowdown:

| Metric | Result |
|---|---:|
| Performance | **99** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |
| Largest Contentful Paint | **2.00 s** |
| Cumulative Layout Shift | **0** |
| Total Blocking Time | **44 ms** |

The initial script is about **4KB gzipped**. GSAP, ScrollTrigger, Lenis and choreography load after the first interaction. The application bundles remain below **58KB gzipped**, including deferred modules and the analytics integration, against the 150KB budget. The hero image remains preloaded. The paper grain is cached from its original SVG noise, avoiding a live turbulence filter during paint.

## Full-page walks

| Viewport | Page height | Overflow | Broken images | Page errors |
|---|---:|---|---|---|
| 375 × 812 | **13,742 px** | None | None | None |
| 390 × 844 | **13,819 px** | None | None | None |
| 1440 × 900 | 20,957 px | None | None | None |

Mobile measurements use the enhanced default page with thread expanders closed. Both phone sizes meet the 14,000px limit. Opening a thread or receipt intentionally adds document height.

The built-in browser failed tab acquisition/navigation, so the viewport walks, screenshots, touch emulation and recordings used Playwright-controlled Microsoft Edge. Actual X iOS/Android webviews were not available; native touch scrolling was verified in mobile emulation. Vercel, DNS and domain configuration were not accessed.

## P0 checks

- Compact days are grouped into weekly ledgers. Feature beats expose at most two original post cards, with additional receipts behind labeled thread expanders.
- Cartoon: shared mobile/desktop timeline, reserved pin space with `pinSpacing`, full artwork → smaller artwork → timestamp/caption → rolling clock → kickoff slam/shake → challenge → growing Hype/Quality chart. Only the active frame accepts keyboard interaction.
- Prequel: connector line, alternating public avatars, sequential 400ms typing indicators, then reply text. All text appears immediately with reduced motion.
- HUD: 44px full-width top bar on mobile; 120px fixed left rail on desktop. Rolling digit strips, reset press/red flash, ship tick, and next-reset navigation work. Both walks end at **DAY 28 / 28 · SHIPS 15 · RESETS 13**.

## P1 checks and recordings

These GIFs capture the actual mobile browser at 375 × 812:

- [Cartoon pin and sequence](evidence/cartoon-mobile.gif)
- [Day 2 — four ships, hold, RESET](evidence/day-2-mobile.gif)
- [Day 18 — ships, then RESET anyway](evidence/day-18-mobile.gif)
- [Graduation — drawn strike, typed TOKEN, cartoon callback](evidence/graduation-mobile.gif)

The initial visibility of stamps and TOKEN is checked before their cues, as well as their final state after scrolling. Day 2 items tick in with checks, hold for 300ms, receive the stamp, then turn into crosses. Day 18 repeats the pattern with “STILL A RESET.”

Day 15 draws the strike and types “STILL COOKING.” The reset deck was tested with real emulated touch input: the card arcs away, a fresh one deals in, and the distribution counter increments. Its deal button provides a keyboard alternative. Finale statistics count up once; credit rows count in sequence. The visible potato row receives a pause followed by the last reset press. Sound remains conditional on the user's sound toggle and prior gesture.

## P2 and accessibility

- “EXCERPT” is gone. Likes/views are frozen only where supplied; the site's 3M-view claim is not presented as a reply's view count.
- Receipt disclosures animate height, week headings fill from outline, subtitles slide, desktop domain windows fan out and lift on hover. Mobile domain swipe and snap-dot navigation pass.
- `page.tsx` composes section components. `DayBlock` renders typed day extras and captions; it has no day-number conditionals. Source and README are UTF-8 and formatted.
- Reduced motion tested at 375 × 812 and 1440 × 900: **0 pins, no Lenis, 0 active animations, all five cartoon frames visible, all 28 days readable**.
- JavaScript disabled: all story content, all 28 days and all five cartoon frames remain in the document. Native receipt/thread disclosures still work.
- Hero navigation, receipt open/close, thread expand/collapse, copy confirmation, next-reset navigation, touch fling, deal counter, snap dots, stamps and final tally pass.

## Commands and sources

`npm run build`, `npm run typecheck`, `npm run check:content`, and `git diff --check` pass. The content check includes 28 unique day sources, the 15/13 split, two banked resets, image budgets, absence of placeholder quotes/EXCERPT labels, the exported module entry and the total JavaScript budget.

Original post targets are unchanged from v1's source verification. The three labeled exact-text X search fallbacks remain for the propagated reset, street cards and AJ's complaints reply. No quotes or status IDs were invented. The meme wall remains absent while its data list is empty.

Hosting remains **Other → `npm ci` → `npm run build` → `out`**, without environment variables.
