import React, { forwardRef, useEffect, useRef } from "react"
import { FormControl } from "./FormControl"
import flatpickr from '/@/plugins/flatpickr'
import { mergeRefs } from "/@/utils/hooks"

/**
 * @type { any }
 */
export const FlatpickrDate = React.memo(forwardRef((props, ref) => {
    const refEl = useRef(null)

    useEffect(() => {
        if (refEl.current) {
            flatpickr(refEl.current, {})
        }
    }, [])

    return <FormControl {...props} ref={mergeRefs(refEl, ref)} />
}))

/**
 * @type { any }
 */
export const FlatpickrTime = React.memo(forwardRef((props, ref) => {
    const refEl = useRef(null)

    useEffect(() => {
        if (refEl.current) {
            flatpickr(refEl.current, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
            })
        }
    }, [])

    return <FormControl {...props} ref={mergeRefs(refEl, ref)} />
}))