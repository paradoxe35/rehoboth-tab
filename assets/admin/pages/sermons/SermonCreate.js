import { GiaComponent } from '/@/admin/gia';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
        this.ref = {
            imageInput: [],
            audioInput: [],
            documentInput: []
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
    }

    label(type) {
        return `Déposez vos fichiers ${type} ou <span class="filepond--label-action">Parcourir</span>`
    }

    inputImage() {
        this.filePond.createInstance(this.ref.imageInput, {
            labelIdle: this.label('images'),
            allowMultiple: false,
            // @ts-ignore
            acceptedFileTypes: ['image/png', 'image/jpeg'],
            maxFileSize: "5MB",
            minFileSize: "50KB"
        })
    }

    audioInput() {
        this.filePond.createInstance(this.ref.audioInput, {
            labelIdle: this.label('audios'),
            // @ts-ignore
            acceptedFileTypes: ['audio/mpeg', 'audio/ogg', 'audio/aac', 'audio/wav'],
            maxFileSize: "200MB",
            minFileSize: "50KB"
        })
    }

    documentInput() {
        this.filePond.createInstance(this.ref.documentInput, {
            labelIdle: this.label('documents'),
            // @ts-ignore
            acceptedFileTypes: ['application/pdf'],
            maxFileSize: "30MB",
            minFileSize: "5KB"
        })
    }
}
