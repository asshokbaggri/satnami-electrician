# Satnami Electrician — Single Page Site

This folder contains a ready-to-deploy static website (HTML/CSS/JS).

## How to host on GitHub Pages (FREE)

1. Create a GitHub repo, e.g. `satnami-electrician`.
2. Upload all files from this folder to the repo **root** (keep the same structure).
3. Go to **Settings → Pages** and select:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (root)
4. Click **Save**. The site will go live at `https://<your-username>.github.io/satnami-electrician/`.

### Add your Custom Domain
- Buy or use your existing domain, e.g. `www.satnamielectrician.com`.
- In this project root, there is a `CNAME` file with your domain. Keep it committed.
- In your domain DNS, add:
  - `CNAME` record for `www` → `<your-username>.github.io`
  - (Optional root) `A` records for `@` →
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`
- In **Settings → Pages → Custom domain**, enter `www.satnamielectrician.com`, click **Save**.
- Enable **Enforce HTTPS** when the certificate is issued.

## Add Gallery Photos/Videos
- Put files inside **/images** folder.
- Open `assets/js/main.js` and add file entries in `GALLERY_ITEMS`, e.g.:
```js
const GALLERY_ITEMS = [
  {{ type: 'img', src: 'images/work1.jpg' }},
  {{ type: 'img', src: 'images/work2.jpg' }},
  {{ type: 'vid', src: 'images/site-tour.mp4' }},
];
```
- Commit and push; site updates automatically.

## Edit Team Slider Images
- Replace `images/team1.jpg ... team4.jpg` with your team photos.
- The slider loads them automatically; file names are already referenced in `index.html`.

## Colors
- Black (#000), Yellow (#FFC400), White (#FFFFFF) are set in `assets/css/style.css`.
