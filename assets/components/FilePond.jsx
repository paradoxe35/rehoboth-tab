

import React, { useRef, useEffect } from "react"
import { useOnChangeRef } from "../utils/hooks"
import FilePond, { fileLabel, imageOptions } from "/@/plugins/filepond"

/**
 * 
 * @param {{  
 *      onremovefile: (file) => void, 
 *      onaddfile: (file) => void, label?:string, 
 *      allowMultiple?:boolean, 
 *      maxFiles?: number, 
 *      options?: import('filepond').FilePondOptions,
 *      filePond?: React.MutableRefObject<any>
 *  }} param0 
 */
const FilePondComponent = ({ onremovefile, onaddfile, label = null, allowMultiple = false, maxFiles = 10, options = {}, filePond }) => {
    const ref = useRef(null)
    const onremovefileRef = useOnChangeRef(onremovefile)
    const onaddfileRef = useOnChangeRef(onaddfile)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                ...imageOptions,
                instantUpload: false,
                ...(label ? { labelIdle: fileLabel(label) } : {}),
                allowMultiple,
                maxFiles,
                onaddfile: (err, { file }) => {
                    if (!err) onaddfileRef(file)
                },
                onremovefile: (err, { file }) => {
                    if (!err) onremovefileRef(file)
                },
                ...options
            })
            filePond && (filePond.current = pont)
            return () => pont.destroy()
        }
    }, [])

    return <div ref={ref} />
}

export default FilePondComponent