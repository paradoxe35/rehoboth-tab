import { Workbox } from 'workbox-window';
import registerSwPushManager from './registerSwPushManager';

export default () => {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('/assets/service-worker.js');
        wb.register();

        registerSwPushManager()
    }
}