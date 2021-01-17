import { useCallback, useEffect, useRef } from "react"
import { setValueAtPath } from "/@/functions/functions"

export const EVENT_DATA_FORM = {
    cover: null,
    details: {},
    tickets: {},
    schedules: {},
    photos: [],
    other_info: {}
}


/**
 * @param { {[x: string]: HTMLInputElement} } refs 
 * @param { string } key 
 */
export const useSyncFormDataInputElements = (refs, key) => {

    const refElements = useRef([])

    const onChange = useCallback(({ target: { value, name, type, checked } }) => {
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