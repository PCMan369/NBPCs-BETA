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

## Still open

- Whether any real testimonials exist to seed that system (owner
  confirmed: not yet — leave disabled).
- How to handle the business email being visible in client-side source
  (inherent to the FormSubmit approach without a backend — needs an
  explicit owner call on whether that's acceptable).
