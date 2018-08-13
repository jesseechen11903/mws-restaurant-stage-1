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
    '/dist/dbhelper.js',
    '/dist/restaurant_info.js',
    '/dist/modal.js',
    '/restaurant.html'
];

/* write the indexed DB boiler plate for caching */
const IDB_VERSION = 1;
let idb;
const STORE_CACHE = 'newPosts';
const RETRY_TIME = 86400000;

function openDB() {
    let cacheDB = indexedDB.open('reviewPosts', IDB_VERSION);

    cacheDB.onerror = function (error) {
        console.log('IndexedDB error:', error);
    };

    cacheDB.onupgradeneeded = function (event) {
        console.log('upgrade');
        let db = event.target.result;
        db.createObjectStore(STORE_CACHE, { keyPath: 'restaurant_id' });
    };

    cacheDB.onsuccess = function (event) {
        console.log('success in indexedDB ' + event);
        idb = event.target.result;
        // get the replay request
        replayReviewSaved();
    };
}

function getObjectStore(storeName, mode) {
    console.log('getObjectStore');
    return idb.transaction(storeName, mode).objectStore(storeName);
}

function replayReviewSaved() {
    let requests = [];
    getObjectStore(STORE_CACHE).openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            requests.push(cursor.value);
            cursor.continue();
        } else {
            requests.forEach((req) => {
                let inTime = Date.now() - req.timestamp;
                if (inTime > RETRY_TIME) {
                    getObjectStore(STORE_CACHE, 'readwrite').delete(req.id);
                    console.log('data is too old');
                } else {
                    const review_url = `http://localhost:1337/reviews/`;
                    return fetch(review_url, {
                        method: 'post',
                        body: req
                    }).then(response => {
                        if (response.status < 400) {
                            getObjectStore(STORE_CACHE, 'readwrite').delete(req.restaurant_id);
                            console.log('successful replay to save data');
                        } else {
                            console.log('failed replay to save data:' + response);
                        }
                    }).catch(error => {
                        console.log('Replaying failed:' + error);
                    })
                }
            })
        }
    }
}

idb = openDB();

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

    return caches.open(storageCache).then(cache => {
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

    // console.log('url ' + url);
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
        return;
    }
    if (event.request.method === 'GET') {
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
    }
    else {
        if (url.origin === location.origin) {
            if (url.pathname === '/restaurant.html') {
                event.respondWith(caches.match('/restaurant.html'));
                return;
            }
        }
        let newObj = {};
        if (url.pathname === '/reviews/') {
            event.respondWith(
                // try to get response from the network
                fetch(event.request.clone())
                    .then(response => {
                        console.log('hrllo ' + response);
                        // return response.json();
                    // }).then(data => {
                    //     console.log(data);
                    }).catch(error => {
                        console.log(error);
                        self.clients.matchAll().then(myclients => {
                            myclients.forEach(client => {
                                client.postMessage({
                                    message: "You are currently offline, you data will be defer saving when you are reconnected",
                                    review: newObj,
                                    alert: "Offline"
                                });
                            });
                        });
                        return;
                    })
            );
            // return; // caches.match(event.request.clone().referrer);
        }
    }
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('sync', function(event) {
    if (event.tag === 'reviewSync') {
        event.awaitUntil(replayReviewSaved());
    }
})