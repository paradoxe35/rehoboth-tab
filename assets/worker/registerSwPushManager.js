import { urlBase64ToUint8Array } from "../functions/functions";

const headers = {
    'Content-type': 'application/json',
    "X-Requested-With": "XMLHttpRequest"
};

const storageKey = 'client-web-push-manager-reference'

export default () => {
    navigator.serviceWorker.ready
        .then(function (registration) {
            return registration.pushManager.getSubscription()
                .then(async function (subscription) {
                    if (subscription) {
                        return subscription;
                    }
                    const response = await fetch(route('guest.web-push.vapid-public-key').toString(), {
                        method: "get",
                        headers
                    });
                    const vapidPublicKey = await response.text();
                    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey
                    });
                });
        }).then(async function (subscription) {
            fetch(route('guest.web-push.register').toString(), {
                method: 'post',
                headers,
                body: JSON.stringify({
                    subscription: subscription,
                    client: window.localStorage.getItem(storageKey)
                }),
            }).then(res => res.text())
                .then((textKey) => window.localStorage.setItem(storageKey, textKey));
        });
}