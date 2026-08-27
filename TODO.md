# TODO.md — North Bridge PCs Website Rebuild

## Required (blocks launch)

- [ ] Confirm the 3 proposed-but-unconfirmed items in DECISIONS.md (D2
      Services page structure, D3 countdown toggle, D5 brand carryover)
- [x] Nav restructuring: flat nav → "For Sale" dropdown/accordion (see
      DECISIONS.md D6) — Services deliberately stayed flat, see D6 note
- [x] Part Boxes system: `js/data/partBoxes.js`, card renderer, multi-item
      order-request page, `part-boxes.html` (see DECISIONS.md D6) — done
- [x] Phase 2: shared header/footer partials + `stitch.py` build script
- [x] Phase 2: homepage
- [x] Phase 3: Services page content (owner-provided wording/pricing) — done
- [x] Phase 3: real PC inventory migrated into the new schema
- [x] Phase 3: About Me content (owner-provided) — done, but see
      Recommended below re: the `[Your Name]` placeholder
- [x] Phase 4: contact form (see DECISIONS.md D7 — consolidated to one
      unified form since build.html now has its own embedded inquiry form)
- [x] `custom-build.html`, `faq.html`, `gallery.html`, `services.html`,
      `about.html` — built, tested
- [x] Phase 5: sitemap, robots.txt, structured data, Open Graph — done,
      built against the placeholder URL, verified swap-safe (see
      DECISIONS.md D10)
- [ ] When the real domain arrives: update `SITE.url` in
      `js/data/config.js`, re-run `stitch.py`, set up a fresh Google
      Search Console property for the new domain, submit the
      regenerated `sitemap.xml` there
- [x] Phase 7: functional/programmatic testing (link integrity, feature
      toggles, form success+failure paths, empty-state, accessibility
      structure, SEO) — done, see DECISIONS.md D14. **Not covered**:
      actual visual rendering in a real browser (sandbox has none).
- [x] Image optimization: 11 real photos, 12.47MB → 4.50MB (63.9%
      reduction), EXIF/GPS metadata stripped (one photo had precise
      GPS coordinates embedded — see DECISIONS.md D13)
- [x] Contact form works with zero JavaScript now (owner's live-site
      critique #1) — `stitch.py` bakes the real form action/redirect
      into static HTML at build time; see DECISIONS.md D15
- [x] Post-audit implementation Batch 1: "Get Notified" waitlist
      (builds.html) now works with zero JavaScript — converted to a
      real `<form action="...">` with the same honeypot/`_next`
      pattern as contact.html, instead of a JS-only `fetch()` call
      with no fallback; see DECISIONS.md D16
- [ ] Owner's live-site critique #2: pre-render JS-driven content
      (PC listings, trust cards, FAQ, service cards, gallery) into
      static HTML at build time, so it isn't empty when JS fails or
      isn't run — **deferred** (owner is planning bigger changes here);
      moved into the future build-time-rendering architecture
      experiment (see ARCHITECTURE.md and the post-audit implementation
      plan in PROJECT_STATUS.md) — not started, explicitly sequenced
      after the current audit-fix batches and the visual redesign
- [ ] Owner's live-site critique #3: replace the hero image fallback
      text with a real photo — blocked, waiting on owner to provide it
- [ ] Homepage gallery-preview logic ("sold-PC gallery fallback"):
      prioritize available-PC photos/video, fall back to sold-PC media
      when nothing's available, empty state if neither, sourced from
      `builds.js` directly (not the separate `gallery.js`) — deferred,
      scheduled as its own step in the current implementation plan
      after the reliability/accessibility batches (see PROJECT_STATUS.md)
- [ ] Create a real `404.html` (doesn't exist yet — `ARCHITECTURE.md`'s
      directory layout mentions one, but it was never actually built) —
      deferred, owner will do later

## Recommended

- [x] Fill in `[Your Name]` placeholder in `about.html` — done, "Jacob Skrove"
- [ ] Decide whether to carry over the "sold" builds from the old site into
      the new sold-PC gallery, or start that section fresh
- [ ] Decide on business email handling (see DECISIONS.md open item)
- [ ] Testimonials — collect any real ones that exist, or leave the
      section off (toggle is already safe either way; owner confirmed
      leaving it off for now)
- [ ] Part boxes: no real inventory yet — `partBoxes.js` is empty on
      purpose, same as builds.js started. Add real box types whenever
      ready; the page already handles 0/1/many gracefully.

## Optional

- [ ] Manual light/dark toggle (architecture already supports adding this
      later without restructuring tokens)
- [ ] Flyer generator / QR code integration with the new build pages

## Future / explicitly disabled for now

- [ ] Blog/articles (toggle exists in config.js, nothing else built)
- [ ] Online payments / Stripe (no scaffold built — reassess when actually
      being implemented, per the project brief)
- [ ] Customer accounts (not planned)
- [ ] Expanded service area copy (don't write until the area actually
      expands)
