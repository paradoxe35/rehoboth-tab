import React, { useEffect } from "react"
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from "../DatasForm"
import { FlatpickrDate, FlatpickrTime } from "../Flatpickr"
import { FormControl } from "../FormControl"
import H5 from "../H5"
import { AddIcon, DeleteIcon } from "../Icons"
import Card from "/@/components/Card"
import { useInputElementRefs, useMultipleOption } from "/@/utils/hooks"

const SECTION_KEY = "schedules"

// @ts-ignore
const ScheduleOption = React.memo(({ index, onDelete }) => {

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, `${SECTION_KEY}.options.${index}`)

    return <div className="border rounded position-relative bg-white p-3 mb-3">
        <div className="row">
            <div className="col"></div>
            <div className="col-auto">
                <button className="btn btn-link btn-sm" onClick={() => onDelete(index)}>
                    <DeleteIcon />
                </button>
            </div>
            <div className="col-12">
                <FormControl ref={ref} name="title" label="Titre" />
            </div>
            <div className="col-lg-6">
                <FlatpickrDate ref={ref} name="start_date" label="Date de début" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime ref={ref} name="start_time" label="Heure de début" />
            </div>

            <div className="col-lg-6">
                <FlatpickrDate ref={ref} name="end_date" label="Date de fin" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime ref={ref} name="end_time" label="Heure de fin" />
            </div>
        </div>
    </div>
})

const ScheduleSection = () => {
    const { setCount, options, onDelete } = useMultipleOption()

    useEffect(() => {
        const poptions = EVENT_DATA_FORM[SECTION_KEY].options
        if (poptions) {
            Object.keys(poptions)
                .forEach((k) => {
                    if (!options.map(e => e.id).includes(k)) {
                        delete EVENT_DATA_FORM[SECTION_KEY].options[k]
                    }
                })
        }
    }, [options])

    return <Card title={<H5 text="Programmes" />} bodyClass="bg-light" cardClass="my-3">
        {options.map(v => (
            // @ts-ignore
            <ScheduleOption key={v.id} index={v.id} onDelete={onDelete} />
        ))}

        <button type="button"
            onClick={() => setCount(e => e + 1)}
            className="btn btn-primary text-xs btn-sm text-white mt-3">
            <AddIcon />
        </button>
    </Card>
}


export default ScheduleSection