//@ts-nocheck
import "/@/styles/dashboard.css"
import Swup from 'swup';
import SwupGiaPlugin from '@swup/gia-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupMetaTagsPlugin from 'swup-meta-tags-plugin';
import components from './admin/components';
import { iframeResizer } from 'iframe-resizer'
import global from '/@/utils/global'

window.resizeIframe = (obj) => iframeResizer({}, obj)

window.$swup = new Swup({
    cache: false,
    plugins: [
        new SwupGiaPlugin({ components, log: process.env.NODE_ENV === "development" }),
        new SwupProgressPlugin(),
        new SwupMetaTagsPlugin()
    ]
});

global()