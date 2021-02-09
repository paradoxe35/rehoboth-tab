import React from "react"
import { useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"


const Loader = ({ children, className = null }) => {
    const ref = useRef(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (ref.current) {
            ref.current.onload = () => setLoader(false)
            ref.current.onError = () => setLoader(false)
        }
    }, [ref.current])

    return <>
        {loader &&   <Spinner className={`my-5 ${className}`} />}
        {children(ref, loader)}
    </>
}

const hidden = { visibility: "hidden", opacity: "0" }

/**
* @param { React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> & {loaderClass: string} } props 
*/
export const Iframe = (props) => {
    const loaderClass = props.loaderClass
    delete props.loaderClass

    return <Loader className={loaderClass}>
        {/* @ts-ignore */}
        {(ref, loader) => <iframe hidden={loader} {...props} ref={ref} />}
    </Loader>
}


/**
* @param {React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>} props 
*/
export const ObjectElement = (props) => <Loader>
    {/* @ts-ignore */}
    {(ref, loader) => <object style={(loader ? hidden : {})} {...props} ref={ref} />}
</Loader>