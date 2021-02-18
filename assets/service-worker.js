//@ts-nocheck
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';


const assets = self.__WB_MANIFEST || []

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

self.addEventListener('push', function (event) {

    const payload = event.data;

    if(!payload) return

    /**
     * @type { ServiceWorkerRegistration }
     */
    const registration = self.registration

    event.waitUntil(
        registration.showNotification('ServiceWorker Cookbook', {
            body: payload,
        })
    );
});