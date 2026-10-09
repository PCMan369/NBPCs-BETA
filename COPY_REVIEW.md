# COPY_REVIEW.md — site text audit (planning input for the copy pass)

Written by Lane B in B-020 (2026-10-08), read-only: **no copy was changed.** Based on the A-013/B-019 files and on the pages as
rendered in Chromium with every build marked sold (the site's current state). Findings are about accuracy and role, not about
rewording. "Role" below means what the text is for, judged from its style and placement; placements may change in the redesign,
so each item names its place by file so it can be found again. Where something can't be checked from the files it says
**unknown**, and the owner has to confirm it.

Where the text lives: `pages-src/*.html` (page copy, titles, meta descriptions), `js/data/faq.js`, `js/data/builds.js`
(summaries, notes), `js/data/partBoxes.js`, `js/partials/header.html` and `footer.html`, and strings inside
`js/render/*.js` (empty states, form success messages, the "what happens before pickup" section).

---

## Part 1 — Text that is incorrect or may mislead

### A. Wrong against the current files or state (checked)

1. **Part-boxes meta description says "GPU, CPU, and case packaging"** (`pages-src/part-boxes.html`, description and og:description).
   The listings are CPU, PSU, cooler and motherboard boxes. There is no GPU box and no case box. This text shows in search results
   and link previews.
2. **Intro copy written for stock, shown above "nothing in stock".** All five builds are sold, so these pairs contradict each other:
   - Home "Available Systems": "Cleaned, tested, and ready for pickup. Performance estimates listed for every system." sits directly above
     "No Systems Listed Right Now" (`pages-src/index.html`).
   - `builds.html` lede: "Cleaned, stress tested, and ready for local pickup... Every listing includes real specs..." above "Nothing Listed Right Now".
   - Home hero primary button "View Gaming PCs" and the page titles "Gaming PCs for Sale..." (home, builds) lead to an empty-state page.
   - Gallery "Current Builds — Systems that are currently available or in progress." above "Photos coming soon."
     (the "coming soon" line is in `js/render/galleryGrid.js`).
   - Contact picker "Buying a Gaming PC — I'll check it against what's currently available."
3. **FAQ says every system is capable of gaming, but one sold system is a laptop that is not.** FAQ "Can it run Fortnite?": "every
   system I sell is capable of running Fortnite". War Thunder: "runs well on all the systems I sell." The EliteBook listing
   (`js/data/builds.js`) says it is not a gaming PC and "will not perform very well in most PC games". The EliteBook is also listed
   under "Gaming PCs / Recently Sold", with no performance estimates, while the same page says every listing has them.
4. **Process claims that can't apply to the laptop.** The home checklist says "CPU and GPU pushed under sustained load" for every
   system, and the EliteBook has no dedicated GPU. Its own summary says "cleaned and tested", not stress tested.
5. **FAQ describes build classes the site does not sell.** "Mid-range systems... can handle Epic settings" and "High-end builds
   run it at 1440p". All listings so far are one class (1080p High, $400–$649). Not false, but it isn't backed by anything on the site.
6. **Budget tiers vs. real listings (possible mismatch, unknown).** Custom-build tiers: ~$500 = "GTX 1080 / RX 580 class",
   ~$800 = "RTX 3060 / RX 6700 class", ~$1,200 = "RTX 3070 / RX 6800 class". Sold listings were $549–$649 with RTX 2060 / RX 5700 XT /
   RTX 2070 Super, which is stronger than the $500 tier. Either the tiers undersell, or the listings were priced low. Owner to confirm
   which numbers reflect current parts prices.
7. **Duplicate, slightly different tier text.** The home table and the three custom-build cards describe the same three budgets in
   different words (e.g. "Good starting point without overspending" vs "A good starting point if you're getting into PC gaming without
   overcommitting on budget").

### B. May mislead a reader (wording could be read the wrong way)

8. **"Serving Grants Pass, Medford, Ashland..."** (home hero, contact, custom-build, gallery, structured data `areaServed`) next to
   "pickup is in person" and "exact address shared after we've confirmed a sale". It does not say where pickup happens, so a
   Medford or Ashland reader may expect delivery or a meet-up. Whether you meet elsewhere: **unknown**.
9. **Privacy line: "won't be shared or used for anything else"** (contact forms, notify box, listing inquiry form).
   Messages go through the third-party FormSubmit service (`formsubmit.co`), and the site loads Google Analytics (`partials/analytics.html`).
   The sentence is about the email address and is probably meant that way, but it reads as a stronger promise than the
   setup supports. There is no privacy page. **Unknown** whether that is a problem; flagging it only.
10. **Absolute claims.** "no shortcuts, no exceptions" (home); "Nothing runs hot, no surprises after pickup" (home); "The specs listed are accurate" (home).
    They are fine only if true for every system without exception. The EliteBook's CPU (exact generation) and Windows version are noted in
    `builds.js` comments as **not confirmed**, so "Intel Core i5" and "Windows" are vague rather than wrong.
11. **Performance estimates vs. "tested".** The numbers are estimates "based on real-world expectations for that hardware"
    (home), while the checklist says the system is stress tested. A reader can mistake the fps figures for measured results. The listings
    do say "Estimated". The FAQ says they "reflect typical gameplay". Three different descriptions of the same thing.
12. **"Linux available on request", "no extra charge", "set up before pickup"** (header, contact, FAQ, tier cards). Plausible and
    repeated consistently; I can't check it, so the owner should confirm it is a firm offer.
13. **Notify box: "one-time heads up"** vs. success message "I'll reach out when something comes in that might be a good fit".
    Probably consistent (one message when something fits) but could be read as "only ever one email". Minor.
14. **"I typically respond within a day or two"** (contact, success messages) is the owner's promise; **unknown** if it holds.

### C. Gaps (not wrong, but a buyer will look for them and won't find them)

15. No stated payment methods ("cash or payment at pickup" is the only mention), returns/refunds, or "sold as-is" statement. The FAQ
    says support is not a warranty but never says what happens if the system is dead on arrival.
16. Whether parts are new or used is not stated anywhere (the data suggests used/older parts: RTX 2060, 2070 Super). Buyers ask.
17. Custom builds: no timeframe on that page (only on About, "can run longer during the school year"), and nothing about deposits
    or who buys the parts first.
18. The old services URL now shows the generic 404 page, with no mention that repair/services are no longer offered. Minor.

---

## Part 2 — Text with an important role that is not doing it well

Ordered by how prominent the role is (hero first). "Idea" = what the text says; "wording" = how it says it.

1. **Home hero (H1 + body + two buttons).** Role: the first thing every visitor reads.
   - Wording: the H1 is clear and keyword-friendly but generic; the body paragraph is a long single sentence that lists three towns.
   - Idea: it says what and where, not why this seller. The real differentiators (one person, honest, local, tested, Linux)
     sit lower on the page. The primary button points at the empty listings (item 2 above) while the second button, the live offer,
     is secondary.
2. **Call-to-action buttons sitewide.** Role: tell the reader what happens next.
   - Eight different labels for roughly the same next step: Send a Message, Send Message →, Contact Me →, Reach Out →, Start the
     Conversation →, Get Started → (four times on the contact picker, identical), Talk Budget → (three times), Ask About a Custom Build.
   - Idea: the contact picker's four "Get Started →" buttons are identical, so the title next to each does all the work.
3. **Empty states (home "No Systems Listed", builds notify box, gallery "Photos coming soon", part-boxes).** Role: right now these are the
   main content of the shopping pages.
   - The home and builds pages use different headings for the same situation ("No Systems Listed Right Now" vs "Nothing Listed Right Now").
   - "Photos coming soon." is placeholder language, and gives a visitor nothing.
   - Idea that works: the notify form (ask what they're looking for, tell them what happens next) is the strongest piece here. It
     is long for its job and the "Privacy:" line is flat.
4. **The "What actually happens before pickup" trust section** (home; repeated as "Why North Bridge PCs / What You're Getting" on every
   listing). Role: main reason to trust a stranger's used-parts PC. Strongest idea on the site.
   - Wording: the five steps are generic ("Dust removed", "Thermals verified"), the claims are absolute (item 10 above), and the
     lead paragraph is one dense block that mixes three ideas (accurate specs, honest estimates, a real person after pickup).
   - Idea gap: no concrete evidence of any step (how long the stress test runs, what temperature counts as OK, which tests), and nothing
     about what the buyer gets in hand (receipt, parts list).
5. **Budget tiers (home table + custom-build cards).** Role: set expectations and anchor the price.
   - Wording is vague ("Solid 1080p gaming on popular titles"); the real information (the part classes) is only on the custom-build page.
   - Duplicated in two places in different words, and possibly out of step with the listing prices (items 6 and 7).
6. **FAQ (five questions, three featured on home).** Role: answer the objections that stop a purchase.
   - Idea: the questions are two game-specific ones (Fortnite, War Thunder), Linux, upgrades, trades, support. The questions buyers
     are most likely to have are missing (item 15–17: payment, returns, new vs used, custom build timeline).
   - Wording: answers are good ("Yes — ...", "To be clear about what this is...") but long; the home preview leads with Fortnite.
7. **Contact situation picker** (five rows). Role: route the visitor to the right form.
   - "General Question" and "Other / Not Sure" overlap, and the second one apologises ("This works too").
   - The contact page puts four info blocks (Response Time, Pickup Location, Custom Builds, Linux Available) above the picker, so the
     action starts below them. The last two are sales copy rather than contact information.
8. **About page.** Role: personal trust, and the strongest human voice on the site.
   - Idea is good (honest, new, local, a student). Structure is weak: five long paragraphs in a block, and the clearest promise ("What I can promise
     is...") is near the end of the fourth. H1 "About" is generic.
   - The lede line "The short version" is followed by a long version.
9. **Page ledes under each H1** (builds, gallery, custom-build, contact). Role: say what the page is for in one breath.
   - Several repeat the same location list and "cleaned, stress tested, ready for pickup" phrase, which reads like keyword repetition,
     and tells a returning visitor nothing new. Gallery lede: "Current listings and completed builds, serving Southern Oregon."
10. **Listing summaries** (`builds.js` `summary`, shown on cards and listing pages). Role: tell this build apart from the others.
    - Three of the five are the same sentence ("Cleaned and stress tested 1080p/1440p gaming build."), a fourth differs by one
      word ("1080p"), with no price/performance or notable-part hook, so the listing grid reads as copies.
11. **Page titles and meta descriptions** (search results and link previews; `pages-src/*.html`). Role: the first impression off-site.
    - Inconsistent patterns: separators `|`, `—` and `,` mixed; some titles carry "Grants Pass OR", some don't; "for Sale" appears
      while nothing is for sale; part-boxes has the description error (item 1); `build.html` uses one static title/description for all
      listings (any per-listing title is set later by script, **unknown** whether search engines see it).
12. **Section kickers** (small labels above headings: "Built for You", "Extra From the Bench", "Photos", "Questions & Answers").
    Role: orient the reader. Some do ("Ready to Buy", "Sold History"); others repeat the heading ("Photos" over "Gallery",
    "Questions & Answers" over "Frequently Asked") or say nothing ("Built for You"). Low impact.
13. **Header tagline and nav labels.** Role: instant value proposition. "Local Pickup • Custom Builds • Linux Available" works well.
    "For Sale" groups Custom Builds (a service, not a stock item) with Gaming PCs and Part Boxes; fine, but worth a look if
    the nav changes.

Not a problem (checked and left alone): About's start date (May 2026) matches the first listing; footer availability line; 404 text; sold-listing
message; part-box condition lines (as of B-019); form success messages.

## Suggested order for the copy pass (when the owner is ready)
1. Facts first (owner answers): payment methods, returns/as-is, new vs used, where pickup happens, tier prices, privacy wording, process claims.
2. Fix the wrong/stale items (Part 1 section A) so nothing contradicts the current state or the part-box inventory.
3. Then the role work (Part 2) page by page, after Lane A finishes each page's layout, since placement changes what is worth saying.
