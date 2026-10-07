"""
visual-check.py — Real-browser visual QA for this site, via Playwright.

Screenshots every built page at desktop/tablet/mobile and checks for
horizontal overflow. Kept in the repo for reuse by future sessions —
see DECISIONS.md D24 for why this exists and the environment quirk
that makes it work.

Environment note (Claude sandbox): Chromium is pre-installed at
/opt/pw-browsers (`PLAYWRIGHT_BROWSERS_PATH` is already set), so no browser
download is needed. Both the Python and Node Playwright bindings launch it
(checked in LOG.md B-005). An earlier note here said the Node route fails; what
failed was `npx playwright install chromium`'s download step, which is not
needed. If `playwright` is missing, `pip install playwright --break-system-packages`
and `python3 -m playwright install chromium` (finds the pre-installed browser).

Usage:
    python3 visual-check.py
Screenshots land in ./screenshots/ (created if missing), named
<page>-<breakpoint>.png. Requires the site to already be built
(run build-tools/stitch.py first if pages-src/ has changed).
"""

from playwright.sync_api import sync_playwright
import os

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "screenshots")
os.makedirs(OUT, exist_ok=True)

pages = [
    ("index.html", "home"),
    ("builds.html", "builds"),
    ("build.html?id=may26-01", "build-detail"),
    ("about.html", "about"),
    ("contact.html", "contact"),
    ("custom-build.html", "custom-build"),
    ("gallery.html", "gallery"),
    ("faq.html", "faq"),
    ("part-boxes.html", "part-boxes"),
]

breakpoints = [
    ("desktop", 1440, 900),
    ("tablet", 768, 1024),
    ("mobile", 390, 844),
]

overflow_issues = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    for bp_name, w, h in breakpoints:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        for file, slug in pages:
            url = f"file://{BASE}/{file}"
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(200)
            scroll_w = page.evaluate("document.documentElement.scrollWidth")
            client_w = page.evaluate("document.documentElement.clientWidth")
            if scroll_w > client_w + 2:
                overflow_issues.append(f"{slug} @ {bp_name}: scrollWidth={scroll_w} > clientWidth={client_w}")
            out_path = f"{OUT}/{slug}-{bp_name}.png"
            page.screenshot(path=out_path, full_page=True)
            print(f"captured {out_path} (scrollW={scroll_w}, clientW={client_w})")
        ctx.close()
    browser.close()

print("\n--- Horizontal overflow check ---")
if overflow_issues:
    for issue in overflow_issues:
        print("OVERFLOW:", issue)
else:
    print("No horizontal overflow detected on any page/breakpoint.")
