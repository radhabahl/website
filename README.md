# Radha Bahl — Portfolio

A single-page portfolio site for Radha Bahl. It's plain HTML, CSS and JavaScript, so it runs on GitHub Pages without a build step.

**Live URL (once Pages is on):** https://radhabahl.github.io/website/

## Structure

```
index.html              The whole page
404.html                Not-found page
.nojekyll               Tells GitHub Pages to serve files as-is
assets/css/styles.css   All styles
assets/js/main.js       Resume link, mobile menu, scroll effects
assets/img/             Optimised WebP images, favicon, social preview
```

## Add the resume link

Open `assets/js/main.js` and paste the link into the first line of code:

```js
const RESUME_URL = 'https://drive.google.com/file/d/XXXX/view';
```

All the "Resume" buttons (nav, hero, footer) will use it. Until then, clicking them shows a "Resume coming soon" message.

To host the PDF in this repo instead, add it as `assets/Radha-Bahl-Resume.pdf` and set:

```js
const RESUME_URL = 'assets/Radha-Bahl-Resume.pdf';
```

If you use a Google Drive link, set the file's sharing to "Anyone with the link".

## Deploy to GitHub Pages

1. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Portfolio site"
   git push -u origin main
   ```
2. On GitHub, open the repo → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at https://radhabahl.github.io/website/.

If you later use a custom domain, update the `og:url`, `og:image` and `canonical` URLs at the top of `index.html`.

## Preview locally

Open `index.html` in a browser, or run a small server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Links used on the page

| Item | Link |
| --- | --- |
| Research paper (IJHSS) | https://www.internationaljournalssrg.org/IJHSS/2026/Volume13-Issue3/IJHSS-V13I3P107.pdf |
| Research paper (IJSSRR) | https://www.ijssrr.com/journal/en/article/view/3447/2361 |
| Hasta Kalā label | https://www.hastakala.co.in/ |
| Inheritance documentary (embedded) | https://youtu.be/C3F-KIzLZxg |
| Inheritance site | https://www.hastakala.co.in/film |
| Workbook on Amazon | https://www.amazon.com/dp/B0H72GWCJT |
| Workbook on Flipkart | https://dl.flipkart.com/s/0Xbpk_NNNN |
| Workbook on Notion Press | https://notionpress.com/in/read/hasta-kal |
| Resume | *Placeholder: set `RESUME_URL` in `assets/js/main.js`* |
| Art Portfolio | *Placeholder: set `ART_PORTFOLIO_URL` in `assets/js/main.js`* |
