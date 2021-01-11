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
    }

}
