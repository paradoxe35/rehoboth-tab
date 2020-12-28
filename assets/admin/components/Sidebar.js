import { Collapse } from 'bootstrap'
import { GiaComponent } from '../gia';

export default class extends GiaComponent {
    mount() {
        new Collapse(this.element, {
            toggle: false
        });
    }
}
