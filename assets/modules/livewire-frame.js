//@ts-nocheck
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { openModalEvent, routeFromChildEvent } from '../utils/vars'

window.routeToParent = (url) => {
    window.parent.dispatchEvent(new CustomEvent(routeFromChildEvent, { detail: url }))
}

window.openParentModal = (type, datas, id = null) => {
    window.parent.dispatchEvent(new CustomEvent(openModalEvent, { detail: { type, datas, id } }))
}