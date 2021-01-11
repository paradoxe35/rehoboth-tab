//@ts-nocheck
import 'iframe-resizer/js/iframeResizer.contentWindow'

window.routeToParent = (url) => {
    window.parent.dispatchEvent(new CustomEvent('routeFromChild', { detail: url }))
}

window.openParentModal = (type, datas, id = null) => {
    window.parent.dispatchEvent(new CustomEvent('openModal', { detail: { type, datas, id } }))
}