const CACHE_NAME = "jskoneczny.pl";

// List of files which are store in cache.
let filesToCache = [
  "/assets/fonts/icomoon.eot",
  "/assets/fonts/icomoon.svg",
  "/assets/fonts/icomoon.ttf",
  "/assets/fonts/icomoon.woff",
  "/assets/img/wormz.png",
  "/assets/img/projekty/color-game.png",
  "/assets/img/projekty/restapi.jpg",
  "/assets/img/projekty/cloudss.jpg",
  "/assets/img/projekty/php-mvc-framework.jpg",
  "/assets/img/projekty/sea-travel.jpg",
  "/assets/img/projekty/todo-api.jpg",
  "/assets/img/projekty/twitter-client.png",
  "/assets/img/projekty/forkify.png",
  "/assets/img/projekty/natours.jpg",
  "/assets/img/1large.jpg",
  "/assets/img/portfolio/iksel.jpg",
  "/assets/img/portfolio/justart.png",
  "/assets/img/portfolio/magia-kodu.jpg",
  "/assets/img/portfolio/rckfl.jpg",
  "/assets/img/portfolio/nwozniak.jpg",
  "/assets/img/hero.jpg",
  "/assets/img/favicon.ico",
  "/assets/img/promo.jpg",
  "/assets/bundle.js",
  "/assets/style.css"
];

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function(err) {
        // Snooze errors...
        // console.error(err);
      })
  );
});

self.addEventListener("fetch", function(evt) {
  // Snooze logs...
  // console.log(event.request.url);
  evt.respondWith(
    // Firstly, send request..
    fetch(evt.request).catch(function() {
      // When request failed, return file from cache...
      return caches.match(evt.request);
    })
  );
});
