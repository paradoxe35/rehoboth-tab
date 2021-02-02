import { useCallback, useEffect, useRef } from "react"
import { ApiRequest } from "/@/api/api"
import { setValueAtPath } from "/@/functions/functions"
import { Notifier } from "/@/utils/notifier"


export const EVENT_DATA_DEFAULT = {
    cover: null,
    details: {},
    tickets: {},
    schedules: {},
    photos: [],
    other_info: {}
}


export let EVENT_DATA_FORM = { ...EVENT_DATA_DEFAULT }


export function resetEventDataForm() {
    EVENT_DATA_FORM = { ...EVENT_DATA_DEFAULT }
}


/**
 * @param { {[x: string]: HTMLInputElement} } refs 
 * @param { string } key 
 */
export const useSyncFormDataInputElements = (refs, key) => {

    const refElements = useRef([])

    const onChange = useCallback(({ target: { value, name, type, checked } }) => {
        if (!key) return
        let keys = key.split('.')
        const ivalue = ((type === "checkbox" || type === 'radio') ? checked : value)
        if (keys.length <= 1) {
            EVENT_DATA_FORM[key][name] = ivalue
        } else {
            setValueAtPath(EVENT_DATA_FORM, [...keys, name], ivalue)
        }
    }, [])


    useEffect(() => {
        for (const rkey in refs) {
            const element = refs[rkey];
            if (element && !refElements.current.includes(element)) {
                refs[rkey].addEventListener("change", onChange)
                refElements.current.push(element)
                onChange({ target: element })
            }
        }
    }, [refs])
}


export const forkedEventFormData = () => {

    const pictures = new FormData()
    const cover = new FormData()

    cover.set('cover', EVENT_DATA_FORM.cover)
    EVENT_DATA_FORM.photos.forEach((photo) => pictures.append('photos[]', photo))

    const formData = { ...EVENT_DATA_FORM }

    delete formData.cover
    delete formData.photos


    return {
        formData,
        pictures,
        cover
    }
}


export const handleUpdateEventData = (url, setLoading, datas, fn) => {
    setLoading(true)

    ApiRequest('post', url.toString(), datas)
        .then(({ data }) => {
            Notifier.success(data?.message)
            fn && fn(data)
        })
        .finally(() => setLoading(false))
}