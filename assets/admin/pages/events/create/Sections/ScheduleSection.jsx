import React, { useEffect } from "react"
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from "../DatasForm"
import { FlatpickrDate, FlatpickrTime } from "../Flatpickr"
import { FormControl } from "../FormControl"
import H5 from "../H5"
import { AddIcon, DeleteIcon } from "../Icons"
import Card from "/@/components/Card"
import { useInputElementRefs, useMultipleOption } from "/@/utils/hooks"

const SECTION_KEY = "schedules"
let $schedules = []


// @ts-ignore
const ScheduleOption = React.memo(({ index, onDelete, data }) => {

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, `${SECTION_KEY}.options.${index}`)

    return <div className="border rounded position-relative bg-white p-3 mb-3">
        <div className="row">
            <div className="col"><b>{index}</b></div>
            <div className="col-auto">
                <button className="btn btn-link btn-sm" onClick={() => onDelete(index)}>
                    <DeleteIcon />
                </button>
            </div>
            <div className="col-12">
                <FormControl defaultValue={data?.title} ref={ref} name="title" label="Titre" />
            </div>
            <div className="col-lg-6">
                <FlatpickrDate defaultValue={data?.start_date} ref={ref} name="start_date" label="Date de début" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime defaultValue={data?.start_time} ref={ref} name="start_time" label="Heure de début" />
            </div>

            <div className="col-lg-6">
                <FlatpickrDate defaultValue={data?.end_date} ref={ref} name="end_date" label="Date de fin" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime defaultValue={data?.end_time} ref={ref} name="end_time" label="Heure de fin" />
            </div>
        </div>
    </div>
})

const ScheduleSection = ({ children = [] }) => {
    // @ts-ignore
    $schedules = window.$event?.schedules

    const { setCount, options, onDelete } = useMultipleOption($schedules)

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
            <ScheduleOption data={v.data} key={v.id} index={v.id} onDelete={onDelete} />
        ))}

        <button type="button"
            onClick={() => setCount(e => e + 1)}
            className="btn btn-primary text-xs btn-sm text-white mt-3">
            <AddIcon />
        </button>

        <div className="mt-3">
            {children}
        </div>
    </Card>
}


export default ScheduleSection
