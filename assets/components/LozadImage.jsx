import React, { useEffect, useRef } from 'react'
import lozad from 'lozad'

/**
 * @param {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props 
 */
export const LozadImage = (props) => {

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            lozad(ref.current).observe()
        }
    }, [ref.current])
    return <img {...props} ref={ref} />

}