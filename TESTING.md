# TESTING.md — how to run the checks

Moved out of START_HERE.md in B-032 (content unchanged apart from layout). Read before running or reporting a test.

- `smoke-test.js` (DOM checks in jsdom): run `npm install jsdom --no-save` first (jsdom is not in the repo). It needs the
  npm registry, which depends on the chat's sandbox network settings (Lane A's account reached it; Lane B's did not,
  registry returned 403). If it cannot run, log "not run (reason)", never a pass.
- `visual-check.py` (Chromium screenshots + horizontal-overflow check): needs no network; Chromium is pre-installed at
  `/opt/pw-browsers` (Python and Node bindings both launch it). Run it on a scratch copy: it writes `screenshots/`, which
  must not go into the ZIP. It only checks 1440, 768 and 390px; extend its `breakpoints` for the mobile pass (A-031's
  ad hoc check covered 320, 360, 375, 390, 393, 412, 428, 430, 480, 600, 700, 768, 820 and 1024px).
- Fonts: theme.css loads Google Fonts, unreachable in Lane A's sandbox, so screenshots use fallback fonts. For
  font-accurate mockups, install `@fontsource-variable/manrope`, `@fontsource-variable/bricolage-grotesque` and
  `@fontsource/space-mono` from npm in a scratch folder and inject `@font-face` rules (scratch copy only).
- Browsers: only Chromium is installed here; the owner tests in Safari (macOS responsive design mode). CSS in use that
  older engines may ignore (written to degrade gracefully, unverified outside Chromium): `text-wrap: balance`/`pretty`,
  `color-mix()`, `aspect-ratio`, animating `grid-template-rows`.
- Old docs claiming the Node/npx Playwright route "doesn't work" are outdated: only the `npx playwright install
  chromium` download step failed, and it is not needed.
