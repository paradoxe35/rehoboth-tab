import React from "react"
import { EVENT_DATA_FORM } from "../DatasForm"
import Card from "/@/components/Card"
import FilePondComponent from "/@/components/FilePond"

const SECTION_KEY = "cover"

const CoverImageSection = React.memo(() => {
    const onaddfile = (file) => {
        EVENT_DATA_FORM[SECTION_KEY] = file
    }

    const onremovefile = () => {
        EVENT_DATA_FORM[SECTION_KEY] = null
    }

    return <Card bodyClass="p-1 bg-light" cardClass="p-0 my-3">
        <FilePondComponent
            onaddfile={onaddfile}
            label="Déposez une image de couverture"
            onremovefile={onremovefile} />
    </Card>
})

export default CoverImageSection
