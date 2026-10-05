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
- Desktop first. Mobile comes after, based on the desktop decisions but
  not a direct copy of them.
- Real content is used throughout — real builds, real photos, real
  copy — not lorem ipsum or placeholder data.
- Every approved decision gets implemented immediately (in the real
  project files, verified with smoke-test.js and a real screenshot)
  before moving to the next one — this file is a record of what's
  actually been done, not a proposal backlog.

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

- **services.html will be removed by the owner.** Do not redesign it —
  skip it entirely in this process.
- **build-detail page is complete** (all 15 decisions made) and **home
  page is complete** (all 9 decisions made) — see below for both.
  **Current component: the custom-build page** (`custom-build.html`) —
  section-header rollout done, 4 open items pending (see below).
  Still unwalked: about.html, gallery.html, faq.html, contact.html,
  and part-boxes.html (though several of their shared components were
  already touched indirectly via the home page's decisions 4-8
  reviews).
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

## Build-detail page — decisions made so far

### 1. Overall layout — DONE
Asymmetric split instead of an even `1fr/1fr` — content column wider
than the photo (`0.8fr`/`1fr`), thin vertical divider between columns
instead of a bare gap, photo stays sticky.
**Implemented:** `css/build-detail.css` (`.listing-layout`,
`.listing-gallery`, `.listing-details`, and the 900px breakpoint reset
so the divider/padding don't leak into the not-yet-redesigned mobile
layout).

### 2. Main photo treatment — DONE
Real product photos are shot portrait (checked the actual files: all
1350×1800, a 3:4 ratio) — the old forced 1:1 crop was cutting real
content off every listing. Taller 3:4 crop, same 18px rounded corners
as the rest of the site.
**Implemented:** `css/build-detail.css` (`.gallery-main`).
**Owner note:** photos will continue to be taken portrait going
forward — design around that assumption elsewhere too (e.g. the
homepage build cards and the gallery page, not yet revisited).

### 3. Title sizing/hierarchy — DONE, no change
Kept as-is (1.6rem, weight 800, no kicker label) — already using the
correct heading font (`<h1>`, inherits Bricolage Grotesque), already
appropriately bold, doesn't compete with the price row below it. No
real problem identified worth fixing.

### 4. Price presentation — DONE
Freed from the bordered-card treatment it previously shared with the
specs and performance cards, despite being the single number that
actually drives the buying decision. Larger (3rem), standalone;
pickup location dropped to a small caption underneath instead of
sitting beside it.
**Implemented:** `css/build-detail.css` (`.listing-price-row`,
`.listing-price`, new `.listing-pickup-note`), `js/render/buildDetail.js`
(price/pickup markup restructured).

### 5. Availability badge — DONE
Quiet treatment — small square dot + text, no pill background/border.
**Implemented:** `css/style.css` (new `.badge-quiet` modifier, added
alongside the existing `.badge`/`.badge-available`/`.badge-sold` rules
rather than changing them, so it can be opted into per-page).
`js/render/buildDetail.js` (both badge instances — the header badge and
the sold-notice badge — now include `badge-quiet`).
**Important scoping note:** the homepage/listing-card badges rendered
by `js/render/buildCard.js` deliberately do NOT have this class and
still use the original filled-pill look — verified with a real
screenshot. Don't add `.badge-quiet` there without a separate decision
for that component.

### 6. Specifications layout — DONE, no change
Kept as-is (card container, divider line per row). Reasoning recorded
here since it goes against the pattern of the last two decisions:
specs are genuinely tabular, related data, and a bounding card does
real grouping work for that — this isn't the same situation price and
the badge were in, so the same "remove the box" instinct doesn't
automatically apply. No problem identified worth fixing.

### 7. Performance section — DONE
Background/border now match the specs card exactly (neutral) instead
of the old full amber tint. A thin left-edge rule in `var(--accent)`
carries the "this section is called out" signal instead of a full
color wash — performance/fps data is genuinely more persuasive/
important than a plain spec row, so *some* distinction is earned, just
not as heavy as before.
**Implemented:** `css/build-detail.css` (`.listing-perf-card`).
**Technical note:** the old version used hardcoded
`rgba(242,167,27,...)` values rather than tokens, so it would not have
followed a future accent-color change automatically either way. The
new left-edge rule uses `var(--accent)`, so it will.

### 8. Inquiry form — DONE
Form card border goes neutral, with the same left-edge accent rule
used on the performance card — reusing one consistent "pay attention
here" device rather than each region inventing its own. Bundled into
the same decision: the "Asking about" confirmation badge inside the
form is now fully neutral, matching the background/border of the
form-input fields directly below it, so it reads as part of the same
quiet form surface instead of its own highlighted chip.
**Implemented:** `css/build-detail.css` (`.listing-form-card`,
`.listing-system-badge`).
**Scoping note:** the actual input fields/labels/focus-ring/privacy
text (`.form-input`, `.form-label`, `.form-privacy` in `css/style.css`)
are shared with the contact page and were deliberately left untouched
— that's a separate future decision, not part of this one.
**Found along the way:** the EliteBook's "Good To Know" condition/notes
card (`conditionHtml` in `js/render/buildDetail.js`) reuses
`.listing-specs-card` directly, so it was already covered by decision
6 (kept as-is) with no extra work needed.

### 10. Borders (general, sitewide within this page) — DONE, no change
Compared three real-rendered options for the base card border used by
the specs/performance/form cards: **A** current 1px `var(--border)`
hairline (unchanged); **B** fully borderless, separation from
background fill + shadow alone; **C** the current hairline plus a
faint inset top highlight for a little more tactile depth. Approved
**Option A** — kept as-is. Reasoning: Option B would have quietly
undercut decision 6's own already-recorded logic that the specs
card's tabular data genuinely earns a bounding edge; rather than
re-litigate that silently, flagged the tension and the owner chose to
keep the edge. Option C was judged too marginal to be worth the extra
rule for what it adds.
**Implemented:** no code change — `css/build-detail.css`'s existing
`.listing-specs-card`, `.listing-perf-card`, `.listing-form-card`, and
`.listing-system-badge` border rules already match.

### 11. Backgrounds (general) — DONE, no change
Compared three real-rendered fill options, holding decision 10's
border constant: **A** current flat solid `var(--card)` fill
(unchanged); **B** a subtle top-lit gradient (`--card-lift` to
`--card`) for a touch of bevelled-panel depth; **C** no distinct card
fill at all — same tone as the page, border alone defining the box.
Approved **Option A** — kept as-is. Reasoning: B would introduce the
first gradient anywhere in the card system for a genuinely marginal
gain; C is defensible but has sitewide implications (photos,
thumbnails, and badges all assume a card tone distinct from the page)
that go beyond this one page-scoped decision, so it wasn't worth
opening here.
**Implemented:** no code change — `css/build-detail.css`'s existing
`background: var(--card)` on `.listing-specs-card`, `.listing-perf-card`,
and `.listing-form-card` already matches.

### 12. Spacing — DONE, no change
Compared three real-rendered rhythms, holding decisions 10 & 11
(Option A) constant: **A** current 1.5rem section gap / 1.25rem card
padding; **B** tighter, 1rem / 0.9rem, denser spec-sheet feel; **C**
airier, 2rem / 1.5rem, more breathing room. Approved **Option A** —
kept as-is. Reasoning: the existing rhythm already does intentional
work — card padding steps up specifically on the form card (1.5rem vs
1.25rem) to signal it's the one action to take, and B would flatten
that contrast while C would add dead space on a page whose job is
fast comprehension toward a purchase decision.
**Implemented:** no code change — `css/build-detail.css`'s existing
`.listing-details` gap and card padding values already match.

### 13. Typography — DONE, Option B implemented
Compared three real-rendered approaches, holding decisions 10–12
constant: **A** current, Manrope everywhere except the Bricolage
Grotesque `<h1>` title, no mono anywhere on this page; **B** mono
touch — price and spec/performance values switch to Space Mono
(already used sitewide for technical content — budget tables,
evidence rows), labels and title unchanged; **C** full mono technical
block — specs/performance card entirely mono, labels included, price
too. Approved **Option B**. Reasoning: extends a device the site
already has in its vocabulary to content that's genuinely technical
(CPU model, RAM speed, fps) without touching the parts of the page
doing attention-hierarchy work (labels, title, price weight). C was
judged a bigger shift worth revisiting later against more builds,
since Space Mono's max weight (700, vs the current 900) would soften
the price specifically.
**Implemented** in `css/build-detail.css`:
- `.listing-price` — added `font-family: var(--font-mono)`, weight
  900 → 700 (Space Mono's heaviest available)
- `.listing-spec-value` — added `font-family: var(--font-mono)`,
  weight 500 → 400
- `.listing-perf-item` — added `font-family: var(--font-mono)`
Space Mono 400/700 already loaded sitewide via `theme.css`'s
`@import`, so no new font request. `smoke-test.js` is DOM/structural
only (jsdom not installed this session) — not relevant to a
font-family-only change, so not run.

### 14. Accent color — DONE, Cask implemented (sitewide)
This decision is sitewide, not page-scoped, same as decision 9 —
`--accent` and its family live in `theme.css`'s `:root`, loaded on
every page.

Compared amber (current) against the three Quiet Signal variations
using real WCAG-checked values (the exact hex recalled from the
earlier session — Oxide `#8C4A3A`, Verdigris `#3E6B5C`, Cask
`#6B3E52` — all failed the 3:1 non-text minimum against `--card` and
needed white button text instead of amber's dark text; adjusted
working values were used for the actual comparison and decision).
**Approved: Cask, `#8b3f5e`, with white button text.** Chosen over
Oxide/Verdigris specifically because it's the only one of the three
with no hue overlap with the site's existing semantic colors
(`--danger` red for sold, `--success` green for available) — Oxide
sits close to danger's red family, Verdigris close to success's
green family. Distinctiveness against competitor PC-shop branding
(red/blue/green is near-universal in the category) was the secondary
reason.

**Full token family** (`theme.css` `:root`):
- `--accent` / `--accent-h`: `#8b3f5e` (Cask's base — kept equal, same
  pattern as amber; no separate darker shade needed since white text
  already clears 7.07:1 on the base value)
- `--accent-text`: `#ae798e` (30% lighten, ~5:1 against `--card`) —
  see note below on why this token now carries more weight than it
  did under amber
- `--accent-2`: `#cba9b7` (gradient-endpoint tint, `.load-progress`)
- `--accent-h2`: `#763650` (still unused/dead code, kept in sync for
  whenever it might be)

**The scope turned out to be much bigger than "one edge needs a
lighter tint."** Amber's base value happened to be light enough
(8.8–10.7:1) to work as *both* a solid fill (with dark text) *and* as
thin foreground content — borders, outlines, small text/icons —
directly. Cask's base value only reaches 2.1–2.9:1 against
`--card`/`--bg`, which is fine for a solid button fill with white
text but fails everywhere it was being used as a border, outline, or
small piece of text. A full sitewide sweep of every direct
`var(--accent)` usage turned up ~20 spots relying on that assumption:
- **Fixed to `var(--accent-text)`:** the global `:focus-visible`
  outline (`base.css` + its `theme.css` override — both needed
  fixing, or the second would have silently undone the first),
  `.gallery-thumb.active` border, the perf/form card left-edge
  borders (the fix promised earlier in this decision),
  `.accent-line`, `.gallery-item:hover` border, `.form-input:focus`
  border, `.btn-ghost` hover border, `.evidence-lead .accent`,
  `.evidence-row .mark`, `.cb-row .cb-num`,
  `.budget-table td:first-child`, `.faq-icon`, `.error-code`.
- **Hardcoded amber `rgba(242,167,27,…)` literals** (never tokens,
  so they wouldn't have moved regardless): ~20 instances across
  `style.css`, `theme.css`, and `part-boxes.css` — nav active-states,
  `.page-hero` gradient, `.build-perf`, `.tier-badge`/`.tier-card`,
  `.faq-item`/`.faq-icon`, `.form-privacy`, `.box-category`, plus two
  in `style.css` shadowed by `theme.css` overrides but kept in sync.
  Border-ish ones → `rgba(174,121,142,…)` (accent-text's RGB, same
  alpha); background-wash ones → `rgba(139,63,94,…)` (accent's RGB,
  same alpha).
- **Button/nav text flipped dark → white:** `.btn-primary`,
  `.back-to-top`, `.nav-cta`, `.skip-link` (`theme.css`).

**A real pre-existing bug found during the sweep, unrelated to this
decision but only surfaced by it:** `theme.css` had a leftover
override block — `.listing-perf-card`, `.listing-system-badge`,
`.listing-form-card` — hardcoding the *pre*-decision-7/8 full-amber
treatment. Because `theme.css` loads after `build-detail.css`, it was
silently winning the cascade on every property both files set,
meaning decisions 7 and 8 (both marked "DONE, Implemented" in this
log from an earlier session) likely never actually rendered as
approved — the page was probably still showing the old boxed amber
treatment the whole time. Removed the stale block entirely; the
correct rules already existed in `build-detail.css`.

**Side effect, no action needed:** `.faq-item.open .faq-icon` and
`#event-banner` both hardcode `color: white` directly in `style.css`
on top of `var(--accent-h)`, with no per-theme text-color override —
under amber this was a live, unfixed contrast failure (2.04:1).
Cask's white-on-base is 7.07:1, so both are now correct without any
change.

**Verified** with a from-scratch render using the real, final values
(not the earlier approximated mockups) against actual markup from
`buildDetail.js` — confirms the left-edge, system badge, and privacy
box all render correctly for the first time.

### 15. Hover/focus states — DONE, no change
Compared two real, live (not static) options for the two elements
with a genuine open question — thumbnail hover and the back link —
holding everything else constant: **A** current, opacity-only
thumbnail hover with the accent border reserved for the actively
selected thumbnail, back link brightens to plain white; **B**
accent-touched, a faint accent ring previews on thumbnail hover and
the back link picks up the wine tint on hover (matching the
ghost-button pattern). Approved **Option A** — kept as-is. Reasoning:
opacity (hover) and the accent border (active/selected) are currently
two cleanly distinct signals; introducing a faint accent ring on
hover would blur that distinction, especially scanning across several
thumbnails quickly, and competes with the one border that actually
needs to stand out. Consistent with the restraint principle carried
through decisions 10-12: accent stays tied to something meaningful
(selection, primary action), not sprinkled into every hover.
Keyboard focus is already covered by decision 14's global outline fix.
**Implemented:** no code change — `.gallery-thumb:hover`,
`.gallery-thumb.active`, and `.back-btn:hover` in `css/build-detail.css`
already match.

## Build-detail page — still to decide

(none — all 15 decisions made: layout, photo treatment, title
hierarchy, price, availability badge, specifications, performance
section, inquiry form, buttons (sitewide), borders, backgrounds,
spacing, typography, accent color (sitewide), hover/focus states.)

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

## After the build-detail page

- Mobile layout for this page specifically (based on the desktop
  decisions above, not a direct copy of them)
- Other page types, one at a time, following the same process
  (`services.html` excluded — being removed)

## Home page (`index.html`) — decisions made so far

### 1. Hero — APPROVED, IMPLEMENTED
Compared three real-copy options: **A** current (full-bleed image,
bottom gradient scrim, text overlaid at the bottom — a real,
considered treatment, not a default); **B** side-by-side (text one
side, photo the other, smaller and more forgivable placeholder);
**C** text-focused, no image slot at all. Flagged as directly relevant
to the choice: there is no real hero photo yet (`images/hero-build.jpg`
doesn't exist, live site shows its "Photo coming soon" fallback at
full hero size), and every real photo in the project is a portrait 3:4
product shot — the wrong shape for a wide hero regardless. **Approved
Option C.** Not a permanent verdict against A — full-bleed photography
(a real landscape shot: the workspace, the owner mid-build) is worth
reconsidering specifically once one exists; this decision was sized to
what's actually true today, not a photo that might show up later.

**Owner also flagged**, once this was implemented: the old image-based
hero (with its `onerror`-JS fallback to the "Photo coming soon"
placeholder) had previously sometimes failed to render in AI
crawls/renders, despite always working fine in a real browser.
Worth weighing if Option A is ever revisited — that fallback pattern
carries real crawler risk, not just an aesthetic downside, so a future
image-based hero should avoid leaning on inline `onerror` JS for its
fallback state. Option C sidesteps the issue entirely: the hero is now
plain static HTML with no image or JS dependency at all.

**Implemented** in `pages-src/index.html` (removed the
`.hero-media-frame`/`.hero-scrim`/`.hero-placeholder` image markup and
the `.hero-copy`/`.hero-copy-inner` overlay wrapper — `.hero-inner` now
wraps the h1/body/buttons directly) and `css/theme.css` (rewrote the
HERO block for a centered text layout: `.hero-inner` max-width 860px,
h1 `clamp(2.1rem, 1.3rem + 3.2vw, 3.4rem)` with no line-length cap so
it breaks to two balanced lines on desktop instead of three, copy
unchanged, `.hero-buttons` centered; removed the 900px
overlay-positioning media query since the layout no longer changes
shape across viewports). Found and fixed along the way (all in
`css/style.css`): `.hero-image-wrap`/`.hero-img-placeholder` were
already fully dead — leftover from the pre-Forge original design,
superseded by the media-frame markup and unreferenced by any page or
script — removed along with their dead `order: -1` and grid-column
overrides in the 900px query, plus a `.hero { padding: 48px 0 64px; }`
rule in that same query that turned out to have been moot at any
viewport width even before this change, since `theme.css` has always
set its own unconditional `.hero` padding at equal specificity, later
in the cascade. Verified with `smoke-test.js` (all checks pass) and
real-browser screenshots at 1440px and 390px — no horizontal overflow
at either width.

## Home page — decision 2

### 2. Section-header pattern — APPROVED, IMPLEMENTED
Compared three options: **A** one centered pattern everywhere, forcing
Custom Builds/FAQ's headers into the same full centered block above
their two-column content; **B** two intentional variants sharing the
same label/accent-line/spacing DNA — centered for the three standalone
intro sections (unchanged), left-aligned for the two sections where
the header really just introduces one column, with Contact CTA (a
centered card) staying centered; **C** drop the accent-line sitewide,
standardize spacing only, leave alignment as every section already has
it. **Approved Option B.** Reasoning: the centered treatment earns its
place on a standalone intro; it doesn't on a section where the heading
is really labeling one half of a two-column layout — and the real
inconsistency wasn't the alignment split (which already had a reason),
it was that three sections had quietly lost the accent-line and picked
up one-off inline-style spacing along the way.

**Implemented** in `css/style.css` (new `.section-header.align-left`
modifier next to the existing centered `.section-header` — shares its
`.section-label`/`.accent-line`/h2-to-p spacing, only alignment and
outer margin differ; also a scoped `.cta-box .accent-line` rule, a
no-op on every other page's CTA box since only the homepage's has one)
and `pages-src/index.html`:
- **Custom Builds** — label/h2/p now wrapped in
  `.section-header.align-left` with an accent-line added; dropped the
  old per-element inline `style="margin-bottom:..."` attributes in
  favor of the shared rhythm.
- **FAQ Preview** — same treatment; also dropped an inline
  `line-height:1.8` on the paragraph (now the sitewide base 1.6, like
  every other section-header paragraph).
- **Contact CTA** — kept its existing unwrapped structure (nesting it
  in `.section-header` would've broken `.cta-box`'s own `h2`/`> p`
  selectors, which are tuned for that box specifically); just dropped
  the inline `display:block; margin-bottom:1rem;` on the label and
  added an accent-line after the paragraph, with a scoped margin rule
  so the gap to the buttons below reads right.
Verified with `smoke-test.js` (all checks pass) and real-browser
screenshots of all three changed sections at 1440px and 390px.

## Home page — decision 3

### 3. Available Systems (build card grid) — APPROVED, IMPLEMENTED
Two sub-questions, both stemming from `js/render/buildCard.js` never
having been brought in line with the build-detail page's restraint
decisions (5, 7).

**Part A — performance callout box.** Compared three options: **A1**
keep the current full Cask-tinted background/border box; **A2** match
`.listing-perf-card`'s already-approved treatment (decision 7) exactly
— neutral `var(--card)` background, left accent edge, mono item font
with a bullet marker; **A3** drop the box entirely, render perf items
as plain unboxed rows like `.build-spec` already does. **Approved
Option A2.** Reasoning: the identical content (estimated FPS numbers)
already has a settled, justified treatment one page over — reusing it
here isn't inventing a new pattern, and A3 would go further than
decision 7 itself was willing to go for the same content, creating a
new mismatch in the other direction instead of resolving one.

**Part B — availability/sold badge.** Compared **B1** keep the current
filled-pill look vs. **B2** switch to `.badge-quiet` (decision 5's
detail-page treatment). **Approved B1 — kept as-is.** Reasoning: a card
grid is a scanning context (separating available from sold across
several cards at a glance), where a filled color pill does that job
better than a quiet dot+label; the detail page is a single-item,
already-focused context where quiet suits better. This is exactly why
decision 5 scoped the quiet treatment to the detail page only and
flagged the card badge as its own future decision rather than
assuming the same answer — that instinct held up.

**Implemented:**
- `css/style.css` — `.build-perf`/`.perf-label`/`.perf-item` rewritten
  to the A2 recipe (label/item font-size kept at this component's own
  smaller scale — 0.68rem/0.8rem vs the detail page's 0.72rem/0.9rem —
  rather than forced to match, since the card already runs its own
  smaller type scale throughout).
- `css/theme.css` — removed `.build-perf`'s old rgba(139,63,94,...)
  override, which would otherwise have silently undone the new
  treatment (this file loads after style.css).
- No change for Part B — `.badge-available`/`.badge-sold` untouched.

**Also found and fixed, not a visual change:** `buildCard.js`'s image
had the identical opacity-gated-by-`onload` pattern flagged against
the old hero — `.build-image img` sat at `opacity: 0` until an inline
`onload` handler added a `.loaded` class. If a renderer doesn't fire
`onload` the way a real browser does, a correctly-loading image would
stay invisible indefinitely — worse than a missing one. Removed the
gate; the image is visible by default now, `onerror` stays as a
non-load-bearing nicety for genuinely broken files. Verified directly:
with the `.loaded`/`onload` mechanism entirely absent from the markup,
computed opacity is still `1`.
**The same pattern exists in three more places** — flagged for the
owner, not yet touched pending a decision on scope: `js/render/
partBoxCard.js` (part-boxes.html), `js/render/buildDetail.js` (both
the `<img>` and the `<video>` for `.gallery-main-img` — build.html's
*primary* product photo/video), and `js/render/galleryGrid.js`
(gallery.html grids, `.gallery-item img`). Matching CSS in
`css/part-boxes.css` (`.box-image img`) and `css/build-detail.css`
(`.gallery-main-img`) would need the same opacity-default fix.

Verified with `smoke-test.js` (all checks pass) and real-browser
screenshots at 1440px and 390px.

## Home page — decision 4

### 4. Evidence section (checklist rows, numbered marks) — DONE, no change
Reviewed the existing `.evidence`/`.evidence-row` pattern against
every angle the rest of this process has been checking components
for: box/background treatment (none — plain hairline `border-bottom`
dividers, no card-within-a-card), accent color (`.mark` and
`.evidence-lead .accent` both already use `var(--accent-text)`, Cask),
typography (mono numbered marks, consistent with the rest of the
site's mono-for-technical-detail convention), and consistency between
the two contexts that use it — this pattern is already shared between
the home page's two-column layout and build.html's `.evidence-compact`
single-column variant, real-screenshotted side by side. Checked mobile
too. All of it already reads clean, restrained, and consistent — no
inconsistency or leftover pre-redesign styling to fix.

This one predates the current visual-redesign process: the header
comment in `css/theme.css` notes it replaced the original icon+
heading+description trust cards and numbered-circle testing steps,
and was already unified across both pages before this decision-by-
decision pass started. Nothing to implement.

## Home page — decision 5

### 5. Custom Builds section (two-col layout, budget table) — DONE, no change
Same review as decision 4, same result. `.cb-list`/`.cb-row` is
another pattern that predates this process and is already shared
across three pages — the home page's plain 3-row variant, custom-
build.html's numbered 6-step variant (`.cb-num`, mono digits, not a
filled circle), and contact.html's info list — confirmed by
screenshotting all three side by side. `.budget-table` uses the same
restrained language: hairline row dividers, mono font, accent-text
for the price column, italic dim note below. Nothing boxed, nothing
off-token, nothing inconsistent between pages. Nothing to implement.

## Home page — decision 6

### 6. Gallery preview section — DONE, no change
`#gallery-preview` renders through the same `js/render/galleryGrid.js`
already covered by the sitewide image-opacity fix. Checked the piece
that fix didn't touch — the visual/hover treatment — separately:
`.gallery-item` hover (border to accent-text, subtle card scale +
larger inner-image scale, flat neutral shadow) matches decision 9's
flat-shadow language and decision 15's hover precedent, confirmed with
real hover-state screenshots. No video items in the current homepage
subset to check the video-icon overlay against, but it uses the same
tokens as everything else here. Nothing to implement.

## Home page — decision 7

### 7. FAQ preview section — DONE, no change
This one got closer scrutiny than 4-6, since `.faq-item` is structurally
different — a genuinely boxed item (`var(--card)` background + border
per row), unlike the plain hairline-divided lists everywhere else.
Decided that's justified rather than leftover: it's an interactive
accordion control, not a static information list, and needs its own
click target and open/closed affordance — not the same kind of
component as Evidence or Custom Builds, so it isn't a mismatch for not
matching their treatment. Confirmed the open/closed states both look
intentional and clean (screenshotted both).

**Later tokenized** (owner asked, not a design decision): `.faq-item.open`'s
border-color and the closed `.faq-icon`'s background/border were
hardcoded `rgba(174,121,142,...)`/`rgba(139,63,94,...)` rather than
referencing `var(--accent-text)`/`var(--accent)`. Now
`color-mix(in srgb, var(--accent-text) 40%, transparent)` and
`color-mix(in srgb, var(--accent) 10%/20%, transparent)` respectively —
verified via computed-style in a real browser to resolve to the exact
same `rgba(...)` values as before (pixel-identical), so if the accent
color is ever revisited again, these now follow it automatically
instead of needing a manual second edit.

## Home page — decision 8

### 8. Contact CTA section — DONE, no change
Already fully covered by decision 2's implementation (accent-line
added, inline styles removed) — re-checked here against the same
token/restraint criteria as the others. `.cta-box` uses
`var(--card)`/`var(--border)` directly, no hardcoded colors anywhere
in it. Nothing to implement.

## Home page — decision 9

### 9. Section rhythm/spacing — DONE, no change
Checked actual rendered gap between every section on the page (not
just the shared `padding: 80px 0` rule in isolation) — each section
butts directly against the next with zero unintended overlap or extra
margin, so the 80px+80px pairing (160px between content, `.section-alt`
marking alternating bands instead of a gap) is landing consistently
everywhere, not just on paper. Full-page screenshot reviewed
top to bottom for any section that reads cramped or overly sparse next
to its neighbors — none did. Nothing to implement.

## Home page — COMPLETE

All 9 home page decisions made (3 required real changes: hero,
section-header pattern, Available Systems; 6 confirmed already correct
on review: Evidence, Custom Builds, Gallery preview, FAQ preview,
Contact CTA, section rhythm), plus the sitewide image-opacity
correctness fix found along the way. See "Scope notes" above for
what's next.

## Custom-build page (`custom-build.html`)

### Section-header pattern rollout — mechanical, not a fresh decision
This page's "How a Custom Build Works" and "Not Sure What Hardware You
Need?" headers predated decision 2's rollout — bare/inline-styled
labels and headings, no accent-line, one using an inline
`style="text-align:left"` override instead of the `.align-left`
modifier decision 2 already built for exactly this. Applied the same
recipe used on the home page, no new decision needed:
- **How a Custom Build Works** — label/h2/first paragraph now in
  `.section-header.align-left` with an accent-line; the second,
  smaller supporting paragraph stays outside the header block (same
  shape as the home page's Custom Builds section), own inline
  `font-size:0.95rem` kept since it's a deliberate smaller-emphasis
  paragraph, not a default.
- **Not Sure What Hardware You Need?** — this one had three roughly
  equal-weight paragraphs rather than one lead + supporting detail;
  put the first in `.section-header.align-left` (matching the
  one-paragraph-per-header-block shape used everywhere else), left the
  other two outside at their original `font-size:1.05rem` (dropped the
  now-redundant `line-height:1.8` inline overrides, already the page
  default).
Verified with `smoke-test.js` and real-browser screenshots at 1440px
and mobile.

### Open items — RESOLVED
1. **`.page-hero` background gradient** (sitewide, 8 pages) — **kept
   as-is.** Owner asked whether the Impeccable anti-slop tool
   (github.com/pbakaus/impeccable) said anything about it; checked, and
   ran its detector against the live built site (not just pages-src, so
   linked CSS actually resolved). It did not flag `.page-hero` or
   `.tier-card.featured`'s gradients at all — its named gradient rule
   (`gradient-text`) is about multi-color text-fill gradients, a
   different and much louder thing than a single-brand-color fade at 5%
   opacity. Supports the "subtle enough to be a real exception" read.
2. **`.tier-card.featured`'s gradient** — **kept as-is.** Doing real
   comparison work across three cards, not just ambient polish.
3. **`.tier-badge` pill treatment** — **approved quiet**, implemented.
   `css/style.css`: dropped the filled-pill background/border/padding
   entirely for a plain styled-text kicker label (same visual language
   as `.section-label` elsewhere), reasoning being a category label
   doesn't carry the same scan-at-a-glance need the availability badge
   does. Removed the now-dead rgba override in `css/theme.css`.
4. **Final CTA box kicker label** — **deferred, not mine to word.**
   Owner wants to rewrite site copy sitewide in its own dedicated pass
   after the visual redesign, based on their own principles/practices
   rather than the AI-generated copy the site started with. No wording
   proposed; box stays without a label until that pass.

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

### `side-tab` — RESOLVED
Impeccable's own description calls a colored left-border "tab" on a
card or section **"the most recognizable tell of AI-generated UIs."**
This was exactly the pattern build-detail decision 7 chose
(`.listing-perf-card`), decision 8 reused (`.listing-form-card`), and
home page decision 3A reused again this session (`.build-perf`) — all
three explicitly reasoned through as "the restrained choice" at the
time. "Restrained" and "a well-known AI tell" turned out to be two
different things here.

Built three real mockups (not just described in the abstract) and ran
the actual detector against each before picking one:
- **Unboxed** — no card, label + hairline dividers carry it (same
  device as the Evidence section / cb-list rows). **Clean.**
- **Top accent rule instead of left** — same box, edge moved to the
  top. **Still flagged** — a different rule this time,
  `border-accent-on-rounded` ("thick accent border on a rounded card —
  the border clashes with the rounded corners"). Ruled out with
  evidence, not just a guess: rotating the border doesn't dodge the
  underlying concern.
- **Icon beside the label, plain neutral box** — specs-card-style box,
  small accent-colored glyph instead of any border accent. **Clean.**

**Approved: unboxed for the two performance cards; "drop the edge,
keep the plain box" (same logic, adapted) for the form card**, since a
form with real input fields needs an actual boundary in a way a label
+ list doesn't.

**Implemented:**
- `css/build-detail.css` — `.listing-perf-card` no longer has any
  background/border/padding at all (plain wrapper div now); title and
  items get hairline `border-bottom` dividers instead, last item's
  border removed. Spacing to siblings already came from
  `.listing-details`' flex `gap`, not this card's own padding, so
  nothing else needed adjusting.
- `css/build-detail.css` — `.listing-form-card` just lost its
  `border-left`; now identical to `.listing-specs-card`.
- `css/style.css` — `.build-perf`/`.perf-label`/`.perf-item` got the
  same unboxed treatment as `.listing-perf-card`, kept its own
  `margin-bottom` since this card's internal layout uses stacked
  margins, not a flex-gap parent.

**Verified two ways:** `smoke-test.js` (all checks pass) and a full
re-scan of the real built site with Impeccable — `side-tab` went from
9 instances to 0, no new findings introduced. Screenshots of all three
real components (not just the test mockups) confirmed clean.

### `low-contrast` — RESOLVED
Pinned down with a live browser instead of a static scan: wrote a
Playwright script that actually hovers every element on the 5 affected
pages (Impeccable's own browser can't launch as root in this sandbox)
and compares computed styles against the flagged color pair. Several
elements matched a raw RGB check (`.nav-link.active`, `.faq-icon`,
`.btn-ghost`) but turned out to be false positives once alpha was
accounted for — all three use a low-opacity accent tint (8-14%), which
composites to something nowhere near the solid failing color against
the dark page background underneath.

The real one: **`.btn-primary:hover` never redeclared `color`**, so on
an `<a>` element (every primary CTA sitewide — hero buttons, cta-box
buttons, "View Build," etc. are all anchors, not `<button>`s) the
global `a:hover { color: var(--accent-text) }` rule — one type selector
+ one pseudo-class — silently outranked `.btn-primary`'s plain-class
`color: white` the instant it was hovered. Confirmed live before
touching anything: computed color really did flip from `rgb(255,255,255)`
to `rgb(174,121,142)` on the still-solid `rgb(139,63,94)` background on
real mouse hover — Impeccable's exact numbers. `.btn-secondary`/
`.btn-ghost` were never affected, just by luck: both happen to
redeclare `color` in their own `:hover` rule for unrelated styling
reasons, which incidentally outranks `a:hover` too. The identical root
cause was already diagnosed for `.nav-cta` (see its comment in
`css/style.css`) but never applied to `.btn-primary` itself.

**Fixed:** added an explicit `color: white;` to the existing
`.btn-primary:hover` rule in `css/style.css`. Normal specificity
((0,2,0) vs `a:hover`'s (0,1,1)) wins cleanly, no `!important` needed.
Verified with a real hover before and after (white confirmed stable
now) and a full site re-scan: `low-contrast` went from 10 instances to
0.

**The `--accent-h` = `--accent` collapse turned out to be a red
herring, not the cause** — `tokens.css`'s own comments describe
`--accent-h` as meant to be a **distinct** hover-state shade from
`--accent` (it was, under the old blue palette); they were set equal
during decision 14's Cask swap, which is still a real, slightly sloppy
loose end, but Cask's base already clears white-text contrast
comfortably (7.07:1) regardless, so nothing was actually broken by it.
Left as-is — correct by accident rather than by design, but correct.

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

### `layout-transition` — NOT STARTED
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

## Outstanding, not scoped to one page

(none — see "Sitewide image-opacity fix, extended" below.)

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
