# Pocket Ledger

A small sales, profit and stock tracker that installs on a phone like an app and works offline. It is a PWA: plain HTML, no build step, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `manifest.json` | Name, colours and icons (what PWABuilder reads) |
| `sw.js` | Service worker, so the app opens with no connection |
| `icons/` | App icons, including a maskable one for Android and an Apple touch icon |
| `.nojekyll` | Tells GitHub Pages to serve every file as it is |

## Put it on GitHub

1. Create a new repository on GitHub.
2. Upload everything in this folder to the top level of the repo (keep the `icons` folder). Include `.nojekyll`; it may be hidden in your file browser.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick **main** and **/ (root)**, then **Save**.
4. After a minute the app is live at `https://YOURNAME.github.io/REPO/`. Open it on your phone and use **Install app** (Android Chrome) or **Share → Add to Home Screen** (iPhone Safari).

## Turn it into a store app with PWABuilder

1. Go to [pwabuilder.com](https://www.pwabuilder.com), paste your GitHub Pages address and press **Start**.
2. The manifest and service worker checks should both pass.
3. Choose **Package for stores** and pick Android, iOS or Windows. PWABuilder walks you through each one.

Good to know:

- **Android full-screen (no address bar):** Android needs a file at the root of your site, `/.well-known/assetlinks.json`. A repo named `REPO` is served under `/REPO/`, so it can't hold that file. Name the repo `YOURNAME.github.io` (the app then lives at the root) or use your own domain. PWABuilder generates the file's contents for you. Without it the app still works but shows a browser bar.
- **iOS** packages need a Mac with Xcode and an Apple Developer account.

## Buy links

1. Open the **Stock** tab and tap a product.
2. Paste the product page into **Where you buy it (link)** and save.
3. A **Buy** button now sits next to **Restock** on the Stock tab and under **Needs restocking** on Overview. It opens the store page.
4. The **Restock** sheet also has an **Open buying page** button at the top.
5. When the order arrives, tap **Restock** and enter how many came in.

## Updating the app

Edit the files, commit, and change `VERSION` at the top of `sw.js` (for example `v1` to `v2`). Installed copies then fetch the new files the next time they open with a connection.

## Your data

Sales and stock are saved on the device, in the browser's storage. Nothing is sent anywhere.

- Each device has its own data. Use **Export and data** (the sliders icon, top right) to export CSV files as a backup.
- On iPhone, the Home Screen app keeps its own storage, separate from Safari. Install it first, then enter your data in the installed app.
