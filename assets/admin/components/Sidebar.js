import { Collapse } from 'bootstrap'
import { GiaComponent } from '../gia';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }

    mount() {
        new Collapse(this.element, {
            toggle: false
        });
    }
}
