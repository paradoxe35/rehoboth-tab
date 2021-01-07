//@ts-nocheck
import "/@/styles/dashboard.css"
import Swup from 'swup';
import SwupGiaPlugin from '@swup/gia-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupMetaTagsPlugin from 'swup-meta-tags-plugin';
import components from './admin/components';
import { iframeResizer } from 'iframe-resizer'

const swup = new Swup({
    plugins: [
        new SwupGiaPlugin({ components, log: true }),
        new SwupProgressPlugin(),
        new SwupMetaTagsPlugin()
    ]
});

window.resizeIframe = (obj) => iframeResizer({}, obj)