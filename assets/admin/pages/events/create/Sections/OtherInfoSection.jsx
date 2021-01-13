import React, { useRef, useState } from 'react'
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import Card from "/@/components/Card"
import Select from 'react-select';
import BsModal from '/@/components/admin/Modal';


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

const SelectLabel = ({ label, onNewClick = null }) => {
    return <div className="d-flex justify-content-between align-items-center">
        <label className="form-label">{label}</label>
        <button className="btn btn-link btn-sm pr-0" onClick={onNewClick} type="button">
            Nouveau
        </button>
    </div>
}


const Organizers = () => {
    const modalRef = useRef(null)
    const [datas, setDatas] = useState([])

    
    return <div className="mb-3">
        <SelectLabel
            label="Organisateurs"
            onNewClick={() => modalRef.current && modalRef.current.show()} />
        {/*  @ts-ignore */}
        <Select
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />

        <BsModal modalRef={modalRef} render={datas} size={null}>
            {render => {
                return <></>
            }}
        </BsModal>
    </div>
}

const Tags = () => {

    return <div className="mb-3">
        <SelectLabel label="Tags" />
        {/*  @ts-ignore */}
        <Select
            isMulti
            name="tags"
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