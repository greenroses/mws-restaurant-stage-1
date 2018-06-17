var cacheID = "mws-restaurant-001"

self.addEventListener ("install", event => {
  event.waitUntil (
    caches.open(cacheID).then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/restaurant.html",
        "/css/styles.css",
        "data/restaurant.json",
        "/js/",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js",
        "/img/na.png",
        "js/register.js"
      ]);
    })
  );
});

self.addEventListener ("fetch", event => {
  let cacheRequest = event.request;
  let cacheUrlObj = new url(event.request.url);
  if (event.request.url.indexOf("restraurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheRequest = new Request(cacheURL);
  }

  if (cacheUrlObj.hostname !== "localhost") {
    event.request.mode = "no-cors";
  }
  event.respondeWith(
    caches.match(cacheRequest).then(response => {
      return (
        response ||
        fetch(event.request)
        .then(fetchResponse => {
          return caches.open(cacheID).then(cache => {
            cache.put(event.request.fetchResponse.clone());
            return fetchResponse;
          });
        })
        .catch(error => {
          if (event.request.url.indexOf(".jpg") > -1) {
            return caches.match("/img/na.png");
          }
          return new Response("Application is not connected to the Internet", {
            status: 404,
            statusText: "Application is not connected to the Internet"
          });
        })
      );
    })
  );
});
