import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';


// @ts-ignore
const assets = self.__WB_MANIFEST || []

console.log(assets);

precacheAndRoute(assets);

registerRoute(
    /\/storage\/(.+)\.(?:jpeg|jpg)/,
    new StaleWhileRevalidate({
        cacheName: 'images-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);


// self.addEventListener('install', (event) => {
//     self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//     event.waitUntil(self.clients.claim());
//     self.registration.unregister().then(() => {
//         console.log('NGSW Safety Worker - unregistered old service worker');
//     });
// });