import { ApiRequestAxios } from "../api/axios";
import { urlBase64ToUint8Array } from "../functions/functions";

const storageKey = 'client-web-push-manager-reference'

export default function registerSwPushManager() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.')
        return
    }

    if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.')
        return
    }

    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.')
        return
    }

    navigator.serviceWorker.ready
        .then(function (registration) {
            return registration.pushManager.getSubscription()
                .then(async function (subscription) {
                    if (subscription) {
                        return subscription;
                    }

                    subscribe(registration)
                }).catch(e => {
                    console.log('Error during getSubscription()', e)
                });
        });
}


/**
 * Subscribe for push notifications.

 * @param { ServiceWorkerRegistration } registration
 */
async function subscribe(registration) {
    const options = { userVisibleOnly: true }

    const response = await ApiRequestAxios(route('guest.web-push.vapid-public-key'));
    const vapidPublicKey = response.data;

    if (vapidPublicKey) {
        options.applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)
    }

    registration.pushManager.subscribe(options)
        .then(subscription => {
            updateSubscription(subscription)
        })
        .catch(e => {
            if (Notification.permission === 'denied') {
                console.log('Permission for Notifications was denied')
            } else {
                console.log('Unable to subscribe to push.', e)
            }
        })
}


/**
 * Send a request to the server to update user's subscription.
 *
 * @param {PushSubscription} subscription
 */
function updateSubscription(subscription) {
    const key = subscription.getKey('p256dh')
    const token = subscription.getKey('auth')
    const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0]

    const data = {
        endpoint: subscription.endpoint,
        publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
        authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
        contentEncoding
    }

    ApiRequestAxios(route('guest.web-push.register').toString(), 'post', {
        subscription: data,
        client: window.localStorage.getItem(storageKey)
    }).then(({ data: { uuid }, status }) => status == 201 && window.localStorage.setItem(storageKey, uuid));
}