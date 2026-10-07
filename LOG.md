# LOG.md — completed chunks, newest last

Append-only. Entry header: `<lane>-<number> | complete|partial | <date or unknown>`.
Next number = highest in the header lines below + 1 (see START_HERE.md).
Files: A=added M=modified D=deleted, from a real diff of uploaded vs. returned project.

B-001 | complete | 2026-10-05
Task: Phase 0 coordination setup (docs only, no site code touched).
Files:
- M ARCHITECTURE.md
- D CHANGELOG.md
- D DECISIONS.md
- A LOG.md
- D PROJECT_STATUS.md
- A START_HERE.md
- D TODO.md
- A docs-archive/CHANGELOG.md
- A docs-archive/DECISIONS.md
- A docs-archive/PROJECT_STATUS.md
- A docs-archive/TODO.md
Changed:
- Created START_HERE.md and LOG.md.
- Moved DECISIONS.md, PROJECT_STATUS.md, TODO.md, CHANGELOG.md into
  docs-archive/ (content unchanged except a one-line ARCHIVED banner on top).
- Added a one-paragraph note at the top of ARCHITECTURE.md pointing to the new
  layout and flagging its theming text as pre-redesign.
- Cross-checked this ZIP against the previous one: only VISUAL_REDESIGN.md,
  css/style.css, js/data/builds.js and js/data/gallery.js differed; their
  changes are summarized in START_HERE.md "Current state".
- Read-only finding: services.html cannot be removed yet (owner queue item 1).
Decision: none
Verified: stitch.py output identical to the committed root HTML and sitemap.xml;
  smoke-test not run (docs-only chunk, no code changed).
Next/open: services.html removal waits on the owner (START_HERE.md owner queue).

B-002 | complete | 2026-10-05
Task: Record Lane A's closing summary and reconcile it with the ZIP (docs only).
Files:
- M LOG.md
- M START_HERE.md
Changed:
- Lane A's summary (received after B-001): nothing decided but unwritten; open
  items are the nav-dropdown shadow check and layout-transition, both already in
  VISUAL_REDESIGN.md; smoke-test reported passing.
- Reconciled: every file that differs between the two ZIPs is on Lane A's edited
  list, and no other file differed. Its "97 files" counts ZIP entries including
  folders (88 files).
- START_HERE.md: removed the "unknown" owner-queue item, added the summary to
  Current state, added layout-transition detail to Next up A, noted that
  smoke-test cannot run in Lane B's sandbox.
Decision: none
Verified: smoke-test not run (jsdom missing in this sandbox, no network); Lane A
  reports it passing on the same site code. No site files changed since B-001.
Next/open: services.html removal still waits on the owner (START_HERE.md owner queue).

B-003 | complete | 2026-10-05
Task: Remove the Services page and everything tied to it (owner no longer offers services).
Files:
- M 404.html
- M ARCHITECTURE.md
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M about.html
- M build.html
- M builds.html
- M contact.html
- M css/services.css
- M custom-build.html
- M faq.html
- M gallery.html
- M index.html
- D js/data/services.js
- M js/partials/footer.html
- M js/partials/header.html
- M js/render/contactRouter.js
- M js/render/notifyBox.js
- M js/render/partBoxOrder.js
- D js/render/serviceCard.js
- M pages-src/contact.html
- M pages-src/part-boxes.html
- D pages-src/services.html
- M part-boxes.html
- D services.html
- M sitemap.xml
- M smoke-test.js
- M visual-check.py
Changed:
- Deleted services.html, pages-src/services.html, js/data/services.js,
  js/render/serviceCard.js.
- Removed the Services link from the header (desktop and mobile) and footer
  partials, and the contact page's "PC Service / Repair" card (picker 6 -> 5).
- css/services.css trimmed to the one class contact.html still uses
  (.service-hub-card); file and class names kept for now.
- smoke-test.js: dropped the services check, picker expectation 6 -> 5.
  visual-check.py: dropped the services entry.
- Fixed stale comments naming services.html (contactRouter.js, notifyBox.js,
  partBoxOrder.js, pages-src/part-boxes.html), the ARCHITECTURE.md file listing,
  and the VISUAL_REDESIGN.md scope note.
- Rebuilt with stitch.py: 10 pages, sitemap has 9 URLs (404 excluded, no
  services). Rebuilt pages differ from B-002 only by the removed links/card.
- Left in place on purpose, awaiting owner approval (START_HERE.md owner queue
  item 1): repair wording in about.html (3 spots) and the homepage structured
  data description in build-tools/stitch.py.
Decision: Owner decided to stop offering services; remove the page and all links to it.
Verified: all local links/assets in the 10 built pages resolve; no references
  to removed files outside docs-archive/; node --check passes on every JS file
  and py_compile on both Python scripts. smoke-test not run (jsdom unavailable
  in this sandbox), so the 6 -> 5 picker assertion is unverified at run time.
Next/open: owner item 1 (wording approvals). Run smoke-test.js locally before
  the next push.

B-004 | complete | 2026-10-05
Task: Remove the remaining repair wording (owner approved all four edits as proposed in B-003).
Files:
- M LOG.md
- M START_HERE.md
- M about.html
- M build-tools/stitch.py
- M index.html
- M pages-src/about.html
Changed:
- pages-src/about.html: dropped "and repair" from the meta description (this
  also feeds the og: and twitter: descriptions in the built page), "and
  repairs" from the school paragraph, and "or a repair question" from the
  bottom call-to-action (now "a listed system or a custom build").
- build-tools/stitch.py: homepage structured-data description is now "Gaming PC
  sales and custom builds in Southern Oregon."
- Rebuilt with stitch.py; only about.html and index.html changed, on those
  lines only.
- Left alone on purpose: the FAQ's after-purchase email troubleshooting, its
  upgrade answer, the "Cleaned" testing step, and the FAQ line saying support is
  "not a warranty program or a repair service" (still accurate).
- START_HERE.md: owner item 1 resolved and removed; Lane B list and state updated.
Decision: Owner approved all four wording edits.
Verified: all local links/assets in the 10 built pages resolve, no unreplaced
  markers, stitch.py compiles; only the expected lines differ from B-003. No
  "repair" remains in site code except the FAQ disclaimer above. smoke-test not
  run (jsdom unavailable here).
Next/open: run smoke-test.js locally before pushing (still unrun since the B-003
  picker change).

B-005 | complete | 2026-10-06
Task: Correct the outdated test-environment notes after Lane A reported how it runs the tests.
Files:
- M LOG.md
- M START_HERE.md
- M smoke-test.js
- M visual-check.py
Changed:
- smoke-test.js header: removed the claim that Playwright's browser cannot be
  used in the sandbox; added setup (`npm install jsdom --no-save`, needs the npm
  registry) and "report not run, never a pass".
- visual-check.py header: Chromium is pre-installed at /opt/pw-browsers and both
  the Python and Node bindings launch it; the earlier failure was only the
  `npx playwright install chromium` download step, which is not needed.
- START_HERE.md Tests section rewritten with both tools, which one needs network,
  the screenshots/ warning, and a note that the docs-archive D24 / PROJECT_STATUS
  statements are outdated. The archive itself stays frozen.
- Lane B's earlier "no jsdom and no network" was true of that sandbox only; it
  is account/sandbox dependent, not a project limit.
Decision: none
Verified: Chromium launched from both Python and Node here. visual-check.py run
  on a scratch copy: 9 pages x 3 viewports, no horizontal overflow. Ad-hoc
  Playwright pass on the same copy: 10 pages, 0 script errors, 0 links to
  services, contact picker shows 5 cards. smoke-test.js itself still not run
  (jsdom absent, npm registry returns 403 in this sandbox). node --check and
  py_compile pass on the edited scripts. Screenshots were made on the scratch
  copy and are not in the ZIP.
Next/open: run smoke-test.js where the npm registry is reachable (Lane A's
  sandbox) or locally, before the next push.

A-006 | complete | 2026-10-06
Task: Custom-build tier-card feature lists (Lane A visual decision; owner approved Option B).
Files:
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/style.css
Changed:
- css/style.css: `.tier-features` now has `padding: 0` (it kept the browser's
  default 40px indent), a top hairline and `flex: 1`; its `li` rows are
  hairline-divided with no check marks (the `::before` rule, the old `gap` and
  the `li` flex layout are gone). `flex: 1` moved from `.tier-desc` to
  `.tier-features` so the top rules line up across the three cards. No markup
  change; pages-src/ and the generated root HTML are unchanged.
- VISUAL_REDESIGN.md: new "Tier-card feature lists" subsection (options A/B/C,
  reasoning, measurements, tablet limitation, two noticed-but-undecided items);
  "How this process works" notes artifacts are allowed for showing options;
  Scope notes entry for custom-build corrected (it said "4 open items pending"
  though all four were already resolved).
- START_HERE.md: updated Current state, Next up (Lane A), Lane A role line, and
  Tests (smoke-test ran here; sandbox cannot reach Google Fonts, how to get
  real fonts for mockups).
Decision: Owner chose Option B (ruled rows, no check marks) over A (aligned
  check marks) and C (mono spec-sheet). Owner also OK'd using artifacts to show
  options in future.
Verified: stitch.py ran (exit 0), root HTML and sitemap.xml identical to B-005.
  smoke-test.js (jsdom installed, npm reachable here): ALL CHECKS PASSED.
  visual-check.py on a scratch copy: no horizontal overflow on any page at
  desktop/tablet/mobile. Playwright on the real page at 1440/1024/768/390: list
  text x equals badge x in every card, `padding-left` 0, no `::before` content,
  0 script errors. Top rules align across cards at 1440 (2012px) and 1024
  (2024px); at 768 the two first-row cards differ by 24px (one description wraps
  to 4 lines, the other to 3) - not fixed. Screenshots and mockups were made on
  scratch copies and are not in the ZIP.
Next/open: custom-build still has the noticed-but-undecided process-section left
  column alignment; tablet-width rule alignment (subgrid) goes in the tablet
  pass; the sitewide scan findings (nav-dropdown shadow check, layout-transition)
  are unchanged.

A-007 | complete | 2026-10-06
Task: Custom-build "How a Custom Build Works" left column alignment (Lane A visual decision; owner approved Option A).
Files (diff against the A-006 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M custom-build.html
- M pages-src/custom-build.html
Changed:
- pages-src/custom-build.html: the process section's wrapper is now
  `<div class="two-col">` instead of `<div class="two-col center">`, plus a short
  HTML comment saying why. Plain `.two-col` already has `align-items: start`, so no
  CSS change was needed; `.two-col.center` is still used by the home page's Custom
  Builds section and is untouched.
- custom-build.html regenerated with stitch.py (differs from A-006 only by that
  class and the comment).
- VISUAL_REDESIGN.md: new "Process section left column" subsection (options A/B/C,
  measurements, reasoning, implementation, verification); Scope notes updated; the
  "noticed" paragraph under the tier-card subsection now points to it.
- START_HERE.md: Current state, Next up (Lane A) updated.
Decision: Owner chose Option A (top-align) over B (header top, button bottom) and C
  (header row over a 2x3 step grid). Options were shown as a published artifact
  (owner had OK'd artifacts in A-006).
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED.
  visual-check.py on a scratch copy: no horizontal overflow on any page at
  desktop/tablet/mobile. Playwright on the real page at 1440/1180/1024/901/768/390:
  0 script errors; at 1440, 1180, 1024 and 901 the left column's top equals the
  list's top and the label sits 5px below the first rule; at 768 and 390 the section
  is one column as before. Home page's `.two-col.center` still computes
  `align-items: center`. Screenshots and the options page were made on scratch
  copies and are not in the ZIP.
Next/open: custom-build's "Not Sure What Hardware You Need?" section only got the
  header rollout and has not been reviewed; tablet-width tier-card rule alignment
  (subgrid) still goes in the tablet pass; sitewide scan findings (nav-dropdown
  shadow check, layout-transition) unchanged.

A-008 | complete | 2026-10-06
Task: Custom-build "Not Sure What Hardware You Need?" section layout (Lane A visual decision; owner approved Option A).
Files (diff against the A-007 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M css/style.css
- M custom-build.html
- M pages-src/custom-build.html
Changed:
- pages-src/custom-build.html: the section's inline `max-width:760px; margin:0 auto`
  block is now `<div class="two-col">`: header (with `style="margin-bottom:0;"`,
  `<h2 class="text-balance">`) in the left div, the two paragraphs and the button
  row in the right div, plus a short HTML comment. Copy unchanged. The right
  column's first paragraph has `margin-top:0` (see Decision note below).
- css/style.css: new opt-in utility `.text-balance { text-wrap: balance; }` with a
  comment; used only on that h2, so no other heading changes.
- custom-build.html regenerated with stitch.py; no other root file changed.
- VISUAL_REDESIGN.md: new "Not Sure section layout" subsection; Scope notes updated
  (custom-build is done apart from deferred items).
- START_HERE.md: Current state and Next up (Lane A) updated.
Decision: Owner chose Option A (two columns on the page grid) over B (single column,
  left edge on the grid) and C (centered). Options were shown as a published artifact.
  Deviation to flag: the artifact showed the right column's first line about 18px
  below the label, which I attributed to top-aligned boxes. The real cause was the
  paragraph's default 1em top margin, no longer collapsing inside a grid item. It is
  now `margin-top:0`, so the first line sits level with the label; the collapsed
  spacing is 36px vs. 32px before. Slightly different from the approved mockup.
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED.
  visual-check.py on a scratch copy: no horizontal overflow on any page at
  desktop/tablet/mobile. Playwright on the real page at 1440/1180/1024/901/768/390:
  0 script errors, no horizontal overflow; two columns down to 901px and one column at
  768/390 as before; section height 469px at 1440 (was 630), 643px at 768 (was 639),
  816px at 390 (was 812). Screenshots and the options page were made on scratch
  copies and are not in the ZIP.
Next/open: custom-build has two deferred items only (tablet-width tier-card rule
  alignment, final CTA box kicker label waits for the copy pass); sitewide scan
  findings (nav-dropdown shadow check, layout-transition) unchanged. Next page to walk:
  about, gallery, faq, contact or part-boxes (owner picks order).

A-009 | complete | 2026-10-07
Task: Contact page situation picker layout and the leftover-name rename (Lane A visual decision; owner approved Option B and the rename).
Files (diff against the A-008 ZIP returned earlier in this chat):
- M ARCHITECTURE.md
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M contact.html
- D css/services.css
- A css/situation-picker.css
- M css/style.css
- M pages-src/contact.html
- M smoke-test.js
Changed:
- css/situation-picker.css (new, replaces the deleted css/services.css): picker is a
  hairline-ruled list; each `.situation-option` is a 2-column grid (title + description,
  button), last row open, h3/p default margins zeroed (they stacked with the flex gap
  and put 44px between title and text), `text-wrap: pretty` on the description,
  button `min-width: 12.5rem`; at 640px and below rows stack with the button below.
- pages-src/contact.html: stylesheet link now css/situation-picker.css; picker container
  `<div class="situation-picker" id="situation-picker">` (was `grid-2`); the five
  `.service-hub-card` divs are `.situation-option`. Copy and data attributes unchanged.
- contact.html regenerated with stitch.py; no other root file changed.
- smoke-test.js: picker selector `.situation-option`; new assertion that no
  `.service-hub-card` markup remains.
- ARCHITECTURE.md file listing and a historical comment in css/style.css use the new
  names. LOG.md (this file's older entries) and docs-archive/ keep the old names.
- VISUAL_REDESIGN.md: new "Contact page" section with the picker decision; Scope notes
  updated. START_HERE.md: Current state and Next up updated, old rename note removed.
Decision: Owner chose Option B (ruled rows) over A (cards, last spans the row) and C
  (three cards + two rows), and approved the rename. Options were shown as a published
  artifact. Deviation to flag: the class is `.situation-option`, not `.situation-card`
  (suggested earlier), because the items are rows now.
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED,
  including the 5-option picker and the new old-markup-gone assertion. visual-check.py on
  a scratch copy: no horizontal overflow on any page at desktop/tablet/mobile. All local
  links/assets in the 10 built pages resolve. Playwright on the real page at
  1440/1024/901/768/641/640/390: 0 script errors, no horizontal overflow; at 1440 the
  picker is 542px (was 832) with a 4px title-to-text gap and five 200px buttons on one
  right edge; clicking each of the four form buttons reveals the expected panel and the
  Part Box button still links to part-boxes.html. Screenshots and the options page were
  made on scratch copies and are not in the ZIP.
Next/open: rest of the contact page (three form panels and the shared .form-input /
  .form-label / .form-privacy fields, thank-you state) is not walked yet; at 640px and
  below the two button widths differ (148px / 196px), left as is for the mobile pass;
  custom-build deferred items and the sitewide scan findings are unchanged.

A-010 | complete | 2026-10-07
Task: Contact page form panels - width, placement and internals (Lane A visual decision; owner approved Option A).
Files (diff against the A-009 ZIP returned earlier in this chat):
- M LOG.md
- M START_HERE.md
- M VISUAL_REDESIGN.md
- M contact.html
- M css/style.css
- M pages-src/contact.html
Changed:
- pages-src/contact.html: the three submit buttons no longer carry inline
  `width:100%; justify-content:center;`. Copy unchanged.
- css/style.css (next to the .form-privacy rules, with a comment): panel intro paragraph
  capped at 52ch; privacy-note paragraph margin removed inside `.situation-form-panel`
  (box 81px -> 56px at 1440); at 640px and below the submit button is full width again
  so phones keep the full-width button they had before.
- contact.html regenerated with stitch.py (differs from A-009 only by the removed
  inline button style); no other root file changed.
- VISUAL_REDESIGN.md: new "Form panel width and placement" subsection; Scope notes updated.
  START_HERE.md: Current state and Next up updated, owner decision pending noted.
Decision: Owner chose Option A (panel stays full width, internals fixed) over B (panel in
  the picker's column) and C (760px on the page grid). Options were shown as a published
  artifact. Deviation to flag: the mobile full-width button at 640px and below was not in
  the mockup; it keeps the pre-change mobile behavior.
Verified: stitch.py exit 0. smoke-test.js (jsdom installed here): ALL CHECKS PASSED.
  visual-check.py on a scratch copy: no horizontal overflow on any page at
  desktop/tablet/mobile. All local links/assets in the 10 built pages resolve. Playwright on
  the real page at 1440/1024/768/390 (button also at 641/640): clicking each of the three form
  buttons shows exactly its panel; 0 script errors, no horizontal overflow; at 1440 panel
  1132px, intro 468px wide, button 187px, privacy box 56px; button 190px at 641px and full
  width at 640px and 390px. Screenshots and the options page were made on scratch copies
  and are not in the ZIP. Not run: actually submitting a form (it would POST to the form
  service).
Next/open: owner decision pending - the notify box on builds.html (privacy box measured 102px)
  and the build-detail form have the same default-margin bug; a root fix to `.form-privacy p`
  would change those signed-off pages. Rest of the contact page not walked yet: shared form
  fields (.form-input, .form-label, .form-select, focus ring) and the thank-you state. With JS
  off the three panels stack with no gap (noticed, not touched).
