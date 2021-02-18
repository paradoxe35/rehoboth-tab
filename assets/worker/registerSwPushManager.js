import { ApiRequestAxios } from "../api/axios";
import { urlBase64ToUint8Array } from "../functions/functions";

const storageKey = 'client-web-push-manager-reference'

export default function registerSwPushManager() {
    navigator.serviceWorker.ready
        .then(function (registration) {
            return registration.pushManager.getSubscription()
                .then(async function (subscription) {
                    if (subscription) {
                        return subscription;
                    }
                    const response = await ApiRequestAxios(route('guest.web-push.vapid-public-key'));
                    const vapidPublicKey = response.data;
                    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey
                    });
                });
        }).then(async function (subscription) {

            ApiRequestAxios(route('guest.web-push.register').toString(), 'post', {
                subscription: subscription,
                client: window.localStorage.getItem(storageKey)
            }).then(({ data: { uuid } }) => window.localStorage.setItem(storageKey, uuid));
        });
}