import React, { useEffect, useRef } from "react"
import { FormControl } from "./FormControl"
import flatpickr from '/@/plugins/flatpickr'

export const FlatpickrDate = (props) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            flatpickr(ref.current, {})
        }
    }, [])

    return <FormControl {...props} ref={ref} />
}

export const FlatpickrTime = (props) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            flatpickr(ref.current, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
            })
        }
    }, [])

    return <FormControl {...props} ref={ref} />
}