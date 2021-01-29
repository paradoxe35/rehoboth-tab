import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton';


const ImageView = ({ src, width = null, height = null, className = null }) => {
    const ref = useRef(null)
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        if (ref.current) {
            ref.current.onload = () => setLoader(false)
        }
    }, [ref.current])

    return <>
        {/*  @ts-ignore */}
        {loader && <Skeleton height={height} width={width} />}
        <img src={src} className={className}  ref={ref} />
    </>
}

export default ImageView