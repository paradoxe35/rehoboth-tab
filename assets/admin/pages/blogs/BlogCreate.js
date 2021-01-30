import { Modal } from 'bootstrap';
import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { confirmed, debounce } from '/@/functions/functions';
import { convertToHtml } from '/@/functions/jsonToHtml';
import { Btn } from '/@/utils/dom';
import { Notifier } from '/@/utils/notifier';

export default class extends GiaComponent {
    constructor(element) {
        super(element);

        this.ref = {
            store: null,
            categoryBtn: null,
            categories: null,
            coverImage: null,
            preview: null,
            categoryModal: null,
            categoryList: null,
            storeCategory: null,
            modalViewer: null,
            title: null
        }

        this.imageCover = null
    }

    async require() {
        await this.initEditor()
        await this.initSelect()
        await this.initFilePond()
    }

    mount() {
        this.deleteCateroryEvent(this.element)

        this.ref.store
            .addEventListener('submit', this.storeFetch)

        this.ref.categoryBtn
            .addEventListener('click', this.showCategoryModal)

        this.ref.storeCategory
            .addEventListener('submit', this.storeCategoryFetch)

        this.ref.preview
            .addEventListener('click', this.preview)
    }

    unmount() {
        this.slim && this.slim.destroy()
    }

    /**
     * @param { HTMLElement | Element | DocumentFragment } element 
     */
    deleteCateroryEvent(element) {
        Array.from(element.querySelectorAll('[data-category-del]'))
            .forEach((el) => el.addEventListener('click', this.deleteCateroryFetch.bind(this, el)))
    }

    /**
     * @param { HTMLButtonElement } el 
     */
    deleteCateroryFetch = (el) => {
        if (!confirmed()) return

        const url = route('admin.blog-categories.delete', {
            blogCategories: el.getAttribute('data-category-del')
        }).toString()

        Btn.loading(el)

        ApiRequest('delete', url)
            .then(({ data }) => this.categoriesToHtml(data))
            .finally(() => Btn.hide())
    }


    showCategoryModal = () => {
        const m = new Modal(this.ref.categoryModal)
        m.show()
    }


    preview = async (e) => {
        const json = await this.editor.save()
        // @ts-ignore
        this.showInModal(json.blocks, this.ref.title.value)
    }

    /**
    * @param { Array } datas 
    */
    categoriesToHtml(datas) {
        this.slim.setData(
            [
                { id: ' ', name: 'Catégories', value: '' },
                ...datas
            ].map((t, i) => {
                return {
                    selected: !i,
                    value: t.id,
                    text: `${t.name}`
                }
            })
        )
        const htmlText = datas.map((t) => {
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            td1.innerHTML = this.withIcon(t.icon)
            const td2 = document.createElement('td')
            td2.innerHTML = t.name
            const td3 = document.createElement('td')
            td3.innerHTML = /*html*/ `
                <button type="button" data-category-del="${t.id}"
                    class="btn btn-secondary btn-sm text-danger active">
                    <i class="ni ni-fat-remove clickable-a text-primary"></i>
                </button>
            `
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            return tr
        })

        const parentTable = this.ref.categoryList
        this.removeChildren(parentTable.children)

        htmlText.forEach(el => {
            this.deleteCateroryEvent(el)
            parentTable.appendChild(el)
        })
    }

    /**
     * @param { Event } e 
     */
    storeCategoryFetch = async e => {
        e.preventDefault()

        const { target } = e

        // @ts-ignore
        Btn.loading(target)
        // @ts-ignore
        ApiRequest('post', route('admin.blog-categories.store').toString(), new FormData(target))
            .then(({ data: { message, datas } }) => {
                Notifier.success(message)
                this.categoriesToHtml(datas)
                this.clearInput(target)
            })
            .finally(() => Btn.hide())
    }


    /**
     * 
     * @param { Event } e 
     */
    storeFetch = async (e) => {
        e.preventDefault()
        const { target } = e

        // @ts-ignore
        const datas = new FormData(target)
        const json = await this.editor.save()
        datas.set('json', JSON.stringify(json))

        // @ts-ignore
        Btn.loading(target)

        // @ts-ignore
        ApiRequest('post', target.action, datas, true)
            .then(({ data: { message, redirect_url } }) => {
                Notifier.success(message)
                    .then(() => redirect_url && $swup.loadPage({ url: redirect_url }, true))
                this.editor.clear()
                this.clearInput(target)
            })
            .finally(() => Btn.hide())
    }


    withIcon = (icon) => icon ? /*html*/`
            <span style="height: 20px; width:20px" class="avatar bg-transparent rounded-circle mr-3">
                    ${icon}
            </span>` : ''


    async initFilePond() {
        const { default: FilePond, imageOptions, fileLabel } = (await import("/@/plugins/filepond"))

        FilePond.create(this.ref.coverImage, {
            ...imageOptions,
            labelIdle: fileLabel('Déposez une image de couverture'),
            allowMultiple: false,
            onaddfile: (err, { file }) => {
                if (!err) this.imageCover = file
            },
            onremovefile: (err) => {
                if (!err) this.imageCover = null
            }
        })
    }

    async initSelect() {
        const slim = (await import('/@/plugins/slim-select')).slim
        this.slim = slim(this.ref.categories)
    }

    async initEditor() {
        const { EditorJS } = await import('/@/plugins/editor/editor')
        this.editor = EditorJS(
            { onChange: debounce(this.storeInLocal, 2000) },
            route('admin.og-meta').toString()
        )

        this.editor.isReady
            .then(() => {
                // @ts-ignore
                const data = window.article_edit || this.getDataLocalStore()
                if (data) {
                    data.blocks.length && this.editor.render(data)
                }
            })
    }

    getDataLocalStore() {
        try {
            return JSON.parse(window.localStorage.getItem('editor-json-content'))
        } catch (_) {
            return null
        }
    }

    storeInLocal = async () => {
        const json = await this.editor.save()
        window.localStorage.setItem('editor-json-content', JSON.stringify(json))
    }

    removeChildren(el) {
        Array.from(el)
            .forEach(element => element.parentNode.removeChild(element))
    }

    /**
    * @param { Array } blocks 
    * @param { string } title
    */
    showInModal(blocks, title) {
        const html = document.createRange().createContextualFragment(convertToHtml(blocks))
        const body = this.ref.modalViewer.querySelector('.modal-body')
        this.ref.modalViewer.querySelector('.modal-title').textContent = title

        this.removeChildren(body.children)

        body.appendChild(html)
        const m = new Modal(this.ref.modalViewer)
        m.show()
    }


    clearInput(parent) {
        const inptus = parent.querySelectorAll('input[type="text"]');
        const textarea = parent.querySelectorAll('textarea');
        ([...inptus, ...textarea]).forEach(element => element.value = '')
    }

}
