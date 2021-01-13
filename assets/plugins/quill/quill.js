import 'quill/dist/quill.snow.css'
import './style.css'
import Quill from 'quill'
import BlotFormatter from "quill-blot-formatter";


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
                ['image']
            ],
        },
        blotFormatter: {},
    },
    theme: 'snow',
}



export default Quill