/* Offline cache for the transcriber pages.
   Cache-first for the app shell and the CDN runtime; Whisper model files are
   cached separately by transformers.js in the browser Cache API, so requests
   to huggingface.co are left alone. */
var CACHE = "transcriber-shell-v1";
var PRECACHE = [
  "/transcribe-offline/",
  "/transcribe/",
  "/styles.css"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Precache best-effort: a missing entry shouldn't block install.
      return Promise.all(PRECACHE.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf("transcriber-shell-") === 0 && k !== CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  var sameOrigin = url.origin === self.location.origin;
  var isCdn = url.hostname === "cdn.jsdelivr.net";
  // transformers.js manages its own model cache for huggingface.co — don't intercept.
  if (!sameOrigin && !isCdn) return;
  // Only handle the transcriber shell + site css on our origin; leave the rest of
  // the garden to the network so notes stay fresh.
  if (sameOrigin && !/^\/(transcribe|transcribe-offline)\/?$|^\/styles\.css$|^\/offline-sw\.js$/.test(url.pathname)) return;

  e.respondWith(
    caches.open(CACHE).then(function (c) {
      return c.match(req, { ignoreSearch: sameOrigin }).then(function (hit) {
        var fetchAndCache = fetch(req).then(function (res) {
          if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
          return res;
        });
        // Cache-first with background refresh; fall back to cache when offline.
        return hit ? (fetchAndCache.catch(function () {}), hit) : fetchAndCache;
      });
    })
  );
});
