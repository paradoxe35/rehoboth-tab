import { Workbox } from 'workbox-window';

export default () => {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('/assets/service-worker.js');

        wb.register();
    }
}