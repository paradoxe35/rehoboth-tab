import React, { useEffect, useRef } from 'react'
import lozad from 'lozad'

export const LozadImage = (props) => {

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            lozad(ref.current).observe()
        }
    }, [ref.current])
    return <img {...props} ref={ref} />

}