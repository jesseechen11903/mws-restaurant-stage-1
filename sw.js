const staticCacheName = 'restaurant-review-v1';
let urlsToCache = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/restaurant_info.js'
    
    // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAKySykca3gfvxzp8WEFSPt1p6Uu_tnn-Y&libraries=places&callback=initMap'
];

self.addEventListener('install', event => {
    console.log('v1 installing...');

    // cache the css style
    event.waitUntil(
        caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    // delete any caches that is not in our cahce
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!staticCacheName.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log('Cache now ready to handle fetches!');
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('fetching');
            return response || fetch(event.request).then(resp => {
                return caches.open(staticCacheName).then(cache => {
                    cache.put(event.request, resp.clone());
                    return resp;
                });
            });
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});