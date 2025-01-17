import { Modal } from 'bootstrap';
import { GiaComponent } from '/@/admin/gia';
import { ApiRequest } from '/@/api/api';
import { confirmed, debounce } from '/@/functions/functions';
import { convertToHtml } from '/@/functions/jsonToHtml';
import { Btn, FormBtn } from '/@/utils/dom';
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
        this.deleteCategoryEvent(this.element)

        this.ref.store
            .addEventListener('submit', this.storeFetch.bind(this))

        this.ref.categoryBtn
            .addEventListener('click', this.showCategoryModal.bind(this))

        this.ref.storeCategory
            .addEventListener('submit', this.storeCategoryFetch.bind(this))

        this.ref.preview
            .addEventListener('click', this.preview.bind(this))
    }

    unmount() {
        this.slim && this.slim.destroy()
    }

    /**
     * @param { HTMLElement | Element | DocumentFragment } element 
     */
    deleteCategoryEvent(element) {
        Array.from(element.querySelectorAll('[data-category-del]'))
            .forEach((el) => el.addEventListener('click', this.deleteCategoryFetch.bind(this, el)))
    }

    /**
     * @param { HTMLButtonElement } el 
     */
    deleteCategoryFetch(el) {
        if (!confirmed()) return

        const url = route('admin.blog-categories.destroy', {
            blog_category: el.getAttribute('data-category-del')
        }).toString()

        Btn.loading(el)

        ApiRequest('delete', url)
            .then(({ data }) => this.categoriesToHtml(data))
            .finally(() => Btn.hide())
    }


    showCategoryModal() {
        const m = new Modal(this.ref.categoryModal)
        m.show()
    }


    async preview(e) {
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
                    class="btn btn-secondary btn-sm text-xs">
                   <span class="text-white">supprimer</span>
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
            this.deleteCategoryEvent(el)
            parentTable.appendChild(el)
        })
    }

    /**
     * @param { Event } e 
     */
    async storeCategoryFetch(e) {
        e.preventDefault()

        const { target } = e

        Btn.loading(FormBtn(target))

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
    async storeFetch(e) {
        e.preventDefault()

        const json = await this.editor.save()
        if (!json.blocks.length) {
            Notifier.error("Contenu article est requis")
            return
        }

        const { target } = e

        // @ts-ignore
        const datas = new FormData(target)

        datas.set('json', JSON.stringify(json))

        this.imageCover && datas.set('image', this.imageCover)

        Btn.loading(FormBtn(target))

        // @ts-expect-error
        const editMode = target.action.includes('blogs/update')

        // @ts-ignore
        ApiRequest('post', target.action, datas, true)
            .then(({ data: { message, redirect_url } }) => {
                window.setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }, 1000)

                Notifier.success(message)
                    .then(() => {
                        if(redirect_url) {
                            $swup.loadPage({ url: redirect_url }, true)
                        }
                    })

                if(!editMode) {
                    this.editor.clear()
                    this.clearInput(target)
                    this.pond && this.pond.removeFile(0)
                }
            })
            .finally(() => Btn.hide())
    }


    withIcon(icon) {
        return icon ?
        /*html*/` <span style="height: 20px; width:20px" class="avatar bg-transparent rounded-circle mr-3">
                    ${icon}
            </span>`
            : ''
    }


    async initFilePond() {
        const { default: FilePond, imageOptions, fileLabel } = (await import(/* webpackChunkName: "filepond" */"/@/plugins/filepond"))

        this.pond = FilePond.create(this.ref.coverImage, {
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
        const slim = (await import(/* webpackChunkName: "slim-select" */'/@/plugins/slim-select')).slim
        this.slim = slim(this.ref.categories)
    }

    async initEditor() {
        const { EditorJS } = await import(/* webpackChunkName: "editorjs" */'/@/plugins/editor/editor')

        this.editor = EditorJS(
            { onChange: debounce(this.storeInLocal.bind(this), 2000) },
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

    async storeInLocal() {
        const json = await this.editor.save()
        window.localStorage.setItem('editor-json-content', JSON.stringify(json))
    }

    /**
     * @param {Iterable<any> | ArrayLike<any>} children 
     */
    removeChildren(children) {
        Array.from(children)
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
