# COPY_BRIEF.md — message brief for the copy rewrite (draft 1, marked by the owner)

Recorded by Lane B in B-050 from the owner's marked answers (picker page "Message brief: draft 1"). **Draft, not final:** the owner
wants to decide first whether and how faith-based values belong in the copy (see "Open point"). Later copy drafts must trace
every claim to this file. Marks: Right / Change / Drop (facts); Lead / Include / Skip; Use / Maybe / Skip; Keep / Maybe / Drop.

## 1. Facts the copy can rely on
- [Right] One person does everything: builds, cleans, stress tests and checks every system.
- [Right] Parts are mostly used. The power supply and case are almost always new.
- [Change] Every system is cleaned, stress tested under load, temperature-checked, and has current drivers before pickup. If a
  system fails a test it will likely not be sold. A minor flaw (for example a slightly throttling graphics card) may still be sold,
  but any flaw is always made clear.
- [Right] Performance numbers on listings are estimates based on real-world expectations for that hardware, not benchmarks run.
- [Right] Pickup is in person near Grants Pass, usually at a meeting spot between us. Delivery may be possible for a fee.
- [Right] Payment is mostly cash. Other methods may be possible.
- [Change] No returns. After a sale the owner can help troubleshoot over email. It is not a warranty or a repair service.
- [Change] Linux is installed on request at no extra charge, except advanced distros or configuration, which may cost extra.
- [Right] Custom builds are built around the buyer's budget (site examples ~$500, ~$800, ~$1,200; tier details unconfirmed).
- [Right] Started May 2026, balancing it with school, says plainly that he is new.
- [Right] Usually replies within a day or two.
- [Right] Email addresses are only used to reply, or to notify people who joined the waitlist.
- [Right] Based in Grants Pass, also serving Medford, Ashland and nearby.
- [Right] Empty PC part boxes are sold separately ($3 to $5 each) for shipping, storage or resale.

## 2. Who the site talks to (all four: Include; none is the single lead, buyer unknown)
First-time and budget gamers; parents buying for a kid; enthusiasts and upgraders; local-first buyers.

## 3. Voice
**A. Straight-talking:** "I build gaming PCs, test every one, and tell you exactly what you're getting, good and bad."

## 4. Selling points
- Use: honest specs and performance estimates, clearly labeled as estimates. Meet in person near Grants Pass and see it running.
  Custom builds around your budget. Used parts, priced fairly, with a new power supply and case. "I do the whole process from
  parts to product - if you have a question I can answer it." (owner's wording)
- Maybe: built and tested by one person; free Linux setup if you want it (see Linux fact: advanced distros may cost extra);
  I'll tell you about a system's limits before you buy; straight prices, no upsells.

## 5. Taglines
- Keep: "Gaming PCs, honestly built and tested." / "Ready to play, built around your budget."
- Maybe: "One builder. Every PC tested. Straight answers." / "Built in Grants Pass. Picked up in person." / "Used parts, tested
  hard, priced fair." / "Gaming PCs without the guesswork."
- Drop: "Your local gaming PC builder." / "Real specs. Real person. Real local."

## 6. Things the copy should avoid
Absolute guarantees ("no shortcuts, no exceptions", "nothing ever runs hot"); hype words unless absolutely accurate (beast,
ultimate, insane, best); saying or implying a part is new when it is used; promising returns, a warranty or repairs; presenting
estimates as measured results; repeating the list of towns on every page; accidentally copying other companies' copy or taglines;
claims like "cheapest" or "lowest price" that can't be backed up.

## 7. Open point (owner)
Before finalizing step 1: whether and how to bring faith-based values into the copy (principles in the wording, and/or quoting
Bible verses). Pros and cons were discussed in chat (B-050); the owner decides. The brief stays draft until then.

## 8. What this changes on the live site (found while recording; not yet edited)
- `js/data/faq.js` "Do you offer Linux?" says "no extra charge" and lists Arch. Fact 8 now says advanced distros or configuration
  may cost extra, so that answer is misleading as written. `contact.html` ("Linux Available") and `custom-build.html` ("Linux
  available on request", three tier cards) say nothing about a fee and are fine as written.
- Fact 3 (a flawed system may be sold if the flaw is disclosed) fits the site's existing "if a system has a limitation, I'll tell
  you"; the checklist wording ("pushed under sustained load to check for stability") stays accurate.
