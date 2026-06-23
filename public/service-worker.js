const CACHE_NAME = "cooking-app-v1";

// The core files your app needs to run offline
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// 1. INSTALL: This happens once when the user first opens the app.
// We open our cache vault and store the core files.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching core assets...");
      return cache.addAll(ASSETS);
    })
  );
});

// 2. FETCH: This activates every time the app asks for a file or data.
// It intercepts the request and tries to serve it from the cache if offline.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // If the file is in the cache, return it immediately. 
      // Otherwise, go out to the internet to fetch it.
      return cachedResponse || fetch(e.request);
    })
  );
});