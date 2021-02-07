import React from "react"
import { useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"


const Loader = ({ children }) => {
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
        {children(ref, loader)}
    </>
}

const hidden = { visibility: "hidden", opacity: "0" }

/**
* @param {React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>} props 
*/
export const Iframe = (props) => <Loader>
    {/* @ts-ignore */}
    {(ref, loader) => <iframe hidden={loader} {...props} ref={ref} />}
</Loader>


/**
* @param {React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>} props 
*/
export const ObjectElement = (props) => <Loader>
    {/* @ts-ignore */}
    {(ref, loader) => <object style={(loader ? hidden : {})} {...props} ref={ref} />}
</Loader>