# VISUAL_REDESIGN.md — North Bridge PCs Visual Reconsideration

A full reconsideration of the site's visual system (color, typography,
component treatment), run as a collaborative, one-decision-at-a-time
process rather than an independent redesign. This is a separate effort
from the original ground-up rebuild — see PROJECT_STATUS.md,
DECISIONS.md, ARCHITECTURE.md, and CHANGELOG.md for that history. Those
files describe the site as it was already shipped; this file describes
an in-progress reconsideration of parts of it, decision by decision.
Nothing in here should be treated as final until it's both approved and
implemented — check each entry's own status.

## How this process works

- One visual decision at a time: 2-3 genuinely different options, each
  shown as a real rendered mockup (actual fonts/colors/measurements,
  not just described), tradeoffs explained, one recommended with
  reasoning — then stop for the owner's choice before implementing.
- The owner may mix options across decisions rather than adopting one
  whole package — e.g. Option A for layout, Option C for color.
- Small details that clearly follow from decisions already approved get
  a recommendation + confirmation ask, not a full 3-option menu.
- Desktop first (finished at A-030: every page walked). Mobile and tablet come
  next, based on the desktop decisions but not a direct copy of them; the
  working backlog is "Mobile and tablet pass — backlog" below.
- Real content is used throughout — real builds, real photos, real
  copy — not lorem ipsum or placeholder data.
- Every approved decision gets implemented immediately (in the real
  project files, verified with smoke-test.js and a real screenshot)
  before moving to the next one — this file is a record of what's
  actually been done, not a proposal backlog.
- Options may be shown as screenshots or, if that works better, as
  published artifacts (owner said so, 2026-10-06). Either way they must
  be rendered from the real page CSS with real content and fonts.
- Building option artifacts: what worked and what bit (A-006 to A-030).
  Capture the REAL rendered markup from the page in a browser rather than
  hand-writing it, and inline the real CSS (drop the Google Fonts `@import` and
  use a `<link>` to it; a published page may load fonts from
  fonts.googleapis.com and scripts from a short list of hosts only). Put photos
  in as `data:` URIs, set once from a single script array rather than per tag
  (16 MB file limit; downscale to about 600px). Make forms inert (no `action`,
  no hidden fields, `onsubmit="return false"`). Never write a literal `<tag>` in
  description text: it becomes real markup (once it nested every option inside
  the header bar). Show every context a shared component appears in (gallery
  page AND homepage preview, FAQ page AND homepage preview), because an artifact
  cannot show everything: a grid parent (the notify card came out 361px wide
  instead of full width), real font loading, or hover and focus (force those
  with a class). In the sandbox, route fonts.googleapis.com to a local
  `@font-face` stylesheet (see START_HERE Tests) and wait for `document.fonts.ready`
  before measuring; late-loading web fonts once changed a `<select>`'s height.
  Always re-measure the REAL page after implementing: the artifact is not the
  product. Put measured numbers in the option descriptions, and say plainly when
  a first-draft claim turned out wrong. Publish with the recommended option
  tagged; a live artifact with a little JavaScript is fine.

## Reference directions explored — NOT fixed themes

These came up earlier in the process as exploratory comparisons. None
of them are approved as a complete package — the owner was explicit
that every visual property is being decided individually, and these
names may still come up as shorthand for a particular look, but no
page should be redesigned wholesale to match one of them.

- Rejected outright as literal accent-color swaps: **Copper**
  (`#D47A3F` / `#A95128`), **Terracotta** (`#D65F45` / `#A94131`) — do
  not suggest either again.
- 3 cohesive header+hero directions explored: **Machined Brass** (muted
  warm brass/bronze), **Signal Teal** (cool patina teal), **Quiet
  Signal** (near-monochrome, one sparing spot accent). Quiet Signal was
  called the strongest conceptual foundation (restraint as the
  organizing idea), which is why later exploration leaned on it, but it
  was never approved as a literal package either.
- 3 accent variations explored within the Quiet Signal concept:
  **Oxide**, **Verdigris**, **Cask**. The exact hex values recalled
  from that earlier session (`#8C4A3A` rust-red, `#3E6B5C` patina
  green, `#6B3E52` wine/aubergine) were checked for contrast in this
  session — all three fall below 3:1 against the card background, too
  dark to work as the left-edge accent border decisions 7/8 rely on,
  and all three would need white button text instead of amber's dark
  text (see decision 14 for the full readout). Owner opted to try
  adjusted values picked from the same descriptions instead: **Oxide**
  `#ad4a2a` (white button text; edge contrast passes but thin, 3.23:1),
  **Verdigris** `#4c9a82` (dark button text, same pattern as amber;
  passes cleanly everywhere), **Cask** `#8b3f5e` (white button text;
  edge contrast still fails at 2.53:1 — would need a lighter
  edge-specific tint if chosen). These adjusted values are the active
  candidates for decision 14.
- Signal Teal, Verdigris, and Cask were then rendered across a build
  card and a full build-detail page as reference comparisons. Accent
  color itself is still an open, unmade decision — see the "still to
  decide" list below.

## Scope notes

- **services.html was removed (LOG.md B-003).** Nothing to redesign there.
  The contact page's situation picker has 5 options (ruled rows since
  A-009; see "Contact page" below).
- **build-detail page is complete** (all 15 decisions made) and **home
  page is complete** (all 9 decisions made) — see below for both.
  **custom-build page is complete** (see below) apart from deferred
  items (tier-card rule alignment at tablet widths; the final CTA box's
  kicker label waits for the copy pass) and the two sitewide scan
  findings (`gpt-thin-border-wide-shadow`, `layout-transition`).
  **contact page is complete** (see below): situation picker, form
  panel width/placement, shared form fields and the success states are
  done; only the hero copy waits for the copy pass. **part-boxes.html is
  complete** (portrait photo cards, quantity picker and order confirmation
  done, see below; the order summary panel was already ruled rows with the
  approved field styles and needed nothing; copy items are in
  COPY_REVIEW.md). **about.html is complete** (the story section is
  done, see below). **gallery.html is complete** (photo tile shape, sub-heading
  alignment, homepage preview and the empty "Current Builds" section are
  done, see below; its mobile items are collected under "Mobile and tablet
  pass — backlog"). **faq.html is complete** (the accordion, see below).
  **Every page has now been walked at desktop width (A-030).** What remains
  is the mobile and tablet redesign (see "Mobile and tablet pass — backlog")
  and Lane B's copy pass.
- **Build system, found while starting the hero decision — read this
  before editing any page's HTML content:** this site has a source/
  output split. `pages-src/<page>.html` is the real source (with
  placeholder markers like `<!--SEO-->`, `<!--ANALYTICS-->` and a
  shared header/footer not yet inlined); `build-tools/stitch.py`
  assembles those into the actual `<page>.html` files at the repo
  root, which is what ships. Confirmed by diffing `index.html` against
  `pages-src/index.html`: identical body content, different only in
  the stitched `<head>`/header/footer. **Content edits belong in
  `pages-src/`, then run `python3 build-tools/stitch.py` to regenerate
  the root file — editing the root HTML directly works until the next
  stitch run silently discards it.** This wasn't relevant for the
  build-detail page's decisions (all CSS-only, no markup changed), but
  the hero decision below and most of the rest of the home page list
  involve real markup changes, so this matters from here on.

## Sitewide decisions (not scoped to one page)

### 9. Button treatment — DONE (applies everywhere, not just build-detail)
Flagged before implementing: unlike the badge, buttons render
identically on every page (hero, nav, forms, footer), so this was
decided as a sitewide change rather than page-scoped — owner didn't
object, proceeded on that basis.

Two changes, applied to every solid-fill accent control
(`.btn-primary`, `.back-to-top`, `.nav-cta` including its `.active`
state):
1. Flat neutral shadow (`var(--shadow)` / `var(--shadow-lg)`) instead
   of a colored glow — same depth language the cards already use.
2. Hover (and `.nav-cta.active`, which used the same mechanism despite
   not being a hover) now brightens the existing fill
   (`filter: brightness(1.12)`) instead of swapping to a second,
   darker fill color.

**Why change 2 matters beyond style:** the old swap-to-a-second-color
hover is exactly what caused the text-contrast failures found while
testing Copper and Terracotta earlier in this process — dark text can
pass WCAG on one shade of an accent and fail on a darker shade of the
same accent, depending on the specific hue (see those two rejected
tests). Brightening the same color instead of introducing a second one
sidesteps that structurally, for whatever accent color eventually gets
picked.

**Implemented:**
- `css/style.css` — `.btn-primary`, `.btn-primary:hover`,
  `.back-to-top`, `.back-to-top:hover`, `.nav-cta:hover`,
  `.nav-cta.active`.
- `css/theme.css` — removed the now-redundant box-shadow override
  block (style.css uses neutral tokens now, so there's nothing
  theme-specific left to override); simplified the dark-text contrast
  comment since there's no longer a second, separately-verified darker
  background state to swap to.

**Found along the way, not something being looked for:** hovering
`.nav-cta` showed a text underline that had nothing to do with this
decision — a global `a:hover { text-decoration: underline; }` rule
(`css/style.css` ~line 50) was leaking through because `.nav-cta`
never explicitly reset `text-decoration` the way `.nav-link` already
did. Same root cause turned out to affect the shared `.btn` base class
too (used by every button sitewide — primary, secondary, ghost, in
every size), not just `.nav-cta`. Both fixed with
`text-decoration: none !important` — `!important` is required in both
cases because `a:hover` (element + pseudo-class) outranks a plain
class selector on specificity, so a non-important override loses even
though it comes later in the file. Verified against `.btn-primary`,
`.btn-secondary`, and `.nav-cta` hover states directly with real
screenshots after the fix.

## Open design findings (Impeccable scan)

Still open as of B-032. The resolved findings (`side-tab`, `low-contrast`) are in the archive.

### Impeccable scan — new findings, pending a decision
Running the detector (owner-permitted, not required, to use again in
future sessions) against the actual built site (all pages + `css/`,
not `pages-src/`, so stylesheets actually resolved) surfaced real
findings beyond the gradient question it was asked about. Two quick,
unambiguous ones fixed immediately (format: dead CSS/undersized text,
not a design call):
- **`.brand-tagline` was 9.92px** (`0.62rem`), under the ~11px
  legibility floor for functional text. Bumped to `0.7rem`, matching
  `.brand-sub`; relies on `--dim` vs `--muted` to keep some
  size-independent hierarchy between the two lines. `css/style.css`.

### `gpt-thin-border-wide-shadow` — PARTIALLY ADDRESSED, not confirmed resolved
A 1px hairline border paired with a wide/diffuse shadow
(`var(--shadow-lg)`, 25px blur) on hover — Impeccable's own description
calls this "a recurring generated-UI signature." Confirmed by code
audit (not just the detector) that exactly three components had both a
resting hairline border and this exact hover shadow: `.build-card`,
`.tier-card`, `.gallery-item`. Other `--shadow-lg` uses
(`.btn-primary`, `.back-to-top`, the gallery lightbox) don't have a
matching border, so they don't fit the pattern; `.nav-dropdown-menu`
does have both, but it's a static always-shown popover shadow, not a
hover effect, and a floating menu panel conventionally earns an
elevation shadow in a way a grid-card hover-glow doesn't — left that
one alone deliberately, not yet discussed with the owner.

Tried to verify alternatives against the real detector the same way
side-tab was verified, and it didn't work this time: isolated mockups
of the exact current (known-flagged) recipe came back clean even with
a realistic 3-card grid and real images, suggesting this rule
(its name literally contains "gpt") may be judged more holistically
against a full real page than as an isolated, deterministic CSS-pattern
match the way `side-tab` was. Implemented anyway on reasoning alone:
removed `box-shadow: var(--shadow-lg)` from all three hover rules,
kept the border-color shift and lift/scale, cleaned up each one's now-
unnecessary `box-shadow` transition component. `css/style.css`.
Verified safe with `smoke-test.js` (all checks pass).

**Re-scanning the real built site afterward still shows 9 instances,
unchanged from before the fix**, all the identical snippet text
("1px border + 25px shadow blur") across all 9 pages — consistent
with this now being entirely the `.nav-dropdown-menu` popover (present
on every page via the shared header partial), but **not confirmed**
with a live-browser pinpoint check the way the low-contrast bug was.
Don't take this as "resolved" — the card-hover shadows are gone and
verified safe, but whether that was the only thing the detector was
actually flagging is unconfirmed. Next session: either confirm the
dropdown is the remaining source and decide whether to touch it too,
or investigate further if it turns out to be something else.

### `layout-transition` — FAQ accordion DONE (A-030); two places remain
**Update (A-030):** the FAQ accordion item below is done: it now reveals with
`grid-template-rows: 0fr -> 1fr` instead of animating `max-height` to 600px
(see "FAQ page"). The mobile nav submenu and the page-load progress bar are
still not started. The design scanner has not been re-run, so whether it
still flags a grid-rows transition is unknown. Original notes follow.

`transition: width` (page-load progress bar) and `transition:
max-height` (mobile nav submenu, FAQ accordion) can cause layout
thrash; investigated but didn't implement anything. Findings so far,
picked back up from here:
- Mobile nav submenu (`css/style.css`, `.mobile-nav-submenu`, ~line
  487): converting to the `grid-template-rows: 0fr → 1fr` technique
  would need a markup change first — `js/partials/header.html`'s
  `#forsale-mobile-menu` has three `<a>` tags as direct children, and
  that technique needs them wrapped in a single inner div for the row
  to clip correctly.
- FAQ accordion (`css/style.css`, `.faq-answer`, ~line 1291): same
  technique, but no markup change needed — `js/render/faqList.js`
  already wraps the answer content in `.faq-answer-inner`, so the grid
  trick can apply directly to the existing structure. Current approach
  uses a hardcoded `max-height: 600px` guess, which also risks clipping
  any future answer longer than that.
- Page-load progress bar (`css/style.css`, ~line 1765,
  `transition: width`): not yet looked at.
No code touched for any of these three — current behavior is exactly
as it was before this session.

## Closed desktop-pass records (archived)

The page-by-page decision records of the desktop redesign (build-detail, home, custom-build, contact, part-boxes,
about, gallery, faq) were moved verbatim to `docs-archive/VISUAL_REDESIGN-desktop-pass.md` in B-032. Code comments
that cite "home decision 7" or "build-detail decision 14" point there. Grep it; do not read it in full. Index:

**Build-detail page**
- 1. Overall layout — DONE
- 2. Main photo treatment — DONE
- 3. Title sizing/hierarchy — DONE, no change
- 4. Price presentation — DONE
- 5. Availability badge — DONE
- 6. Specifications layout — DONE, no change
- 7. Performance section — DONE
- 8. Inquiry form — DONE
- 10. Borders (general, sitewide within this page) — DONE, no change
- 11. Backgrounds (general) — DONE, no change
- 12. Spacing — DONE, no change
- 13. Typography — DONE, Option B implemented
- 14. Accent color — DONE, Cask implemented (sitewide)
- 15. Hover/focus states — DONE, no change
**Home page**
- 1. Hero — APPROVED, IMPLEMENTED
- 2. Section-header pattern — APPROVED, IMPLEMENTED
- 3. Available Systems (build card grid) — APPROVED, IMPLEMENTED
- 4. Evidence section (checklist rows, numbered marks) — DONE, no change
- 5. Custom Builds section (two-col layout, budget table) — DONE, no change
- 6. Gallery preview section — DONE, no change
- 7. FAQ preview section — DONE, no change
- 8. Contact CTA section — DONE, no change
- 9. Section rhythm/spacing — DONE, no change
**Custom-build page**
- Section-header pattern rollout — mechanical, not a fresh decision
- Open items — RESOLVED
- `side-tab` — RESOLVED
- `low-contrast` — RESOLVED
- Tier-card feature lists — APPROVED (Option B), IMPLEMENTED
- Process section left column — APPROVED (Option A), IMPLEMENTED
- "Not Sure" section layout — APPROVED (Option A), IMPLEMENTED
**Contact page**
- Situation picker — APPROVED (Option B), IMPLEMENTED, class renamed
- Form panel width and placement — APPROVED (Option A), IMPLEMENTED
- Privacy-note margin fix extended to the root rule — APPROVED, IMPLEMENTED
- Form fields — resting boundary and focus — APPROVED (Option A), IMPLEMENTED
- Success states — APPROVED (Option B), IMPLEMENTED
**Part-boxes page**
- Portrait photo cards — APPROVED (Option B), IMPLEMENTED
- Light mode — none; `--success` pinned
- Quantity picker and order confirmation — APPROVED, IMPLEMENTED
**About page**
- Story section layout — APPROVED (Option A), IMPLEMENTED
**Gallery page**
- Photo tile shape — APPROVED (Option B), IMPLEMENTED
- Homepage preview: 5 photos on desktop — APPROVED, IMPLEMENTED
- Empty "Current Builds" — APPROVED (Option A), IMPLEMENTED
**FAQ page**
- Accordion — APPROVED (Option B), IMPLEMENTED

## Mobile and tablet pass — backlog
Collected during the desktop-first walk. Nothing here is decided or changed;
the owner asked to note these now and handle them in the mobile redesign.

1. **iPhone Plus / Pro Max see grids where smaller iPhones see a stack (owner
   observation, 2026-10-11, Safari responsive design mode).** Confirmed by
   measurement. The only small-screen breakpoint that falls between common
   iPhone widths is `@media (max-width: 420px) { .gallery-grid { grid-template-columns: 1fr } }`
   in `css/style.css`. Column counts for the gallery grid and the homepage
   preview (same `.gallery-grid`): 1 column at 320, 375, 390 and 393px (iPhone
   SE, mini, 12-15, 14/15 Pro); 2 columns at 428 (Plus / 12-13 Pro Max), 430
   (14-16 Pro Max), 480 and 600px. Other grids measured at the same widths
   (builds grid, part-box grid, custom-build tier cards, home builds grid) are
   1 column at all of them, and the only other rules at 480px and below are
   part-boxes' card photo column (110px at 480 and below, 96px at 380 and
   below), which do not split the 390-430 range. The owner reports similar
   problems "in other places like the gallery"; those were not identifiable
   from the CSS alone, so walk 390 against 430 side by side, page by page.
2. Gallery grid at 420px and below: one column of 342x456 tiles, 10,452px for
   22 photos on a 390px phone (about 8,000px with squares). 2 columns on small
   phones is an option (and would also address item 1).
3. Homepage preview: at 421-699px its 3 visible tiles sit in 2 columns, so one
   is alone on the second row; at 420px and below 3 tall tiles are 1,408px.
   Its lightbox still lists all 5 photos on a phone.
4. Tier-card rules on custom-build at tablet widths: the top rules of the
   three cards line up at 1440 and 1024px but are 24px apart at 768px (one
   description wraps to 4 lines, another to 3); a robust fix would be CSS
   subgrid (see the custom-build "Tier-card feature lists" subsection).
5. Contact situation picker at 640px and below: the two button widths differ
   (148px and 196px) because they size to their text.
6. Part-boxes at 360px and 320px: the price + quantity row wraps to two lines
   (price above the picker) because there is no room beside a photo; tidy, but
   a mobile-specific card layout may do better.
7. Gallery grid with few photos (any width): see the note above.
8. Tooling: `visual-check.py` only checks 1440, 768 and 390px (overflow only), so
   it never sees 428-430px or small phones; add at least 320, 375, 393, 428, 430
   and probably 600, 820 and 1024. Baseline (A-031, ad hoc, real Chromium): no
   horizontal overflow and no script errors on all 10 pages at 320, 360, 375, 390,
   393, 412, 428, 430, 480, 600, 700, 768, 820 and 1024px. Only Chromium is
   available in the sandbox; Safari behaviour (the owner uses its responsive
   design mode) needs the owner's eyes.

## Outstanding, not scoped to one page

(none — see "Sitewide image-opacity fix, extended" below.)

- (The part-box photo framing item listed here was implemented in A-021; its original text is in
  `docs-archive/VISUAL_REDESIGN-desktop-pass.md`.)

## Sitewide image-opacity fix, extended

The `onload`/`.loaded`-gated opacity bug found and fixed on
`buildCard.js` during home page decision 3 turned out to exist
identically in three more places. Owner asked for all three to get the
same fix. Not a design decision — a correctness fix, included here
because it was found during the visual redesign process and touches
the same components.

**Fixed:**
- `js/render/partBoxCard.js` + `css/part-boxes.css` (`.box-image img`)
  — part-boxes.html's box photos. No real photos exist in the current
  dataset (`js/data/partBoxes.js` — every entry has an empty
  `images: []`) so this couldn't be visually verified against a real
  image, but the change is mechanically identical to the other three
  and confirmed correct by inspection (attribute removed, no opacity
  gate left in the CSS).
- `js/render/galleryGrid.js` + `css/style.css` (`.gallery-item img`)
  — gallery.html's grids. **Found along the way:** `css/style.css` had
  two separate `.gallery-item img` blocks — one already clean (no
  opacity gating, ~line 1151), and a second, later one (~line 1711)
  that carried the `opacity: 0`/`.loaded` bug. Because the file
  cascades in source order and both are equal specificity, the later
  block was silently winning for `opacity` even though a correct
  definition already existed earlier in the same file. Removed the
  second block outright rather than just de-gating it, since the first
  already covers everything it did, hover-zoom transition included.
- `js/render/buildDetail.js` + `css/build-detail.css`
  (`.gallery-main-img`, both the `<img>` and `<video>` cases) —
  build.html's **main product photo/video**, the single most
  consequential instance of this bug on the site. Also removed the
  now-unnecessary `video.gallery-main-img.active { opacity: 1; }`
  override and its comment, since every case defaults to visible now
  and there's nothing left for that rule to correct for.

Verified with `smoke-test.js` (all checks pass) and real-browser
screenshots of gallery.html and build.html — both fixed components
confirmed at `opacity: 1` with no `.loaded` class and no
`onload`/`onloadeddata` attribute present at all.
