# Implementation design

Visual thesis: a warm paper editorial, compressed black display type and one physical red button, paced like a monthly sports reel.

Content plan: poster hero → prequel reply chain → two-panel cartoon and challenge → four weeks with a street-card interlude → domain windows → graduation → game finale → end credits and sharing. The meme wall renders only when its data has entries.

Interaction thesis: a tangible 120 ms button press; scroll-scrubbed cartoon and chapter beats; a running 28-day tally. Native touch scrolling, shorter scenes and no pins on small screens. Reduced motion removes movement and keeps every receipt readable. Content remains available before JavaScript.

## Reference lock

- `comp-a-wide-title.png`: desktop title on one line, italic subline, centered reset object, metadata rule and outlined day typography.
- `comp-b-stacked-title.png`: three-line mobile title, two-line subline, large centered reset object and generous margins.
- Supplied spec overrides placeholder quotes and tallies in both comps. Correct tally: 15 ships and 13 resets, including two banked resets.
- Paper `#F2EEE5`, ink `#141414`, reset `#E8261C`, ship `#D9A441`, cards `#FAF8F3`, muted `#6B665E`. Small RESET labels use dark ink on the specified red to meet WCAG AA; paper on that red does not reach 4.5:1 at metadata sizes.
- Anton for display; Newsreader for editorial and post text; IBM Plex Mono for dates, controls and small labels. These three families are required by the supplied design system.
- 1,200 px maximum content; 48 px desktop / 16 px mobile gutters; at least 160 / 96 px between major chapters.
- No tint on the reset object or screenshots. SVG grain at 3% opacity. No generic dashboard surfaces or invented claims.
- Post cards are square receipt frames; author metadata, exact excerpts, date, source link and optional screenshot disclosure. Full-width mobile; Poteto indented on desktop.

## Source and asset policy

`docs/timeline.md` supplies the story, counts and quoted excerpts. Original links are resolved from the public archives listed there. Any unresolved excerpt links to an exact-text X search and is marked as such. Original images are retained under assets; optimized local delivery files live in public. Replace `public/images/button-up.webp` and `button-down.webp` together on equal canvases to change the reset asset.

Browser target flow: load the static page → press reset → read and scroll the story → verify running totals → open receipts → copy or share the canonical URL.
