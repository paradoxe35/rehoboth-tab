import 'alpinejs'
import "/@/styles/dashboard.css"
import loadComponents from 'gia/loadComponents';
import components from '/@/admin/components';
import config from 'gia/config';
import Turbolinks from 'turbolinks'
import { debounce } from './functions/functions';
import { loadGiaComponent } from './utils/loadComponent';
import { iframeResizer } from 'iframe-resizer'


loadComponents(components);
// @ts-ignore
config.set('log', process.env.NODE_ENV == "development");

Turbolinks.start()

window.addEventListener('turbolinks:before-render',
    debounce(loadGiaComponent.bind(this, components), 500)
)

// @ts-ignore
window.resizeIframe = (obj) => iframeResizer({}, obj)