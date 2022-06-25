const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    '/index.html',
    '/',
    '/assets/css/colors.css',
    '/assets/css/globals.css',
    '/assets/css/menu.css',
    '/assets/css/projects.css',
    '/assets/css/style.css',
    '/assets/img/lakuria.webp',
    '/assets/img/logo_pagina.png',
    '/assets/img/macopmx.png',
    '/assets/img/mariabonita.webp',
    '/assets/img/noel.png',
    '/assets/js/index.js',
    '/assets/img/icons/48x48.png',
    '/assets/img/icons/72x72.png',
    '/assets/img/icons/96x96.png',
    '/assets/img/icons/144x144.png',
    '/assets/img/icons/168x168.png',
    '/assets/img/icons/192x192.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});