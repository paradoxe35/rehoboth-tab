import React, { useRef, useState } from 'react'
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import Card from "/@/components/Card"
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

const SelectLabel = ({ label }) => {
    return <div className="d-flex justify-content-between align-items-center">
        <label className="form-label">{label}</label>
    </div>
}


const Organizers = () => {
    const [datas, setDatas] = useState([])

    return <div className="mb-3">
        <SelectLabel label="Organisateurs" />
        {/*  @ts-ignore */}
        <CreatableSelect
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            components={animatedComponents}
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}

const Tags = () => {

    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.log(`meta: `, actionMeta);
        console.groupEnd();
    };

    return <div className="mb-3">
        <SelectLabel label="Tags" />
        {/*  @ts-ignore */}
        <CreatableSelect
            isMulti
            name="tags"
            onChange={handleChange}
            components={animatedComponents}
            options={flavourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}


const OtherInfoSection = () => {
    return <Card title={<H5 text="Autre info" />} bodyClass="bg-light" cardClass="my-3">
        <FormControl label="Label" />

        <hr />
        <Organizers />
        <Tags />
        <hr />

        <h6>Billets restants</h6>
        <Checkbox label="Afficher le nombre de billets restants." />
    </Card>
}

export default OtherInfoSection