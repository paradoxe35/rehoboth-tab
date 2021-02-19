import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { Btn, clearInput, FormBtn, htmlTitleModal, openModalEventFrame } from '/@/utils/dom';
import { Notifier } from '/@/utils/notifier';

export default class extends GiaComponent {
    constructor(element) {
        super(element);

        this.ref = {
            profileImage: null,
            profileForm: null
        }

        this.profileImage = null
    }

    async require() {
        await this.initFilePond()
    }

    mount() {
        this.unmoutModal = openModalEventFrame("profilesPage", ({ type, data }) => {
            switch (type) {
                case "image":
                    return this.viewImageProfile(type, data)
                    break;
                case "description":
                    return this.viewDescriptionProfile(type, data)
                    break;
            }
        })

        this.ref.profileForm
            .addEventListener('submit', this.storeFetch.bind(this))
    }

    unmount() {
        this.unmoutModal && this.unmoutModal()
    }


    async initFilePond() {
        const { default: FilePond, imageOptions, fileLabel } = (await import(/* webpackChunkName: "filepond" */"/@/plugins/filepond"))

        this.pond = FilePond.create(this.ref.profileImage, {
            ...imageOptions,
            labelIdle: fileLabel('Déposez une image profile'),
            allowMultiple: false,
            onaddfile: (err, { file }) => {
                if (!err) this.profileImage = file
            },
            onremovefile: (err) => {
                if (!err) this.profileImage = null
            }
        })
    }

    /**
     * @param { string } type 
     * @param { any } data 
     */
    viewImageProfile(type, data) {
        return /*html*/`
            ${htmlTitleModal(type)}
            <div class="w-100 d-flex justify-content-center mt-2">
                <img src="${data.public_path}" class="img-fluid img-thumbnail" />
            </div>
        `
    }


    /**
    * @param { string } type 
    * @param { any } data 
    */
    viewDescriptionProfile(type, data) {
        return /*html*/`
            ${htmlTitleModal(type)}
            <p class="pt-2">${data}</p>
        `
    }


    async storeFetch(e) {
        e.preventDefault()

        const { target } = e

        const datas = new FormData(target)

        datas.set('image', this.profileImage)

        Btn.loading(FormBtn(target))

        ApiRequest('post', route('admin.settings.profiles').toString(), datas)
            .then(({ data: { message } }) => {
                Notifier.success(message)
                clearInput(target)
                this.pond && this.pond.removeFile(0)
                this.reloadFrame()
            })
            .finally(() => Btn.hide())
    }

    reloadFrame() {
        /**
         * @type { HTMLFrameElement }
         */
        // @ts-ignore
        const frame = document.getElementById('livewire-frame-datatable')
        frame.contentWindow.location.reload()
    }
}
