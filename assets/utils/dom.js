import { Modal } from "bootstrap";
import { capitalize, eventListenOne } from "../functions/functions";
import { modalItemsUpdatedEvent, openModalEvent } from "./vars";

/**
 * @param { Object } trans
 * @param { string } defaults
 * @returns { string }
 */
export const Localize = (trans = {}, defaults = "fr") => {
    const lang = document.querySelector("html").lang;
    return trans[lang] ? trans[lang] : trans[defaults];
};

/**
 * @param { HTMLElement | Element } parent
 */
export const removeChilds = (parent) => {
    Array.from(parent.children).forEach((element) =>
        parent.removeChild(element)
    );
};

export const innerDump = (parent, data) => {
    removeChilds(parent);
    parent.innerHTML = "";
    parent.appendChild(document.createRange().createContextualFragment(data));
};

export const Btn = {
    btns: [],
    /**
     * @param { HTMLButtonElement } element
     */
    loading(element) {
        if (!element) return;
        const el = {
            element: element,
            html: element.innerHTML,
            text: element.innerText,
        };
        this.btns.unshift(el);
        element.disabled = true;
        element.innerHTML = `
            <div class="d-flex align-content-center align-items-center">
                <span>${el.html}</span>
                <span class="mx-1"></span>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="visually-hidden">Loading...</span>
            <div/>
        `;
    },
    hide() {
        const h = this.btns;
        if (h.length) {
            const n = h[h.length - 1];
            const el = this.get(n.element);
            if (el) {
                el.disabled = false;
                removeChilds(el);
                el.innerHTML = n.html;
            }

            this.btns = this.btns.slice(0, h.length - 1);
        }
    },
    /**
     * @returns { HTMLButtonElement }
     */
    get(v) {
        return v;
    },
};

let modalId = {
    id: null,
};
export const openModal = (data) => {
    const modal = modalId.id ? document.getElementById(modalId.id) : null;
    if (modal) {
        innerDump(modal.querySelector(".modal-body"), data);

        if (!modal.classList.contains("show")) {
            const imodal = new Modal(modal);
            imodal.show();
        }
        return;
    }
    const html = /*html*/ `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-2">${data}</div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary btn-sm text-white"
                            data-bs-dismiss="modal">${Localize({
                                fr: "Fermer",
                                en: "Close",
                            })}</button>
                    </div>
                </div>
            </div>
        </div>`;

    modalId.id = `mo-${Math.random()}`;

    const doc = document.createRange().createContextualFragment(html);
    const el = doc.firstElementChild;

    el.id = modalId.id;
    document.body.appendChild(el);

    const imodal = new Modal(el);
    imodal.show();
};

export const HtmlAlert = {
    parents: [],

    message(message) {
        if (message !== null || message !== undefined) {
            if (typeof message === "string") return message;
            if (Array.isArray(message)) return this.fromArray(message);
            if (message.message && !message.errors) return message.message;
            if (message.message && message.errors)
                return this.fromObject(message.errors);
        } else {
            return Localize({
                fr: "Une erreur est survenue en interne, veuillez réessayer plus tard",
                en: "An error has occurred internally, please try again later",
            });
        }
    },

    /**
     * @param { object } object
     * @returns { string }
     */
    fromObject(object) {
        return Object.keys(object)
            .map((key) => object[key].join(".<br/>"))
            .join("<br/>");
    },
    /**
     * @param { Array<string> } arr
     */
    fromArray(arr) {
        return arr.join(".<br/>");
    },
};

/**
 * @param { HTMLElement | EventTarget } target
 * @returns { HTMLButtonElement }
 */
// @ts-ignore
export const FormBtn = (target) => target ? target.querySelector('button[type="submit"]') : null;

export const clearInput = (parent) => {
    const inptus = parent.querySelectorAll('input[type="text"]');
    const textarea = parent.querySelectorAll("textarea");
    const emails = parent.querySelectorAll('input[type="email"]');
    const tels = parent.querySelectorAll('input[type="tel"]');
    [...inptus, ...textarea, ...emails, ...tels].forEach(
        (element) => (element.value = "")
    );
};

export const openModalEventFrame = (types, fn) => {
    const memo = {};

    const handleEvent = (e) => {
        let { type, datas, id } = e.detail;

        if (id && memo[id]) {
            datas = memo[id];
        } else if (id && !memo[id]) {
            memo[id] = datas;
        }

        const content = fn(datas);
        if (type == types && content) {
            openModal(content);

            window.dispatchEvent(new Event(type));

            eventListenOne(
                null,
                modalItemsUpdatedEvent,
                ({ detail: { type: itype, data: idata } }) => {
                    let finaldata = id ? memo[id] : datas;

                    switch (itype) {
                        case "add":
                            if (Array.isArray(finaldata.data)) {
                                finaldata.data = [idata, ...finaldata];
                            } else {
                                finaldata.data = idata;
                            }
                            break;

                        case "put":
                            finaldata.data = idata;
                            break;
                        case "remove":
                            if (Array.isArray(finaldata.data)) {
                                finaldata.data = finaldata.data.filter(
                                    (e) => e.id != idata.id
                                );
                            } else {
                                finaldata.data = null;
                            }
                            break;
                        default:
                            break;
                    }

                    if (memo[id]) {
                        memo[id] = finaldata;
                    }

                    window.dispatchEvent(
                        new CustomEvent(openModalEvent, {
                            detail: { type, finaldata, id },
                        })
                    );
                }
            );
        }
    };

    window.addEventListener(openModalEvent, handleEvent);

    return () => window.removeEventListener(openModalEvent, handleEvent);
};

export const dispatchEventUpdatedModalItems = (type, data, more = {}) => {
    window.dispatchEvent(
        new CustomEvent(modalItemsUpdatedEvent, {
            detail: { type, data, ...more },
        })
    );
};

export const onActionItemModal = (eventName, parentId, callback) => {
    eventListenOne(null, eventName, (e) => {
        const el = document.getElementById(parentId);
        Array.from(el.querySelectorAll(".action--js")).forEach((el) =>
            el.addEventListener("click", callback.bind(undefined, el))
        );
    });
};

export const htmlDeleteModalButton = (id) => {
    return /*html*/ `
        <button data-id="${id}" class="btn action--js text-xs btn-danger p-1 text-white">Supprimer</button>
    `;
};

export const htmlModalButton = (id, text = "", color = "btn-primary") => {
    return /*html*/ `
        <button data-id="${id}" class="btn action--js text-xs ${color} p-1 text-white">${text}</button>
    `;
};

export const htmlTitleModal = (text) => {
    return /*html*/ `
        <div class="my-3"><h4>${capitalize(text)}</h4></div>
    `;
};

export const htmlInfoModal = (text) => {
    return /*html*/ `
        <div class="alert alert-info" role="alert">
            ${text}
        </div>
    `;
};
