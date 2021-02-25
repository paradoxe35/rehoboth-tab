//@ts-nocheck
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute, setCatchHandler } from 'workbox-routing';


const assets = self.__WB_MANIFEST || []

precacheAndRoute([...assets, {
    revision: "383676",
    url: "/offline.html"
}]);


// Cache page navigations (html) with a Network First strategy
registerRoute(/^((?!(\/storage|rehoboth-tab\.s3\.us-east-2\.amazonaws\.com|socket\.io)).)*$/,
    // Use a Network First caching strategy
    new NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages-cache',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

registerRoute(
    /(\/storage\/|https:\/\/rehoboth-tab\.s3\.us-east-2\.amazonaws\.com\/|\/favicon)(.+)\.(?:jpeg|jpg|png|svg)/,
    new StaleWhileRevalidate({
        cacheName: 'images-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);


// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

setCatchHandler(async ({ event }) => {
    // Return the precached offline page if a document is being requested
    if (event.request.destination === 'document') {
        return matchPrecache('/offline.html');
    }

    return Response.error();
});

const WebPush = {
    init() {
        self.addEventListener('push', this.notificationPush.bind(this))
        self.addEventListener('notificationclick', this.notificationclick.bind(this))
    },
    /**
     * Handle notification push event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/Events/push
     *
     * @param {NotificationEvent} event
    */
    notificationPush(event) {
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
    * Handle notification push event.
    *
    * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
    *
    * @param {NotificationEvent} event
    */
    notificationclick(event) {
        event.notification.close();
        const url = event?.notification?.data?.url
        if (!url || !clients.openWindow) return

        event.waitUntil(
            clients.openWindow(url + "?notification_id=" + event.notification.data.id)
        );
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