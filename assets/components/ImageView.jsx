import React, { useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const ImageView = ({ src, width = null, height = null, className = null }) => {
    const ref = useRef(null)
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        if (ref.current) {
            ref.current.onload = () => setLoader(false)
        }
    }, [ref.current])

    return <>
        {loader && (
            /* @ts-ignore */
            <SkeletonTheme color="#e9e6e6">
                <p>
                    {/* @ts-ignore */}
                    <Skeleton height={keyH} height={height} width={width} />
                </p>
            </SkeletonTheme>
        )}
        <img src={src} className={className} ref={ref} />
    </>
}

export default ImageView