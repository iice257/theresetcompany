# The Reset Company: build spec

A one-page, scroll-driven highlight reel of Tibo's 28-day Codex sprint (Oct 4 → Nov 1, 2026) and his running public rivalry with @poteto. Kingsley will post it on X and tag @thsottiaux and @poteto.

- **Story and data source:** [`docs/timeline.md`](timeline.md). Every quote, date and number on the site must come from there or from the real post. **Never invent a quote.** The design comps contain placeholder quotes ("Shipped before the coffee cooled", "Sprint day 1. We shipped something questionable") that are fake and must not ship.
- **Owner:** Kingsley Aremu, X [@iice257](https://x.com/iice257), portfolio [kingsleyaremu.com](https://kingsleyaremu.com), GitHub [iice257](https://github.com/iice257).

---

## 1. Who does what

| Area | Owner |
|---|---|
| Repo, code, assets, GitHub (`iice257/theresetcompany`, public), commits, PRs | **Build agent** (you) |
| Vercel project, deploys, `theresetcompany.vercel.app`, the custom domain `theresetcompany.kingsleyaremu.com`, DNS, the vercel.app → custom domain redirect | **Kingsley's other Claude session** (it has the Vercel connector) |

**Build agent: do not run `vercel` CLI, create a Vercel project or touch DNS.** Use `ship` with `--no-deploy` (or plain git) until the Vercel project exists. When the first build is pushed to GitHub and passes locally, stop and tell Kingsley "repo is ready for Vercel" with the repo URL. After the Vercel project is linked, every push to `main` deploys automatically.

Write all absolute URLs (`metadataBase`, OG, canonical, share links) against **`https://theresetcompany.kingsleyaremu.com`**, from one constant `SITE_URL`.

---

## 2. Goal and success criteria

**Goal:** a funny, non-cringe, beautiful monthly recap that both Tibo and Poteto would happily quote-tweet.

Done means:
1. It reads as a story in under 3 minutes of scrolling: prequel → cartoon → 28 days → domain wars → Token Company → tibo.dog → credits.
2. It feels premium on a phone opened from the X in-app browser. That's the primary target, at 390×844. Desktop at 1440 is the cinematic version.
3. Every post shown links to its real post on X.
4. The link preview on X is a designed 1200×630 card.
5. Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5s on simulated 4G, CLS < 0.05.
6. `prefers-reduced-motion` gives a calm, fully readable version with no pinning, no shake and no smooth-scroll hijack.

## 3. Tone rules (this is what makes it non-cringe)

- Dry, deadpan, editorial. Our own captions are ≤ 12 words and written like a sports broadcast lower-third or a museum label. The real posts do the comedy, and we only time them.
- The jokes land on **the situation** (resets, domains, the vote, the reply guys), never on either person. Stay neutral and affectionate, not on a team.
- **Banned:** hearts and 💕, "rom-com", "flirt", "couple", "ship them", speculating about the relationship, "unhinged", "chaos", emoji spam, exclamation-mark stacks, generic AI-hype words. The reply-guy theories get at most one dry line ("The timeline had theories."). Emoji only inside real quotes.
- **No generated faces or likenesses of real people.** People appear only through their own public posts, avatars and screenshots.
- Credit Poteto's cartoon and game clearly ("Cartoon by @poteto", "Game by @poteto"). Credit fan meme makers by handle when known.

## 4. Visual system (from the comps)

Comps: `assets/design/comp-a-wide-title.png` (desktop reference) and `assets/design/comp-b-stacked-title.png` (mobile reference). Match their spacing, type contrast and restraint closely.

**Tokens**
| Token | Value | Use |
|---|---|---|
| `--paper` | `#F2EEE5` + subtle grain (SVG noise, ≤ 4% opacity) | page background |
| `--ink` | `#141414` | type, hairlines |
| `--reset` | `#E8261C` | the button, RESET tags, reset counter. **The only saturated color.** |
| `--ship` | `#D9A441` | SHIP tags, small ship accents |
| `--card` | `#FAF8F3` | post cards |
| `--muted` | `#6B665E` | metadata |
| hairline | `1px solid var(--ink)` | rules, card borders |

**Type** (`next/font/google`, subset latin, `display: swap`)
- Display: **Anton**, uppercase and tight (`letter-spacing: -0.01em`, `line-height: 0.85`). For the hero title, chapter titles and the `DAY 01` numerals (outlined with `-webkit-text-stroke: 1.5px var(--ink); color: transparent`).
- Quotes / sublines: **Newsreader** italic.
- Metadata / labels: **IBM Plex Mono**, uppercase, `letter-spacing: 0.12em`, 11–13px.
- Scale: hero title fills the content width (`clamp`). The comp A title runs edge to edge on desktop, and comp B stacks it on 3 lines on mobile.

**Layout:** 12-column grid, max-width 1200px content, 16px side gutters on mobile and 48px on desktop. A thin top metadata rule as in the comps: `VOL. 01 / OCT 04 – NOV 01 2026 / @thsottiaux × @poteto`. Big vertical rhythm between chapters (≥ 160px desktop, ≥ 96px mobile).

**Components**
- **Post card:** white-ish card, 1px ink border, no radius (or ≤ 2px). Round avatar 32px, display name + `@handle` in mono, date in mono muted, quote text in Newsreader (not italic for real posts, to read as a receipt), like count in mono with "♥ 12.8K", and the whole card links to the post (`target=_blank rel=noopener`). Poteto's cards sit on the right / indent, and Tibo's on the left, like a reply chain. On mobile both are full width with a small left rule in a different style per author.
- **Tags:** `SHIP` (gold bg, ink text) and `RESET` (red bg, paper text), mono, as in the comps.
- **Day block:** outlined `DAY 07` numeral, date in mono, tag, the day's real post card, one dry caption, optional saga beat cards.
- **Receipt screenshot:** for posts we have captures of, offer a small "see the receipt" toggle that reveals the screenshot. Render the card itself from data, not as a screenshot.

## 5. The reset button (hero object + scroll HUD)

- **Asset:** a pressed/unpressed pair. `assets/design/button-pair-raw.png` is a placeholder. Its "transparent" background is baked-in black with a white halo, so it can't be used as is. Kingsley is regenerating a clean pair that matches the comps (metal bezel, "RESET" on the cap). If the new file isn't in `assets/design/` yet, build with the raw one: do a proper background cutout (e.g. `rembg`, or `hyperframes remove-background`), split it into `button-up.webp` and `button-down.webp` with transparency, the same canvas size and the same anchor so the swap doesn't jump.
- **Hero:** as in the comps. The click / tap / Enter / Space swaps to pressed for 120ms, plays a short synthesized "thunk" (WebAudio, no audio file, only after a user gesture, with a small mute toggle in the corner), fires `navigator.vibrate(12)` where supported, and smooth-scrolls to the prequel. It's a real `<button aria-label="Press reset and start the story">`.
- **Scroll HUD (from Day 1 to Day 28 only):** a compact sticky widget. Bottom-center on mobile, right rail on desktop. It holds a small button, `DAY 07 / 28`, `SHIPS 5`, `RESETS 3`. When a reset day crosses the viewport center, the HUD button depresses, the RESETS counter ticks up (odometer roll) and the page does a single 2px shake (skipped with reduced motion). On a ship day the SHIPS counter ticks with a gold flash. Counts must end at **15 ships / 13 resets**.
- **Easter egg:** pressing the hero button 10 times shows a toast: `"People have escaped the TL and are asking me for resets on the street now." — @thsottiaux` and reveals the reset card (section 7.4).

## 6. Tech

- **Next.js (App Router) + TypeScript**, fully static (`output: 'export'` is fine, or static rendering). No server features needed.
- **Tailwind CSS v4** with the tokens above as CSS variables.
- **GSAP + ScrollTrigger** for pins and scrubs, and **Lenis** for smooth scroll (off for reduced motion and on touch if it feels laggy in the X in-app browser; test it).
- **Images:** convert all PNGs to WebP/AVIF at the right sizes (`next/image` or pre-generated). Each capture ≤ 200KB, and the hero button ≤ 120KB. Lazy-load everything below the hero.
- **JS budget:** ≤ 150KB gzipped first-load including GSAP.
- **Content as typed data:** `src/content/days.ts`, `src/content/posts.ts` and `src/content/memes.ts`. Use a `Post` type: `{ id, author: 'tibo'|'poteto'|'other', handle, name, text, date (ISO), likes?, url, receipt? }`. The components only render data. Adding a meme or post is a one-line data change.
- **Avatars:** fetch once at build or dev time from `https://unavatar.io/x/thsottiaux` and `https://unavatar.io/x/poteto` (also `ajambrosino`, `alexandr_wang` if used). Save them to `public/avatars/` as 96px WebP. Don't hotlink.
- **Post URLs:** use the known URLs in `timeline.md`. For the rest, find the exact status URL (the fan archives tibopoteto.lol, tiboandpoteto.com, codexy.fyi and tiboreset.com link to originals). If one truly can't be found, link to an X search for its exact text. Never leave a dead link.
- **Analytics:** `@vercel/analytics`, a single component, nothing else.

## 7. Sections (in scroll order)

Chapter titles are Anton and the kicker lines are mono. Interactions listed are the intent; reduced motion collapses each to a static layout.

**7.0 Hero:** comp A on desktop, comp B on mobile. Title, subline **"28 days. 15 ships. 13 resets. One potato."** (the comps say 16/12, which is wrong), the button and `PRESS TO SCROLL ⌄`.

**7.1 Prequel: "DOTS VS BOTS" (Oct 3).** A reply chain that types in post by post as you scroll: "Pretty sure there are more dots than bots…" → "I smell fear" → "The 3-day old dots are shaking and quaking" → "I thought you had 6 months?" → "You don't know what we're releasing next week" → "Let me know if you want to see our roadmap" → beat → Tibo: "i had french fries for lunch". Caption: `NEGOTIATIONS CONCLUDED OVER LUNCH.`

**7.2 Day 0: "THE CARTOON" (Oct 4).** Pin Poteto's cartoon big. Crop the art only from `captures/01-poteto-cartoon-large-view.png` (both panels, no X UI). Keep the uncropped capture as the receipt. Scrub in order:
1. Her caption card "See you soon for more ships from The Ship Company." with a mono timestamp `14:59 PT`.
2. A clock in mono that counts up `+00:01 … +00:34`.
3. Tibo's kickoff post slams in, "Over the next 28 days…", then "I challenge you to do the same."
4. Her reply "only you can win this battle", with the Hype vs Quality bar chart **rebuilt in CSS** (tall green Hype bar, tiny red Quality bar) rather than screenshotted.

Caption: `THE RULES: SHIP SOMETHING, OR RESET EVERYONE.`

**7.3 The 28 days.** The scroll HUD turns on. The days are grouped into four chapters, each with a big Anton title card:
- **WEEK 1: "THE GAME IS RIGGED"** (Days 1–7). Day 2's community vote is the headline: four ships, still reset. Show the four ships as a quick 2.1–2.4 stack that gets **stamped RESET** (a red rubber-stamp animation). Saga beats: "temu knockoff", "28 days of resets", "just put the reset in the bag bro", and Day 6's "Put the reset in the bag. All propagated." (he adopted her line, so pair the two cards side by side).
- **WEEK 2: "MASHED"** (Days 8–14). Day 8 "side of reset" + "Mashed @poteto on the house." + "back for more?" Day 10 "greatly exaggerated" with its 855K views. Day 12 "Small @poteto speaks big facts". Day 14 is the street-cards line (it also triggers the reset card, see 7.4).
- **WEEK 3: "WE'RE COOKED"** (Days 15–21). Day 15 has a two-step gag: "We're cooked" appears, then gets struck through and replaced with "Nevermind, we're still cooking… and reset." Day 17 "Bet you thought we forgot". Day 18 is a long list of real ships ending in "But yes… that's a reset!" (the list scrolls by, the stamp lands). Day 19: "Don't be a tool." → "be a potato instead". Day 20 "Rest and reset". Day 21: "Wonder what happens the remaining seven days."
- **WEEK 4: "THE TOKEN COMPANY"** (Days 22–28). It leads into 7.5 and 7.6. Day 22 Terra, Day 23 the iCloud fake-out ("Just kidding, today is a reset."), Day 24 text your dot, Day 25 (see 7.6), Day 26 "resets… banked… 👀", Day 27–28 "Banked 1/2", "Banked 2/2".

Ship days with no saga beat get a compact one-line row (numeral, tag, one-sentence ship, link) so the pace stays fast. Only the beats above get full treatment.

**7.4 Interlude: "RESETS ON THE STREET."** Use `assets/design/reset-card.png`. A small hand-of-cards that fans out on scroll (desktop: drag to fling one off). Caption: `UNOFFICIAL. NOT REDEEMABLE. PROBABLY.` The 10-press easter egg also reveals this.

**7.5 "THE DOMAIN WARS" (Oct 27 – Nov 1).** Three browser-window frames, each a minimal window chrome with the URL in mono:
- `poteto.com` (`captures/site-poteto-com.png`), with "poteto.com has landed" and "💀💀💀 i cant afford tibo.com", "Pretty wild that this site got 3M views." and "i guess potetos are just more popular than all your other posts".
- `thibaultsottiaux.com` → redirects to Muse (`captures/site-thibaultsottiaux-com.png`). Label: "Registered by Alexandr Wang. Redirects to Meta's Muse." Caption: `A THIRD PARTY HAS ENTERED THE CHAT.`
- `tibo.dog` (`captures/site-tibo-dog-title.png`, `site-tibo-dog-gameplay.png`), with "$5.99" in a receipt style.

On desktop they stack like overlapping windows and spread apart on scroll. On mobile they become a horizontal swipe carousel with snap.

**7.6 Day 25: "GRADUATION."** "THE RESET COMPANY" appears in Anton, a red line strikes "RESET", and "TOKEN" types in above it. Then the real post "Graduating from The Reset Company to The Token Company." plus the Day 25 post (limits doubled, 38.6K likes, 6.9M views). Small callback: a thumbnail of the Day 0 cartoon with the caption `CALLBACK: 25 DAYS LATER.` Then "Send your kind feedback to this person" with @ajambrosino's "now, send me your complaints".

**7.7 Finale: "TIBO.DOG" (Nov 1).** Her post "Day 28/ tibo's game has landed…" (she borrowed his format, so point that out in one dry line: `SHE USED HIS FORMAT.`). Gameplay screenshots, then a stat ticker from her trivia post: `4 DAYS · ~1,150 PRS · 124 KB · 10 LANGUAGES · 0 AUDIO FILES · 0 CODE COMMENTS (BANNED BY LINT)`. Then the closing exchange: "i swear this was not planned" → "it's fine to admit we plan these together months in advance" → "Game so good because poteto used all the compute and forced Elon to pull the plug" → **"I finished it though."** Then a CTA link `PLAY TIBO.DOG ↗`.

**7.8 "THE TIMELINE REACTS" (meme wall).** A masonry grid driven by `src/content/memes.ts` (file, alt, credit handle, post url). **If the list is empty, the section doesn't render.** No memes yet, so ship with it hidden and make adding one a data change.

**7.9 Credits / stat stinger.** Big Anton end card, like closing credits:
```
28 DAYS
15 SHIPS
13 RESETS (2 BANKED)
1 CARTOON
3 DOMAINS
1,150 PRS
1 POTATO
```
Then `SEASON 2? UNCONFIRMED.` Then a **Share on X** button using an intent URL (`https://x.com/intent/post?text=…&url=SITE_URL`) with the text: `The Reset Company — 28 days of ships, resets and one potato. @thsottiaux @poteto`, and a copy-link button. Footer: `Made by Kingsley Aremu · @iice257 · kingsleyaremu.com`, linking out, plus `Unofficial fan recap. Not affiliated with OpenAI or SpaceXAI. All posts belong to their authors.`

## 8. Share card / metadata

- `app/opengraph-image.tsx` (or a static `public/og.png`) at 1200×630: the paper background, "THE RESET COMPANY" in Anton, the button (up), and "28 days. 15 ships. 13 resets. One potato." Use the same art for `twitter-image`.
- `twitter:card = summary_large_image`, title `The Reset Company`, description `A highlight reel of Tibo's 28-day Codex sprint, and the potato who heckled it.`
- Favicon: a tiny red button dot. Theme color `#F2EEE5`.

## 9. Accessibility

- Semantic chapters (`<section aria-labelledby>`), real headings and real links on post cards.
- Screenshots get alt text with the post text. Decorative grain gets `aria-hidden`.
- Every animated reveal still shows the content without JS (progressive enhancement: content in the HTML, GSAP only enhances).
- Contrast: red tag text on red bg must pass AA, so use `--paper` on `--reset` and check it.

## 10. Verification before handing over

1. `npm run build` passes clean. No console errors.
2. Check in the built-in browser at **390×844** and **1440×900**, top to bottom. Screenshot each chapter and fix anything awkward (overflow, cramped type, janky pins).
3. Run with reduced motion on and confirm it's readable and calm.
4. Run Lighthouse mobile and meet the numbers in section 2.
5. Click every post link and confirm it opens the right post. Count the HUD's final numbers (15 / 13).
6. Use the frontend skill's self-review: if anything feels boxy, dense, generic or "developer-looking", refine it.

Then push to `main`, report the repo URL, and tell Kingsley it's ready for the Vercel hookup.

## 11. Out of scope

CMS, comments, live likes, a backend, dark mode (the paper look is the brand), more pages, and any posting to X.
