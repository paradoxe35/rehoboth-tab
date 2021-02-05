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
let $event = {}

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
    const defaultValue = ($event?.organizers || []).map(t => ({ label: t.name, value: t.name }))

    const [dvalues, setDvalues] = useState(defaultValue)

    const handleChange = (newValue) => {
        setDvalues(newValue || [])
        EVENT_DATA_FORM[SECTION_KEY].organizers = newValue
    };

    useEffect(() => {
        EVENT_DATA_FORM[SECTION_KEY].organizers = defaultValue
    }, [])

    return <div className="mb-3">
        <SelectLabel label={<span>Organisateurs ({dvalues.map(v => v.value).join(', ')})</span>} />
        {/*  @ts-ignore */}
        <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
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

    const defaultValue = ($event?.tags || []).map(t => ({ label: t.name, value: t.name }))

    const [dvalues, setDvalues] = useState(defaultValue)

    const handleChange = (newValue) => {
        setDvalues(newValue || [])
        EVENT_DATA_FORM[SECTION_KEY].tags = newValue
    };

    useEffect(() => {
        EVENT_DATA_FORM[SECTION_KEY].tags = defaultValue
    }, [])

    return <div className="mb-3">
        <SelectLabel label={<span>Tags ({dvalues.map(v => v.value).join(', ')})</span>} />
        {/*  @ts-ignore */}
        <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            name="tags"
            onChange={handleChange}
            components={animatedComponents}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}


const OtherInfoSection = ({ children = [] }) => {

    $event = window.$event || {}

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <Card title={<H5 text="Autre info" />} bodyClass="bg-light" cardClass="my-3">
        <FormControl
            defaultValue={$event?.label}
            name="label"
            ref={ref}
            label="Label" />

        <hr />

        <Organizers />

        <Tags />

        <hr />

        <h6>Billets restants</h6>
        <Checkbox
            defaultChecked={!!$event?.ticket?.remaining}
            name="remaining_tickets"
            ref={ref}
            label="Afficher le nombre de billets restants." />

        {children}
    </Card>
}

export default OtherInfoSection