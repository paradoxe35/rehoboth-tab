import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import Card from "/@/components/Card"
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from '../DatasForm';
import { useInputElementRefs } from '/@/utils/hooks';
import { ApiRequest } from '/@/api/api';


const SECTION_KEY = "other_info"

const animatedComponents = makeAnimated();

const useFetchOptions = (url) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        ApiRequest('get', url)
            .then(({ data }) => {
                if (data) {
                    setOptions(data.map(e => ({ value: e.name, label: e.name })))
                }
            })
    }, [])

    return { options }
}


const SelectLabel = ({ label }) => {
    return <div className="d-flex justify-content-between align-items-center">
        <label className="form-label">{label}</label>
    </div>
}


const Organizers = () => {
    const { options } = useFetchOptions(route('admin.organizers.index'))

    const handleChange = (newValue) => {
        EVENT_DATA_FORM[SECTION_KEY].organizers = newValue
    };

    return <div className="mb-3">
        <SelectLabel label="Organisateurs" />
        {/*  @ts-ignore */}
        <CreatableSelect
            isMulti
            name="colors"
            onChange={handleChange}
            components={animatedComponents}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}

const Tags = () => {

    const { options } = useFetchOptions(route('admin.tags.index'))

    const handleChange = (newValue) => {
        EVENT_DATA_FORM[SECTION_KEY].tags = newValue
    };

    return <div className="mb-3">
        <SelectLabel label="Tags" />
        {/*  @ts-ignore */}
        <CreatableSelect
            isMulti
            name="tags"
            onChange={handleChange}
            components={animatedComponents}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}


const OtherInfoSection = () => {
    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <Card title={<H5 text="Autre info" />} bodyClass="bg-light" cardClass="my-3">
        <FormControl name="label" ref={ref} label="Label" />

        <hr />

        <Organizers />

        <Tags />

        <hr />

        <h6>Billets restants</h6>
        <Checkbox name="remaining_tickets" ref={ref} label="Afficher le nombre de billets restants." />
    </Card>
}

export default OtherInfoSection