import { Tab } from 'bootstrap'
import { GiaComponent } from '../gia';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }

    mount() {
        const { hash } = window.location
        if (hash) {
            const el = this.element.querySelector(`a[href="${hash}"`)
            el && (new Tab(el)).show()
        }
    }
}
