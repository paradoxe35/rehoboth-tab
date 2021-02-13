import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { confirmed } from '/@/functions/functions';
import {
    Btn,
    dispatchEventUpdatedModalItems,
    htmlDeleteModalButton,
    htmlInfoModal,
    htmlTitleModal,
    onActionItemModal,
    openModalEventFrame
} from '/@/utils/dom';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }

    mount() {
        this.unmoutModal = openModalEventFrame("galleriesArticles", ({ type, data }) => {
            switch (type) {
                case "images":
                    return this.viewImagesGallery(type, data)
                    break;
            }
        })
    }

    unmount() {
        this.unmoutModal && this.unmoutModal()
    }

    /**
     * @param { Object } image 
     */
    htmlImage(image) {
        return /*html*/`
            <div class="d-flex justify-content-between">
                <div style="height: auto;width:100px;">
                    <img src="${image.public_path}" class="img-fluid img-thumbnail" />
                </div>
                <span>
                    ${htmlDeleteModalButton(image.id)}
                </span>
            </div>
            <hr />
        `
    }

    /**
     * @param { string } type 
     * @param { Array } data 
     */
    viewImagesGallery(type, data) {
        const views = data.map(image => this.htmlImage(image))

        const parentId = `images-${Math.random()}`

        onActionItemModal("galleriesArticles", parentId, (el) => {
            if (!confirmed()) return

            Btn.loading(el)
            ApiRequest("delete", route("admin.images.destroy", { image: el.getAttribute("data-id") }).toString())
                .finally(() => Btn.hide())
                .then(({ data }) => dispatchEventUpdatedModalItems("remove", data))
        })

        return /*html*/`
            <div id="${parentId}">
                ${htmlTitleModal(type)}
                ${!!views.length ? views.join('\n') : htmlInfoModal("Aucune image enregistré")}
            </div>
        `
    }
}
