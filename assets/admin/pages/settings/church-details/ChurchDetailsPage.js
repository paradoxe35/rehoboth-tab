import { GiaComponent } from '/@/admin/gia';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }
    async require() {
        this.react = (await import(/* webpackChunkName: "admin-settings-church-details" */"./Index"))
            .default(this.element)
    }
    mount() { }

    unmount() {
        this.react && this.react()
    }
}
