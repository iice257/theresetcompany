Build "The Reset Company", a one-page, scroll-driven highlight reel of Tibo's (@thsottiaux) 28-day Codex sprint and his public rivalry with @poteto. I'm posting it on X and tagging them both, so it has to be funny without being cringe, beautiful, and fast on a phone in the X in-app browser.

Work in C:\Users\0\Documents\Projects\Github\theresetcompany. Read these first. They're the source of truth:
- docs/SPEC.md: the full build spec (scope, tone rules, design system, every section, tech, verification, who does what)
- docs/timeline.md: the researched story and every real quote. Never invent a quote.
- assets/design/: the design comps (comp-a = desktop, comp-b = mobile), the reset button and the reset card
- assets/captures/: the X screenshots and site captures (see SOURCES.txt)

How I want it done:
- Use the frontend skill (per my global CLAUDE.md) before writing UI. Match the comps closely, but ignore their placeholder quotes and their 16/12 stats. The real counts are 15 ships / 13 resets.
- You own the repo: git init, create the public GitHub repo iice257/theresetcompany, commit as you go, and push to main.
- Do NOT touch Vercel. No vercel CLI, no project, no domains, no DNS. My other session handles Vercel and the domain theresetcompany.kingsleyaremu.com. Use ship --no-deploy or plain git. Write all absolute URLs against https://theresetcompany.kingsleyaremu.com.
- If the clean pressed/unpressed button pair isn't in assets/design/ yet, cut out the raw one as the spec says, and keep the swap easy so I can drop in the new file later.
- Run the spec's full verification (build, 390px and 1440px browser passes, reduced motion, Lighthouse, link check) before you call it done.
- When it's pushed and verified, tell me "repo is ready for Vercel" with the repo URL and the build command / output settings Vercel needs.

Don't ask me questions you can answer from the spec. Only stop for something that's genuinely blocked.
