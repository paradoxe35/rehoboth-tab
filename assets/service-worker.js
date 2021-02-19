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

const WebPush = {
    init() {
        self.addEventListener('push', this.notificationPush.bind(this))
    },
    /**
     * Handle notification push event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/Events/push
     *
     * @param {NotificationEvent} event
    */
    notificationPush(event) {
        console.log(event.data.json());

        if (!(self.Notification && self.Notification.permission === 'granted')) {
            return
        }

        if (event.data) {
            event.waitUntil(
                this.sendNotification(event.data.json())
            )
        }
    },
    /**
     * Send notification to the user.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
     *
     * @param {PushMessageData|Object} data
     */
    sendNotification(data) {
        /**
         * @type { ServiceWorkerRegistration }
         */
        const registration = self.registration

        return registration.showNotification(data.title, data)
    },
}

WebPush.init()