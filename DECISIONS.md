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

---

## Still open (tracked in PROJECT_STATUS.md, not yet decision points)

- Public wording/pricing/policy for repair, upgrades, cleaning, tech
  support (needed before Services page gets real content).
- About Me content — bio, experience, motivations (must come from owner,
  never invented).
- Whether any real testimonials exist to seed that system.
- Real PC inventory data in the new richer schema (currently only one
  clearly-marked example entry exists).
- How to handle the business email being visible in client-side source
  (inherent to the FormSubmit approach without a backend — needs an
  explicit owner call on whether that's acceptable).
