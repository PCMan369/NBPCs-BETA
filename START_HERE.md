# START_HERE.md — North Bridge PCs website

Read this first, then the last few entries of LOG.md. Read other docs only
when the doc map (bottom) says to. Last updated: B-060 (2026-10-15).

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
Mirror the ZIP into your repo so deleted files disappear (keep `.git`; dry-run first; commit with the entry ID). Steps and
cautions: MAINTENANCE.md, "Applying a returned ZIP".

## Docs budgets (keep the docs lean)
- **START_HERE.md under about 8 KB**: rules plus CURRENT state only. Edit the matching line when state changes; never
  append a per-chunk bullet (that is the log's job).
- **A LOG.md entry under about 1.2 KB**: Task, Changed (5 short bullets at most), Decision, Verified (1-2 lines),
  Next/open. Point to the VISUAL_REDESIGN.md section for detail. No diffs, code or per-file narration.
- **LOG.md keeps about the newest 10 entries.** Roll older ones verbatim into docs-archive/ (`LOG-<first>-<last>.md`);
  the newest entry always stays.
- **VISUAL_REDESIGN.md** keeps process, scope, sitewide decisions, open findings and the current pass's backlog; closed
  page records go verbatim to docs-archive/ with a heading index in the live file.
- If a budget is exceeded when you start, say so; fix it in the same chunk if the fix is docs-only.

## Current state (as of A-043)
- V1 build is complete. Services were removed (B-003, B-004); the old
  services.html URL returns the 404 page. All builds are sold, so the site shows its no-inventory states. Dark only, no
  light mode (A-022); the `--success` token stays.
- **Visual redesign.** Live record: VISUAL_REDESIGN.md (closed desktop decisions: docs-archive/VISUAL_REDESIGN-desktop-pass.md).
  Accent is "Cask" `#8b3f5e` sitewide. Desktop walk done A-030; mobile and tablet pass done (A-042; owner checked
  iPhone 8 Safari, iPad, MacBook; Android untested). Left open: contact hero copy, part-boxes copy items
  (COPY_REVIEW.md), custom-build's final CTA kicker label (copy pass).
- **Built pieces that constrain new work:**
  - Forms: field border `--border-field`; focus one solid 2px accent edge (A-012). Contact, builds notify box,
    build-detail form and part-boxes order confirmation share one `.success-state` card (A-013, A-023).
  - Accent text on the accent tint (active nav, FAQ icon, part-box chip): `--accent-text-tint` (A-039).
  - Status badges (Available/Sold): one outlined pill on cards and the detail page; no `.badge-quiet` (A-043).
  - Form fields are 16px on touch screens (`pointer: coarse`); smaller makes iOS Safari zoom (A-041).
  - Contact picker: `.situation-picker` / `.situation-option` in `css/situation-picker.css` (A-009); buttons all 200px
    wide (A-034).
  - FAQ: ruled rows, buttons in the h2s, `grid-template-rows` reveal (A-030; supersedes home decision 7).
  - Gallery: tiles 3:4 `object-fit: contain` (A-027); homepage preview 5 photos, 3 below 700px (A-028); empty "Current
    Builds" hidden until `currentBuilds` in `js/data/gallery.js` has a photo (A-029). Below 700px: 2 columns, first
    photo and a lone last tile full width (A-033, `css/theme.css`).
  - Part-boxes: 12 boxes, one portrait photo each (`images/box-NN.jpg`); horizontal cards, two per row from 780px grid
    width (A-021); at 389px and below a two-row card with a full-width footer (A-036).
- **Checks at A-043:** `visual-check.py` (10 pages x 15 widths) clean; `smoke-test.js` passed; Impeccable clean.

## Next up
**Lane A:** after the copy pass, a minor redesign pass so the layout suits the new wording and paragraph sizes (owner, B-059; places listed in
COPY_REVIEW.md, "For Lane A"). Nothing else queued; new visual work starts from an owner request.
**Lane B:** the copy pass (progress list in COPY_REVIEW.md): agree the plan for the fuller rewrite, then draft in small chunks;
the domain-swap checklist, which can wait (no domain yet).

## Owner queue (waiting on you)
- Not blocking (owner, 2026-10-09): a hero image (several PCs or the building setup); a real domain plus phone/Facebook
  values; testimonials (off until real ones exist).
- Copy pass: **Lane B drafts the wording (three directions, in a picker page), recommends one with a short reason, the owner
  edits it, then Lane B applies it** (the recommendation is standing, owner B-052). Steps 1-2 (COPY_BRIEF.md, COPY_MAP.md) are
  agreed. Steps 1-3 are final (COPY_BRIEF.md). Step 4, page by page: the whole home page is done (B-055, B-056, B-058); the FAQ page is done too (B-060), then Gaming PCs and listing pages, Custom Builds, Contact, About, Gallery, Part Boxes, 404. Small things noticed go on the polish list in COPY_REVIEW.md, handled after the rewording. Delivery fee left
  unstated; say if a page should name one.

## Do not touch
- Site copy wording goes through the copy pass (Lane B; the owner approves every wording); Lane A does not reword copy.
  While applying copy, Lane B may make small markup/CSS changes when necessary or very helpful (owner, B-049) and says
  so in the log; anything larger or purely visual goes to Lane A.

## Doc map
- **LOG.md**: newest ~10 completed chunks, newest last. **docs-archive/**: frozen history (grep, never read in full):
  DECISIONS.md (D1-D43; code comments cite "DECISIONS.md D##"), PROJECT_STATUS.md, TODO.md, CHANGELOG.md,
  LOG-<first>-<last>.md (rolled-over log entries, by ID range), START_HERE-through-A-031.md, VISUAL_REDESIGN-desktop-pass.md,
  VISUAL_REDESIGN-mobile-pass.md (M1-M6, backlog, walk findings).
- **VISUAL_REDESIGN.md**: live design process, scope, open findings (Lane A); mobile pass (M1-M6) archived.
- **ARCHITECTURE.md**: stack and structure. **MAINTENANCE.md**: owner guide. **COPY_REVIEW.md**: text audit and rewrite plan. **COPY_BRIEF.md**: message brief. **COPY_MAP.md**: every text spot and its job.
- **TESTING.md**: how to run `smoke-test.js`, `visual-check.py` and the Impeccable scan, sandbox limits (npm registry,
  fonts, browsers) and widths covered. Read it before running or reporting a test. Never claim a test passed unless it ran.
