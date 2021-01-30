import React, { useRef, useEffect } from "react"
import { EVENT_DATA_FORM } from "../DatasForm"
import Card from "/@/components/Card"
import FilePond, { fileLabel, imageOptions } from "/@/plugins/filepond"

const SECTION_KEY = "cover"

const CoverImageSection = React.memo(() => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                ...imageOptions,
                labelIdle: fileLabel('Déposez une image de couverture'),
                allowMultiple: false,
                onaddfile: (err, { file }) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY] = file
                    }
                },
                onremovefile: (err) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY] = null
                    }
                }
            })
            return () => pont.destroy()
        }
    }, [])

    return <Card bodyClass="p-1 bg-light" cardClass="p-0 my-3">
        <div ref={ref} />
    </Card>
})

export default CoverImageSection
