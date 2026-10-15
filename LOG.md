# LOG.md — completed chunks, newest last

Append-only. Entry header: `<lane>-<number> | complete|partial | <date or unknown>`.
Next number = highest in the header lines below + 1 (see START_HERE.md).
Files: A=added M=modified D=deleted, from a real diff of uploaded vs. returned project.
Rollover: entries B-001 to A-022 were moved verbatim to docs-archive/LOG-B001-A022.md in B-032, A-023 to A-027 to
docs-archive/LOG-A023-A027.md in A-037, A-028 and A-029 to
docs-archive/LOG-A028-A029.md in A-039. Keep about the
newest 10 entries here; the newest entry always stays (the next-ID rule reads it).

A-030 | complete | 2026-10-13
Task: FAQ accordion, the last unwalked page of the desktop walk (Lane A visual decision; owner approved Option B).
Files (diff against the A-029 ZIP returned earlier in this chat):
- M ARCHITECTURE.md
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/style.css
- M css/theme.css
- M faq.html
- M js/render/faqAccordion.js
- M js/render/faqList.js
- M pages-src/faq.html
Changed:
- js/render/faqList.js: each question is `<h2 class="faq-heading"><button type="button" class="faq-question" id
  aria-expanded="false" aria-controls>` with `.faq-q-text` and an aria-hidden `.faq-icon`; the answer is `role="region"
  aria-labelledby` around the same `.faq-answer-inner`. Ids come from a module counter (`faqUid`), unique across lists.
  Copy and the `answerExtra` paragraph are unchanged. Before, the question was a plain div that only responded to a click.
- js/render/faqAccordion.js: same open/close logic (one open per list) plus `aria-expanded` kept in sync.
- css/style.css section 18 replaced (long comment): ruled rows (800px column, hairlines, no box); `.faq-question` is a
  full-width button; `.faq-answer` reveals with `grid-template-rows: 0fr -> 1fr` and is `visibility: hidden` while closed
  (delayed switch so the close animation shows) instead of animating `max-height` to 600px; the answer wrapper has no
  vertical padding/border of its own; answers `max-width: 65ch`; rows 66px (were 88px, the `h2` kept default margins);
  the icon keeps its tokenized colours and gets a hover border.
- css/theme.css: the `.faq-item.open` accent-border override and the `.faq-item` 4px radius removed.
- pages-src/faq.html: the list is plain `faq-list` (was `faq-list full-width`); faq.html regenerated with stitch.py.
  The homepage preview needs no page change (same renderer); index.html unchanged.
- VISUAL_REDESIGN.md: new "FAQ page" section; scope note (faq complete, every page walked at desktop width); home
  decision 7 marked superseded in part; the `layout-transition` entry updated (FAQ accordion done, two places remain).
  ARCHITECTURE.md: the "pages not yet walked" line. START_HERE.md: Current state, Next up, open findings, and Lane B's
  copy-pass sentence (now unblocked).
Decision: Owner chose Option B (ruled rows, one 800px column) over A (keep the boxes, fix the insides) and C (ruled
  rows, two columns). Options were shown as a published live artifact. This supersedes home decision 7 (boxed accordion).
  Deviations to flag: (1) keyboard focus uses the sitewide 2px offset ring, not the inset edge in the mockup (the inset
  edge crowded the text once the row lost its side padding); (2) the icon gets a hover border, not in the mockup, to
  replace the box's hover tint; (3) the old accent border on the open item is gone with the boxes.
Verified: stitch.py exit 0. node --check passes on both scripts. smoke-test.js (jsdom installed here): ALL CHECKS
  PASSED. visual-check.py on a scratch copy: no horizontal overflow on any page at desktop/tablet/mobile. Real FAQ page
  at 1440/1024/768/390px: 0 script errors, no horizontal overflow; 6 buttons, all aria-expanded false at rest, every
  aria-controls resolves, ids unique; closed answers visibility hidden at height 0 (measured at rest, before any
  interaction); list at x=154, 800px wide at 1440px; rows 67px; icon 774px from its question; answer paragraphs 585px
  wide (65ch); headings H1, six question H2s, then the closing box's H2. Keyboard: Tab reaches 6 of 6 questions, Enter
  opens one, Space on another opens it and closes the first, Space again closes it, aria-expanded follows each step; the
  focused question shows a 2px rgb(174, 121, 142) outline at 2px offset. Animation sampled every 40ms: opening 23 ->
  223px over about 280ms, closing starts immediately (179 -> 0px, no lag). Scratch copy with a 3,556-character answer
  in the first real FAQ item: opens to its full 1,388px (old cap 600px), nothing clipped, last line visible, closes to 0
  and hidden. Homepage preview: 534px column, 3 buttons, opens and closes. Two of my own measurement mistakes were
  corrected before trusting the results (a visibility reading taken mid-transition; a scratch edit that had landed in the
  data file's example comment). A first scripted edit stopped partway (a no-op replacement that did not match), leaving
  the renderer changed but not the CSS or behaviour script; the rest was applied at once and re-verified before
  packaging. Screenshots, the options page and scratch copies are not in the ZIP. Not run: the design scanner, so whether
  it still flags a grid-rows transition is unknown.
Next/open: the desktop walk is finished (every page). Next: the mobile and tablet redesign (backlog in
  VISUAL_REDESIGN.md, including the iPhone Plus / Pro Max observation) and Lane B's copy pass, which is no longer blocked.
  Still open from earlier: the mobile nav submenu and the page-load progress bar (layout-transition), the nav-dropdown
  shadow check, contact hero copy, custom-build's two deferred items.

A-031 | complete | 2026-10-13
Task: Handoff preparation for the mobile and tablet redesign (docs only). The owner is moving Lane A to a new chat on the same account.
Files (diff against the A-030 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
Changed:
- START_HERE.md: "Next up" rewritten as a clear mobile and tablet brief (first chunk suggested, page status, open
  findings); "Do not touch" no longer refers to pages Lane A "has not finished walking" (all are walked) and no longer says
  the copy rewrite waits "after the redesign" (the copy pass is Lane B's and can start); the doc-map line that said
  ARCHITECTURE.md's theming text "predates the redesign" is corrected (refreshed in B-014, updated in A-022 and A-030);
  two Tests bullets added: Chromium is the only browser installed (no WebKit or Firefox; the owner tests in Safari) and
  visual-check.py only checks 1440, 768 and 390px for overflow.
- VISUAL_REDESIGN.md: the "Desktop first" process bullet now says the desktop walk is finished and mobile is current; a
  "Building option artifacts" how-to was added to "How this process works" (the lessons and pitfalls of A-006 to A-030);
  the mobile backlog gained item 8 (tooling and baseline).
- No site files changed: stitch output is identical to A-030.
Decision: none (owner asked for the files and ZIPs to be checked and made ready for the new chat).
Verified (on the extracted A-030 ZIP, before these edits): integrity OK; one top folder nbpcs/; no .git, node_modules,
  __pycache__, screenshots or temp files; ZIP name, last LOG header and START_HERE.md all say A-030; LOG.md has 30 entries
  (16 A and 14 B) with no gaps so the next number is 031; the output LOG.md and START_HERE.md were
  byte-identical to the ones inside the ZIP; the A-030 entry's file list matched a real diff; stitch.py output identical
  to the committed root HTML, sitemap.xml and robots.txt; node --check on 19 JS files plus smoke-test.js and py_compile
  on both Python scripts all clean; all local links and assets in the 10 built pages resolve and no unreplaced {{ }}
  markers; no old class names (service-hub-card, notify-success, css/services.css, faq-list full-width) in live code (only
  in history comments); every image referenced by real data exists (four filenames that "look missing" are only examples
  inside instruction comments in builds.js and gallery.js); smoke-test.js ALL CHECKS PASSED and visual-check.py no
  overflow. The ZIP is about 12MB, the same as the B-025 upload, because of Lane B's part-box photos. Also ran: horizontal
  overflow and script-error baseline, 10 pages x 14 widths (320 to 1024px): none of either. After these doc edits: stitch
  identical, ZIP integrity and the diff against A-030 re-checked (see the reply). Two mistakes in my own first check
  script (it read the "202" out of "2026" in the dates and printed false log-ID gaps) were caught and redone properly.
Next/open: the mobile and tablet redesign (backlog in VISUAL_REDESIGN.md, 8 items; item 1, the 420px gallery breakpoint
  that splits iPhone widths, is the suggested first chunk); Lane B's copy pass can start; still open from earlier: the mobile
  nav submenu and the page-load progress bar (layout-transition), the nav-dropdown shadow check, contact hero copy,
  custom-build's two deferred items.

B-032 | complete | 2026-10-13
Task: Slim the coordination docs without removing information (docs only; no site files changed).
Files: M LOG.md, START_HERE.md, VISUAL_REDESIGN.md, MAINTENANCE.md; A TESTING.md and three docs-archive/ files
  (LOG-B001-A022.md, START_HERE-through-A-031.md, VISUAL_REDESIGN-desktop-pass.md).
Changed:
- START_HERE.md 24 KB -> 8 KB: rules kept, "Current state" is now current facts only, new "Docs budgets" section. The old file
  is kept verbatim in docs-archive/START_HERE-through-A-031.md; test notes moved to TESTING.md; the owner's ZIP-apply steps
  moved to MAINTENANCE.md.
- LOG.md: entries B-001..A-022 moved verbatim to docs-archive/LOG-B001-A022.md; A-023..A-031 stay (A-031 is still the
  newest, so the next-ID rule is unaffected).
- VISUAL_REDESIGN.md 111 KB -> 24 KB: the closed desktop decision records moved verbatim to
  docs-archive/VISUAL_REDESIGN-desktop-pass.md, with a heading index in the live file. The still-open Impeccable findings
  (`gpt-thin-border-wide-shadow`, `layout-transition`) stay live under "Open design findings".
Decision: none (owner asked for slimming without losing information).
Verified: line-by-line check that every line of the old LOG.md entries, START_HERE.md and VISUAL_REDESIGN.md is in a live
  or archive file; no non-.md file differs from A-031.
Next/open: none.

A-033 | complete | 2026-10-14
Task: Mobile pass, phone gallery grid (backlog items 1-3): owner chose Option C from the rendered options artifact.
Files: M css/theme.css, css/style.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- css/theme.css: at 699px and below `.gallery-grid` is 2 columns, first tile full width, a lone last tile on gallery pages full width.
- css/style.css: removed the 420px one-column `.gallery-grid` rule it replaces.
- VISUAL_REDESIGN.md: new "Mobile and tablet pass — decisions" (M1); backlog items 1-3 marked done, item 7 noted.
Decision: M1 = Option C (A rejected, B rejected). Copy untouched.
Verified: real pages match the option artifact at 320-600px (12 of 12 measurements identical; gallery 3,244px at 390, was 10,452);
  no overflow or script errors on 10 pages at 15 widths 320-1440px; `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: mobile backlog items 4-6 and 8; few-photo cases (item 7) not rendered.

A-034 | complete | 2026-10-14
Task: Mobile pass, contact picker button widths (backlog item 5): owner chose Option B from the rendered options artifact.
Files: M css/situation-picker.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- css/situation-picker.css: the 640px rule no longer resets `min-width`, so every picker button is 200px wide on phones.
- VISUAL_REDESIGN.md: decision M2 recorded; backlog item 5 marked done.
Decision: M2 = Option B (A and C rejected). Copy untouched.
Verified: real page with real fonts matches the option artifact (all five buttons 200px at 320-640px; picker height unchanged);
  no overflow or script errors on 10 pages at 15 widths 320-1440px; `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: mobile backlog items 4, 6 and 8.

A-035 | complete | 2026-10-14
Task: Mobile pass, tier cards at tablet widths (backlog item 4): owner chose Option A (subgrid rows) from the rendered options artifact.
Files: M css/style.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- css/style.css: at 641px and up each `.grid-3 > .tier-card` takes six shared rows (subgrid, inside `@supports`), so rules and buttons align.
- VISUAL_REDESIGN.md: decision M3 recorded; backlog item 4 marked done.
- START_HERE.md: state and next-up lines updated.
Decision: M3 = Option A (B and C rejected). Copy untouched.
Verified: real page with real fonts matches the option artifact (row-1 rule gap 0px at 11 widths 661-1440px; was 23-24px at 661-681 and
  751-781px); phones unchanged; no overflow or script errors on 10 pages at 15 widths 320-1440px; `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: mobile backlog items 6 and 8; third card still alone at half width at 641-900px (accepted).

A-036 | complete | 2026-10-14
Task: Mobile pass, part-box cards on small phones (backlog item 6): owner chose Option B from the rendered options artifact.
Files: M css/part-boxes.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- css/part-boxes.css: at 389px and below the card is two rows, photo + text on top, ruled full-width footer (price left, picker right).
- VISUAL_REDESIGN.md: decision M4 recorded; backlog item 6 marked done.
- START_HERE.md: state and next-up lines updated.
Decision: M4 = Option B (A and C rejected). Copy untouched.
Verified: real page with real fonts matches the option artifact (0 of 12 wrapped at 320-480px and 381-388px; was all 12 at 321-375 and 381-386);
  quantity buttons work at 320px; no overflow or script errors on 10 pages at 15 widths 320-1440px; `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: mobile backlog item 8 (visual-check.py widths); open design findings.

A-037 | complete | 2026-10-14
Task: Mobile pass, tooling (backlog item 8): `visual-check.py` extended. No design change, no site file touched. Lane A.
Files: M visual-check.py, TESTING.md, VISUAL_REDESIGN.md, START_HERE.md, LOG.md; A docs-archive/LOG-A023-A027.md.
Changed:
- visual-check.py: 15 widths (320-1440px, incl. 393, 428, 430) x 10 pages (adds 404); also reports script errors and names overflowing elements; exit 1 on any problem.
- Screenshots are now opt-in (`--screenshots` = old 3 widths, `--screenshots-all`); the default run writes no files.
- Docs: TESTING.md and backlog item 8 updated; LOG.md rolled over (A-023 to A-027 moved verbatim, over the 10-entry budget).
Decision: none needed (not a visual decision).
Verified: clean run, 150 loads, no overflow or script errors; a scratch copy with an injected 2000px div, a missing image and a script error
  was caught at all widths with exit 1; screenshots mode wrote 30 PNGs on that copy; `smoke-test.js` passed; Chromium only, fallback fonts.
Next/open: open design findings; a mobile walk of every page.

A-038 | complete | 2026-10-14
Task: Open design findings: re-ran the Impeccable detector on the built site, fixed what was clear, listed the rest. Lane A.
Files: M js/partials/footer.html, js/render/notifyBox.js, VISUAL_REDESIGN.md, START_HERE.md, LOG.md; root *.html regenerated by stitch.
Changed:
- footer.html: the footer wordmark's "PCs" no longer has an inline raw-accent colour (was 2.5:1); it now matches the header (5.05:1).
- notifyBox.js: the "custom builds" link in the no-builds notice uses `--accent-text` instead of `--accent` (was 2.5:1).
- VISUAL_REDESIGN.md: re-scan results recorded under "Open design findings".
Decision: none yet; the 4.2:1 advisory on accent text over the accent tint needs the owner (options next).
Verified: detector went from 11 findings to 1 + 8 advisories; live check found no text left in raw `--accent`;
  `visual-check.py` clean (150 loads); `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: 4.2:1 advisory decision; lightbox `broken-image` (probably false positive); thin-border and layout-transition not reported now.

A-039 | complete | 2026-10-14
Task: Open design findings: the 4.2:1 contrast advisory (accent text on the accent tint). Owner chose Option C from the rendered options. Lane A.
Files: M css/style.css, css/theme.css, css/part-boxes.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md; A docs-archive/LOG-A028-A029.md. Root *.html unchanged after stitch.
Changed:
- theme.css: new token `--accent-text-tint` (#b38195); `.faq-icon` uses it. style.css: active nav link, dropdown link and mobile sublink use it. part-boxes.css: `.box-category` uses it.
- VISUAL_REDESIGN.md: decision M5 recorded; the advisory marked resolved.
- LOG.md rolled over (A-028 and A-029 moved verbatim to docs-archive/LOG-A028-A029.md, over the 10-entry budget).
Decision: M5 = Option C (A and B rejected). Copy untouched.
Verified: real pages: lowest accent text on a tint 5.13:1 (was 4.68:1); detector 0 advisories (was 8), 1 finding left (lightbox broken-image, likely false positive);
  Contact button text still white; `visual-check.py` clean (150 loads); `smoke-test.js` passed; Chromium only, Safari not run.
Next/open: lightbox `broken-image` (probably false positive); `--accent-h`; a mobile walk of every page.

A-040 | complete | 2026-10-14
Task: Open design findings, last two: checked the lightbox `broken-image`; merged `--accent-h` into `--accent` (owner request). Lane A.
Files: M js/render/galleryGrid.js, css/base.css, css/style.css, css/part-boxes.css, css/theme.css, css/tokens.css, ARCHITECTURE.md, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- Lightbox `broken-image` was a false positive (lightbox absent from the DOM until first open, `display: none` until a `src` is set). The `<img>` is now built with createElement in the same DOM position, so the scanner stops reporting it.
- `--accent-h` (equal to `--accent`, #8b3f5e) removed from theme.css and tokens.css; its 7 uses now `var(--accent)`; stale comments reworded. `--accent-h2` untouched.
- VISUAL_REDESIGN.md, START_HERE.md, ARCHITECTURE.md updated.
Decision: none (owner asked for both). No visual change intended.
Verified: 30 screenshots (10 pages x 390/768/1440) identical before/after apart from the animated 4px progress bar (differs between two runs of the unchanged build);
  lightbox open, next, Escape and focus return identical; detector 0 findings; `visual-check.py` clean (150 loads); `smoke-test.js` passed; Chromium only, hover states not shot, Safari not run.
Next/open: the mobile walk of every page (owner, Safari).

A-041 | complete | 2026-10-14
Task: Mobile walk, owner finding (iPhone 8, iOS 16.7, Safari): after tapping into and out of a form field the page scrolls sideways until zoomed in and out. Lane A bug fix.
Files: M css/style.css, css/part-boxes.css, VISUAL_REDESIGN.md, START_HERE.md, LOG.md. Root *.html unchanged after stitch.
Changed:
- style.css: `.form-input`, `.form-select`, `.form-textarea` are 16px inside `@media (pointer: coarse)` (were 14.72px). part-boxes.css: `.qty-input` the same (was 14.4px). iOS Safari zooms on focus when field text is under 16px; desktop unchanged.
- VISUAL_REDESIGN.md: new "Mobile walk findings" section with this item; START_HERE.md updated.
Decision: none (bug fix). `maximum-scale=1` rejected because it blocks pinch zoom.
Verified: Chromium with touch emulation at 320/375/390/430px: all fields 16px, no overflow, fields 1-2px taller (41 -> 43px), desktop still 14.72px; nothing wider than the screen on any of the 10 pages at 375px;
  `visual-check.py` clean (150 loads); `smoke-test.js` passed; detector not re-run. NOT reproduced or verified on an iPhone or in Safari: the cause is very likely but unconfirmed until the owner re-tests.
Next/open: owner re-test of the form fields on the iPhone; the rest of the mobile walk.
