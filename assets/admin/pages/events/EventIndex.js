import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { openModalEventFrame } from '/@/utils/dom';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
    }

    mount() {
        this.unmoutModal = openModalEventFrame("eventsIndex", ({ type, data }) => {
            switch (type) {
                case "image":
                    return this.viewImageSermon(type, data)
                    break;
            }
        })
    }

    unmount() {
        this.unmoutModal && this.unmoutModal()
    }

}
