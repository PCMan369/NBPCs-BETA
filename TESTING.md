# TESTING.md — how to run the checks

Moved out of START_HERE.md in B-032 (content unchanged apart from layout). Read before running or reporting a test.

- `smoke-test.js` (DOM checks in jsdom): run `npm install jsdom --no-save` first (jsdom is not in the repo). It needs the
  npm registry, which depends on the chat's sandbox network settings (Lane A's account reached it; Lane B's did not,
  registry returned 403). If it cannot run, log "not run (reason)", never a pass.
- `visual-check.py` (Chromium, horizontal overflow + script errors): needs no network; Chromium is pre-installed at
  `/opt/pw-browsers` (Python and Node bindings both launch it). `python3 visual-check.py` loads the 10 pages (9 real +
  404) at 15 widths (320, 360, 375, 390, 393, 412, 428, 430, 480, 600, 700, 768, 820, 1024, 1440px) = 150 loads, writes
  nothing, prints the offending elements, and exits 1 on any overflow or script error (A-037). `--screenshots` adds PNGs at
  1440, 768 and 390px, `--screenshots-all` at every width; both write `screenshots/`, so run them on a scratch copy and
  keep that folder out of the ZIP. Fallback fonts (external requests are blocked); a missing local file counts as an error.
- Fonts: theme.css loads Google Fonts, unreachable in Lane A's sandbox, so screenshots use fallback fonts. For
  font-accurate mockups, install `@fontsource-variable/manrope`, `@fontsource-variable/bricolage-grotesque` and
  `@fontsource/space-mono` from npm in a scratch folder and inject `@font-face` rules (scratch copy only).
- Browsers: only Chromium is installed here; the owner tests in Safari (macOS responsive design mode). CSS in use that
  older engines may ignore (written to degrade gracefully, unverified outside Chromium): `text-wrap: balance`/`pretty`,
  `color-mix()`, `aspect-ratio`, animating `grid-template-rows`.
- Old docs claiming the Node/npx Playwright route "doesn't work" are outdated: only the `npx playwright install
  chromium` download step failed, and it is not needed.
