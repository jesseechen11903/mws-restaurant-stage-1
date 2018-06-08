const staticCacheName = 'restaurant-review-v1';
const imageCache = 'restaurant-image-v1';
const mapCache = 'restaurant-map-v1';
const staticMapCache = 'restaurant-static-map-v1';
const googleMapCache = 'restaurant-google-v1';

const allCaches = [
    staticCacheName,
    imageCache,
    mapCache,
    staticMapCache,
    googleMapCache
  ];

let urlsToCache = [
    '/',
    '/dist/styles.css',
    '/dist/main.js',
    '/data/restaurants.json',
    '/dist/dbhelper.js',
    '/dist/restaurant_info.js',
    '/restaurant.html'
];

self.addEventListener('install', event => {
    console.log('v1 installing...');

    // cache the css style
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => {
                console.log('ServiceWorker Installed. All core components have been cached.');
                return self.skipWaiting();
            })
            .catch((err) => {
                console.log('Error in install ' + err.message);
            })
    );
});

self.addEventListener('activate', event => {
    // delete any caches that is not in our cahce
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(cacheName => {
                return cacheName.startsWith('restaurant-') &&
                    !allCaches.includes(cacheName);
            })
            .map(key => {
                return caches.delete(key);
            })
        )).then(() => {
            console.log('Cache now ready to handle fetches!');
            // let's handle the initial data.json load and cache the image
        }).catch(() => {
            console.log('Error in activate');
        })
    );
});

function serveImage(request, storageCache) {
    // let storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
    let storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
    
    return caches.open(storageCache).then(cache =>
    {
            return cache.match(storageUrl).then(response => {
                if (response) return response;
  
                return fetch(request).then(networkResponse => {
                    cache.put(storageUrl, networkResponse.clone());
                    return networkResponse;
                })
                .catch(() => {
                    console.log('fetching error in serveImage');
                })
            })
            .catch(() => {
                console.log('match error');
            });
    });
}


self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    console.log('url ' + url);
    if (url.pathname.startsWith('/img/')) {
        event.respondWith(serveImage(event.request, imageCache));
        return;
    }

    // const regex = /(https?:\/\/(.+?\.)?googleapis\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;

    let testUrl = 'googleapis.com';
    
    if (url.href.indexOf(testUrl) != -1) {
        event.respondWith(serveImage(event.request, mapCache));
        return;
    }
    let staticUrl = 'gstatic.com';
    if (url.href.indexOf(staticUrl) != -1) {
        event.respondWith(serveImage(event.request, staticMapCache));
        return;
    }

    if (event.request.url.indexOf('https://maps.googleapi.com/js') == 0) {
        event.respondWith(
          // Handle Maps API requests in a generic fashion,
          // by returning a Promise that resolves to a Response.
        );
      }
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('fetching');
            return response || fetch(event.request).then(resp => {
                return caches.open(staticCacheName).then(cache => {
                    cache.put(event.request, resp.clone());
                    return resp;
                });
            })
            .catch(() => {
                console.log('error in fetching');
            });
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});