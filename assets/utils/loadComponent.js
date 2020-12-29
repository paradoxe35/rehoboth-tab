import createInstance from 'gia/createInstance';

export const loadGiaComponent = (components, event) => {
    /** @type {{ newBody: HTMLBodyElement }} */
    // @ts-ignore
    const { newBody } = event.data || {};
    if (!newBody) return false

    Array.from(newBody.querySelectorAll("[g-component]"))
        .forEach((el) => {
            /** @type { HTMLElement } */
            // @ts-ignore
            const element = el
            const component = element.getAttribute('g-component')
            const instance = createInstance(element, component, components[component]);
            instance._load();
        })
}