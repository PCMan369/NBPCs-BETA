# START_HERE.md — North Bridge PCs website

Read this first, then the last few entries of LOG.md. Read other docs only
when the doc map (bottom) says to. Last updated: A-041 (2026-10-14).

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

## Current state (as of A-041)
- V1 build is complete (history D1-D43 in docs-archive/DECISIONS.md). Services were removed (B-003, B-004); the old
  services.html URL returns the 404 page. All builds are sold, so the site shows its no-inventory states. Dark only, no
  light mode (A-022); the `--success` token stays.
- **Visual redesign.** Live record: VISUAL_REDESIGN.md (closed desktop decisions: docs-archive/VISUAL_REDESIGN-desktop-pass.md,
  indexed in the live file). Accent is "Cask" `#8b3f5e` sitewide. Every page walked at desktop width (A-030). Home,
  build-detail, about, gallery and faq done;
  contact done apart from hero copy; part-boxes apart from copy items (COPY_REVIEW.md); custom-build apart from one
  item (the final CTA box's kicker label, for the copy pass).
- **Built pieces that constrain new work:**
  - Forms: field border `--border-field`; focus one solid 2px accent edge (A-012). Contact, builds notify box,
    build-detail form and part-boxes order confirmation share one `.success-state` card (A-013, A-023).
  - Accent text on the accent tint (active nav, FAQ icon, part-box chip): `--accent-text-tint` (A-039).
  - Form fields are 16px on touch screens (`pointer: coarse`); smaller makes iOS Safari zoom on focus (A-041).
  - Contact picker: `.situation-picker` / `.situation-option` in `css/situation-picker.css` (A-009); buttons all 200px
    wide, also on phones (A-034).
  - FAQ: ruled rows, buttons in the h2s, `grid-template-rows` reveal (A-030; supersedes home decision 7).
  - Gallery: tiles 3:4 `object-fit: contain` (A-027); homepage preview 5 photos on desktop, 3 below 700px (A-028); empty
    "Current Builds" hidden until `currentBuilds` in `js/data/gallery.js` has a photo (A-029). Below 700px: 2 columns,
    first photo full width, a lone last tile full width (A-033, `css/theme.css`).
  - Part-boxes: 12 boxes, one portrait photo each (`images/box-NN.jpg`); horizontal cards, two per row when the grid is
    at least 780px wide (A-021); at 389px and below a two-row card with a full-width footer (A-036).
- **Checks at A-041:** `visual-check.py` (10 pages x 15 widths, Chromium): no overflow or script errors;
  `smoke-test.js` passed in Lane A's sandbox; Impeccable: 0 findings, 0 advisories.

## Next up
**Lane A:** the mobile and tablet redesign (owner, 2026-10-13). Findings: VISUAL_REDESIGN.md, "Mobile and tablet pass —
backlog" (all 8 items done) and "Open design findings" (A-038 re-scan: thin-border and layout-transition no longer
reported; the 4.2:1 advisory, the lightbox `broken-image` and `--accent-h` were closed in A-039/A-040; the detector is
clean). Mobile walk (owner, iPhone 8 Safari): all fine except the form-focus sideways scroll, fixed in A-041; owner to
re-test it on the phone (VISUAL_REDESIGN.md, "Mobile walk findings").
**Lane B:** the copy pass (see Owner queue); the domain-swap checklist (`SITE.url`, Search Console, GitHub Pages custom
domain), which can wait because the owner cannot afford a domain yet.

## Owner queue (waiting on you)
- Medium term, not blocking (owner, 2026-10-09): a hero image (several PCs or the building setup); a real domain plus
  phone/Facebook values; testimonials (off until real ones exist).
- Copy pass (can start now): facts answered in COPY_REVIEW.md, "Owner answers". Owner rule: reword only if misleading.
  Still to decide: fix the two items that look misleading (pickup is described as at the owner's address but is usually
  meet-in-the-middle, paid delivery possible; the site never says parts are used) and the wrong/contradictory items in
  COPY_REVIEW.md Part 1 A.

## Do not touch
- Site copy wording goes through the copy pass (Lane B, owner rule "reword only if misleading"); Lane A does not reword
  copy. The copy pass changes words only, never CSS, markup structure or layout (Lane A's).

## Doc map
- **LOG.md**: newest ~10 completed chunks, newest last. **docs-archive/**: frozen history (grep, never read in full):
  DECISIONS.md (D1-D43; code comments cite "DECISIONS.md D##"), PROJECT_STATUS.md, TODO.md, CHANGELOG.md,
  LOG-B001-A022.md, LOG-A023-A027.md, LOG-A028-A029.md, START_HERE-through-A-031.md (old per-chunk state narrative), VISUAL_REDESIGN-desktop-pass.md.
- **VISUAL_REDESIGN.md**: live design process, scope, open findings, mobile backlog (Lane A).
- **ARCHITECTURE.md**: stack and structure. **MAINTENANCE.md**: owner guide. **COPY_REVIEW.md**: text audit for the copy pass.
- **TESTING.md**: how to run `smoke-test.js` and `visual-check.py`, sandbox limits (npm registry, fonts, browsers) and
  widths covered. Read it before running or reporting a test. Never claim a test passed unless it ran.
