import { precacheAndRoute } from 'workbox-precaching';

// @ts-ignore
const assets = self.__WB_MANIFEST || []


precacheAndRoute(assets);