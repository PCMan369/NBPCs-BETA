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
- [ ] Phase 7: full device/feature-toggle/empty-state test pass before
      pointing the real domain/GitHub Pages slot at this build

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
