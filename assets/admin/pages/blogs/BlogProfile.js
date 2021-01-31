import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { confirmed } from '/@/functions/functions';
import { Btn } from '/@/utils/dom';

export default class extends GiaComponent {
    constructor(element) {
        super(element);
        this.ref = {
            destroyBlog: null
        }
    }

    mount() {
        this.ref.destroyBlog
            .addEventListener('click', this.destroyBlogFetch.bind(this))
    }

    destroyBlogFetch() {
        if (!confirmed()) return

        Btn.loading(this.ref.destroyBlog)
        // @ts-ignore
        ApiRequest('delete', route('admin.blogs.destroy', { blog: window.$blog_id }).toString())
            .then(({ data: { redirect_url: url } }) => url && $swup.loadPage({ url }, true))
            .finally(() => Btn.hide())
    }
}
