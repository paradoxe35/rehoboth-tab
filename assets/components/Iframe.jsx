import React from "react"
import { useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"


/**
* @param {React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>} props 
*/
export const Iframe = (props) => {
    const ref = useRef(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (ref.current) {
            ref.current.onload = () => setLoader(false)
        }
    }, [ref.current])

    return <>
        {loader && (
            <div className="my-5">
                <Spinner />
            </div>
        )}
        <iframe hidden={loader} {...props} ref={ref} />
    </>
}