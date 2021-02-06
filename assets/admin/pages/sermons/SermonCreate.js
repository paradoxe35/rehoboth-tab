import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { Btn, FormBtn } from '/@/utils/dom';
import { Notifier } from '/@/utils/notifier';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
        this.ref = {
            imageInput: [],
            audioInput: [],
            documentInput: [],
            store: null
        }
    }

    async require() {
        this.filePond = (await import("/@/plugins/filepond"))
    }

    mount() {
        this.filePond.default.setOptions({
            allowSyncAcceptAttribute: true,
            instantUpload: false,
            maxFiles: 10,
            allowMultiple: true,
        })

        this.inputImage()
        this.documentInput()
        this.audioInput()

        this.ref.store.addEventListener('submit', this.store.bind(this))
    }

    label(type) {
        return `Déposez vos fichiers ${type} ou <span class="filepond--label-action">Parcourir</span>`
    }

    inputImage() {
        this.filePond.createInstance(this.ref.imageInput, {
            ...this.filePond.imageOptions,
            labelIdle: this.label('images'),
            allowMultiple: false,
        }, false)
    }

    audioInput() {
        this.filePond.createInstance(this.ref.audioInput, {
            labelIdle: this.label('audios'),
            // @ts-ignore
            acceptedFileTypes: ['audio/mpeg', 'audio/ogg', 'audio/aac', 'audio/wav'],
            maxFileSize: "200MB",
            minFileSize: "50KB"
        }, false)
    }

    documentInput() {
        this.filePond.createInstance(this.ref.documentInput, {
            labelIdle: this.label('documents'),
            // @ts-ignore
            acceptedFileTypes: ['application/pdf'],
            maxFileSize: "30MB",
            minFileSize: "5KB"
        }, false)
    }

    async store(e) {
        e.preventDefault()
        const form = new FormData(e.target)

        Btn.loading(FormBtn(e.target))
        ApiRequest('post', route('admin.sermons.store').toString(), form)
            .then(({ data: { message } }) => {
                Notifier.success(message, 3000)
                    .then(() => {
                        $swup.loadPage({
                            url: window.location.pathname + window.location.search
                        }, true)
                    })
            })
            .finally(() => Btn.hide())
    }
}
