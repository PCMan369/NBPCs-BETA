# TODO.md — North Bridge PCs Website Rebuild

## Required (blocks launch)

- [ ] Confirm the 3 proposed-but-unconfirmed items in DECISIONS.md (D2
      Services page structure, D3 countdown toggle, D5 brand carryover)
- [ ] Nav restructuring: flat nav → "For Sale" and "Services" dropdown
      parents (see DECISIONS.md D6) — scheduled right after builds.html/
      build.html
- [ ] Part Boxes system: `js/data/partBoxes.js`, card renderer, multi-item
      order-request page (see DECISIONS.md D6)
- [ ] Phase 2: shared header/footer partials + `stitch.py` build script
- [ ] Phase 2: homepage
- [ ] Phase 3: Services page content (owner-provided wording/pricing)
- [ ] Phase 3: real PC inventory migrated into the new schema
- [ ] Phase 3: About Me content (owner-provided)
- [ ] Phase 4: contact form(s) + inquiry routing
- [ ] Phase 5: sitemap, robots.txt, structured data, Open Graph
- [ ] Phase 7: full device/feature-toggle/empty-state test pass before
      pointing the real domain/GitHub Pages slot at this build

## Recommended

- [ ] Decide whether to carry over the "sold" builds from the old site into
      the new sold-PC gallery, or start that section fresh
- [ ] Decide on business email handling (see DECISIONS.md open item)
- [ ] Testimonials — collect any real ones that exist, or leave the
      section off (toggle is already safe either way)

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
