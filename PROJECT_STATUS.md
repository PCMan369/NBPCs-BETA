# PROJECT_STATUS.md — North Bridge PCs Website Rebuild

> **This is the primary handoff document.** If you're a new Claude conversation
> picking this up, read this file first, then ARCHITECTURE.md and DECISIONS.md.
> Do not trust conversation history — trust these files and the actual code.

---

## What this project is

A ground-up rebuild of the North Bridge PCs website. The old site
(`pcman369/North-Bridge-PCs`, live at the current GitHub Pages URL) is
**reference material only** — this is not an in-place edit of it, and it
stays live/untouched until this replacement is ready to swap in.

Static HTML/CSS/vanilla JS. No framework. Hosted on GitHub Pages (current
site's constraint carries over — no server-side backend, no database).

## Current phase

**Phase 3 — Business Content** (in progress)

Per the phase plan: services, available PCs, complete PC build
cards/details, sold PCs, About Me, trust/testimonial system, empty-state
handling, waitlist/request architecture. Phase 2 (Core Site) is complete.

## Completed so far

- [x] Phase 0 Discovery — inspected the old repo directly (cloned via git,
      not just the rendered pages). Full inventory in ARCHITECTURE.md.
- [x] Three foundational decisions locked (see DECISIONS.md): Services gets
      a dedicated page/nav item; the old one-off "Back to School" event is
      NOT carried over as-is, replaced with a general-purpose event/promo
      system; site follows system light/dark preference.
- [x] Phase 1 (Foundation) — complete. Project structure, docs, config/data
      layer, design tokens, base CSS/accessibility foundations.
- [x] The 3 proposed-but-unconfirmed Phase 1 defaults (D2 Services page
      structure, D3 per-event countdown toggle, D5 brand color carryover)
      were not corrected across two follow-up turns — proceeding on them
      as accepted. Still reversible; flag anytime.
- [x] `css/style.css` adapted from the old site's stylesheet: removed the
      now-redundant reset/`:root` block, and converted 7 hardcoded hex
      colors to token references so it actually works in light mode too.
- [x] `js/partials/header.html` / `footer.html` — shared chrome, used by
      every page via the build script.
- [x] `build-tools/stitch.py` — assembles partials into final static HTML.
      Verified working (builds index.html correctly, active-nav token
      resolves per page, no leftover markers in output).
- [x] `js/render/chrome.js` — mobile nav toggle, scroll progress, back-to-
      top, footer year, toggle-driven footer phone/social links. Replaces
      the inline script that was copy-pasted on all 8 old pages.
- [x] `js/render/eventBanner.js` — renders the sitewide sale banner only
      when an event is active; otherwise renders nothing (no empty bar).
- [x] `js/render/buildCard.js` — build card renderer for the new
      componentized schema, with graceful handling of missing fields and
      event pricing. Includes `renderEmptyBuildsState()` for the
      no-PCs-available case.
- [x] `js/render/faqAccordion.js` — extracted from inline script, scoped
      per `.faq-list` so it works unmodified on both the homepage preview
      and the full FAQ page (Phase 3).
- [x] `pages-src/index.html` — homepage source. Reuses the old homepage's
      already-published copy (hero, "why us" cards, custom-build pitch,
      testing process, FAQ answers, contact CTA) verbatim where it's
      authentic business content, rewired to the new data-driven
      architecture. Gallery preview degrades gracefully until
      `js/data/gallery.js` exists (Phase 3).
- [x] **Tested, not just written**: ran the actual stitched `index.html`
      and its real script files (config/events/builds data + all four
      render scripts) in a real DOM (jsdom) against injected test data
      covering an available build with event pricing, a sold build, and
      an active test event. Verified: correct build filtering (sold
      excluded from featured section), all optional fields render
      correctly, event pricing displays correctly, event banner renders
      with countdown, FAQ accordion opens on click, mobile nav toggles
      correctly with proper aria-expanded state, footer year is correct.
      Also caught and fixed a real bug this way: the skip-link had no
      `#main` target — added `<main id="main">` around the homepage
      content.
- [x] HTML tag-balance validated (html/head/body/main/header/footer/
      section/div all balanced) and all new JS files pass `node --check`.

## Completed so far (continued)

- [x] **Real inventory migrated**: the old site's 3 sold PCs are now real
      entries in `js/data/builds.js`, using the new componentized schema
      (title parsed into separate `cpu`/`gpu` fields, `fps` parsed into
      structured `performance.items`). Their actual product photos (13MB,
      11 real files) were copied into `images/` — not placeholders. One
      filename with spaces was renamed for web-safety
      (`Website Main Pic.jpeg` → `may26-01-main.jpg`).
- [x] `builds.html` — full inventory page. Available section shows real
      cards or the notify-box waitlist (data-driven, not hardcoded); sold
      section shows/hides based on whether any sold builds exist.
- [x] `js/render/notifyBox.js` — the waitlist system extracted from the
      old site, same proven behavior, now reading the contact email from
      `config.js` instead of having it hardcoded in this file.
- [x] `build.html` + `js/render/buildDetail.js` — the full "complete build
      card" system: sticky photo **and video** gallery (old site was
      photos-only) with arrows/counter/thumbnails/keyboard nav, a spec
      sheet that lists every populated component category (not just
      RAM/Storage like the old site), a condition/testing-notes section
      that only appears when populated, event-aware pricing, and a
      status-aware CTA (inquiry form when available, sold notice when
      not). The inquiry form's FormSubmit destination now reads
      `CONTACT.email` from config.js instead of being hardcoded in the
      page, and its post-submit redirect is built from
      `window.location` instead of a hardcoded domain.
- [x] `js/render/trustSection.js` — the "Why North Bridge PCs" cards and
      "Testing & Setup Process" steps were duplicated verbatim between
      the old homepage and the old build detail page. Now defined once,
      used by both `index.html` and `build.html`.
- [x] `css/build-detail.css` — build.html's styling (was an inline
      `<style>` block on the old page) extracted to its own file, loaded
      only where it's needed. Fixed the one hardcoded color found there
      too (`#0a1526` → `var(--placeholder-solid)`).
- [x] **Tested end-to-end again**: real DOM tests against the actual
      migrated inventory (not synthetic data) covering builds.html's
      available/sold split, build.html's gallery navigation (thumbnail
      click + keyboard arrows), the sold-notice vs. inquiry-form switch,
      the not-found state, the post-submit thank-you state, and — using
      synthetic data to reach the paths the real inventory doesn't
      exercise — every optional field (all 10 component categories,
      accessories, condition, testing notes, video, event pricing).
      All passed. Confirmed the homepage's trust-section refactor didn't
      break anything.

## Completed so far (continued)

- [x] **Nav restructuring**: flat nav replaced with a "For Sale" dropdown
      (desktop, click-to-open with outside-click/Escape-to-close) /
      accordion (mobile, expands without closing the whole drawer) over
      Gaming PCs, Custom Builds, Part Boxes. `stitch.py` gained an
      `{{activegroup:...}}` token so the parent trigger highlights on any
      child page. Services deliberately stayed a flat link — 4 of its 6
      sub-services have no content yet, see DECISIONS.md D6.
- [x] **Part Boxes system**: `js/data/partBoxes.js` (empty — no real
      inventory yet), `js/render/partBoxCard.js` (quantity picker per
      card), `js/render/partBoxOrder.js` (tracks selections across cards,
      live itemized summary + running total, submits one FormSubmit
      inquiry — no cart/checkout/payment), and `part-boxes.html`.
- [x] `contact.html` — single unified form (the old site's two-variant/
      `?system=` approach was simplified away, see DECISIONS.md D7, since
      `build.html` now has its own embedded inquiry form). Destination
      email and post-submit redirect both sourced dynamically from
      `config.js`/`window.location`.
- [x] `custom-build.html` — ported from the old site's real,
      already-published content (6-step process, 3 example budget tiers,
      "not sure what you need" section). No new copy invented.
- [x] `faq.html` + `js/data/faq.js` + `js/render/faqList.js` — all 6 real
      Q&A pairs in one data file; homepage's 3-item preview and the full
      FAQ page both render from the same source via a `featured` flag,
      eliminating what would've been 3 duplicated Q&A pairs.
- [x] **Found and fixed a real bug**: `faqAccordion.js` was wiring click
      handlers immediately on script load, before the (now dynamically
      rendered) FAQ items existed in the DOM. Converted to run on
      `DOMContentLoaded`, fixing it regardless of script order.
- [x] All of the above tested in a real DOM, not just written: dropdown/
      accordion open-close-outside-click-Escape sequence, quantity
      clamping via both buttons and direct input, running order-summary
      math, contact form's dynamic action/redirect + thank-you state,
      FAQ dedup (3 featured on homepage, 6 total on faq.html,
      single-item-open enforced), custom-build.html's tier/process
      content. Full regression sweep (hamburger, footer year, zero
      console errors) re-run across all 7 pages after every change.

## Completed so far (continued, gallery)

- [x] `gallery.html` + `js/data/gallery.js` — real migrated photos (same
      11 files already in builds.js), ported from the old site's data.
      Added a click-to-enlarge lightbox (new — old site was grid-only)
      with prev/next, wrap-around, Escape, and overlay-click-to-close.
      Homepage's gallery preview now shows real photos instead of its
      "coming soon" fallback — no changes needed there beyond loading
      gallery.js, since that fallback logic was written in advance for
      exactly this handoff.

## Completed so far (continued, Services + About)

- [x] `services.js` real content for all 4 in-house services (Repair &
      Diagnostics, Upgrades, Cleaning & Maintenance, Support) — schema
      extended with `included`/`pricingNote`/`turnaroundNote`/
      `notCovered`. All 4 flipped to `show: true`.
- [x] `services.html` — hub cards (Sales, Custom Builds) + 4 detail
      cards + a shared policy blurb (no surprise charges, scope
      confirmed before expanding, honest-estimate-over-fast-promise,
      summer turnaround note). Verified no fabricated prices or
      turnaround-time language made it into the copy.
- [x] `about.html` — real content from owner-provided facts. **Has a
      `[Your Name]` placeholder — no name was provided anywhere in what
      was shared. Needs the owner to fill that in.**
- [x] "About" added to the nav (flat link, between Services and Gallery,
      desktop + mobile + footer).
- [x] Testimonials confirmed to stay disabled — no real ones exist yet;
      architecture from Phase 1 already handles this safely, no code
      changes needed.
- [x] Tested in a real DOM: services.html renders 2 hub cards + 4 detail
      cards correctly, each detail card's pricing/turnaround/caveat
      notes render only when present, a page-wide sanity check confirmed
      no fabricated dollar amounts or "same-day"/"24-hour" style
      turnaround claims exist anywhere on the page. Full regression sweep
      re-run across all 10 pages now in the project.

## Completed so far (continued, owner review fixes)

- [x] Name filled in (`Jacob Skrove`), replacing the `[Your Name]`
      placeholder in `about.html`.
- [x] **Corrected an error in the original business input**: turnaround
      is not slower in summer "because of school" — it's the opposite,
      summer is faster (less going on), school year can be slower. Fixed
      in `about.html` and `services.html`.
- [x] Dedicated service-request form added to `services.html` — the old
      generic link to `contact.html` didn't fit repair/upgrade/cleaning/
      support inquiries (its fields are budget/games/Wi-Fi/monitor/RGB,
      built for PC purchases). New form: name, email, a service dropdown
      populated live from `services.js`, optional system description,
      and what's going on. Each service detail card got a "Request This
      Service" button that pre-selects it and scrolls to the form.
- [x] Tested in a real DOM: dropdown correctly lists all 4 services
      (sourced from data, not hardcoded), each card's button correctly
      pre-selects its own service and triggers the scroll, dynamic
      action/redirect resolve correctly, thank-you state works. Full
      regression sweep re-run across all 10 pages.

## Completed so far (continued, Phase 5 SEO)

- [x] `stitch.py` extended to generate canonical tags, Open Graph tags,
      Twitter Card tags, and homepage JSON-LD (`ComputerStore` structured
      data) — all driven from the single `SITE.url` value in `config.js`.
      Title/description for OG tags are read from each page's own
      existing `<title>`/`<meta name="description">`, not duplicated.
- [x] `sitemap.xml` and `robots.txt` now auto-generated on every build,
      covering all 10 pages.
- [x] Built against the placeholder GitHub Pages URL (owner doesn't have
      a real domain yet) — **verified swap-safe**: temporarily set
      `SITE.url` to a fake real domain, rebuilt, confirmed every
      generated file updated correctly with zero trace of the old URL
      left anywhere, then reverted. Changing domains later is a
      one-line edit + one command.
- [x] Confirmed generated JSON-LD is valid, parseable JSON; confirmed it
      appears only on the homepage (not redundantly on all 10 pages);
      confirmed canonical tags exist on every page; full regression
      sweep re-run across all 10 pages to confirm the new `<head>`
      content didn't break anything already working.

## Completed so far (continued, accessibility contrast fixes)

- [x] Fixed WCAG AA contrast failure: white text on solid `--accent`
      backgrounds (buttons, badges, banner, skip link) was 3.68:1.
      Audited all 9 locations sharing this pairing first, not just
      `.btn-primary`. Fix: those components now rest at `--accent-h`
      (5.17:1, already existed) and hover at new `--accent-h2` (6.70:1).
      `--accent`/`--accent-h` values themselves unchanged.
- [x] Fixed WCAG AA contrast failure: `--dim` in dark theme was 2.79:1
      against its worst-case surface (`--card-h`) — worse than the
      3.75:1 originally reported (which only checked `--bg`). New value
      #8c9bb1 reaches 4.70:1 against that same surface. Light theme's
      `--dim` untouched.
- [x] Verified mathematically (exact ratios computed and reported, not
      asserted), plus a full functional regression sweep across all 10
      pages (zero JS errors) and HTML/CSS balance checks on every file
      touched.
- [x] Found 3 additional contrast issues while auditing — explicitly did
      NOT fix them (outside this fix's scope, flagged instead): `--accent`
      as text on `--card` (3.98:1), `a:hover` text color (3.45:1), light
      theme `--dim` vs `--card-h` (4.34:1). See DECISIONS.md D11.

## Not started yet

- Phase 6–8: media/polish (the migrated photos are real but unoptimized —
  ~1.1MB average, worth compressing before launch), testing, docs/handoff.

## Known open questions (not yet blocking, but will be before their phase)

- Business email handling: still the personal Gmail, sourced from one
  place (`config.js`) everywhere now instead of scattered, but the
  underlying exposure in client-side source is inherent to the
  no-backend FormSubmit approach regardless. Still needs an explicit
  owner call on whether that's fine long-term.
- 3 additional contrast issues found during the accessibility fix but
  explicitly left unfixed (out of that fix's scope) — see DECISIONS.md
  D11's "found but not fixed" list. Owner hasn't weighed in on these yet.

## Immediate next step

The accessibility contrast fix is done and verified. **Phase 6 has
deliberately not been started** — next step is whatever the owner wants
next: fold the 3 newly-flagged contrast issues into another small fix,
move on to Phase 6 (image optimization, visual polish), or something
else entirely. When the real domain arrives: update `SITE.url` in
`js/data/config.js`, re-run `stitch.py`, and set up a fresh Google
Search Console property for the new domain (submit the regenerated
`sitemap.xml` there — required for any new domain regardless of what's
built here).

## Files that matter

- `js/data/*.js` — all content/config, no HTML editing needed for routine
  updates once Phase 2+ is done.
- `css/tokens.css` — single source of truth for color/spacing/radius values.
- `js/partials/*.html` + `build-tools/stitch.py` — shared header/footer.
  Run `python3 build-tools/stitch.py` after editing either one, or after
  adding a new file to `pages-src/`.
- `ARCHITECTURE.md` — full technical rationale.
- `DECISIONS.md` — business/architecture decision log.
