import { Modal } from 'bootstrap'
import { eventListenOne } from '../functions/functions'
import { modalItemsUpdatedEvent, openModalEvent } from './vars'

/**
 * @param { Object } trans 
 * @param { string } defaults
 * @returns { string }
 */
export const Localize = (trans = {}, defaults = 'fr') => {
    const lang = document.querySelector('html').lang
    return trans[lang] ? trans[lang] : trans[defaults]
}

/**
 * @param { HTMLElement | Element } parent 
 */
export const removeChilds = (parent) => {
    Array.from(parent.children)
        .forEach(element => parent.removeChild(element))
}


export const innerDump = (parent, data) => {
    removeChilds(parent)
    parent.innerHTML = ''
    parent.appendChild(document.createRange().createContextualFragment(data))
}


export const Btn = {
    btns: [],
    /**
     * @param { HTMLButtonElement } element 
     */
    loading(element) {
        if (!element) return
        const el = {
            element: element,
            html: element.innerHTML
        }
        this.btns.unshift(el)
        element.disabled = true
        element.innerHTML = `
            <div class="d-flex align-content-center"> 
                <span>${el.html}</span>
                <span class="mx-1"></span>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="visually-hidden">Loading...</span>
            <div/>
        `
    },
    hide() {
        const h = this.btns
        if (h.length) {
            const n = (h[h.length - 1])
            const el = this.get(n.element)
            if (el) {
                el.disabled = false
                removeChilds(el)
                el.innerHTML = n.html
            }

            this.btns = this.btns.slice(0, h.length - 1)
        }
    },
    /**
     * @returns { HTMLButtonElement }
     */
    get(v) {
        return v
    },
}

let modalId = null
export const openModal = (data) => {
    const modal = modalId ? document.getElementById(modalId) : null
    if (modal) {
        innerDump(modal.querySelector('.modal-body'), data)

        if (!modal.classList.contains('show')) {
            const imodal = new Modal(modal)
            imodal.show()
        }
        return
    }
    const html = `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-2">${data}</div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary btn-sm text-white"
                            data-bs-dismiss="modal">${Localize({ fr: 'Fermer', en: 'Close' })}</button>
                    </div>
                </div>
            </div>
        </div>`

    modalId = `mo-${Math.random()}`

    const doc = document.createRange().createContextualFragment(html)
    const el = doc.firstElementChild

    el.id = modalId;
    document.body.appendChild(el)

    const imodal = new Modal(el)
    imodal.show()
}

export const HtmlAlert = {
    parents: [],

    message(message) {
        if (message !== null || message !== undefined) {
            if (typeof message === 'string')
                return message;
            if (Array.isArray(message))
                return this.fromArray(message);
            if (message.message && !message.errors)
                return message.message;
            if (message.message && message.errors)
                return this.fromObject(message.errors);
        } else {
            return Localize({
                fr: 'Une erreur est survenue en interne, veuillez réessayer plus tard',
                en: 'An error has occurred internally, please try again later'
            })
        }
    },

    /**
     * @param { object } object 
     * @returns { string }
     */
    fromObject(object) {
        return Object.keys(object).map(key => object[key].join(".\n")).join("\n")
    },
    /**
     * @param { Array<string> } arr 
     */
    fromArray(arr) {
        return arr.join(".\n")
    }
}


export const openModalEventFrame = (types, fn) => {

    const memo = {};

    const handleEvent = (e) => {
        let { type, datas, id } = e.detail

        if (id && memo[id]) {
            datas = memo[id]
        } else if (id && !memo[id]) {
            memo[id] = datas
        }

        const content = fn(datas)
        if (type == types && content) {
            openModal(content)

            window.dispatchEvent(new Event(type))

            eventListenOne(null, modalItemsUpdatedEvent, ({ detail: { type: itype, data: idata } }) => {

                let finaldata = id ? memo[id] : datas

                switch (itype) {
                    case "add":
                        if (Array.isArray(finaldata.data)) {
                            finaldata.data = [idata, ...finaldata]
                        } else {
                            finaldata.data = idata
                        }
                        break;
                    case "remove":
                        if (Array.isArray(finaldata.data)) {
                            finaldata.data = finaldata.data.filter(e => e.id != idata.id)
                        } else {
                            finaldata.data = null
                        }
                        break;
                    default:
                        break;
                }

                if (memo[id]) {
                    memo[id] = finaldata
                }

                window.dispatchEvent(
                    new CustomEvent(openModalEvent, { detail: { type, finaldata, id } })
                )
            })
        }
    }

    window.addEventListener(openModalEvent, handleEvent)

    return () => window.removeEventListener(openModalEvent, handleEvent)
}


export const dispatchEventUpdatedModalItems = (type, data, more = {}) => {
    window.dispatchEvent(new CustomEvent(modalItemsUpdatedEvent, {
        detail: { type, data, ...more }
    }))
}