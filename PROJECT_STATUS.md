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

**Visual redesign ("Forge")** — Batch 1 (homepage) and Batch 2 (rest of
the site) are both implemented and self-tested. Nothing here has been
seen by the owner yet in a real browser — see "Redesign implementation
plan" below for exactly what changed and the honest limits of what
could be tested in this environment.

The original build (Phases 0–8) and the full post-launch audit
implementation are functionally complete (see "Completed so far"
below). Everything from here on is visual redesign work, not audit
follow-up.

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

## Completed so far (continued, header fix + remaining contrast issues)

- [x] Fixed the reported light-mode header bug: `.site-header` had a
      hardcoded `rgba(15,23,42,0.96)` background with no light-theme
      override — root cause was the original color audit only checking
      `#hex` patterns, missing this `rgba()` one. New `--header-bg`
      token, theme-aware.
- [x] Found and fixed the same blind spot on 5 hover-feedback
      backgrounds (`rgba(255,255,255,0.06)`, nearly invisible on a light
      surface) — new `--hover-tint` token, theme-aware.
- [x] Fixed all 3 previously-flagged-but-unfixed contrast issues:
      `--accent` as text on `--card` (turned out to fail on every
      surface in light theme, not just the one case originally
      measured), `a:hover` text color, light theme `--dim` vs
      `--card-h`. New `--accent-text` token, theme-aware; `--accent`
      itself unchanged.
- [x] Caught and fixed a real bug in my own implementation: a plain
      string-replace for `color: var(--accent);` also matched inside
      `border-color:`/`background-color:` rules (both end in `-color:`,
      a superstring of the search text), silently converting 6 rules
      that were never supposed to change. Found by grepping for the
      corrupted pattern before considering the fix done; all 6 reverted.
- [x] Verified mathematically (exact ratios in CHANGELOG.md) and with a
      full functional regression sweep across all 10 pages (zero JS
      errors) plus tag/brace-balance checks on every file touched.

## Completed so far (continued, image optimization)

- [x] Optimized all 11 real product photos: fixed EXIF orientation
      (baked into pixels before stripping metadata, so nothing renders
      sideways), resized to a 1800px max dimension (the largest they're
      ever displayed at — the lightbox — tops out around 1100px, so
      this still gives ~1.6x headroom for high-DPI screens), re-encoded
      at JPEG quality 82, metadata stripped. 12.47MB → 4.50MB (63.9%
      reduction) with no visible quality loss — checked visually, not
      just by file size.
- [x] **Found a real privacy issue as a side effect**: one photo
      (`may26-01-main.jpg`) had precise GPS coordinates embedded in its
      EXIF data — exact enough to pinpoint the location it was taken.
      That would have gone into a public GitHub repo. Stripped along
      with the rest of the metadata; confirmed removed by direct
      before/after EXIF inspection, not assumed.
- [x] Verified: no image filenames changed (only the files themselves,
      in place), so every existing reference across all pages/data files
      still resolves correctly — confirmed by loading the 4 pages that
      reference images and checking `<img>` tags resolve with zero JS
      errors.

## Completed so far (continued, Phase 7 testing)

- [x] **Link/reference audit** across all 10 pages (every `href`/`src`
      checked against real files on disk, not assumed): found
      `favicon.ico` was referenced everywhere but never actually
      existed — every page was showing a blank browser-tab icon.
      Created one (simple "N" monogram, the site's existing accent
      blue — not a new brand decision). First attempt only embedded
      one size due to a real Pillow API gotcha (`append_images` doesn't
      reliably work for the ICO plugin); caught by verifying embedded
      sizes programmatically rather than trusting the save call, fixed
      by generating one high-res base image and letting Pillow's ICO
      writer resize internally. Now correctly multi-size (16/32/48/64px).
- [x] **Feature-toggle matrix**: phone, facebook, testimonials, and
      events all tested in every state (off, on-with-value,
      on-missing-value where applicable) — no bugs found. Confirmed
      blog/onlinePayments/expandedServiceArea are correctly unreferenced
      by any code yet, matching the "architecture only" instruction.
- [x] **Form failure-path testing** (a real gap — only success paths
      had been tested before): `notifyBox.js` and `partBoxOrder.js`
      both correctly show an error message and re-enable their submit
      button on network failure and on server-reported failure. No bugs
      found.
- [x] **Video-only PC listing** (no images at all) — tested with
      synthetic data, renders correctly, no bugs found.
- [x] **Alt text audit** — every `<img>` across all 10 pages has
      non-empty alt text. Clean.
- [x] **Heading hierarchy audit** — found and fixed 2 real issues:
      `contact.html` skipped h1→h3 (4 info-card headings promoted to
      h2), `custom-build.html` skipped h2→h4 (6 process-step headings
      promoted to h3). Renamed the matching CSS selectors
      (`.contact-info-card h3`→`h2`, `.pl-content h4`→`h3`) so styling
      didn't silently break when the tags changed.
- [x] **ARIA consistency audit** — aria-controls targets, aria-expanded
      initial values, aria-haspopup/aria-labelledby all checked across
      all 10 pages. Clean, no issues.
- [x] **SEO re-verification** post-image-optimization: confirmed the
      Open Graph image reference still resolves (filename didn't
      change), sitemap.xml still lists all 10 pages correctly.
- [x] Full functional regression sweep (zero JS errors, hamburger,
      footer year) re-run across all 10 pages after every fix in this
      round.

## Completed so far (continued, live-site critique fixes)

- [x] **#1 — Contact form now works with zero JavaScript.** Owner
      reviewed the live beta directly and found the form's `action`/
      `_next` were entirely JS-set at runtime — if JS failed, the form
      silently did nothing on submit. `stitch.py` now has a
      general-purpose build-time token system (`{{SITE_URL}}`,
      `{{CONTACT_EMAIL}}`) that bakes the real values into static HTML.
      Verified by parsing the raw built HTML with zero JS executed and
      confirming the values are already correct there. Same fix applied
      to `services.html`'s service-request form.
- [x] Also fixed a real bug found while in there: both forms' hidden
      `_subject` field had a literal `\u2014` text sequence in static
      HTML (meaningless outside JS) instead of an actual em-dash —
      FormSubmit would have emailed the literal escape text. Fixed with
      `&mdash;`; confirmed no other instance of this exists outside
      actual JS string contexts.
- [x] Full regression sweep across all 10 pages after the change —
      clean.

## Completed so far (continued, post-audit implementation)

- [x] **Batch 1 — Waitlist reliability.** The "Get Notified" box on
      `builds.html` had the same zero-JS-fallback bug as critique #1,
      just not caught by that pass — a JS-only `fetch()` call with no
      `<form action>` and no honeypot. Converted to the same real-form
      pattern as the contact/services forms. See DECISIONS.md D16 for
      the full writeup and verification steps.
- [x] **Batch 1 follow-through (owner live-tested it).** Real-browser
      testing surfaced two more things, both fixed and verified across
      multiple devices: FormSubmit was showing its own generic
      "Thanks!" page instead of redirecting, fixed with FormSubmit's
      documented `_url` hidden field (D17); and `SITE.url` didn't match
      where the site is actually live, now synced to
      `https://pcman369.github.io/NBPCs-BETA` and the same `_url` fix
      applied to `contact.html`, `services.html`, and the build-detail
      inquiry form for consistency (D18). Owner will update `SITE.url`
      again once the final domain/repo is settled.
- [x] **Batch 2 — Small accessibility fixes.** Gallery photos/thumbnails
      (`gallery.html` and `build.html`) are now keyboard-reachable and
      operable with Enter/Space — previously mouse-only. All four real
      submission forms (contact, services, build inquiry, waitlist) now
      announce their "message sent" confirmation to screen readers via
      `aria-live`. No visual changes. See DECISIONS.md D19 for the full
      writeup, including why the waitlist needed a slightly different
      approach than the other three. `part-boxes.html`'s order form was
      intentionally left out — still on the old JS-only pattern,
      revisit once that gets its own reliability fix.
- [x] **Batch 3 — Lightbox focus management.** The one shared lightbox
      (`gallery.html`) now moves focus to its close button on open,
      remembers whichever grid item triggered it, traps Tab/Shift+Tab
      within its own buttons while open (adapting correctly to
      prev/next being hidden for a single photo), and restores focus
      to the trigger on close — however it's closed (Escape, the close
      button, or clicking the dark overlay). No visual changes.
      `build.html`'s gallery is a different, non-modal pattern and
      wasn't affected. See DECISIONS.md D20.
- [x] **Batch 4 — Touch targets.** Four icon-only buttons that were
      under the 44×44 comfort threshold are now at it: the mobile
      hamburger, `build.html`'s gallery prev/next, the lightbox's
      prev/next on mobile, and the part-boxes quantity stepper.
      Decorative numbered badges and already-adequate full-width nav
      rows were left alone — see DECISIONS.md D21 for the full sweep
      and reasoning. CSS-only, no layout or visual-glyph changes.
- [x] **Special task — sold-PC gallery fallback.** Homepage gallery
      preview now reads `builds.js` directly instead of the separate,
      already-drifting `gallery.js` list — available-PC media first,
      falls back to sold/completed builds if none are available (the
      real current state — 0 available, 3 sold), empty state if
      neither. Also now shares the same lightbox component as
      `gallery.html` (previously non-interactive), and `galleryGrid.js`
      gained real video-clip support in the process, per the task's
      requirements. See DECISIONS.md D22 for the full writeup,
      including a correction of an earlier miscount of how many builds
      actually exist in `builds.js`.
- [x] **Redesign Batch 1 — homepage visual redesign ("Forge").**
      Established the new dark/amber visual system on the homepage
      only: full-bleed-leaning hero, one new evidence-based trust
      section (replacing the old cards + numbered-circle process
      steps), a restructured custom-builds section with no numbered
      circles or highlight-boxes, and a new asymmetric gallery grid —
      all built from existing real content, nothing invented. New
      `css/homepage-forge.css` is scoped to `body.theme-forge`
      (`index.html` only), so the other 9 pages are confirmed
      byte-for-byte unchanged. See DECISIONS.md D23 for the full
      writeup, including a real structural conflict found (the old
      trust section is a component shared with `build.html`) and three
      real bugs caught and fixed during screenshot verification.

## Not started yet

- Phase 6 remainder: general visual/micro-interaction polish (image
  optimization is done — see above).
- Phase 8: docs/handoff (a consolidated maintenance/deployment guide —
  flagged as a gap back in the "is anything left from the prompt"
  audit, still not built).

## Known open questions (not yet blocking, but will be before their phase)

- Business email handling: still the personal Gmail, sourced from one
  place (`config.js`) everywhere now instead of scattered, but the
  underlying exposure in client-side source is inherent to the
  no-backend FormSubmit approach regardless. Still needs an explicit
  owner call on whether that's fine long-term.

## Audit implementation plan (current)

Owner ran a full audit of the finished site and is working through the
findings in small, verified batches — one batch per response, verified
and documented before moving to the next. Order:

- [x] **Batch 1 — Waitlist reliability.** Done, see above / D16.
- [x] **Batch 2 — Small accessibility fixes.** Done, see above / D19.
- [x] **Batch 3 — Lightbox focus management.** Done, see above / D20.
- [x] **Batch 4 — Touch targets.** Done, see above / D21.
- [x] **Special task — sold-PC gallery fallback.** Done, see above / D22.

This completes every item in the owner's post-audit implementation
plan. The design-review phase followed (owner reviewed the live site,
then three disposable visual-direction prototypes in
`design-prototypes/` — not part of the production site). Owner chose
Prototype 3 ("Forge") as the redesign foundation.

## Redesign implementation plan (current)

"Keep the engine, redesign the body": preserve the data/build
architecture, forms, accessibility work, and SEO infrastructure;
restructure presentation-level HTML/CSS where it's tied to the old
visual language. Working in small batches, one page group at a time,
verified and documented before moving on.

- [x] **Batch 1 — Homepage.** Done, see above / D23.
- [x] **Batch 2 — Rest of the site.** Done, see D24 for full rationale.
      All 9 remaining customer-facing pages redesigned in one pass, as
      the owner asked: builds.html, build.html, services.html,
      about.html, contact.html, gallery.html, faq.html,
      custom-build.html, part-boxes.html. Summary of what actually
      changed (not just the plan — this is the as-shipped state):
      - `css/homepage-forge.css` → `css/theme.css`, unscoped from
        `body.theme-forge` to plain global rules (that class no
        longer exists anywhere). Every page now loads
        `<link rel="stylesheet" href="css/theme.css">` as its last
        stylesheet. `pages-src/index.html`'s `<body class="theme-forge">`
        is back to a plain `<body>`.
      - `theme.css` picked up a few more hardcoded-blue instances only
        reachable from the other 9 pages (`.page-hero` gradient,
        `.tier-badge`, `.box-category`, `.listing-perf-card`,
        `.listing-system-badge`, `.listing-form-card`) on top of
        everything Batch 1 already swept.
      - `js/render/trustSection.js` was rewritten (this was the
        "safe to touch now" item flagged below) — the old 3
        icon-cards + numbered 5-step strip are gone, replaced by one
        `renderTrustEvidence()` function outputting the same
        `.evidence`/`.evidence-checklist` pattern Batch 1 shipped on
        the homepage, with the *same real copy* reused verbatim (not
        reworded) — same facts, same visual language, both places.
        `js/render/buildDetail.js` was updated to call it; the old
        `.listing-process` boxed wrapper is gone too (the evidence
        pattern doesn't need it).
      - `custom-build.html`'s numbered-circle 6-step process
        (`.process-list`/`.pl-num`) is now a `.cb-list`/`.cb-row`
        divided list (same pattern as the homepage's custom-builds
        section) with plain mono step numbers instead of filled
        circles. Tier cards kept their existing markup — just
        re-themed (badge color, border) via `theme.css`.
      - `contact.html`'s 4 boxed `.contact-info-card`s are now a
        `.cb-list`/`.cb-row` divided list too (same reasoning: no
        icon, no card boundary needed for 4 short facts). The `h2`s
        inside were preserved as `h2` (not downgraded) to keep the
        heading-hierarchy fix from the post-audit pass intact.
      - `about.html` got one small addition: a new `.lede` utility
        class on the opening paragraph. No content changes.
      - `services.html`, `builds.html`, `build.html`, `gallery.html`,
        `faq.html`, `part-boxes.html` needed no markup changes beyond
        the `theme.css` link — their existing cards/grids already read
        colors from CSS custom properties, so they re-themed
        automatically via the token cascade.
      - Dead CSS from the removed patterns was cleaned up, not just
        orphaned: `.card-icon`, `.process-list`/`.process-list-item`/
        `.pl-num`/`.pl-content`, `.process-steps`/`.process-step`/
        `.step-num`/`.step-icon` (all 4 of its responsive breakpoints
        too), and `.listing-process` are all gone from
        `style.css`/`build-detail.css`, confirmed zero remaining
        references anywhere in the codebase before removal.
      - **Testing performed, and its honest limits:** `stitch.py`
        rebuild succeeded (10/10 pages). Every touched JS file passes
        `node --check`. Every touched CSS file parses cleanly under a
        real CSS parser (not just brace-counting). A jsdom-based smoke
        test (`smoke-test.js`, left in the repo root) loads all 10
        built pages, runs their real scripts, and asserts on the
        resulting DOM — including loading `build.html?id=may26-01`
        (a real inventory entry) and confirming the evidence section
        renders with 5 rows and zero leftover old markup. **What this
        is not:** real-browser visual verification. `npx playwright
        install chromium` was attempted and fails cleanly at the
        browser-binary download step — this sandbox's network
        allowlist doesn't include Playwright's CDN. No screenshots
        exist for Batch 2. The owner has not seen any of this in an
        actual browser yet.

**Explicitly deferred until after the above + a real visual redesign
phase** (owner will provide screenshots/browser views for that phase):
typography, major visual redesign, mobile header redesign, broad
spacing-token cleanup, broad SEO restructuring, new features, Stripe,
testimonials, blog, expanded service area, phone/Facebook activation.

**Explicitly deferred further still, to its own proposal-first step
after the visual redesign**: owner's live-site critique #2
(pre-rendering JS-driven content into static HTML at build time) is
now folded into a future "build-time rendering" architecture
experiment — `stitch.py`'s current workflow must be understood and
preserved, a prototype (one non-critical component or one build-detail
page) comes before any wider change, and the owner must explicitly
approve the plan first. Critique #3 (hero photo) remains simply
blocked on the owner providing the image. A real `404.html` (mentioned
in `ARCHITECTURE.md`'s file layout but never actually built) is also
deferred to whenever the owner gets to it.

## Files that matter

- `js/data/*.js` — all content/config, no HTML editing needed for routine
  updates once Phase 2+ is done.
- `css/tokens.css` — single source of truth for color/spacing/radius values.
- `js/partials/*.html` + `build-tools/stitch.py` — shared header/footer.
  Run `python3 build-tools/stitch.py` after editing either one, or after
  adding a new file to `pages-src/`.
- `ARCHITECTURE.md` — full technical rationale.
- `DECISIONS.md` — business/architecture decision log.
