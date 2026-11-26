/* Pocket Ledger service worker.
   Caches the app so it opens with no connection.
   Change VERSION whenever you edit any file, so installed copies pick up the update. */
const VERSION = 'v3';
const CACHE = 'pocket-ledger-' + VERSION;
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './mark-64.png',
  './icon-192.png',
  './icon-512.png',
  './maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pocket-ledger-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Other sites (your buy links) go straight to the network.
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(req.mode === 'navigate' ? pageFirst(req) : assetFirst(req));
});

function cacheable(res) {
  return res && res.ok && res.type === 'basic' && !res.redirected;
}

// Pages: try the network for up to 4 seconds so updates show up, otherwise use the saved copy.
async function pageFirst(req) {
  const cache = await caches.open(CACHE);
  const fetched = fetch(req).then((res) => {
    if (cacheable(res)) cache.put(req, res.clone());
    return res;
  });
  fetched.catch(() => {});
  try {
    return await Promise.race([fetched, new Promise((_, no) => setTimeout(no, 4000))]);
  } catch (err) {
    const hit = (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./index.html'));
    return hit || fetched;
  }
}

// Icons and other files: use the saved copy right away and refresh it in the background.
async function assetFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fetched = fetch(req)
    .then((res) => {
      if (cacheable(res)) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return hit || (await fetched) || Response.error();
}
