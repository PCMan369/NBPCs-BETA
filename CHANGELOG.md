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
