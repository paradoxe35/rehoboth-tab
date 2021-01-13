import React, { useRef, useEffect } from "react"
import Card from "/@/components/Card"
import FilePond, { fileLabel } from "/@/plugins/filepond"

const CoverImageSection = () => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                labelIdle: fileLabel('Déposez une image de couverture'),
                allowMultiple: false,
                // @ts-ignore
                acceptedFileTypes: ['image/png', 'image/jpeg'],
                maxFileSize: "5MB",
                minFileSize: "50KB"
            })

            return () => pont.destroy()
        }

    }, [])

    return <Card bodyClass="p-1 bg-light" cardClass="p-0 my-3">
        <input type="file" ref={ref} />
    </Card>
}

export default CoverImageSection
