import { precacheAndRoute } from 'workbox-precaching';

// @ts-ignore
const assets = self.__WB_MANIFEST || []

precacheAndRoute(assets);


const webPush = () => {
    self.addEventListener('push', function (event) {
        const payload = event.data ? event.data.text() : 'no payload';
        event.waitUntil(
            // @ts-ignore
            self.registration.showNotification('ServiceWorker Cookbook', {
                body: payload,
            })
        );
    });
}

webPush()