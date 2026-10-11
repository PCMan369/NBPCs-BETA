# MAINTENANCE.md — running the North Bridge PCs site

For the owner. How to change things day to day, check them, and put them on the live site. Written by Lane B in B-025
(2026-10-09) from the code as of B-024. Things that could not be checked from the project files are marked **unknown**.
For how the site is built, see ARCHITECTURE.md; for the two-chat ZIP workflow, see START_HERE.md.

## 1. The three rules

1. **Edit the sources, never the generated pages.** The 10 `.html` files in the project root (`index.html`, `builds.html`, ...)
   are generated. Page text lives in `pages-src/`, the shared header/footer in `js/partials/`, and the changing content
   (listings, FAQ, boxes, photos list, settings) in `js/data/`. Anything you type into a root `.html` file is wiped the next time
   the build script runs.
2. **After any change, run the build script** from the project folder: `python3 build-tools/stitch.py`. It needs only Python 3
   (nothing to install). It rewrites the root pages, `sitemap.xml` and `robots.txt`, and prints which web address it used.
   Changes to **data files only** (builds, boxes, FAQ, photos, events) don't strictly need it, but running it is harmless, so
   make it a habit.
3. **Check before you publish** (section 4), then commit and push (section 5).

## 2. Everyday tasks

Each data file starts with its own "how to" comment; this is the short version. Keep the commas, quotes and braces exactly
as in the entries already there. One missing comma stops the whole file from loading (see section 6).

### Add a PC listing — `js/data/builds.js`
1. Take the photos (see "Photos" below) and put them in `images/`.
2. Copy the EXAMPLE block from the top of `builds.js` and paste it at the top of the `builds` array (the file says to put new
   ones first). Fill in the details. Delete any component line you don't have info for rather than leaving it blank.
3. `id` is the listing's permanent web address (`build.html?id=...`). Format: month + year + number, like `aug26-01`.
   **Never reuse an id**, even after the PC sells.
4. `status: "available"`. `performance` numbers are estimates unless you really measured them (`isEstimate: true`).
5. Save, run the build script, preview.

### Mark a PC sold, or hide it — `js/data/builds.js`
Change `status` to `"sold"` (moves it to Recently Sold) or `"hidden"` (disappears from the site but stays in the file).
Selling does **not** move its photos to the gallery; if you want them under Completed Builds on the Gallery page, add them to
`completedBuilds` in `js/data/gallery.js` (section "Gallery" below).

### Part boxes — `js/data/partBoxes.js`
Add a box type by copying an existing entry. `id` is never reused (the next unused one is `box-13`). **Quantities don't count
down by themselves**: orders arrive as an email, and when a box sells you lower `quantity` by hand (0 = sold out, and it
drops out of the page; leave the entry in if you'll get more).

### Photos
- Use **JPEG**. Phones' HEIC pictures don't show in most browsers; convert first.
- Match the existing photos: the part-box photos are 1350 x 1800 px, about 230-400 KB each. Full-size phone photos (3-8 MB) make
  the pages slow.
- Strip the location data (EXIF/GPS) before publishing. Everything in `images/` is public.
- Put files in `images/` and refer to them as `"images/name.jpg"`. GitHub Pages is **case-sensitive**: `EliteBook.jpg` and
  `elitebook.jpg` are different files, so copy the name exactly.
- Unused images aren't removed automatically; delete them from `images/` if you stop using them.

### Gallery — `js/data/gallery.js`
Add `{ src: "images/file.jpg", alt: "short description" }` to `currentBuilds` or `completedBuilds`. Order in the file is order on
the page. The homepage's photo strip is separate: it takes photos from the listings in `builds.js`, not from this file.

### FAQ — `js/data/faq.js`
Copy a block, give it a unique `id`, write the question and answer. `featured: true` also shows it in the homepage preview.
It appears on `faq.html` automatically.

### Run a sale — `js/data/events.js`
Add an event (copy the example), set `active`, the start/end dates, the banner text and whether it shows a countdown. Then on
each discounted build in `builds.js` set `eventId` to the event's id and `eventPrice` to the sale price. To end a sale early,
set `active: false`. The sale system itself is switched on by `features.events.show` in `config.js` (it is `true` now).

### Testimonials — `js/data/testimonials.js`
Empty on purpose. Add only real ones the customer approved, in the format at the top of the file. An empty list shows nothing.

### Contact details and switches — `js/data/config.js`
- Phone number or Facebook link: set that feature's `show: true` and fill in the value. Nothing appears while `show` is false.
- **Changing the contact email:** edit `CONTACT.email` (the address forms send to) and `features.email.address` (the address shown to
  visitors), then **run the build script**, because the form address is written into the pages when they're built. The first form
  submission to a new address makes FormSubmit send a confirmation email to it; click the link in it or messages won't arrive.
  Whether the current address has already been confirmed: **unknown**.
- Business name, tagline and service area are in the same file.

### Page wording — `pages-src/*.html`
Edit the page in `pages-src/`, run the build script, preview. Shared header/footer text is in `js/partials/header.html` and
`footer.html` (change once, every page updates after the build). The FAQ, listing and form wording that appears from scripts lives
in `js/data/` and `js/render/`.

## 3. Before you start each time
Open the project folder (the one that matches the latest ZIP, with `.git` kept), and make sure no other chat is editing at
the same time. If you work with the two Claude chats, follow START_HERE.md ("Applying a returned ZIP") first.

## 4. Check before you publish
1. Run `python3 build-tools/stitch.py`. It should end with "Wrote sitemap.xml and robots.txt" and print the address in use.
2. **Preview.** The simplest way: open `index.html` from the folder in a browser. That works for browsing and for listings (checked
   for the home and part-boxes pages); form submissions need a real web address and won't send from your computer. A
   closer match to the live site: in the project folder run `python3 -m http.server` and open http://localhost:8000 .
3. Click through what you changed, on a phone-width window too: listings, a listing page, the contact picker.
4. Catch typos in data files before they bite: `node --check js/data/builds.js` (and likewise for any other file you edited)
   prints the line of the first mistake and prints nothing when the file is fine. Requires Node.js; **unknown** whether it's on your computer.
5. Optional automatic checks (what Claude runs): `npm install jsdom --no-save` then `node smoke-test.js` (page structure, needs
   Node and the internet), and `python3 visual-check.py` (screenshots and a sideways-scroll check, needs Python Playwright). They write
   `screenshots/` next to the script: don't commit that folder.

## 5. Publish
The site is hosted on GitHub Pages and you push the files to GitHub. Commit **the generated files along with your edits**
(the root `.html` files, `sitemap.xml`, `robots.txt`), because GitHub Pages serves what's in the repo; it doesn't run the build script.
1. In the project folder: `git status` (look at what changed), `git add -A`, `git commit -m "short description"`, `git push`.
2. Wait a minute or two, then reload the live site with a hard refresh (Ctrl+F5 / Cmd+Shift+R) so your browser doesn't show the old page.
3. Live address in the files: `https://pcman369.github.io/North-Bridge-PCs` (`SITE.url`).
4. Which branch and folder GitHub Pages publishes from, and whether the repository is set up for it: **unknown**. You can see it in the
   repository's Settings, under Pages.
5. Don't commit: `screenshots/`, `node_modules/`, `__pycache__/`, or scratch folders (`design-prototypes/` and similar).

## 6. If something looks wrong

| What you see | Most likely cause | Fix |
|---|---|---|
| A change doesn't show on the live site | Not pushed; build script not run; browser showing the old page | Run the build script, check `git status`, push, hard-refresh |
| A change vanished after a build | You edited a root `.html` file | Redo it in `pages-src/` (or the partial) and rebuild |
| A listing page or the box grid is empty / shows no items | A typo in a data file (missing comma, quote or bracket). Tested: the page loads but the data doesn't, and there is no error message on screen | `node --check js/data/<file>.js`, fix the line it names |
| A listing is missing | `status` is `"hidden"` or `"sold"`, or it's in the wrong spot in the array | Check `status` |
| A photo is a broken image | Wrong file name, wrong capital letters, or the file wasn't pushed | Match the name exactly; check it's in `images/` and committed |
| Form messages don't arrive | The address was never confirmed with FormSubmit, or was typed wrong | Check `CONTACT.email`, rebuild, submit once and confirm the email; check spam |
| Sitemap or link previews show the wrong address | `SITE.url` is wrong | Fix it in `config.js`, rebuild |
| A box quantity is wrong after an order | Quantities are manual | Edit `partBoxes.js` |

## 7. Other notes
- **Analytics.** A Google Analytics tag (`G-B0EGXM9JNN`) is installed on every page through `js/partials/analytics.html`. Who can see its
  reports: **unknown**.
- **Privacy:** photos, listing text and everything in `js/` are public once pushed.
- **Changing the web address** (a real domain) is more than one setting. See the domain-swap checklist when it exists (planned, not written).
- Old decisions and history: `docs-archive/DECISIONS.md` (large; search it rather than reading it). Design decisions: `VISUAL_REDESIGN.md`.
