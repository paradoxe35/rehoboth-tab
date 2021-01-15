import React, { useRef, useEffect } from "react"
import { EVENT_DATA_FORM } from "../DatasForm"
import H5 from "../H5"
import Card from "/@/components/Card"
import FilePond, { fileLabel } from "/@/plugins/filepond"

const SECTION_KEY = "photos"

const UploadPhotosSection = () => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                labelIdle: fileLabel('Déposez vos fichiers images'),
                allowMultiple: true,
                maxFiles: 10,
                // @ts-ignore
                acceptedFileTypes: ['image/png', 'image/jpeg'],
                maxFileSize: "5MB",
                minFileSize: "50KB",
                onaddfile: (err, { file }) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY].data.push(file)
                    }
                },
                onremovefile: (err, { file }) => {
                    if (!err) {
                        EVENT_DATA_FORM[SECTION_KEY].data =
                            EVENT_DATA_FORM[SECTION_KEY].data.filter(f => f != file)
                    }
                }
            })
            return () => pont.destroy()
        }
    }, [])


    return <Card title={<H5 text="Télécharger des photos" />} bodyClass="bg-light" cardClass="my-3">
        <input type="file" ref={ref} />
    </Card>
}

export default UploadPhotosSection