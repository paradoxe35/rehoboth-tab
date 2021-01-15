import 'quill/dist/quill.snow.css'
import './style.css'
import Quill from 'quill'
import BlotFormatter from "quill-blot-formatter";
import MagicUrl from 'quill-magic-url'
import ImageUploader from 'quill-image-uploader'

Quill.register("modules/imageUploader", ImageUploader);

Quill.register('modules/magicUrl', MagicUrl)
Quill.register("modules/blotFormatter", BlotFormatter);

export const defaultOption = {
    modules: {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean'],
                ['image', 'video']
            ],
            handlers: {
                image: imageHandler
            }
        },
        blotFormatter: {},
        magicUrl: true,
        imageUploader: {
            upload: file => {
                return new Promise((resolve, reject) => {
                    let url = null
                    setTimeout(() => {
                        url = URL.createObjectURL(file)
                        resolve(url);
                    }, 3500);

                    setTimeout(() => {
                        URL.revokeObjectURL(url)
                    }, 4000);
                });
            }
        }
    },
    theme: 'snow',
}


export function imageHandler() {
    const range = this.quill.getSelection();
    const value = prompt("Entrez le lien de l'image");
    if (value) {
        // @ts-ignore
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

export default Quill