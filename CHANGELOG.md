# CHANGELOG.md — North Bridge PCs Website Rebuild

## Phase 0 — Discovery
- Cloned and inspected the old site's actual repo source (not just the
  rendered pages) — full inventory recorded in ARCHITECTURE.md.
- Identified gaps vs. the project brief: no Services/About page, no
  structured data or Open Graph tags, dark-only theme, business email
  exposed in client-side source, header/footer/trust content duplicated
  across all 8 pages, flat (non-componentized) PC data model.
- Owner decisions: dedicated Services page, drop the old one-off event in
  favor of a general-purpose event system, system-preference light/dark.

## Phase 1 — Foundation (in progress)
- Project directory structure created.
- `PROJECT_STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `TODO.md`,
  `CHANGELOG.md` created.
- `js/data/config.js` — feature toggles, site identity, contact routing.
- `js/data/builds.js` — new componentized PC schema, one example entry.
- `js/data/services.js` — service list scaffold (names only).
- `js/data/events.js` — new multi-event promo system, nothing active.
- `js/data/testimonials.js` — empty, toggle-off-safe scaffold.
- `css/tokens.css` — light/dark design tokens via `prefers-color-scheme`,
  carrying forward the old site's blue accent and dark palette.
- `css/base.css` — reset, accessibility foundations, responsive breakpoint
  scale (carried over: 1100/900/640/420px).

## Phase 2 — Core Site (in progress)
- `css/style.css` adapted from the old site's stylesheet: removed the
  now-redundant reset/`:root` block, converted 7 hardcoded hex colors to
  token references (`--accent-2`, `--placeholder-*`) so it works correctly
  in light mode.
- `js/partials/header.html` / `footer.html` — shared page chrome.
- `build-tools/stitch.py` — assembles partials into final static HTML.
- `js/render/chrome.js` — mobile nav, scroll progress, back-to-top, footer
  year, toggle-driven footer contact links. Replaces inline scripts
  duplicated across all 8 old pages.
- `js/render/eventBanner.js`, `js/render/buildCard.js`,
  `js/render/faqAccordion.js` — reusable render components.
- `pages-src/index.html` — homepage, built via stitch.py into `index.html`.
  Reuses the old homepage's already-published copy (hero, trust cards,
  custom-build pitch, testing process, FAQ answers, contact CTA), rewired
  to the new data-driven architecture.
- Verified the full render pipeline in a real DOM against test data
  (available build w/ event pricing, sold build, active event): correct
  filtering, correct optional-field handling, working FAQ accordion and
  mobile nav. Found and fixed one real bug this way — skip-link had no
  `#main` target.

## Phase 3 — Business Content (continued)
- Real inventory migrated: the old site's 3 sold PCs, new componentized
  schema, real product photos (not placeholders) copied into `images/`.
- `builds.html` — full inventory page (available grid or notify-box
  waitlist; sold section).
- `js/render/notifyBox.js` — waitlist system, extracted from the old
  site's working implementation, now reads the contact email from
  config.js.
- `build.html` + `js/render/buildDetail.js` — the complete build-card/
  detail system: full componentized spec sheet, photo+video gallery,
  condition/testing notes, event-aware pricing, status-aware CTA. Inquiry
  form now sources its destination email and redirect URL dynamically
  instead of hardcoding them.
- `js/render/trustSection.js` — de-duplicated the trust cards and process
  steps that were copy-pasted between the old homepage and old build page.
- `css/build-detail.css` — extracted from an inline `<style>` block,
  fixed one hardcoded color for light-mode support.
- Tested end-to-end against the real migrated data plus synthetic data
  covering every optional field path (all 10 component categories,
  accessories, condition, testing notes, video, event pricing) — all
  passed.
- Logged D6 (Part Boxes resale system + nav restructuring) per owner
  request — implemented in the next entry below.

## Phase 3 — Nav restructuring
- Flat nav replaced with a "For Sale" dropdown (desktop) / accordion
  (mobile) over Gaming PCs, Custom Builds, Part Boxes. `stitch.py` gained
  a `{{activegroup:...}}` token so the parent trigger highlights
  correctly when on any child page. Services deliberately stayed a flat
  link — see DECISIONS.md D6 for why.
- Tested the full interaction sequence in a real DOM: dropdown open/
  toggle-close/outside-click-close/Escape-close-with-focus-return, mobile
  accordion expand/collapse without closing the whole drawer, and
  confirmed tapping a real sublink still closes the drawer. Re-ran
  existing regression checks (hamburger, footer year, FAQ accordion,
  featured-builds, sold-builds, build-detail rendering) across all three
  pages to confirm the shared chrome.js/style.css changes didn't break
  anything already shipped.
- Part Boxes system itself not yet built — nav links to `part-boxes.html`
  exist and will 404 until that page is built (next planned work).

## Phase 3 — Part Boxes system
- `js/data/partBoxes.js` — schema + docs, empty array (no real inventory
  yet, same as builds.js started).
- `js/render/partBoxCard.js` — box card with a quantity picker
  (+/- buttons and a clamped number input, `max` = actual stock).
- `js/render/partBoxOrder.js` — tracks selected quantities across all
  cards, keeps a live "Your Request" summary (itemized lines + running
  total) in sync, reveals the name/email form only once something's
  selected, and submits the whole request as one itemized FormSubmit
  inquiry. No cart, no checkout, no payment processing — matches how
  every other form on this site works.
- `part-boxes.html` — wires it together; empty-state when there's no
  stock (hides the order summary too, rather than showing an empty panel
  next to an empty-state message).
- Tested in a real DOM: empty-inventory state, a zero-quantity box
  correctly excluded from the grid, +/- button clamping at both 0 and the
  per-box max, the same clamping via direct number-input typing, running
  summary math across multiple items, form reveal/hide as selections
  change, empty-field validation on submit, and a full successful
  submission verifying the itemized payload and dynamic destination email
  sent to FormSubmit. Re-checked tag balance and JS syntax across all 4
  pages afterward.

## Phase 3 — Remaining core pages
- `contact.html` — rebuilt as a single unified form (see DECISIONS.md
  D7 for why the old two-variant/`?system=` approach was simplified
  away). FormSubmit destination and post-submit redirect both sourced
  dynamically from `config.js`/`window.location`, not hardcoded.
- `custom-build.html` — ported directly from the old site's real,
  already-published content (6-step process, 3 example budget tiers,
  "not sure what you need" section) into the new architecture. No new
  copy invented.
- `faq.html` + `js/data/faq.js` + `js/render/faqList.js` — all 6 real
  Q&A pairs now live in one data file. The homepage's 3-item preview
  and the full FAQ page both render from the same source via a
  `featured` flag, eliminating what would otherwise have been 3
  duplicated Q&A pairs between the two pages.
- **Found and fixed a real sequencing bug** while wiring the homepage's
  now-dynamic FAQ preview: `faqAccordion.js` was attaching click
  handlers immediately on script load, before the FAQ items existed in
  the DOM (they're injected by a later inline script). Converted it to
  run on `DOMContentLoaded` instead, which fixes it regardless of
  script tag order and works correctly on both pages.
- Tested all of the above in a real DOM: homepage FAQ preview shows
  exactly the 3 featured items and its accordion actually opens
  (confirming the sequencing fix), the full FAQ page renders all 6 and
  enforces single-item-open behavior, the contact form's action/redirect
  resolve correctly from config.js, the thank-you state triggers
  correctly on `?sent=true`, and custom-build.html's tier cards/process
  steps render correctly. Re-ran the full regression sweep (hamburger,
  footer year, no console errors) across all 7 pages now in the project.

## Phase 3 — Gallery (final core page)
- `js/data/gallery.js` — real photo data ported from the old site (same
  11 files already migrated into builds.js). `currentBuilds` empty on
  purpose (no in-progress systems right now).
- `js/render/galleryGrid.js` — grid renderer plus a new click-to-enlarge
  lightbox (the old site's gallery was grid-only) with prev/next,
  wrap-around at the ends, Escape-to-close, and overlay-click-to-close.
  One shared lightbox instance serves both grids on the page.
- `css/gallery.css` — lightbox styling only; the grid/item styles
  already lived in the shared style.css since the homepage preview
  already used them.
- `gallery.html` — wires both sections together.
- Closed the loop on the homepage's gallery preview: it was written back
  in Phase 2 to gracefully fall back to "coming soon" until gallery.js
  existed. Just loading the new script was enough — no logic changes
  needed, confirming that fallback was built correctly the first time.
- Tested in a real DOM: current-builds empty state, all 11 completed
  photos rendered, lightbox open/close/next/prev/keyboard-arrows/
  wrap-around/overlay-click, per-item correctness (clicking photo 6
  shows photo 6, not photo 1), and confirmed the homepage preview now
  shows 3 real photos instead of the coming-soon fallback. Full
  regression sweep re-run across all 8 pages now in the project.

All pages that don't require new owner-provided copy are now built.
Remaining work is gated on the owner: Services page content, About Me,
testimonials.

## Phase 3 — Services + About (content complete)
- Owner provided real facts for all 4 pending services and About Me.
  Converted into customer-facing copy without adding any price,
  turnaround time, or guarantee beyond what was given.
- `services.js` schema extended (`included`/`pricingNote`/
  `turnaroundNote`/`notCovered`) — a one-line description wasn't enough
  to honestly represent things like "not every repair is worth doing"
  or "no guaranteed performance increase from an upgrade."
- `js/render/serviceCard.js` — two renderers: hub cards (link out to
  Sales/Custom Builds) and detail cards (full content, each section
  optional).
- `services.html` — hub cards, 4 detail cards, and a shared policy
  blurb (no surprise charges, confirm before expanding scope, honest
  estimate over a promised turnaround, summer timeline note).
- `about.html` — real content from owner-provided facts. Contains a
  `[Your Name]` placeholder — no name was given anywhere, flagged
  rather than guessed.
- "About" added to the nav — flat link, between Services and Gallery,
  desktop + mobile + footer.
- Testimonials confirmed to stay disabled (owner: none exist yet) — no
  code changes needed, Phase 1's empty-array-plus-toggle already
  handles this correctly.
- Tested in a real DOM: hub/detail card counts, each detail card's
  optional note sections rendering only when populated, and — this one
  mattered — a page-wide text scan confirming no fabricated dollar
  amounts or "same-day"/"24-hour" style turnaround language exists
  anywhere on the page. Full regression sweep re-run across all 10 pages
  now in the project.

Every page in the site's IA now exists with real content. Nothing left
is content-gated — remaining work (Phase 5 SEO, the `[Your Name]`
placeholder) is either technical or a single small owner input.

## Phase 3 — Owner review fixes
- Name filled in (Jacob Skrove), replacing the `[Your Name]` placeholder.
- Corrected an error from the original business input: turnaround isn't
  slower in summer "because of school" — it's the reverse, summer is
  faster with less going on, school year can run slower. Fixed in
  `about.html` and `services.html`.
- Added a dedicated service-request form to `services.html`, replacing
  a generic link to `contact.html` that didn't fit repair/upgrade/
  cleaning/support inquiries (that form's fields — budget, games,
  Wi-Fi, monitor, RGB — are built for PC purchases). New form: name,
  email, a service dropdown populated live from `services.js` (can't
  drift out of sync with the real service list), optional system
  description, what's going on. Each service detail card got a
  "Request This Service" button that pre-selects it and scrolls down.
- Tested in a real DOM: dropdown options match the data, each card's
  button pre-selects correctly and triggers the scroll, dynamic form
  action/redirect resolve correctly, thank-you state works. Full
  regression sweep re-run across all 10 pages.

Nothing outstanding blocks anything else. Natural next step is Phase 5
(SEO/local discovery).

## Phase 5 — SEO / Local Discovery
- `stitch.py` extended: generates canonical tags, Open Graph tags,
  Twitter Card tags, and homepage JSON-LD (`ComputerStore` structured
  data with address/service-area, no invented fields) for every page.
  All driven from `SITE.url` in `config.js` — the one place this value
  lives. OG title/description are read from each page's own existing
  `<title>`/`<meta name="description">` rather than duplicated.
- `sitemap.xml` and `robots.txt` now auto-generated on every build.
- Owner asked whether building this against the placeholder GitHub
  Pages URL (real domain still months out) could break anything.
  Answer: no functional risk, but it does need updating later — so this
  was built so that's a one-line change. **Verified, not just claimed**:
  temporarily swapped `SITE.url` to a fake real domain, rebuilt,
  confirmed every canonical/OG/JSON-LD/sitemap/robots.txt reference
  updated correctly with zero trace of the old URL anywhere, then
  reverted to the placeholder.
- Confirmed generated JSON-LD is valid JSON, appears only on the
  homepage (not redundantly on all 10 pages), canonical tags exist on
  every page, and a full regression sweep across all 10 pages confirmed
  the new `<head>` content didn't break anything already working.

Phase 5 complete. Remaining: update the domain when it arrives (one
config change + a new Search Console property), and Phase 6–8 polish.
