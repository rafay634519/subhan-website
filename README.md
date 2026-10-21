# Subhan Zahid Portfolio

Static site (HTML + CSS + JS). No build step.

## Edit content
Everything lives in `config.js`: name, contact, stats, work items, services, skills and media paths.
Put videos in `/videos` and images in `/assets`, then write the path, e.g. `"videos/skincare-ad.mp4"`.
Optional file: `assets/og.jpg` (1200x630) for link previews.

## Run locally
`npx serve .` or just open `index.html`.

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com > Add New > Project > import the repo.
3. Framework Preset: Other. Leave build/output empty. Deploy.

## Tips
- MP4 (H.264), reels under ~15 MB. GitHub blocks files over 100 MB; for big videos, compress them first.
- Paste your Google Drive link in `links.portfolio`.
- Optional: add a free Web3Forms key in `form.web3formsKey` to get contact-form emails directly.
