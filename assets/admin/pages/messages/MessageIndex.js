import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import {
    Btn,
    dispatchEventUpdatedModalItems,
    htmlModalButton,
    htmlTitleModal,
    onActionItemModal,
    openModalEventFrame
} from '/@/utils/dom';


export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }

    mount() {
        this.unmoutModal = openModalEventFrame("messagesPage", ({ type, data }) => {
            switch (type) {
                case "message":
                    return this.viewMessageText(type, data)
                    break;
            }
        })
    }

    unmount() {
        this.unmoutModal && this.unmoutModal()
    }


    /**
     * @param { string } type 
     * @param { Object } data 
     */
    viewMessageText(type, data) {
        const parentId = `message-${Math.random()}`

        onActionItemModal("messagesPage", parentId, (el) => {
            Btn.loading(el)
            ApiRequest("put", route("admin.messages.update", { message: el.getAttribute("data-id") }).toString())
                .finally(() => Btn.hide())
                .then(({ data }) => dispatchEventUpdatedModalItems("put", data))
        })

        return /*html*/`
            <div id="${parentId}">
                ${htmlTitleModal(type)}
                ${
                    !data.read ? htmlModalButton(data.id, 'Marquer comme lu') :
                     /*html*/`<div class="text-success">Déjà Lu</div>`
                }
                <hr />
                <h5 class="text-muted mb-3">Object: ${data.subject}</h5>
                <hr />
                <h5 class="text-muted mb-3">Text:</h5>
                <p>${data.message}</p>
            </div>
        `
    }
}
