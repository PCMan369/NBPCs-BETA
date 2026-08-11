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

**Phase 1 — Foundation** (in progress)

Per the phase plan: project structure, configuration system, content/data
structure, feature toggles, design tokens, base CSS, accessibility
foundations, responsive foundations. No page HTML yet — that's Phase 2.

## Completed so far

- [x] Phase 0 Discovery — inspected the old repo directly (cloned via git,
      not just the rendered pages). Full inventory in ARCHITECTURE.md.
- [x] Three foundational decisions locked (see DECISIONS.md): Services gets
      a dedicated page/nav item; the old one-off "Back to School" event is
      NOT carried over as-is, replaced with a general-purpose event/promo
      system; site follows system light/dark preference.
- [x] Project directory structure created.
- [x] `js/data/config.js` — feature toggles + site identity + contact routing.
- [x] `js/data/builds.js` — upgraded PC schema (structured components instead
      of one title string). Contains one clearly-marked EXAMPLE entry only —
      no real inventory has been migrated yet.
- [x] `js/data/services.js` — service list scaffold (names only; no public
      wording/pricing yet — that's owner-provided content, Phase 3).
- [x] `js/data/events.js` — new general-purpose event/promo system. No event
      currently active. Countdown display is a per-event toggle (see
      DECISIONS.md — this is a proposed resolution, flagged for owner
      confirmation, not yet a fully locked decision).
- [x] `js/data/testimonials.js` — empty scaffold, toggle-off-safe.
- [x] `css/tokens.css` — design tokens, light + dark via
      `prefers-color-scheme`. Colors/radii/shadows carried forward from the
      old site's existing dark palette (blue accent `#3b82f6`) as the
      starting brand identity, with a derived light palette. Flagged for
      owner confirmation, not a fresh brand invention.
- [x] `css/base.css` — reset, accessibility foundations (focus states,
      reduced-motion), responsive breakpoint scale carried over from the old
      site (1100 / 900 / 640 / 420px).

## Not started yet

- Phase 2 (Core Site): global nav/footer partials + build-time stitcher
  script, homepage, core reusable render components, basic SEO
  infrastructure.
- Phase 3 (Business Content): Services page content, Available PCs page,
  build detail page, Sold PCs, About Me, testimonials, empty-state/waitlist
  page wiring.
- Phase 4 (Contact): inquiry-type-specific forms.
- Phase 5 (SEO/Local): structured data (LocalBusiness JSON-LD), Open Graph
  tags, sitemap covering dynamic build pages, canonical URLs — none of this
  exists in the old site either; net-new work.
- Phase 6–8: media/polish, testing, documentation/handoff.

## Known open questions (not yet blocking, but will be before their phase)

- **Services page structure**: proposed as a hub page — Sales and Custom
  Builds get short cards linking to their existing dedicated pages; Repair,
  Upgrades, Cleaning/Maintenance, and Tech Support get real content directly
  on the Services page since they don't have inventory-driven pages of their
  own. Stated as a proposal in this conversation, not yet explicitly
  confirmed.
- **Event countdown**: `js/data/events.js` supports a per-event
  `showCountdown` flag rather than baking a countdown in or out globally.
  Proposed resolution to the countdown-timer tension flagged in Phase 0,
  not yet explicitly confirmed.
- **Brand carryover**: proposing to keep the existing blue accent (`#3b82f6`)
  and dark-first palette rather than inventing a new identity, since the
  business already has this color + a logo in use elsewhere (flyers, GPU
  bracket). Not yet explicitly confirmed.
- Repair/upgrade/cleaning/support: actual public-facing descriptions,
  pricing, and policy wording still needed from the owner (Phase 3 blocker).
- About Me content, real testimonials (if any), and real PC inventory data
  still needed from the owner (Phase 3 blocker).
- Business email handling: old site has the personal Gmail hardcoded in
  visible client-side source. No fix proposed yet — needs an explicit owner
  call on whether that's acceptable long-term or worth a lightweight
  mitigation.

## Immediate next step

Finish Phase 1: build `css/style.css` base component styles are NOT part of
Phase 1 (that's Phase 2 — core reusable components). Phase 1 is essentially
complete pending the owner confirmations above. Next real step is Phase 2:
shared header/footer partials + the build-time stitch script, once the
Services-page structure proposal above is confirmed (it affects what goes
in the nav).

## Files that matter

- `js/data/*.js` — all content/config, no HTML editing needed for routine
  updates once Phase 2+ is done.
- `css/tokens.css` — single source of truth for color/spacing/radius values.
- `ARCHITECTURE.md` — full technical rationale.
- `DECISIONS.md` — business/architecture decision log.
