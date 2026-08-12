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

**Phase 2 — Core Site** (in progress)

Per the phase plan: global navigation, footer, homepage, core reusable
components, basic SEO infrastructure.

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

## Not started yet

- Rest of Phase 2: no other pages need nav/footer wiring yet since
  builds.html, build.html, services.html, etc. don't exist until Phase 3
  — but note stitch.py and the partials are ready for them.
- Phase 3 (Business Content): Services page content, Available PCs page,
  build detail page, Sold PCs, About Me, testimonials, empty-state/waitlist
  page wiring, `js/data/gallery.js` port.
- Phase 4 (Contact): inquiry-type-specific forms.
- Phase 5 (SEO/Local): structured data (LocalBusiness JSON-LD), Open Graph
  tags, canonical URLs, sitemap, robots.txt — deliberately deferred, not
  forgotten (see ARCHITECTURE.md note in index.html's <head> comment).
- Phase 6–8: media/polish, testing, documentation/handoff.

## Known open questions (not yet blocking, but will be before their phase)

- Repair/upgrade/cleaning/support: actual public-facing descriptions,
  pricing, and policy wording still needed from the owner (Phase 3 blocker).
- About Me content, real testimonials (if any), and real PC inventory data
  still needed from the owner (Phase 3 blocker).
- Business email handling: old site has the personal Gmail hardcoded in
  visible client-side source. No fix proposed yet — needs an explicit owner
  call on whether that's acceptable long-term or worth a lightweight
  mitigation.

## Immediate next step

Phase 3: build `builds.html` (full inventory grid, reusing
`renderBuildCard`/`renderEmptyBuildsState`) and `build.html` (individual
build detail page — the "complete build card" system). The 3 real sold
builds from the old site are factual data ready to migrate into the new
schema whenever that's wanted (see TODO.md).

## Files that matter

- `js/data/*.js` — all content/config, no HTML editing needed for routine
  updates once Phase 2+ is done.
- `css/tokens.css` — single source of truth for color/spacing/radius values.
- `js/partials/*.html` + `build-tools/stitch.py` — shared header/footer.
  Run `python3 build-tools/stitch.py` after editing either one, or after
  adding a new file to `pages-src/`.
- `ARCHITECTURE.md` — full technical rationale.
- `DECISIONS.md` — business/architecture decision log.
