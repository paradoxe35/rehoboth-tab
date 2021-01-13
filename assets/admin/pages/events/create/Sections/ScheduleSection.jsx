import React from "react"
import { FlatpickrDate, FlatpickrTime } from "../Flatpickr"
import { FormControl } from "../FormControl"
import H5 from "../H5"
import { AddIcon, DeleteIcon } from "../Icons"
import Card from "/@/components/Card"
import { useMultipleOption } from "/@/utils/hooks"


const ScheduleOption = ({ index, onDelete }) => {
    return <div className="border rounded position-relative bg-white p-3 mb-3">
        <div className="row">
            <div className="col"></div>
            <div className="col-auto">
                <button className="btn btn-link btn-sm" onClick={() => onDelete(index.id)}>
                    <DeleteIcon />
                </button>
            </div>
            <div className="col-12">
                <FormControl label="Titre" />
            </div>
            <div className="col-lg-6">
                <FlatpickrDate label="Date de début" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime label="Heure de début" />
            </div>

            <div className="col-lg-6">
                <FlatpickrDate label="Date de fin" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime label="Heure de fin" />
            </div>
        </div>
    </div>
}

const ScheduleSection = () => {
    const { setCount, options, onDelete } = useMultipleOption()

    return <Card title={<H5 text="Programmes" />} bodyClass="bg-light" cardClass="my-3">
        {options.map(v => (
            <ScheduleOption
                key={v.id}
                index={v}
                onDelete={onDelete} />
        ))}

        <button type="button"
            onClick={() => setCount(e => e + 1)}
            className="btn btn-primary text-xs btn-sm text-white mt-3">
            <AddIcon />
        </button>
    </Card>
}


export default ScheduleSection