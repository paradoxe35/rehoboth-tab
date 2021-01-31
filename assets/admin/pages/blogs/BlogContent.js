import { GiaComponent } from '/@/admin/gia';
import { convertToHtml } from '/@/functions/jsonToHtml';

export default class extends GiaComponent {
    constructor(element) {
        super(element);

        this.ref = {
            content: null
        }
    }

    mount() {
        // @ts-ignore
        const { blocks } = window.article_json
        const html = document.createRange().createContextualFragment(convertToHtml(blocks))
        this.ref.content.appendChild(html)
    }
}
