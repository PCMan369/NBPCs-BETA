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
docs-archive/LOG-B052-B053.md in B-063, B-054 and B-055 to
docs-archive/LOG-B054-B055.md in B-065, B-056 and B-057 to
docs-archive/LOG-B056-B057.md in B-066, B-058 and B-059 to
docs-archive/LOG-B058-B059.md in B-067, B-060 and B-061 to
docs-archive/LOG-B060-B061.md in B-070, B-062 and B-063 to
docs-archive/LOG-B062-B063.md in B-072, B-064 and B-065 to
docs-archive/LOG-B064-B065.md in B-074, B-066 and B-067 to
docs-archive/LOG-B066-B067.md in B-076, B-068 and B-069 to
docs-archive/LOG-B068-B069.md in B-078. Keep about the
newest 10 entries here; the newest entry always stays (the next-ID rule reads it).

B-070 | complete | 2026-10-21
Task: Copy pass step 4i: apply the owner's choices for the Gallery page; rename "Sold History" to "Sale History"; decide on the EliteBook photos. Lane B.
Files: M pages-src/gallery.html, pages-src/builds.html, COPY_BRIEF.md, COPY_REVIEW.md, COPY_MAP.md, START_HERE.md, LOG.md; A docs-archive/LOG-B060-B061.md; root gallery.html and builds.html regenerated.
Changed:
- Gallery: title, description (owner's edit), hero intro, both section labels/headings/text, bottom box and buttons ("Browse Gaming PCs", "Start a Custom Build").
- "Sold History" kicker is now "Sale History" (Gaming PCs page; COPY_MAP).
- EliteBook photos left in place (owner got the laptop in a trade; no wording changed because of it). Two polish items added.
Decision: balanced; all five picks applied as chosen. Photo removal or reordering left to the owner (data only).
Verified: `visual-check.py` clean (150 loads); real Chromium at 1440 and 390 px: new text, no overflow or script errors; on a scratch copy with one current photo added, the "Available Now" section shows; builds page shows "Sale History"; `smoke-test.js` not run (jsdom install fails: network).
Next/open: Part Boxes picker, then 404; then the purposeful-repetition review, polish list, name change and Lane A's redesign.

B-071 | complete | 2026-10-21
Task: Draft the Part Boxes page picker (copy pass step 4). Lane B, docs only.
Files: M COPY_REVIEW.md, START_HERE.md, LOG.md. No site file changed. Published page: "Copy pass step 4: Part Boxes page".
Changed:
- Picker (7 lines): title and description, hero, request panel, request form, confirmation message, condition lines on the cards (data), empty state; each with three options, a recommendation and a reason.
- Key recommendations: the page uses the name "Part Boxes" like the nav and Contact row; descriptions stay generic (no prices or box types, B-047); condition lines lose their dashes (three data lines change); empty state button becomes "Send a Message".
- One option asks the owner to confirm how orders are handled (it says boxes are confirmed as still in stock): marked "only if true".
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors, copy output checked; title and description options checked for length (29-41, 120-133). Docs only, no site tests run.
Next/open: owner's choices; apply; then the 404 page.

B-072 | complete | 2026-10-21
Task: Copy pass step 4j: apply the owner's choices for the Part Boxes page; balance checked first. Lane B.
Files: M pages-src/part-boxes.html, js/render/partBoxOrder.js, js/render/partBoxCard.js, js/data/partBoxes.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B062-B063.md; root part-boxes.html regenerated.
Changed:
- Part Boxes: title, description, heading, intro, request panel ("Total", not "Estimated Total"), form placeholder and note, confirmation message, empty state and its "Send a Message" button.
- Condition lines in partBoxes.js set from the owner's list (dashes gone; "Includes insert(s)"; the Fair box now says "No inserts").
- Small markup: hidden field `estimated_total` renamed `total` (it shows in the order email).
Decision: balanced; all seven picks applied as chosen, plus the owner's change to the total label. Three polish items added.
Verified: `visual-check.py` clean (150 loads); real Chromium (1440, 390 px): new text, adding a box gives "Total $10" and hidden fields `items_requested`, `total`; thank-you page text; empty state on a scratch copy with all quantities 0; no script errors or overflow; `smoke-test.js` not run (jsdom install fails: network).
Next/open: 404 picker; then the purposeful-repetition review, polish list, name change, Lane A's redesign.

B-073 | complete | 2026-10-21
Task: Draft the 404 page picker (copy pass step 4, the last page); correct the Part Boxes note on the RTX 3060 (owner: it is an example). Lane B, docs only.
Files: M COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md. No site file changed. Published page: "Copy pass step 4: 404 page".
Changed:
- Picker (2 lines): title and description; the message with its buttons. A is a light touch; B and C add an offer to help and a third button ("Send a Message"). Services-page mention left out on purpose (the page cannot tell which link brought the visitor).
- Corrects: B-072. The RTX 3060 "box" in partBoxes.js is only the example in the "how to add a box" comment, so all 12 real boxes have a condition line; the wrong remark is removed from COPY_BRIEF.md and COPY_REVIEW.md.
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors, copy output checked; title and description options checked for length (33-38, 35-99). Docs only, no site tests run.
Next/open: owner's choices; apply; then the copy pass is done: purposeful-repetition review, polish list, name change, domain-swap checklist, Lane A's redesign.

B-074 | complete | 2026-10-21
Task: Copy pass step 4k: apply the owner's choices for the 404 page, the last page; balance checked first. Lane B.
Files: M pages-src/404.html, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B064-B065.md; root 404.html regenerated.
Changed:
- 404: title, description, text ("it has moved. Check the link, or try one of these."); heading and both buttons unchanged. Text only.
- The first copy pass is complete: every page has owner-approved wording. START_HERE.md, COPY_REVIEW.md and COPY_BRIEF.md state it; Lane A's minor redesign is no longer waiting on the copy pass.
Decision: balanced; both picks applied as chosen.
Verified: `visual-check.py` clean (150 loads); real Chromium at 1440 and 390 px: new title, description, text and buttons, robots tag still noindex, no overflow or script errors; sitemap still excludes it; `smoke-test.js` not run (jsdom install fails: network).
Next/open: the owner chooses what comes first: the purposeful-repetition review or the polish list; then the name change, the domain-swap checklist, and Lane A's redesign when the owner asks.

B-075 | complete | 2026-10-21
Task: Purposeful-repetition review (owner chose it first after the copy pass): survey the repeated messages and draft the picker. Lane B, docs only.
Files: M COPY_REVIEW.md, START_HERE.md, LOG.md. No site file changed. Published page: "Purposeful repetition: standard wording".
Changed:
- Surveyed the rendered text of all pages (home, listings, Gaming PCs, Custom Builds, Part Boxes, About, Gallery, FAQ, Contact, 404) for ten candidate messages.
- Picker (7 messages, each with a standard wording, the pages it belongs on and the exact changes): hands-on promise, "see it running", the truth promise, reply time, pickup label, "ready-to-buy"/"available", home-page echoes. Plus a list of wording already identical (no choice needed).
- COPY_REVIEW.md: status and findings under "Purposeful repetition".
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors, copy output checked. Docs only, no site tests run.
Next/open: owner's choices; apply them (about 10 small text changes across home, About, Contact, Custom Builds, FAQ, listing script); record the standard wordings in COPY_BRIEF.md; then the polish list.

B-076 | complete | 2026-10-21
Task: Purposeful repetition: apply the owner's choices (all seven option A); balance checked first. Lane B.
Files: M pages-src/index.html, pages-src/custom-build.html, pages-src/about.html, pages-src/contact.html, js/render/buildDetail.js, js/render/buildCard.js, js/render/trustSection.js, js/data/config.js, COPY_BRIEF.md, COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B066-B067.md; root index.html, custom-build.html, about.html, contact.html regenerated.
Changed:
- Standard wordings applied: "I build and test every PC myself" (Custom Builds), "you can see the system running" (home, step 06), the promise "exactly what you're getting, good and bad" (About), "I usually reply within a day or two" (Contact block, listing thank-you, unused config note), "Pickup in person near Grants Pass" (listing description), "ready-to-buy" and "available" (Contact).
- Home echoes: step 03 (also the listing pages, which share it), empty-state sentence, gallery label "Photos", bottom heading "Want to Talk It Through?".
- COPY_BRIEF.md section 21 records the standard wordings (table) and the rule: change one everywhere or nowhere.
Decision: balanced; nothing severe. Mild effects noted on the polish list (listing description says "Grants Pass" twice; "running" twice in one home point; "listed" still three times in the home empty state).
Verified: `visual-check.py` clean (150 loads); real Chromium (1440, 390 px): every new string present and every old one gone, no overflow or script errors; on a scratch copy with one listing available, the form sub-line and thank-you show the new wording; `smoke-test.js` not run (jsdom install fails: network).
Next/open: the polish list, the business-name change, the domain-swap checklist; Lane A's redesign when the owner asks.

B-077 | complete | 2026-10-21
Task: Start the polish list: sort every open item and draft the picker for the wording ones. Lane B, docs only.
Files: M COPY_REVIEW.md, START_HERE.md, LOG.md. No site file changed. Published page: "Polish list: small wording fixes".
Changed:
- COPY_REVIEW.md "Polish status": the list was spread over three places; every open item is now sorted (wording to decide, closed on purpose, waiting, Lane A, later chunks). Two old items marked closed/done (tested; budget tiers).
- Picker (10 small fixes, each with three options and a recommendation): Contact custom-form heading and "Pick" echo; Custom Builds "five checks", "GPU", budget-card buttons, "what's listed"; home See-it-running point; listing description's double "Grants Pass"; FAQ after-sale paragraph; Part Boxes "my builds". Items closed on purpose are listed at its top.
- START_HERE.md owner queue updated; question to the owner: refresh or retire COPY_MAP.md.
Decision: none yet; the owner's choices come back from the picker.
Verified: picker tested in Chromium (phone and desktop, light and dark), no errors, copy output checked. Docs only, no site tests run.
Next/open: owner's choices; apply as B-078; then the name change and the domain-swap checklist.

B-078 | complete | 2026-10-21
Task: Polish list: apply the owner's ten choices (all option A); balance checked first. Lane B.
Files: M pages-src/contact.html, pages-src/custom-build.html, pages-src/index.html, js/render/buildDetail.js, js/data/faq.js, COPY_REVIEW.md, START_HERE.md, LOG.md; A docs-archive/LOG-B068-B069.md; root contact.html, custom-build.html and index.html regenerated.
Changed:
- Contact: custom-form heading "Custom Build", intro "Choose what fits below...", Part Boxes row "left over from my builds". Custom Builds: "five steps", "graphics card" (also the same sentence in the home budget table), three buttons "Send a Message →", "see what's available right now".
- Home See-it-running point "before you buy it". Listing search description "Built and tested by North Bridge PCs. Pickup in person near Grants Pass, Oregon." FAQ after-sale paragraph shortened (data).
- Text only; no markup change.
Decision: balanced; nothing severe. Notes on the polish list: "Send a Message" is on six Custom Builds buttons (the "Ready Now" one has no arrow); the home checklist still says "GPU"; a sold listing still says "See what's listed now".
Verified: `visual-check.py` clean (150 loads); real Chromium (1440, 390 px): every new string present and old ones gone on contact, custom-build, home and FAQ (items opened), no overflow or script errors; listing description checked on a scratch copy with one listing available; `smoke-test.js` not run (jsdom install fails: network).
Next/open: the owner checks the whole site with the new copy; refresh COPY_MAP.md (owner: refresh, not retire); the name change; the domain-swap checklist.
