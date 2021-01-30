import React, { useRef, useEffect } from "react"
import { EVENT_DATA_FORM } from "../DatasForm"
import H5 from "../H5"
import Card from "/@/components/Card"
import FilePond, { imageOptions } from "/@/plugins/filepond"

const SECTION_KEY = "photos"

const UploadPhotosSection = React.memo(() => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                ...imageOptions,
                onaddfile: (err, { file }) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY].push(file)
                    }
                },
                onremovefile: (err, { file }) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY] =
                            EVENT_DATA_FORM[SECTION_KEY].filter(f => f != file)
                    }
                }
            })
            return () => pont.destroy()
        }
    }, [])


    return <Card title={<H5 text="Télécharger des photos" />} bodyClass="bg-light" cardClass="my-3">
        <div ref={ref} />
    </Card>
})

export default UploadPhotosSection