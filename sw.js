self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(
        [
          "/",
          "/index.html",
          "/restaurant.html",
          "/css/styles.css",
          "/data/restaurants.json",
          "/js/",
          "/js/dbhelper.js",
          "/js/main.js",
          "/js/restaurant_info.js",
          "/js/register.js"
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
