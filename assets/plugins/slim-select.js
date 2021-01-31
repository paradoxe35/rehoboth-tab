import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

/**
 * @param { HTMLElement|Element } element 
 * @param { * } option
 */
export const slim = (element, option = {}) => {
    return new SlimSelect({
        select: element,
        searchPlaceholder: 'Recherche',
        ...option
    })
}