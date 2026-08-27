# DECISIONS.md — North Bridge PCs Website Rebuild

Meaningful business and architecture decisions, in the order they were made.
Trivial implementation choices (CSS class names, helper function names) are
not logged here.

---

### D1 — This is a ground-up rebuild, not an in-place edit
The old site (`pcman369/North-Bridge-PCs`) stays live and untouched. It's
reference material only. New code lives in a separate project and will
replace the old repo's contents when ready to launch, not before.
**Decided by:** owner, explicit instruction.

### D2 — Services gets a dedicated page and nav item
Repair/diagnostics, upgrades, and cleaning/maintenance were not represented
anywhere on the old site (only PC sales and custom builds had real estate).
The new site gives services a real page and nav entry.
**Decided by:** owner, explicit choice among 3 options.
**Not yet decided:** exact page structure. Current proposal (unconfirmed):
Services page acts as a hub — Sales/Custom Builds get short cards linking
to their existing dedicated pages, while Repair/Upgrades/Cleaning/Support
get their real content directly on the Services page.

### D3 — Old one-off sale event is not carried over; general-purpose event system instead
The old site's hardcoded "Back to School" event (with live day-countdown)
is not being reproduced as-is. Instead, `js/data/events.js` is a reusable
system supporting multiple future promotions (holiday sales, back-to-school,
clearance, etc.) with their own date ranges and banner copy.
**Decided by:** owner, in response to a countdown-timer question — but the
owner's answer described the desired *system* rather than confirming or
rejecting the countdown display specifically. **Proposed resolution
(not yet explicitly confirmed):** countdown display becomes a per-event
`showCountdown` toggle rather than a sitewide yes/no, so a real fixed
deadline can show one while a soft/ongoing sale doesn't have to.

### D4 — Light/dark theme follows system preference
The old site was dark-only. New site defaults to `prefers-color-scheme`
with dark as the fallback, per the project brief's own default guidance.
**Decided by:** owner, explicit choice among 3 options.

### D5 — Brand colors/identity carried forward from the old site (proposed, unconfirmed)
Rather than inventing a new palette, `css/tokens.css` reuses the old site's
blue accent (`#3b82f6`) and dark palette as the base, with a light-mode
palette derived from it. Rationale: this isn't a new business or a new
brand — the business already uses this color and an existing logo
elsewhere (flyers, the 3D-printed GPU bracket). Treated as a proposed
default, not a locked decision, since brand identity calls for explicit
sign-off per the project brief.
**Status:** proposed by Claude, needs explicit owner confirmation.

### D7 — Contact form consolidated from two variants into one
The old site's `contact.html` had two form variants toggled by a
`?system=X` URL parameter: a "simple" pre-filled version (reached by
clicking a build card) and a "full" general/custom-build version. In
the new architecture, `build.html` has its own embedded inquiry form
(see D-notes in CHANGELOG's Phase 3 entry) — nothing links to
`contact.html?system=X` anymore, so the "simple" variant's only purpose
no longer applies. `contact.html` is now just the one form (identical
fields to the old "full" variant), with its FormSubmit destination and
redirect URL now sourced dynamically from `config.js`/`window.location`
instead of hardcoded.
**Decided by:** Claude, technical simplification — no customer-facing
capability was removed (asking about a specific system is still one
click away, just on that system's own page now), so treated as an
ordinary implementation choice rather than a business decision requiring
sign-off. Flagged here for visibility regardless.

### D2/D3/D5 status update
Not corrected across two subsequent "continue" turns — Phase 2 proceeded
on all three as accepted. Still easy to revisit: D2 only affects
`services.html` (not yet built), D3 only affects `js/data/events.js`
(no event is currently active, so nothing customer-facing depends on it
yet), D5 only affects `css/tokens.css` (isolated, single file).

---

### D6 — Part Boxes resale system + two-level nav restructuring (planned, not yet built)
Owner wants a "PC Part Boxes & Packaging" resale system (empty component
boxes from flips) — brand/model, quantity available, and multi-item order
requests. Same data/render pattern as PC builds, no payment backend
needed (order requests still get fulfilled in person like everything
else). Quantity tracking will be manual, same as marking a PC sold —
flagged to the owner as a real constraint, not hidden.

Paired with this: restructure the flat nav into two dropdown parents —
"For Sale" (Gaming PCs / Custom Builds / Part Boxes) and "Services"
(Repair / Upgrades / Cleaning / Support) — replacing the flat nav shipped
in Phase 2. Owner's call, delegated grouping/labeling details to Claude.
**Decided by:** owner, explicit request.
**Sequencing:** deliberately after the in-flight Gaming PCs Phase 3 work
(builds.html/build.html) finishes, so the nav isn't retrofitted mid-page.
Both done together in one pass, since the nav change exists to serve
this feature.

**Nav restructuring — done.** "For Sale" is now a real dropdown (desktop)
/ accordion (mobile) over Gaming PCs, Custom Builds, and Part Boxes.
**Services was deliberately kept as a flat link, not a matching
dropdown** — a technical call, not asked about, since it doesn't change
customer-facing meaning: 4 of its 6 sub-services (Repair/Upgrades/
Cleaning/Support) still have `show:false` and no real copy yet. A
dropdown listing four mostly-empty destinations would be worse than the
current single link to a hub page. Once those four have real content,
Services can become a matching dropdown with the same mechanism — the
`{{activegroup:...}}` token added to `stitch.py` already supports it,
no architecture change needed then.

**Part Boxes system — done.** `js/data/partBoxes.js` (empty, no real
inventory yet — same "schema first, real data later" pattern as
builds.js), `js/render/partBoxCard.js`, `js/render/partBoxOrder.js`
(tracks quantities across cards, builds a running itemized summary, no
real cart/checkout), and `part-boxes.html`. Order requests submit as one
itemized inquiry via the same FormSubmit pattern as everything else —
fulfillment (payment, pickup) still happens in person, matching current
business practice. Quantities are manually maintained, not automatically
decremented (no backend) — flagged to the owner up front, not discovered
later.

### D8 — Services and About content added
Owner provided real facts for all 4 pending services (Repair &
Diagnostics, Upgrades, Cleaning & Maintenance, Support) and About Me.
Converted directly into customer-facing copy — no new prices, turnaround
times, or guarantees were introduced beyond what was given. `services.js`
schema extended (`included`/`pricingNote`/`turnaroundNote`/`notCovered`)
since a one-line description wasn't enough to represent the real
constraints (e.g. "not every repair is worth doing," "no guaranteed
performance increase") honestly. `services.html` and `about.html` built;
"About" added to the nav (flat link, between Services and Gallery).
**Decided by:** owner-provided content, Claude did the copywriting.
**Flagged, not yet resolved:** `about.html` has a `[Your Name]`
placeholder — no name was provided anywhere. Needs the owner to fill
that in (or tell Claude what to put there).
**Also confirmed:** testimonials stay off — no real ones exist yet, the
architecture already handles this safely (empty array + toggle, from
Phase 1). No changes needed there.

### D9 — Owner name added, turnaround claim corrected, dedicated service-request form added
Three fixes from owner review:
1. `[Your Name]` placeholder replaced with "Jacob Skrove" in `about.html`.
2. **Corrected an error from the original business input**: the notes
   said turnaround is slower "during the summer... because of school,"
   but the owner clarified summer is actually *faster* (less going on)
   and it's the school year that can run slower. Fixed in both
   `about.html` and `services.html`'s policy blurb.
3. Owner flagged that `services.html` linked to the general contact
   form (budget/games/Wi-Fi/monitor/RGB fields), which doesn't fit
   someone asking about a repair or upgrade. Added a dedicated
   service-request form directly on `services.html`: name, email, a
   service dropdown (populated from `services.js`, not hardcoded — can't
   list a service that doesn't exist above it), what the system is
   (optional), and what's going on. Each of the 4 service detail cards
   got a "Request This Service" button that pre-selects that service in
   the dropdown and scrolls to the form. Replaces the old generic
   "Contact Me" CTA box that prompted this fix.
**Decided by:** owner correction (1, 2) and owner-identified UX gap (3).

### D10 — Phase 5 (SEO) built against the placeholder URL, verified swap-safe
Owner asked whether building canonical/OG/structured-data/sitemap now,
against the placeholder GitHub Pages URL, would cause problems once a
real domain arrives in a few months. Answer: no functional risk (this
metadata doesn't affect page rendering), but it does need updating when
the domain changes — so `stitch.py` was extended to read `SITE.url`
from `config.js` as the only source for every URL it generates
(canonical tags, Open Graph, Twitter Card, JSON-LD, sitemap.xml,
robots.txt). Title/description for OG tags are read from each page's
own existing `<title>`/`<meta name="description">` rather than
duplicated by hand, so they can't drift out of sync.
**Verified, not just claimed**: temporarily changed `SITE.url` to a
fake real domain, re-ran `stitch.py`, confirmed every generated file
updated correctly and no trace of the old URL remained anywhere, then
reverted.
**Decided by:** owner question, Claude's technical judgment on how to
build it safely.
**Still to do when the real domain arrives:** update `SITE.url` in
`config.js`, re-run `stitch.py`, and — this part isn't automatic — set
up a Google Search Console property for the new domain and submit the
regenerated sitemap.xml there (a fresh GSC property is needed either
way for a new domain, independent of anything built here).

### D11 — Accessibility contrast fixes (buttons + dark-theme dim text)
Fixed the two confirmed WCAG AA contrast failures from the earlier audit,
scoped narrowly per owner instruction — no other changes.

**Fix 1 — white text on solid accent backgrounds (buttons, badges, banner):**
`--accent` (#3b82f6) with white text only reached 3.68:1. Audited every
usage first (9 locations sharing this exact pairing: buttons, nav CTA,
step/process numbers, FAQ toggle icon, back-to-top, skip link, part-box
quantity buttons, event banner) rather than fixing `.btn-primary` alone
and leaving the rest inconsistently broken. Solution: the already-existing
`--accent-h` (#2563eb, used for hover states) already reaches 5.17:1 with
white text, so it became the *resting* background for all 9; a new
`--accent-h2` (#1d4ed8, 6.70:1) became their *hover* background, since
they could no longer hover to the color they now rest at.
`--accent`/`--accent-h` themselves were NOT changed — only which
components use them for backgrounds changed, so text-color and
decorative uses of both variables are byte-identical to before.

**Fix 2 — `--dim` in dark theme:** #64748b only reached 2.79:1 against
the worst-case surface it can sit on (`--card-h`) — worse than the
3.75:1 originally reported, which had only been checked against `--bg`.
Changed to #8c9bb1 (4.70:1 against `--card-h`, 5.18:1 against `--card`,
6.32:1 against `--bg`). Light theme's `--dim` was NOT touched.

**Verified mathematically, not just asserted** — see CHANGELOG.md for
the exact numbers. Also ran the existing DOM-based functional regression
suite (all 10 pages, zero JS errors) and confirmed HTML tag balance +
CSS brace balance across every file touched.

**Found but explicitly NOT fixed (out of scope, flagged for owner):**
1. `--accent` as text color on `--card` background: 3.98:1, fails AA.
   Affects small-caps labels (section labels, tier badges) that happen
   to sit on card surfaces. Unrelated variable pairing to what was asked.
2. `a:hover` text color (`--accent-h` on `--bg`): 3.45:1, fails AA.
   Pre-existing; `--accent-h`'s *value* wasn't changed by this fix, so
   this issue is unchanged by it either.
3. Light theme's `--dim` against `--card-h`: 4.34:1, fails AA (barely).
   Newly discovered while auditing surfaces for fix 2. Owner's original
   ask named dark theme specifically; light theme left untouched pending
   a decision on whether to include it.
**Decided by:** owner-specified fix, Claude's technical implementation.

### D12 — Light-mode header bug fixed + the 3 previously-flagged contrast issues fixed
**Header bug (owner-reported: "header is same as in dark mode, looks
odd")**: root cause was `.site-header` having a hardcoded
`rgba(15, 23, 42, 0.96)` background — that's literally dark theme's
`--bg` spelled out in decimal, with no light-theme override, so the
header stayed dark navy regardless of theme. It existed because the
original hardcoded-color audit (Phase 2) only searched for `#hex`
patterns and had a blind spot for `rgba()` decimal notation. Fixed with
a new theme-aware `--header-bg` token (dark value unchanged from
before, light value is light theme's own `--bg` at the same alpha).
While investigating this, found the same blind-spot pattern affecting 5
hover-feedback backgrounds (`rgba(255,255,255,0.06)` on nav links,
dropdown links, hamburger, mobile sublinks, secondary buttons) — a
white tint is nearly invisible against an already-light surface, so
light-mode hover states would have shown almost no feedback. Fixed with
a new `--hover-tint` token (dark: unchanged white tint; light: a dark
tint instead).

**The 3 flagged-but-not-fixed contrast issues, now fixed:**
1. `--accent` as text color on `--card`: 3.98:1 (dark theme). Turned
   out more pervasive on investigation — dark theme also failed against
   `--card-h` (3.61:1), and **light theme failed against every surface**
   (3.36–3.68:1), not just the one case originally measured. New
   `--accent-text` token: dark #6aa5fb (5.30–7.13:1 across all
   surfaces), light #1a44c4 (7.19–7.87:1). `--accent` itself is
   unchanged — still used for backgrounds/borders/decorative elements.
2. `a:hover` text color: 3.45:1. Now uses `--accent-text` (same as
   resting state) with `text-decoration: underline` added for hover
   feedback, rather than inventing a third blue shade for one hover
   transition.
3. Light theme `--dim` vs `--card-h`: 4.34:1. New value #5c6b82 reaches
   4.94:1 on that surface (5.17–5.41:1 on the others).

**A real bug introduced and caught during this fix**: the first
implementation pass replaced `color: var(--accent);` via plain string
substitution, which also matched inside `border-color: var(--accent);`
and `background-color: var(--accent);` (since both end in `-color:`, a
superstring of the search text) — silently converting 6 border/
decorative-background rules that were never supposed to change.
Caught by grepping for the corrupted pattern specifically before
considering the fix complete; all 6 reverted to plain `--accent`.

**Verified mathematically** (all ratios in CHANGELOG.md) and with a full
functional regression sweep across all 10 pages (zero JS errors) plus
HTML tag-balance and CSS brace-balance checks on every file touched.
**Decided by:** owner-reported bug + owner's explicit request to fix
the 3 previously-flagged items.

---

### D13 — Image optimization, and a privacy issue found along the way
All 11 real product photos were full phone-camera resolution
(3024×4032, ~1.1MB average, 12.47MB total) despite never being
displayed larger than ~1100px anywhere on the site (the lightbox's max
width). Optimized: EXIF orientation baked into pixels first (so nothing
would render sideways once metadata was stripped), resized to a 1800px
max dimension, re-encoded at JPEG quality 82, metadata stripped.
12.47MB → 4.50MB (63.9% reduction), checked visually for quality, not
just by file size. No filenames changed, so no references anywhere
needed updating.

**Found in the process, not something being looked for**: one photo
(`may26-01-main.jpg`) had precise GPS coordinates embedded in its EXIF
data — accurate enough to pinpoint where it was taken. That metadata
was about to go into a public GitHub repo along with everything else.
Removed along with the rest of the stripped metadata; confirmed gone
by direct before/after EXIF inspection. Worth knowing for any future
photos added to this project — phone cameras embed this by default,
and it's not visible just by looking at the image.
**Decided by:** owner's "finish the pic stuff" follow-through on the
already-flagged Phase 6 item; the GPS finding was Claude's own
discovery during the work, not requested.

---

### D14 — Phase 7 testing pass: 3 real bugs found and fixed
Systematic functional/programmatic testing across all 10 pages: link/
asset reference integrity, feature-toggle matrix (every state of
phone/facebook/testimonials/events), form success *and* failure paths
(previously only success had been tested), empty/missing-content states,
accessibility structure (alt text, heading hierarchy, ARIA), and a
post-image-optimization SEO re-check.

**Real bugs found and fixed, not just checked-and-clean:**
1. `favicon.ico` was referenced on all 10 pages but never existed —
   every page showed a blank browser-tab icon. Created one (simple "N"
   monogram in the site's existing accent blue, not a new brand
   decision). First generation attempt only embedded a single 16×16
   size due to a Pillow API gotcha (`append_images` doesn't reliably
   work for the ICO plugin) — caught by verifying the embedded sizes
   programmatically rather than trusting the save call succeeded;
   fixed by generating one high-res base image and letting Pillow's
   ICO writer handle the resizing internally. Now correctly
   multi-size (16/32/48/64px).
2. `contact.html` skipped heading levels (h1 straight to h3, no h2) —
   4 info-card headings promoted to h2.
3. `custom-build.html` skipped heading levels (h2 straight to h4) — 6
   process-step headings promoted to h3.
Both heading fixes required renaming the matching CSS selectors
(`.contact-info-card h3`→`h2`, `.pl-content h4`→`h3`) so component
styling didn't silently stop applying when the tags changed — checked
for this specifically rather than assuming a tag rename is free.

**Explicitly not covered by this pass**: actual visual rendering.
This sandbox has no real browser, so nothing has been eyeballed on a
real mobile/tablet/desktop viewport, and there's been no true
cross-browser check. Everything verified here is mathematical (contrast
ratios) or structural/functional (DOM behavior, no JS errors, correct
data flow) — not visual QA.
**Decided by:** owner's request to do Phase 7 testing.

---

### D15 — Contact form now works with zero JavaScript
Owner reviewed the live beta site directly and found `contact.html`'s
(and `services.html`'s service-request form's) submission was entirely
JS-dependent: the form `action` and `_next` redirect were both set at
runtime via JS, reading `CONTACT.email` from config.js. If JS failed to
load or run for any reason, the form had no destination — a visitor
could fill it out, submit, and nothing would happen, with no error
shown. Silent lost inquiries.

**Fix**: extended `stitch.py` with a general-purpose build-time token
system (`{{SITE_URL}}`, `{{CONTACT_EMAIL}}`, both already read from
`config.js`) that bakes the real, working `action`/`_next` values
directly into the static HTML. The form now works with zero JavaScript
— confirmed by parsing the raw built HTML with no JS executed at all
and checking the values are already correct. The JS that previously set
these values at runtime was removed; the only JS remaining on these
forms is the "Message Sent" thank-you-state swap, which is a pure
enhancement — if JS fails, FormSubmit's own redirect still lands the
visitor back on the page with `?sent=true` in the URL, just without the
fancier confirmation message.

**Also fixed while in there**: both forms' `_subject` hidden field used
a literal `\u2014` text sequence directly in static HTML (a JS-style
unicode escape, meaningless outside a JS string) — FormSubmit would
have emailed the literal text `\u2014` instead of an em-dash. Replaced
with the HTML entity `&mdash;`. Confirmed this pattern doesn't exist
anywhere else that isn't inside an actual JS string context.

**Verified**: raw-HTML parse with zero JS proving the form action/next
are correct without any script running, the JS-enhanced thank-you state
still works with JS, no stray `\u201X`-style escapes remain in static
HTML anywhere in the project, and a full functional regression sweep
across all 10 pages.
**Decided by:** owner's live-site review (critique item #1) + explicit
request to fix it.

---

### D16 — "Get Notified" waitlist form now works with zero JavaScript

**Found during**: the post-launch comprehensive audit (visual/UX/
accessibility/SEO/performance/architecture review), implemented as
Batch 1 of the resulting fix plan.

**Problem**: `js/render/notifyBox.js` (the waitlist box shown on
`builds.html` whenever there are zero available systems) was the same
category of bug as D15, just not caught by that pass — it was a plain
`<div>` with a button wired to a `fetch()` call and no `<form action>`
at all. If JS failed to load or run, or the `fetch()` call itself
failed (network hiccup, an ad-blocker blocking a third-party POST,
etc.), the visitor had no way to submit — silent lost inquiries again.
It also had no honeypot spam field, unlike every other form on the
site. This mattered more than a typical dormant bug because, at the
time of the audit, all real inventory was marked sold — meaning this
box was the *only* working conversion path on the PC-sales pages.

**Fix**: converted it to the same real `<form method="POST"
action="https://formsubmit.co/...">` pattern already proven by D15 and
by the build-detail inquiry form, with `_subject`/`_captcha`/
`_template`/`_next`/honeypot hidden fields and a native
`required`/`type="email"` input instead of custom JS validation —
matching contact.html's approach exactly. Because this file is
JS-rendered (not a static `pages-src` page `stitch.py` processes), the
email address and `_next` URL are filled in with `CONTACT.email` and
`window.location` at render time, the same way `buildDetail.js`
already does it for its own inquiry form — no new email source, no
token system needed here. The old `fetch()`/AJAX submit handler was
removed; the only JS remaining is a small enhancement that swaps in a
"You're on the list" message after FormSubmit's redirect brings the
visitor back with `?notified=true` in the URL — same pattern as
contact.html's `?sent=true` handling. No other page or file references
this box's internal DOM IDs, so no other changes were needed.

**Verified**: rendered the component in an isolated Node context to
confirm the generated markup is well-formed HTML with every required
hidden field present exactly once; confirmed the success-state swap
fires only when `?notified=true` is present and not otherwise;
confirmed no other file references the removed `#notify-error` element;
full `stitch.py` rebuild in a scratch copy produced byte-identical
output for all 10 pages (this file isn't part of the static build, so
that also confirms no other page was affected); JS syntax check across
every file in `js/`.

**Decided by:** finding from the owner-requested comprehensive audit;
implemented per the owner's Batch 1 instructions.

---

### D17 — Waitlist form redirect fixed for real-browser testing (`_url` field)

**Found during**: owner's first live-browser test of the D16 fix.
Submitting showed FormSubmit's own generic "Thanks! ... Return to
original site: https://pcman369.github.io/" page instead of redirecting
to `_next`.

**Cause**: this is FormSubmit's own documented behavior, not a bug in
the `_next` value itself. Modern browsers send a stripped,
origin-only `Referer` header (no path) on cross-domain POSTs like this
one (`strict-origin-when-cross-origin` is now the default policy).
FormSubmit relies on that header to confirm the request's true origin;
when it's stripped, FormSubmit falls back to its own generic success
page instead of trusting `_next`. FormSubmit's help page documents
exactly this and recommends a hidden `_url` field with the exact page
URL as the fix.

**Fix**: added `<input type="hidden" name="_url" value="...">` to the
waitlist form, computed the same dynamic way as `_next` (this file is
JS-rendered, so it always reflects the real live URL regardless of
what `SITE.url` is configured to in `config.js`).

**Separately surfaced, not yet fixed**: the owner's test also revealed
the site is currently live at `https://pcman369.github.io/NBPCs-BETA/`,
which does not match `SITE.url` in `config.js`
(`.../north-bridge-pcs-v2`). Unlike this form, `contact.html` and
`services.html` bake their `_next` (and would need the same new `_url`
field baked in too) from that static `SITE.url` value at build time —
so if `NBPCs-BETA` really is the current live path, those two forms'
redirects are currently pointing at the wrong place, not just showing
FormSubmit's generic page. Left alone pending the owner's answer on
whether `NBPCs-BETA` is the value to bake in now, since a prior session
explicitly decided to leave the "beta" canonical URL alone rather than
keep chasing a moving target — see "Still open" below.

**Verified**: re-rendered the component simulating the exact reported
live URL (`https://pcman369.github.io/NBPCs-BETA/builds.html`) and
confirmed both `_next` and the new `_url` compute correctly; HTML
tag-balance check on the output; full JS syntax sweep; `stitch.py`
rebuild in a scratch copy — byte-identical output for all 10 pages
(confirming this JS-only change didn't touch anything build-related).

**Decided by:** owner's live-browser test report.

---

### D18 — SITE_URL synced to the live testing path; `_url` field added to the other FormSubmit forms

**Context**: D17 left the SITE_URL-vs-actual-deployed-path mismatch as
an open question rather than deciding it unilaterally. Owner confirmed
the D17 `_url` fix works (tested successfully across multiple devices)
and gave explicit direction: sync `SITE.url` to the current live path
now, since it's also useful for testing, understanding they'll change
it again later when the final domain/repo is settled.

**Changed**:
- `config.js`: `SITE.url` updated from the `north-bridge-pcs-v2`
  placeholder to `https://pcman369.github.io/NBPCs-BETA` (the owner's
  confirmed current live path).
- `pages-src/contact.html` and `pages-src/services.html`: added the
  same `_url` hidden field D17 added to the waitlist form (same
  FormSubmit-recommended fix for the browser referrer-stripping
  issue), baked from `{{SITE_URL}}` like the existing `_next` field.
- `buildDetail.js` (per-build inquiry form): added the same `_url`
  field, computed dynamically like the waitlist form since this is
  JS-rendered rather than a static `pages-src` page.
- Ran `stitch.py` for real this time and confirmed the root HTML
  reflects it — an earlier pass had only verified the rebuild in
  scratch copies without applying it to the actual project files,
  which a repeat diff caught before shipping.

**Note for later**: the owner has said they'll update `SITE.url` again
once the final domain/repo is settled — this is intentionally not a
"final" value, just the current best one for live testing. No
functional difference in `stitch.py` or the token system either way;
it's a one-line config change whenever that happens (see D10).

**Verified**: fresh `stitch.py` rebuild in a scratch copy is
byte-identical to the actual project's root files (confirms nothing
stale); zero remaining references to the old URL anywhere in the
project; HTML tag-balance check on `contact.html`/`services.html`
output — both fully balanced; both forms have all six FormSubmit
hidden fields present exactly once; full JS syntax sweep across the
project.

**Decided by:** explicit owner instruction, after confirming the D17
fix works live.

---

### D19 — Batch 2: keyboard-accessible galleries + aria-live form status

**Scope**: per the owner's batch plan — (1) make gallery controls
keyboard accessible, (2) add `aria-live` to dynamic form status
messages. No visual changes.

**Gallery keyboard access**: `.gallery-item` (`gallery.html`'s grid,
`galleryGrid.js`) and `.gallery-thumb` (`build.html`'s thumbnail strip,
`buildDetail.js`) were plain `<div>`s with only a `click` listener — a
keyboard-only visitor couldn't reach them at all, and on `gallery.html`
that meant the lightbox was completely unreachable without a mouse.
Added `tabindex="0"`, `role="button"`, and a descriptive `aria-label`
to each, plus a `keydown` handler that treats Enter/Space the same as
a click (with `preventDefault()` on Space so the page doesn't scroll).
`build.html`'s existing prev/next `<button>`s were already fine and
weren't touched.

**Form status aria-live**: confirmed via a full-project search that
`aria-live`/`role="alert"`/`role="status"` appeared nowhere before this
— every "message sent" confirmation was silent to screen readers.
Added `role="status" aria-live="polite" aria-atomic="true"` to all four
real submission forms (`contact.html`, `services.html`, the
build-detail inquiry form, the waitlist). For `contact.html`/
`services.html`/the inquiry form, the attributes go directly on the
`<form>` tag, since only its `innerHTML` is swapped on success — the
form element itself persists, which is what a live region requires.
The waitlist is different: `wireNotifyBox()` replaces `#notify-box`
itself (`outerHTML`, not `innerHTML`) with the success markup, so
putting the live-region attributes on `#notify-box` would have broken
on that exact swap. Instead added a `display:contents` wrapper
(`#notify-region`) around it — adds no layout box of its own (visually
identical either way), but gives the live region a stable node that
survives the inner swap. `part-boxes.html`'s order form was
deliberately left out of this pass — it's still on the older
JS-only-submit pattern (flagged separately, not yet converted to the
same reliable form pattern as the other four) and dormant with no real
inventory yet; revisit its accessibility once its reliability fix
happens.

**Verified**: installed `jsdom` temporarily (removed after) to test in
a real DOM rather than just reading the code — confirmed Enter and
Space both open the lightbox / advance the gallery, Space doesn't
scroll the page, other keys and Tab don't falsely trigger anything,
and plain click still works unchanged. Confirmed by node identity that
the aria-live container survives each swap (the `<form>` elements and
the new `#notify-region` wrapper are literally the same DOM node
before and after their respective success-state swaps, which is what
makes the announcement work at all). Full JS syntax sweep, HTML
tag-balance check on every page, and a `stitch.py` rebuild diffed
byte-for-byte against the shipped files.

**Decided by:** owner's Batch 2 instructions, following the original
audit's A1/B3 findings.

---

## Still open

- Whether any real testimonials exist to seed that system (owner
  confirmed: not yet — leave disabled).
- How to handle the business email being visible in client-side source
  (inherent to the FormSubmit approach without a backend — needs an
  explicit owner call on whether that's acceptable).
