# LOG.md — completed chunks, newest last

Append-only. Entry header: `<lane>-<number> | complete|partial | <date or unknown>`.
Next number = highest in the header lines below + 1 (see START_HERE.md).
Files: A=added M=modified D=deleted, from a real diff of uploaded vs. returned project.
Rollover: entries B-001 to A-022 were moved verbatim to docs-archive/LOG-B001-A022.md in B-032, A-023 to A-027 to
docs-archive/LOG-A023-A027.md in A-037, A-028 and A-029 to
docs-archive/LOG-A028-A029.md in A-039, A-030 to B-032 to
docs-archive/LOG-A030-B032.md in A-042, A-033 and A-034 to
docs-archive/LOG-A033-A034.md in A-044, A-035 and A-036 to
docs-archive/LOG-A035-A036.md in B-046, A-037 and A-038 to
docs-archive/LOG-A037-A038.md in B-048, A-039 to A-045 to
docs-archive/LOG-A039-A045.md in B-055, B-046 and B-047 to
docs-archive/LOG-B046-B047.md in B-057, B-048 and B-049 to
docs-archive/LOG-B048-B049.md in B-059, B-050 and B-051 to
docs-archive/LOG-B050-B051.md in B-061, B-052 and B-053 to
docs-archive/LOG-B052-B053.md in B-063. Keep about the
newest 10 entries here; the newest entry always stays (the next-ID rule reads it).

B-054 | complete | 2026-10-15
Task: Record the agreed selling-point rebalance (owner: yes) and start step 4 with a picker for the home page's first screen. Lane B, docs only.
Files: M COPY_BRIEF.md, START_HERE.md, LOG.md. No site file changed. Published page: "Copy pass step 4: home page, first screen".
Changed:
- COPY_BRIEF.md: the rebalance (merge honesty points, add "Ready to play", trim the second place name, after-sale help to FAQ/contact/listings) and the final six home points.
- Picker: page title, search description, the two hero buttons, where the six points go (new strip, folded in, or off the home page) and the strip heading; each with a recommended option and a reason.
Decision: pending (the owner's choices come back from the picker).
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors; title and description options checked for length. Docs only; no site tests run.
Next/open: owner's choices; then apply the home first screen (small markup change if the strip is chosen) and draft the rest of the home page.

B-055 | complete | 2026-10-15
Task: Copy pass step 4a: apply the home page first screen and add the "How I Work" strip (owner's picker choices; balance checked first). Lane B.
Files: M pages-src/index.html, js/partials/header.html, css/theme.css, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-A039-A045.md; root *.html regenerated (header on all 10).
Changed:
- Home: title, search description, H1, intro and both hero buttons now the owner's wording; header tagline now "Gaming PCs, honestly built and tested." on every page.
- Small markup/CSS change (allowed, owner B-049): new "How I Work" section (six points in the existing `.grid-3`) and a 3-rule `.point` style in theme.css.
- LOG.md rolled over (A-039 to A-045, verbatim).
Decision: balanced; the one overlap (the word "tested" three times near the top) is left for the owner.
Verified: `visual-check.py` clean (150 loads); real Chromium at 1440/768/390/320 px: header one line, six points 3-wide/2-wide/1-wide, no overflow; `smoke-test.js` not run (jsdom install fails: network).
Next/open: owner review; then the rest of the home page (Available Systems, checklist, Custom Builds, gallery, FAQ, contact sections).

B-056 | complete | 2026-10-15
Task: Copy pass step 4b: apply the owner's choices for the home page's Available Systems section, its empty state and the checklist section; balance checked first. Lane B.
Files: M pages-src/index.html, js/render/buildCard.js, js/render/trustSection.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; root index.html (and build.html text via script) regenerated.
Changed:
- Home: Available Systems heading, intro, empty state (heading, text, buttons), list button; checklist heading, lead, big line, paragraph, steps 03 and 05.
- Listing pages (trustSection.js): the same paragraph and steps 03 and 05. Small markup: the big line keeps its accent span ("before it's yours.").
Decision: balanced overall. One change to the owner's picks: step 05 uses option B, so "leaves my bench" is not repeated; the owner may switch back. "See it running" confirmed accurate.
Verified: `visual-check.py` clean (150 loads); real Chromium: home middle and a listing page show the new text, no script errors; `smoke-test.js` not run (jsdom install fails: network).
Next/open: home Custom Builds, gallery, FAQ and contact sections; the listing pages' big line; "before" is said six times in the checklist section.

B-057 | complete | 2026-10-15
Task: Start the polish list (owner: note small things for after the rewording) and draft the next picker (home page lower sections). Lane B, docs only.
Files: M COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B046-B047.md. No site file changed. Published page: "Copy pass step 4: home page, lower sections".
Changed:
- COPY_REVIEW.md: new "Polish list" (nine small items found so far, each dated by chunk) and its rule; START_HERE.md points to it.
- Picker: 12 lines (Custom Builds section, gallery, FAQ preview and which questions it shows, bottom contact section and buttons), each with a recommended option and reason.
- LOG.md rolled over (B-046, B-047 moved verbatim).
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors; docs only, no site tests run.
Next/open: owner's choices; then apply them and move to the next pages.

B-058 | complete | 2026-10-15
Task: Copy pass step 4c: apply the owner's choices for the home page's lower sections (Custom Builds, gallery, FAQ preview, contact); balance checked first. Lane B.
Files: M pages-src/index.html, js/data/faq.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; root index.html regenerated.
Changed:
- Home: Custom Builds heading, intro, button and budget lines; gallery heading and text; FAQ preview label, heading, text, button; bottom text (adds the usual reply time) and second button.
- faq.js: "Are the parts new or used?" is now featured, so the home preview shows four questions (data setting only).
Decision: balanced; echoes noted on the polish list ("Recent" twice, "Questions" in two headings). The Linux FAQ answer is misleading and now first in line.
Verified: `visual-check.py` clean (150 loads); real Chromium (1440, 390 px): new text on the page, four FAQ questions, no script errors or overflow; `smoke-test.js` not run (jsdom install fails: network).
Next/open: FAQ page copy (Linux answer first), then the Gaming PCs page and listing pages.

B-059 | complete | 2026-10-15
Task: Record the owner's note about a minor redesign after the copy pass; draft the FAQ page picker (Linux answer first). Lane B, docs only.
Files: M COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B048-B049.md. No site file changed. Published page: "Copy pass step 4: FAQ page".
Changed:
- COPY_REVIEW.md "For Lane A" (six known places) and START_HERE.md Lane A line: a minor redesign for the new wording and paragraph sizes comes after the copy pass.
- Picker: Linux answer (fee fix), Fortnite answer, a new "pickup and payment" question, trades, the after-sale question and answer, the FAQ page title, label and bottom section; each with a recommended option and reason.
- LOG.md rolled over (B-048, B-049 moved verbatim).
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors; docs only, no site tests run.
Next/open: owner's choices (confirm which Linux distros are free); then apply, and move to the Gaming PCs page and listing pages.

B-060 | complete | 2026-10-15
Task: Copy pass step 4d: apply the owner's choices for the FAQ page; balance checked first. Lane B.
Files: M pages-src/faq.html, js/data/faq.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; root faq.html regenerated.
Changed:
- faq.js: Linux answer (free for common distros, extra cost possible for advanced ones, told first), shorter Fortnite answer, trades answer, new after-sale question and answer, new "How do pickup and payment work?" entry (data, before trades).
- faq.html: title, search description, label, heading, intro, bottom text and second button.
Decision: balanced; the Linux fix and the payment and delivery answer close two audit findings. Two echoes added to the polish list.
Verified: `visual-check.py` clean (150 loads); real Chromium: FAQ page lists eight questions in the new order, the home preview shows the new after-sale question, no script errors; `smoke-test.js` not run (jsdom install fails: network).
Next/open: Gaming PCs page and the single listing pages (including the checklist big line).

B-061 | complete | 2026-10-15
Task: Two FAQ fixes from the owner, then draft the Gaming PCs and listing pages picker. Lane B.
Files: M pages-src/faq.html, js/data/faq.js, COPY_BRIEF.md, START_HERE.md, LOG.md; A docs-archive/LOG-B050-B051.md; root faq.html regenerated. Published page: "Copy pass step 4: Gaming PCs and listing pages".
Changed:
- Linux answer also says to ask about something different (owner confirmed the distro list is right); FAQ bottom line is now "No question is too basic or too technical."
- Picker (9 lines): Gaming PCs title, description, heading, intro and sold section; sign-up box; listing page title and description (they said "for sale" even for sold listings), question form, sold and not-found text, pickup line and checklist big line; each with a recommendation.
- LOG.md rolled over (B-050, B-051 moved verbatim).
Decision: none yet on the picker.
Verified: faq.html carries both changes, stitch exit 0; picker tested in Chromium (phone and desktop, light and dark), no errors. No site tests run beyond that (text-only change).
Next/open: owner's choices for the picker; then apply.

B-062 | complete | 2026-10-15
Task: Copy pass step 4e: apply the owner's choices for the Gaming PCs and single listing pages; balance checked first; note the planned name change. Lane B.
Files: M pages-src/builds.html, pages-src/build.html, js/render/buildDetail.js, notifyBox.js, trustSection.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; root builds.html and build.html regenerated.
Changed:
- Gaming PCs page: title, description, intro, sold text; sign-up box text, button, confirmation. Listing pages: script-made title and description (no more "for sale" on sold listings), form, sold notice, "More Gaming PCs" box, not-found, pickup line, checklist big line.
- To match: static head of build.html, the "Start a Custom Build" button in the box, and the thank-you button "Browse Gaming PCs".
- COPY_REVIEW.md: a "Name change" section (where the name appears, one-pass plan) and three polish items.
Decision: balanced. The owner plans to change the business name; that is a later single pass.
Verified: `visual-check.py` clean (150 loads); real Chromium on a scratch copy (one listing flipped to available): titles and descriptions, form, sold notice, box, not-found and the empty-state sign-up box show the new text, no script errors; `smoke-test.js` not run (jsdom install fails: network).
Next/open: Custom Builds, Contact, About, Gallery, Part Boxes and 404 pages; then the polish list, the name change and Lane A's minor redesign.

B-063 | complete | 2026-10-15
Task: Draft the Custom Builds page picker (copy pass step 4). Lane B, docs only.
Files: M START_HERE.md, LOG.md; A docs-archive/LOG-B052-B053.md. No site file changed. Published page: "Copy pass step 4: Custom Builds page".
Changed:
- Picker (8 lines): title and description, label/heading/intro, process section, steps 03/05/06, budget intro and footnote, the three budget cards, "Not sure" section, "Ready now" section; each with a recommended option and reason.
- Key recommendation: remove named GPU classes from the budget cards (the owner is unsure they match what was sold) and mark the fps figures "Typically".
Also: START_HERE.md copy-pass paragraph rewritten (it had garbled from repeated edits) and brought back toward its size budget; LOG.md rolled over (B-052, B-053 moved verbatim).
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors; description options checked for length (154, 155, 149). Docs only, no site tests run.
Next/open: owner's choices; then apply, then Contact, About, Gallery, Part Boxes, 404.

B-064 | complete | 2026-10-15
Task: Copy pass step 4f: apply the owner's choices for the Custom Builds page; balance checked first. Lane B.
Files: M pages-src/custom-build.html, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; root custom-build.html regenerated.
Changed:
- Custom Builds: title, description, intro, process text (one paragraph) and button, steps 03/05/06, budget intro, footnote and cards (no named graphics cards, "Typically" on fps), "Not Sure" section (two paragraphs), "Ready Now" section and buttons.
- Small markup: two paragraphs removed (process section, "Not Sure" section) because the owner's text merges them; spacing kept by adjusting one inline margin.
- Owner's edit changed: "adding a monitor later" -> "using more than one monitor" (the owner does not sell monitors). Five polish items added, including the Contact form's "Need a Monitor?" field.
Decision: balanced.
Verified: `visual-check.py` clean (150 loads); real Chromium at 1440 and 390 px, screenshots viewed: process and "Not Sure" sections keep their spacing, no overflow or script errors; `smoke-test.js` not run (jsdom install fails: network).
Next/open: Contact, About, Gallery, Part Boxes and 404 pages (the Contact picker starts with the "Need a Monitor?" field).
