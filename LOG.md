# LOG.md — completed chunks, newest last

Append-only. Entry header: `<lane>-<number> | complete|partial | <date or unknown>`.
Next number = highest in the header lines below + 1 (see START_HERE.md).
Files: A=added M=modified D=deleted, from a real diff of uploaded vs. returned project.
Rollover: entries B-001 to A-022 were moved verbatim to docs-archive/LOG-B001-A022.md in B-032. Keep about the
newest 10 entries here; the newest entry always stays (the next-ID rule reads it).

A-023 | complete | 2026-10-09
Task: Part-boxes leftovers: quantity picker and order confirmation (Lane A; owner approved both after a before/after preview).
Files (diff against the A-022 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/part-boxes.css
- M css/style.css
- M js/render/partBoxOrder.js
Changed:
- css/part-boxes.css: `.qty-picker` border and the `.qty-input` left/right dividers use `var(--border-field)`
  (was `--border`, 1.29:1; now 3.13:1 against the card). New `.qty-btn:focus-visible, .qty-input:focus-visible
  { outline: none; box-shadow: inset 0 0 0 2px var(--accent-text) }` because `.qty-picker { overflow: hidden }`
  clipped the old 2px offset focus ring (keyboard focus was invisible). New `.order-summary .success-state
  { background: none; border: 0; padding: 1.25rem 0.25rem }` (the confirmation sits inside a card already).
- js/render/partBoxOrder.js: the `?ordered=true` confirmation now renders the shared `.success-state` markup
  (`.success-mark` with aria-hidden, `h2.success-title`) instead of `.notify-success` with an h3; copy unchanged.
- css/style.css: the four `.notify-success` rules removed (the part-boxes confirmation was the last user); the
  shared success-state comment updated.
- VISUAL_REDESIGN.md: new "Quantity picker and order confirmation" subsection; Scope notes (part-boxes complete);
  the earlier "not touched, flagged" paragraph marked resolved. START_HERE.md: Current state and Next up updated.
- No markup change in the HTML sources; generated HTML unchanged.
Decision: Owner approved both changes ("Yes, do both") after a before/after artifact. Not a three-option round,
  because both apply decisions already made (the field border from the form-field decision, and the shared
  success card); the order summary panel needed nothing.
Verified: stitch.py exit 0, generated HTML unchanged. node --check passes on partBoxOrder.js. smoke-test.js (jsdom
  installed here): ALL CHECKS PASSED. visual-check.py on a scratch copy: no horizontal overflow on any page at
  desktop/tablet/mobile. Real page: picker border and dividers rgb(106, 102, 94), 3.13:1 (was 1.29:1); real
  keyboard focus via Tab shows the inset edge on the "Decrease quantity" button and then on the number input; the
  + buttons add boxes and the summary updates; the picker stays inside its card at 390/360/320px. Confirmation via
  ?ordered=true at 1440/768/390: h1 then h2, old class gone, own box 0 and transparent inside the panel's 1px
  border, mark rgb(174, 121, 142) (5.05:1), the 12 box cards still render, 0 script errors, no horizontal
  overflow; the panel is sticky at 1440 and static at 768/390 as before. Screenshots and the preview page are
  not in the ZIP. Not run: submitting the order form (the redirect to ?ordered=true was simulated by loading the
  URL).
Next/open: about, gallery and faq are the only unwalked pages (owner's choice of order); part-boxes copy items
  are in COPY_REVIEW.md; contact hero copy, custom-build deferred items and the sitewide scan findings are
  unchanged.

B-024 | complete | 2026-10-09
Task: Record the owner's answers to the B-020 copy-audit questions; update the owner queue. Docs only.
Files (diff against nbpcs_after-A-023.zip):
- M COPY_REVIEW.md
- M START_HERE.md
- M LOG.md
Changed:
- COPY_REVIEW.md: new "Owner answers (2026-10-09)" section (payment, returns, new/used, pickup/delivery, budget tiers, privacy line, process
  claims, medium-term items) with the owner's rule (reword only if misleading), which Part 1 items are closed (9, 10, 12, 13) or stay open (6),
  and what is left for the copy pass. Header line notes the addition. Part 1 and Part 2 text unchanged.
- START_HERE.md: Last updated/Current state header, B-024 line, owner queue rewritten (hero image, domain, testimonials are medium term;
  facts questions answered; two decisions left).
Checked: grep of all site copy for ship/deliver/meet/return/refund/warranty/new/used: no statement about used parts, returns or
  meet-in-the-middle pickup; About says "selling in person" and contact says the exact address is shared after a sale.
Reconciliation: A-021..A-023 (Lane A) follow B-020 with no gap in IDs; the A-023 ZIP's COPY_REVIEW.md was identical to B-020's.
Verified: no site files changed, so stitch.py and generated HTML are untouched (not re-run). Not run: smoke-test.js, visual-check.py (docs
  only; Lane A reports both passing on A-023).
Next/open: Lane B remaining: Phase 8 maintenance/deployment guide; domain-swap checklist. Owner: decide on the two misleading-wording items.

B-025 | complete | 2026-10-09
Task: Write the maintenance/deployment guide (the old Phase 8 gap; Lane B queue item 1).
Files (diff against the B-024 ZIP):
- A MAINTENANCE.md
- M ARCHITECTURE.md
- M START_HERE.md
- M LOG.md
Changed:
- MAINTENANCE.md (new, owner-facing): the three rules (edit sources not root HTML, run stitch.py, check before publishing); everyday tasks
  with the file for each (add/sell/hide a listing, part boxes and manual quantities, photos, gallery, FAQ, sales events, testimonials,
  contact email and switches, page wording); preview and checks; publish (commit the generated files, GitHub Pages); troubleshooting table;
  notes on analytics and the domain change.
- ARCHITECTURE.md: file tree lists MAINTENANCE.md and COPY_REVIEW.md. START_HERE.md: state, doc map, Lane B queue (guide done).
Checked while writing (real tests on a scratch copy in Chromium): index.html and part-boxes.html opened straight from file:// load their photos
  and, for part boxes, 12 cards, with no script errors (so double-click preview works for browsing; form sending was not tested); a
  missing comma in js/data/partBoxes.js gives 0 cards and the console errors "Unexpected identifier" / "partBoxes is not defined" with no message
  on the page, and `node --check` names the bad line. Read from code: stitch.py reads only config.js (SITE.url, CONTACT.email) and the
  partials/pages-src, so data-file edits don't need it; there are no root-absolute links in pages-src/partials; sitemap/robots are generated;
  FormSubmit's first-use confirmation email is stated in config.js; features.events.show gates the sale banner.
Unknown, marked as such in the guide: which branch/folder GitHub Pages publishes from, whether FormSubmit has confirmed the current address,
  who owns the Google Analytics account, whether Node is installed on the owner's computer.
Verified: stitch.py exit 0, generated HTML unchanged. Not run: smoke-test.js (jsdom cannot be installed in this sandbox: network unreachable),
  visual-check.py (docs only). Git commands in the guide are standard but were not run here (no repository in the ZIP).
Next/open: Lane B remaining: domain-swap checklist (can wait). Lane A: walk about, gallery, faq.

A-026 | complete | 2026-10-11
Task: About page story section layout (Lane A visual decision; owner approved Option A).
Files (diff against the uploaded nbpcs_after-B-025.zip):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M ARCHITECTURE.md
- M about.html
- M css/style.css
- M pages-src/about.html
Changed:
- pages-src/about.html: the inline-styled 720px centered prose block is now `.about-grid` > `.about-side` (the
  existing `.lede` paragraph plus an `.accent-line`) and `.about-body` (the five paragraphs, no inline styles),
  with an HTML comment. Copy unchanged: the rendered prose text is identical to the B-025 page after whitespace
  normalization, and the hero and CTA sections are identical after rendering.
- css/style.css (after `.two-col.center`, with a comment): `.about-grid` (two equal columns, 4rem gap),
  `.about-side` (`position: sticky; top: 6rem`), `.about-side .lede` (1.6rem/1.4, no margin),
  `.about-side .accent-line` (left-aligned), `.about-body p` (1.05rem/1.9, 1.5rem between paragraphs); at 900px
  and below one column, nothing pinned, `.about-body` capped at 34rem.
- about.html regenerated with stitch.py (the prose block only).
- VISUAL_REDESIGN.md: new "About page" section; Scope notes updated. ARCHITECTURE.md: a stale line that listed
  part-boxes among the unwalked pages now says gallery and faq. START_HERE.md: Current state, Next up and one of
  Lane B's sentences updated; also corrected a bullet that A-023 left stale (it still listed part-boxes as
  unwalked).
Decision: Owner chose Option A (two columns on the page grid) over B (one column, left edge on the grid) and C
  (centered column, shorter lines). Options were shown as a published artifact. Deviation to flag: the
  single-column layout below 900px has a 34rem paragraph cap that the options page did not show (the first
  implementation let it run 97-110 characters per line at 900px; now 66-77).
Verified: Reconciled Lane B's B-024 and B-025 against a real diff of the B-025 ZIP vs my A-023 ZIP: only docs
  changed (MAINTENANCE.md added; ARCHITECTURE.md, COPY_REVIEW.md, START_HERE.md, LOG.md), matching the logged files;
  no site code changed. stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED. visual-check.py
  on a scratch copy: no horizontal overflow on any page at desktop/tablet/mobile. Real page at
  1440/1180/1024/901/900/768/390px: 0 script errors, no horizontal overflow; two columns from 901px with the opening
  line at x=154 at 1440px; 66-77 characters per line at 1440px (54-66 at 1024px, 54-58 at 901px); one column at
  900px and below (66-77 at 900px and 768px, 41-48 at 390px); headings h1 then h2. Pinning checked against the
  real sticky header (bottom y=77) at 1440x900 and 1440x700: the opening line settles 96px from the top and stays
  inside the grid. Screenshots and the options page are not in the ZIP.
Next/open: gallery and faq are the only unwalked pages (owner's choice of order); then the copy pass Lane B has
  prepared (COPY_REVIEW.md); a photo of the owner's PCs/setup could later sit under the pinned opening line
  (not added, no photo exists); contact hero copy, custom-build deferred items and the sitewide scan findings are
  unchanged.

A-027 | complete | 2026-10-11
Task: Gallery photo tile shape (Lane A visual decision; owner approved Option B), plus the misaligned section sub-headings.
Files (diff against the A-026 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/style.css
- M gallery.html
- M pages-src/gallery.html
Changed:
- css/style.css: `.gallery-item` is `aspect-ratio: 3 / 4; align-self: stretch` (was `1 / 1`) and `.gallery-item img` is
  `object-fit: contain` (was `cover`), with a comment. 16 of the 22 gallery photos are 3:4 portrait, 1 is 0.82 and
  5 are 4:3 landscape; the square crop hid a quarter of each portrait. `align-self: stretch` makes a tile fill its
  row so the tiles beside the 2x2 featured tile (theme.css) end exactly on its edge (without it they ended 3.5px
  short). This grid is shared with the homepage preview, so its tiles are 3:4 too (featured 556x741, others 268x357
  at 1440px, was 556x556 and 268x268).
- pages-src/gallery.html: both section headers use `class="section-header align-left"` instead of the inline
  `style="text-align:left; margin-bottom:2rem;"` (the sub-heading started at x=430 while its title started at x=154).
- gallery.html regenerated with stitch.py (those two class changes only). No JS change; index.html unchanged.
- VISUAL_REDESIGN.md: new "Gallery page" section; scope note (gallery in progress); a pointer under home decision 6.
  START_HERE.md: Current state, Next up and Lane B's dependent sentence updated.
Decision: Owner chose Option B (3:4 tiles, same layout) over A (keep the square tiles) and C (masonry at natural
  proportions). Options were shown as a published artifact for the gallery page grid and the homepage preview.
  Deviations to flag: the homepage preview's tiles changed too because it uses the same component; and the options
  page could not show that on a 390px phone the grid is one column and 10,452px tall (about 8,000px with squares).
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED. visual-check.py on a scratch
  copy: no horizontal overflow on any page at desktop/tablet/mobile. Real gallery page at
  1440/1180/1024/768/700/699/480/421/420/390px: 0 script errors, no horizontal overflow; four columns at 700px and up
  with the featured tile and the tiles beside it ending on exactly the same line at every one of those widths (1440px:
  featured 556x741, others 270x361, grid 2,628px for 7 rows, was 1,996px); 2 columns at 421-699px and 1 column at 420px
  and below (existing breakpoints, unchanged); every image object-fit contain; sub-heading x equals title x on both
  sections. Lightbox: click opens it on photo 1 of 22, ArrowRight moves on, Escape closes, Enter on a focused tile
  opens it. The empty "Current Builds" state is unchanged. Homepage preview at 1440px: grid 741px, bottom-right
  quadrant still empty. Screenshots and the options page are not in the ZIP.
Next/open: gallery's empty "Current Builds" section (556px block, "Photos coming soon.") is the next decision; the
  homepage preview shows 3 photos in a layout built for 5, leaving an empty quadrant (idea: show 5 photos; home page was
  signed off, so owner decision); very tall one-column grid on phones at 420px and below (mobile pass); faq is the only
  unwalked page; then Lane B's copy pass. Contact hero copy, custom-build deferred items and the sitewide scan findings
  are unchanged.

A-028 | complete | 2026-10-11
Task: Homepage gallery preview shows 5 photos on desktop (owner approved: "yes, on desktop").
Files (diff against the A-027 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/theme.css
- M index.html
- M js/data/gallery.js
- M pages-src/index.html
Changed:
- pages-src/index.html: the gallery preview loads `media.slice(0, 5)` (was `slice(0, 3)`), with a comment. The other
  `slice(0, 3)` in the file (the available-builds card strip) is unrelated and unchanged.
- css/theme.css (next to the gallery bento rule, with a comment): `@media (max-width: 699px) { #gallery-preview
  .gallery-item:nth-child(n+4) { display: none; } }` so phones keep 3 tiles (below 700px there is no bento; five tall
  tiles would be a very long strip). The gallery page grid is unaffected.
- js/data/gallery.js: comment only: the instructions' step 4 said the homepage "just shows the first 3 combined", which
  was already untrue (the homepage reads js/data/builds.js); it now says so and mentions 5 on desktop / 3 on phones.
- index.html regenerated with stitch.py (the slice line and its comment only).
- VISUAL_REDESIGN.md: new "Homepage preview: 5 photos on desktop" subsection under the Gallery page section.
  START_HERE.md: Current state and Next up updated.
Decision: Owner asked for 5 photos on desktop only. Deviation to flag: the lightbox opened from the preview lists all 5
  photos on phones too (counter "1 / 5") even though only 3 tiles are visible there.
Verified: stitch.py exit 0. node --check passes on gallery.js. smoke-test.js (jsdom installed here): ALL CHECKS PASSED.
  visual-check.py on a scratch copy: no horizontal overflow on any page at desktop/tablet/mobile. Real homepage at
  1440/1180/1024/768/700/699/480/421/420/390px: 0 script errors, no horizontal overflow; from 700px up all 5 tiles show
  and all 8 cells of the 4x2 block are covered (1440px: featured 556x741, four 270x361 tiles, grid 741px, unchanged
  height); below 700px 3 tiles show, 5 stay in the DOM. Lightbox from the preview reads "1 / 5". Screenshots are not in
  the ZIP.
Next/open: the gallery page's empty "Current Builds" section (options being prepared); at 421-699px the preview's 3 tiles
  sit in a 2-column grid so one is alone on the second row (already the case with squares; mobile pass); very tall
  one-column gallery grid on phones at 420px and below (mobile pass); faq is the only unwalked page; then Lane B's copy
  pass.

A-029 | complete | 2026-10-11
Task: Hide the gallery's empty "Current Builds" section (owner approved Option A); note the owner's iPhone Plus / Pro Max observation for the mobile redesign.
Files (diff against the A-028 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M gallery.html
- M pages-src/gallery.html
Changed:
- pages-src/gallery.html: the "Current Builds" section has `id="gallery-current-section"`, a comment, and the page
  script now renders the current grid only when `currentBuilds.length` is non-zero, otherwise sets the section's
  `hidden` attribute. js/render/galleryGrid.js is unchanged. Nothing else links to `#gallery-current`.
- gallery.html regenerated with stitch.py (the section id and comment and the script only).
- VISUAL_REDESIGN.md: new "Empty Current Builds" subsection under the Gallery page section; scope note (gallery
  complete); new "Mobile and tablet pass — backlog" section (7 items) collecting everything noted so far for the
  mobile redesign. START_HERE.md: Current state, Next up and Lane B's dependent sentence updated.
- Mobile note, docs only, nothing changed in code: the owner reported (Safari responsive design mode) that iPhone
  Plus and Pro Max sizes get photo grids on the homepage and gallery while smaller iPhones get a single stacked
  column, and "similar problems in other places". Measured: `.gallery-grid` (gallery and homepage preview) is 1
  column at 320/375/390/393px and 2 columns at 428/430/480/600px, because of one rule, `@media (max-width: 420px)`
  in css/style.css. Builds grid, part-box grid, custom-build tier cards and home builds grid are 1 column at all of
  those widths; the only other rules at 480px and below are part-boxes' (110px and 96px photo columns). The other
  places the owner saw were not identifiable from the CSS and need a visual 390-vs-430 walk in the mobile pass.
Decision: Owner chose Option A (hide the section while empty) over B (compact) and C (reuse the builds.html notify
  card). Options were shown as a published artifact. Owner asked for the iPhone observation to be saved for the
  mobile redesign and noted now.
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED. visual-check.py on a scratch
  copy: no horizontal overflow on any page at desktop/tablet/mobile. Real data at 1440/768/390px: the section
  computes display none, 0 tiles in it, 3 visible sections (hero, Completed Builds, CTA), headings H1 then H2
  "Completed Builds" then the CTA's H2, the Completed Builds heading at y=516/483/498 (was 995 at 1440px), 22
  completed tiles, 0 script errors, no overflow. Scratch copy with one photo added under currentBuilds: the section
  returns (4 visible sections, 1 tile, H2 "Current Builds" before H2 "Completed Builds") and the lightbox opens from
  it (1 / 1). Column counts for seven components were measured at 320/375/390/393/428/430/480/600px for the mobile
  note. Screenshots and the options page are not in the ZIP.
Next/open: faq is the only unwalked page; then the mobile and tablet redesign (backlog in VISUAL_REDESIGN.md) and
  Lane B's copy pass. Layout with few photos (a single current photo becomes one 556x741 tile; 2-4 photos leave
  empty cells in the 4x2 block) is noted for when current photos are next added. Contact hero copy, custom-build
  deferred items and the sitewide scan findings are unchanged.

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
