# START_HERE.md — North Bridge PCs website

Read this first, then the last few entries of LOG.md. Read other docs only
when the doc map (bottom) says to. Last updated: A-021 (2026-10-09).

## What this is
Static HTML/CSS/vanilla-JS site on GitHub Pages. Real sources are in
`pages-src/`; `build-tools/stitch.py` injects the shared partials and writes
the root `*.html`, `sitemap.xml`. Content lives in `js/data/*.js`.

## Rules (every chat)
1. **The uploaded ZIP is the source of truth.** It is a complete replacement
   snapshot, never a patch. After each new upload, re-read any file before
   editing it; do not rely on copies seen earlier in the conversation.
2. **First reply of every turn is one line:** `Working from <zip name>; last
   log entry <ID>.` If the ZIP name's ID and LOG.md's last ID disagree, say
   so before doing anything else.
3. If LOG.md and the files disagree, say so in the reply. Do not silently
   pick one.
4. Edit `pages-src/`, partials and data, never the generated root `*.html`.
   Run `python3 build-tools/stitch.py` before packaging.
5. Use `unknown` rather than guessing. Never claim a test passed unless it ran.
6. One small chunk per turn: a task the owner can review in one sitting.
7. Return a ZIP only at a clean stopping point where the site works. If the
   chunk cannot finish cleanly, say so and return no ZIP.

## Roles (alternating, never simultaneous)
- **Lane A: interactive visual/design.** Mockup-driven, needs owner approvals.
  Options may be shown as screenshots or as artifacts (owner OK'd artifacts in A-006).
- **Lane B: batch/checklist.** Continues while A waits on the owner.
- B does not make visual decisions. Either lane may touch any file a task
  requires; the log entry says which.

## End of every chunk: return exactly this
1. Short reply: what was done, what to check, decisions needed from the owner.
2. Added/modified/deleted paths as text, taken from a real diff of the
   uploaded vs. returned project (not from memory).
3. Files presented, in order: the complete ZIP, then LOG.md, then START_HERE.md.
   The ZIP is authoritative; the two .md copies are extracted from the final
   ZIP and must match it byte for byte.

Sequence: finish edits, run stitch (and tests if they can run here), append
the log entry, update this file, build the ZIP, check it opens (`unzip -t`),
extract LOG.md and START_HERE.md from it and compare, then present.
ZIP name: `nbpcs_after-<last ID>.zip`. Same single top folder `nbpcs/`; no
`.git`, `node_modules`, `__pycache__`, temp or scratch files.

## Log IDs
Next ID = highest number in the entry header lines of LOG.md, plus one, with
the working lane's prefix (A-013, B-014, A-015, so next is 016). Ignore IDs
mentioned inside entries. Never use conversation memory or per-lane counters.
Archiving old entries is fine; the newest entry always stays in LOG.md.
Entries are append-only; corrections are new entries ("Corrects: A-009").

## Applying a returned ZIP (owner)
Make the local working tree match the ZIP exactly, keeping `.git`, so deleted
files disappear too (mirror-style sync, e.g. `rsync -a --delete --exclude .git`
or `robocopy /MIR /XD .git`). Dry-run first, or check `git status` after: the
deleted files shown should match the `D` lines in the log entry. A mirror
sync also deletes local-only files that are not in the ZIP (for example
`design-prototypes/` if it still exists), so exclude or relocate those.
Commit with the entry ID in the message.

## Current state (as of A-021)
- V1 build is complete (history through D43 in docs-archive/DECISIONS.md).
- **Visual redesign in progress.** Live record: VISUAL_REDESIGN.md. Accent is
  "Cask" `#8b3f5e` sitewide. Build-detail and home pages are done;
  custom-build is done apart from deferred items (section headers, open
  items, tier-card feature lists, process-section column, "Not Sure"
  section); contact is done apart from hero copy (situation picker, form panel
  layout, shared form fields and success states); about, gallery,
  faq, part-boxes are not yet walked.
- **Services are gone (B-003).** The owner no longer offers services, so the
  Services page and everything tied to it were removed: services.html, its
  data/renderer/most of its CSS, the nav and footer links, the contact page's
  "PC Service / Repair" card (picker is now 5 cards), and the smoke/visual test
  entries. The old services.html URL now returns the 404 page. The repair
  wording in about.html and the homepage structured data was also removed
  (B-004, owner-approved).
- Changes found in the ZIP that older docs do not record (made by Lane A before
  this system existed, no log entries): `.btn-primary:hover` white-text
  contrast fix; hover `box-shadow` removed from `.build-card`, `.tier-card`,
  `.gallery-item`; aug26-02 (EliteBook) marked sold in `builds.js` and its
  photos moved to Completed Builds in `gallery.js`. All builds are now sold,
  so the site shows its no-inventory states. Details are in VISUAL_REDESIGN.md.
- Generated root HTML matches `pages-src/` + stitch.py as of B-005 (all local
  links and assets resolve). A real-Chromium pass on this state found no script
  errors on any of the 10 pages, no horizontal overflow at desktop/tablet/mobile,
  and 5 cards in the contact picker.
- Lane A's closing summary (received after B-001): nothing was decided but
  left unwritten, and its two open items (nav-dropdown shadow check,
  `layout-transition`) are already in VISUAL_REDESIGN.md. Lane A reports
  `smoke-test.js` passing on this state; Lane B could not re-run it (see Tests).
- A-006 (Lane A): `css/style.css` only. The three tier-card feature lists on
  custom-build are now flush-left hairline rows without check marks (owner
  chose Option B; also fixes a stray 40px list indent). `smoke-test.js` ran
  and passed in Lane A's sandbox, which also covers the 6 -> 5 picker
  assertion B-003 could not run.
- A-007 (Lane A): `pages-src/custom-build.html` only (root file regenerated). The
  "How a Custom Build Works" section is now plain `.two-col`, so its left column
  top-aligns with the step list instead of floating centered (owner chose Option A).
  Home page's `.two-col.center` is untouched. Options were shown as a published
  artifact for the first time.
- A-008 (Lane A): `pages-src/custom-build.html` and `css/style.css`. The "Not Sure
  What Hardware You Need?" section is now two columns on the page grid (heading +
  lead left, paragraphs + buttons right) instead of a centered 760px block (owner
  chose Option A). New opt-in utility `.text-balance` in style.css, used only on
  that heading. Copy unchanged.
- A-009 (Lane A): contact page situation picker. The five choices are now hairline
  ruled rows (title + description left, equal-width button right) instead of cards
  (owner chose Option B), with a fix for stray default h3/p margins. Renamed (owner
  approved): `css/services.css` -> `css/situation-picker.css`, `.service-hub-card` ->
  `.situation-option`; picker container is `.situation-picker` (no longer `.grid-2`).
  Files: css/situation-picker.css (A), css/services.css (D), pages-src/contact.html,
  smoke-test.js, css/style.css (comment), ARCHITECTURE.md. Copy unchanged.
- A-010 (Lane A): contact form panels (`pages-src/contact.html`, `css/style.css`). The
  panels stay full container width; the intro paragraph is capped at 52ch, the submit
  buttons are natural width above 640px (full width at 640px and below, as before), and
  the privacy note's stray paragraph margins are removed (81px box -> 56px). Owner chose
  Option A.
- A-011 (Lane A): `css/style.css` only. The privacy-note margin fix now lives on the root
  `.form-privacy p` rule (owner approved), so it also applies to the notify box on
  builds.html and the build-detail inquiry form (both boxes 102px -> 77px at 1440px).
  The scoped contact rule from A-010 was removed.
- A-012 (Lane A): shared form fields (`css/style.css`, `css/theme.css`; applies to the contact
  panels, build-detail form, notify box and part-boxes order form). Resting border is now the
  new `--border-field` token (#6a665e, 3.13:1 against the card, was 1.29:1); focus is one solid
  2px accent edge instead of border + glow (the glow override in theme.css was removed); select
  arrow recolored from the old #64748b to `--dim`. Owner chose Option A. `.qty-input` on
  part-boxes was not touched.
- B-014 (Lane B): `ARCHITECTURE.md` only (docs). Theming text (directory-layout entries for tokens.css/theme.css,
  "Theming", and the redesign section, now "Visual redesign history") rewritten to match the code as of A-013.
  No site files changed.
- B-015 (Lane B): docs and CSS comments only. ARCHITECTURE.md directory layout, docs references and
  build-script paragraph brought up to date (page list, pages-src/, data files, docs-archive, gallery.css
  scope); the two `/areas/website-visual-redesign.md` citations in `css/theme.css` comments now say
  `VISUAL_REDESIGN.md`. No rules or visuals changed.
- B-016 (Lane B): comments only. The dead `/areas/website-visual-redesign.md` citation is gone from
  `css/style.css` and `css/build-detail.css` (now `VISUAL_REDESIGN.md`); `css/gallery.css` header now says it
  is loaded by gallery.html and index.html; `js/data/config.js` comment now describes how the FormSubmit
  address is wired (stitch.py fills `{{CONTACT_EMAIL}}`, so re-run it after changing the email).
- B-017 (Lane B): part-box photos. All 11 boxes in `js/data/partBoxes.js` now have one photo
  (`images/box-01.jpg` ... `box-11.jpg`, named by box id; converted from the owner's HEIC originals, resized
  to 1350x1800, EXIF/location stripped, 230-400 KB each). Data and images only; no layout change. Photos are
  portrait, the card frame is landscape 4:3 with `object-fit: cover`, so each is center-cropped (Lane A item in Next up, B-018).
- B-018 (Lane B): part boxes. box-03 model corrected to "Ryzen 7 5800X3D" (owner: the photo label is right).
  B550M split into two listings (owner): box-09 = with inserts (`images/box-09.jpg`, qty 1) and new box-12 =
  no inserts (`images/box-12.jpg`, qty 1); the two photos are swapped accordingly. Owner confirmed the "_W" in
  the photo file names means "with inserts". Owner decision recorded for Lane A: part-box photos stay portrait,
  uncropped (see Next up).
- B-019 (Lane B): box-06 (ID-Cooling SE-214) condition corrected to "Good condition — includes inserts." (owner
  confirmed; it had said "No inserts"). box-12's wording approved by owner. `js/data/partBoxes.js` only.
- B-020 (Lane B): new `COPY_REVIEW.md` (read-only audit; no copy changed): Part 1 lists text that is wrong or may
  mislead (e.g. the part-boxes meta description names GPU and case boxes that aren't listed; intro text written for stock
  sits above the empty states; the FAQ says every system can game but one sold system was a laptop), Part 2 lists
  prominent text that is not doing its job. Input for the copy pass; the owner does the rewriting.
- A-013 (Lane A): success states (`css/style.css`, `js/render/contactRouter.js`, `notifyBox.js`,
  `buildDetail.js`). The contact "Message Sent", the builds.html notify confirmation and the
  build-detail confirmation are now one shared `.success-state` card (check in a 56px outlined
  circle in `--accent-text`, h2 heading); owner chose Option B. `.notify-success` is kept on
  purpose: `js/render/partBoxOrder.js` (part-boxes order confirmation) still uses it; migrate it
  when part-boxes is walked.
- A-021 (Lane A): part-boxes portrait photo cards (`css/part-boxes.css` only) and the `--success` pin
  (`css/theme.css`). The cards are now horizontal, two per row: a 144px-wide 3:4 photo column
  (`object-fit: contain`, never cropped) on the left, details on the right, price + quantity pinned to the
  card bottom (this also fixes pickers that did not line up across a row); two columns only when the grid is at
  least 780px wide (viewports of about 840-900px and 1168px+), otherwise one column (including phones). The 12-box grid is about 1,340px tall at 1440px (was 1,620px). Owner chose Option B. Owner queue
  item 5 is resolved: the owner confirmed there is no light mode and a light/dark emulation of all 9 pages
  agrees; the only leak was `--success`, now pinned to #22c55e in theme.css. The dead light block in
  `css/tokens.css` was left in place.

## Next up
**Lane A:** finish part-boxes (the portrait photo cards are done, A-021; still to walk: the `.qty-input` /
`.qty-btn` picker, the sticky order summary panel, and the `.notify-success` order confirmation in
`js/render/partBoxOrder.js`, to be migrated to `.success-state`), then walk about, gallery, faq (owner's
choice of order). contact is done apart from hero copy, which waits for the copy pass. (custom-build is done
apart from two deferred items: tier-card rule alignment at tablet widths goes in
the tablet pass, and the final CTA box's kicker label waits for the copy pass.)
Open design findings (see VISUAL_REDESIGN.md): confirm whether the 9 remaining
`gpt-thin-border-wide-shadow` hits are the nav dropdown; `layout-transition`
(3 places, nothing implemented: FAQ accordion needs no markup change; the mobile nav
submenu needs a wrapper div first; the page-load progress bar is not yet examined); `--accent-h` still equals
`--accent` (harmless, noted).
**Lane B:** (1) Phase 8 maintenance/deployment guide (never written); (2) domain-swap
checklist (`SITE.url`, Search Console). (The ARCHITECTURE.md theming refresh was done in B-014.)

## Owner queue (waiting on you)
1. Hero image is still missing (you provide).
2. Real domain, plus phone/Facebook values when ready.
3. Testimonials stay off until real ones exist. The EliteBook performance-section
   question may now be moot since it is sold.
4. Facts needed before the copy pass (see COPY_REVIEW.md, Part 1 B and C): payment methods; returns / "sold as-is";
   whether parts are new or used; where pickup happens for Medford/Ashland buyers; whether the budget-tier prices
   match current parts prices; privacy-line wording; whether every process claim on the home page is true for every
   system.

## Do not touch
- Site copy wording: the owner will rewrite copy sitewide after the redesign
  (the custom-build final CTA label waits for that).
- Visual styling of pages Lane A has not finished walking.

## Doc map
- **LOG.md**: completed chunks, newest last.
- **VISUAL_REDESIGN.md**: live design decisions and reasoning (Lane A).
- **COPY_REVIEW.md**: audit of site text (what is wrong or misleading, what is not doing its job) for the copy pass (B-020).
- **ARCHITECTURE.md**: stack and structure. Its theming text predates the redesign.
- **docs-archive/**: frozen as of B-001. DECISIONS.md (D1-D43, large), PROJECT_STATUS.md,
  TODO.md, CHANGELOG.md. Code comments cite "DECISIONS.md D##"; those are in
  docs-archive/DECISIONS.md. Grep them, do not read in full.
- **Tests:**
  - `smoke-test.js` (DOM checks in jsdom): run `npm install jsdom --no-save`
    first (jsdom is not in the repo). It needs the npm registry; whether that is
    reachable depends on the chat's sandbox network settings (Lane A's account
    reached it; Lane B's sandbox in B-002..B-005 did not, registry returned 403).
    If it cannot run, log "not run (reason)", never a pass. A-006: it ran in
    Lane A's sandbox (jsdom installed, npm reachable), ALL CHECKS PASSED.
  - Fonts: theme.css loads Google Fonts, which A-006's sandbox could not reach
    (no web fonts loaded), so screenshots, including visual-check.py's, use
    fallback fonts. For font-accurate mockups, install
    `@fontsource-variable/manrope`, `@fontsource-variable/bricolage-grotesque`
    and `@fontsource/space-mono` from npm in a scratch folder and inject
    `@font-face` rules (scratch copy only).
  - `visual-check.py` (real Chromium screenshots + horizontal-overflow check):
    needs no network. Chromium is pre-installed at `/opt/pw-browsers`; both the
    Python and Node Playwright bindings launch it (checked in B-005). Run it
    on a scratch copy of the project: it writes `screenshots/` next to itself,
    and that folder must not go into the ZIP.
  - docs-archive statements (DECISIONS.md D24, PROJECT_STATUS.md) that the
    Node/npx Playwright route "doesn't work" are outdated: only the
    `npx playwright install chromium` download step failed, and it is not needed.
