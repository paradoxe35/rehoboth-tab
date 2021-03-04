import React from "react"
import { EVENT_DATA_FORM } from "../DatasForm"
import H5 from "../H5"
import Card from "/@/components/Card"
import FilePondComponent from "/@/components/FilePond"

const SECTION_KEY = "photos"

const UploadPhotosSection = React.memo(() => {
    const onaddfile = (file) => {
        EVENT_DATA_FORM[SECTION_KEY].push(file)
    }

    const onremovefile = (file) => {
        EVENT_DATA_FORM[SECTION_KEY] =
            EVENT_DATA_FORM[SECTION_KEY].filter(f => f != file)
    }


    return <Card title={<H5 text="Télécharger des photos" />} bodyClass="bg-light" cardClass="my-3">
        <FilePondComponent
            allowMultiple={true}
            onaddfile={onaddfile}
            onremovefile={onremovefile} />
    </Card>
})

export default UploadPhotosSection