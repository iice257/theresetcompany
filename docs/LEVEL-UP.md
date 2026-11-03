# Level-up brief (v2)

Review of the v1 build against `docs/SPEC.md`, 2026-11-03. Read this alongside the spec. The spec still wins on content, tone and budgets.

## Verdict on v1

v1 is a solid base. The content is right, the tokens and type match the comps, the hero lands, the build and `check:content` pass, there's no horizontal overflow at 375px, and all 28 day links decode to the correct date (the snowflake timestamps match Oct 05 through Nov 01). Lighthouse mobile on v1: Performance 96, Accessibility 100, Best Practices 100, SEO 100, LCP 2.3s, CLS 0, TBT 10ms. **v2 must not regress these.** LCP has only 0.2s of headroom, so keep the hero image preloaded and keep all new motion code out of the critical path.

But it reads as **a long, well-typeset list of post cards**, not a scroll-driven highlight reel. On mobile the page is about 22,000px of stacked cards. Almost all motion is the same 18px fade-up. The spec's set pieces were either flattened into static layouts or animate so little you don't notice. Keep everything that works. v2 is about **choreography, pacing and the gags landing**.

## What's missing vs the spec

| Spec | v1 | Gap |
|---|---|---|
| 7.0 Reset button as the hero object; the HUD carries the tally | HUD is a 192×57 pill at the bottom right, and it covers card text on mobile | Too timid. No odometer roll. It feels like a toast, not the main character |
| 7.1 Prequel reply chain types in | 7 static cards | No typing, no pacing, and every card has the same weight |
| 7.2 Cartoon pinned with a scrubbed sequence (caption → clock → kickoff slam → challenge → chart) | Desktop-only pin with `pinSpacing:false`; posts stack under the image; the chart is static | The set piece doesn't exist on mobile and is weak on desktop |
| 7.3 Day 2 stack stamped RESET | The stamp is there, but it pops in at the same time as the list | No beat: the list should fill in, pause, *then* the stamp slams |
| 7.3 Day 15 strike-through gag | Static `<s>` | The gag isn't animated |
| 7.3 Day 18 list + stamp | List only, no stamp | Missing the punchline |
| 7.4 Reset cards interlude | A small spread scrub; fling is mouse-only | Needs touch fling and a bigger moment |
| 7.5 Domain windows spread on desktop, swipe on mobile | The mobile swipe works; the desktop stagger is mild | OK, but polish it |
| 7.6 Graduation: RESET struck, TOKEN types in | TOKEN fades up 30px | Should be a strike that draws, then TOKEN types letter by letter |
| 7.7 Finale stat ticker | Static mono line | Numbers should count up |
| 7.9 Credits | Big tally rows, static | Should count up and land with the button pressed one last time |
| Post cards | Every card shows an "EXCERPT" label (43 of them); many have no like counts | Noise. Drop the label and add likes/views where `docs/timeline.md` has them |
| Motion starts | Only after the first pointer/scroll/key | Fine, keep it |

Also:
- `src/app/page.tsx` is one 9.5KB line-dense file. Split it into section components.
- The README has mojibake (`â€™`). Re-save it as UTF-8.

## v2: what to build, in priority order

### P0: the scroll story

1. **Pacing pass. Cut the card count on screen.**
   - Compact days (the ones without beats) should be one line each, grouped into a tight "ledger" per week, about 64px per row, not a full block.
   - Feature days keep their cards, but **max 2 cards visible per beat**. Extras go behind a "+ N more in the thread" expander.
   - Target: mobile page height **≤ 14,000px** (v1 is about 22,000px).
2. **Pinned cartoon sequence, mobile included.**
   - Pin the section for about 250vh of scroll (with `pinSpacing` on).
   - Timeline, scrubbed:
     - Cartoon fills the frame, then shrinks to the top half.
     - `14:59 PT` caption and poteto's post slide in.
     - Clock rolls +00:00 → +00:34.
     - Kickoff post **slams** in (scale 1.15 → 1, 2° rotation, a 4px screen shake).
     - "I challenge you" post.
     - Hype bar grows tall, Quality bar grows to a sliver, label pops.
   - Mobile uses the same timeline in a stacked layout. No separate code path beyond the layout.
3. **Prequel chat.**
   - Render it as a real reply thread: a thin connector line on the left, alternating avatars.
   - Each reply reveals with a 3-dot "typing" indicator (~400ms), then the text, triggered in sequence as the chain scrolls in. Not a scrub.
   - Reduced motion: everything shows at once.
4. **HUD as the hero object.**
   - Desktop: a fixed left-rail scoreboard, about 120px wide, vertically centred. The mini button sits on top and the counters are stacked under it: `DAY 07/28`, `SHIPS 5`, `RESETS 2`.
   - Mobile: a full-width slim top bar (about 44px) that slides in once the sprint starts. Never at the bottom over content.
   - **Odometer digits:** each digit is a vertical strip that rolls (`translateY` by digit height, 350ms, `cubic-bezier(.2,.8,.2,1)`).
   - On a reset day, the button image swaps to *down*, the RESETS digit flashes red, and the page does the existing 2px shake.
   - On a ship day, a small gold tick pulses on SHIPS.
   - Clicking the HUD button jumps to the next reset.

### P1: the gags

5. **Day 2:** the list items tick in one by one with checkmarks, there's a 300ms hold, then RESET stamps over them (scale 2 → 1, −12° rotation, quick ink-bleed opacity) and the checkmarks turn into ✕.
6. **Day 15:** "WE'RE COOKED." sits there, a red strike line draws left to right (SVG `stroke-dashoffset`, scrubbed), then "STILL COOKING." types in underneath.
7. **Day 18:** the four items fill in as ships with ✓ (GA, Linux Foundation, perf, Uber). Then the RESET stamp lands anyway, with the caption "STILL A RESET." This is the funniest beat in the month, so give it room.
8. **Graduation:**
   - The red strike draws across RESET.
   - TOKEN types in letter by letter above it, with a caret.
   - On completion, the cartoon callback thumbnail flips into view with "25 DAYS LATER".
9. **Reset cards:** fling works on touch (pointer events, any `pointerType`). A flung card arcs off and a fresh one deals back in from the deck. Add the caption counter "RESETS DISTRIBUTED: n".
10. **Finale stats and credits:**
    - Numbers count up once on enter (`4 DAYS`, `~1,150 PRS`, `124 KB`, `10 LANGUAGES`).
    - Credits tally rows count up in sequence.
    - The last row (1 POTATO) gets a beat of silence, then the hero button presses itself once (the image swap plus the thunk if sound is on).

### P2: polish

11. **Post cards:**
    - Remove the "EXCERPT" label.
    - Show likes and views where `docs/timeline.md` has them.
    - Keep "View post on X ↗".
    - Make "See the receipt" a smooth height-animated disclosure.
12. **Section transitions:**
    - Each week title enters as a full-bleed outlined word that scrubs from outline to filled as it crosses centre.
    - Week subtitles slide in from the right.
13. **Domain wars desktop:** the windows start stacked like a pile of tabs and fan out to a 3-up spread as you scroll (scrubbed). Hovering a window lifts it. Keep the mobile swipe carousel, and add snap dots.
14. **Code:**
    - Split `page.tsx` into `sections/*.tsx` plus `DayBlock`.
    - Move day-specific extras (stacks, lists, captions) into `days.ts` data, not `d.day===N` checks.
    - Fix the README encoding.

## Guardrails (unchanged from the spec)

- **Budgets:**
  - JS ≤150KB gzipped.
  - Lighthouse mobile: Performance ≥90, Accessibility ≥95.
  - LCP <2.5s.
  - CLS <0.05: pins must not cause shift, so reserve space.
- **Reduced motion:** all pins off, everything visible, odometer jumps instantly, no shake.
- **Content and tone:**
  - No new quotes. Every quote must exist in `docs/timeline.md`.
  - Tone: dry, deadpan. No hearts, no "rom-com".
- **Lenis:** pointer:fine only, as now. GSAP ScrollTrigger is the only scroll engine.
- **Vercel:** don't touch it. Push to `main` and say "ready for Vercel".

## Done means

- [x] Walk the full page at 375×812 and 1440×900. Every P0 and P1 item is visibly working. Record a short screen capture or GIF of the cartoon pin, Day 2, Day 18 and graduation on mobile.
- [x] Mobile page height is ≤14,000px.
- [x] Lighthouse mobile scores are pasted into the PR or commit message.
- [x] Reduced motion is checked (emulate it in DevTools).
- [x] `npm run build` and `npm run check:content` pass.


Completion evidence: [v2 verification](VERIFICATION-V2.md) and the four [mobile recordings](evidence/). Lighthouse scores are included in the final implementation commit message.
