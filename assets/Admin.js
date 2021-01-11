//@ts-nocheck
import "/@/styles/dashboard.css"
import Swup from 'swup';
import SwupGiaPlugin from '@swup/gia-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupMetaTagsPlugin from 'swup-meta-tags-plugin';
import components from './admin/components';
import { iframeResizer } from 'iframe-resizer'
import { routeFromChildEvent } from "/@/utils/vars"

window.resizeIframe = (obj) => iframeResizer({}, obj)

window.$swup = new Swup({
    cache: false,
    plugins: [
        new SwupGiaPlugin({ components, log: process.env.NODE_ENV === "development" }),
        new SwupProgressPlugin(),
        new SwupMetaTagsPlugin()
    ]
});

window.swupReload = (top = true) => {
    if (top) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    $swup.loadPage({
        url: window.location.pathname + window.location.search
    }, true)
}

$swup.on('contentReplaced', () => livewire.start())

window.addEventListener(routeFromChildEvent, (e) => {
    $swup.loadPage({ url: e.detail })
})