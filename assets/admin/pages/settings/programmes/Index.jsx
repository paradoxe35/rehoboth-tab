import "/@/utils/devtool"
import React, { useEffect, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Card from "/@/components/Card"
import Select from 'react-select';
import { ApiRequest } from "/@/api/api"
import Label from "/@/components/Label"
import { FlatpickrTime } from "../../events/create/Flatpickr";
import { Notifier } from "/@/utils/notifier";
import Button from "/@/components/admin/Button";
import { confirmed } from "/@/functions/functions";


const optionsDay = [
    { value: 'lundi', label: 'Lundi' },
    { value: 'mardi', label: 'Mardi' },
    { value: 'mercredi', label: 'Mercredi' },
    { value: 'jeudi', label: 'Jeudi' },
    { value: 'vendredi', label: 'Vendredi' },
    { value: 'samedi', label: 'Samedi' },
    { value: 'dimanche', label: 'Dimanche' },
];

const TableContent = ({ data, onDelete }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        if (!confirmed()) return
        setLoading(true)
        ApiRequest('delete', route('admin.settings.programmes.destroy', { programme: data.id }).toString())
            .finally(() => setLoading(false))
            .then(() => onDelete(data.id))
    }

    return <tr>
        <td>{data.day}</td>
        <td>{data.start_time}</td>
        <td>{data.end_time}</td>
        <td>
            <Button
                loading={loading}
                onClick={handleDelete}
                color="danger"
                className="btn-sm text-xs p-1"
                text="Supprimer" />
        </td>
    </tr>
}

const Main = () => {

    const [loading, setLoading] = useState(false)
    const [programmes, setProgrammes] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const form = new FormData(e.target)

        ApiRequest('post', route('admin.settings.programmes').toString(), form)
            .finally(() => setLoading(false))
            .then(({ data: { message, programme } }) => {
                setProgrammes(ps => [programme, ...ps])
                Notifier.success(message)
            })
    }

    useEffect(() => {
        ApiRequest('get', route('admin.settings.programmes.items').toString())
            .then(({ data }) => setProgrammes(data))
    }, [])

    const onDelete = (id) => {
        setProgrammes(ps => ps.filter(i => i.id != id))
    }

    return <Card>
        <div className="row">
            <div className="col-lg-6">
                <Label>
                    Ajouter Programme
                </Label>
                <form onSubmit={handleSubmit} method="post">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="form-label">Jour de la semaine</label>
                        </div>
                        {/*  @ts-ignore */}
                        <Select
                            name="day"
                            options={optionsDay}
                            classNamePrefix="select"
                        />
                    </div>

                    <FlatpickrTime
                        name="start_time"
                        label="Heure de début"
                    />

                    <FlatpickrTime
                        name="end_time"
                        label="heure de fin"
                    />

                    <Button
                        loading={loading}
                        type="submit"
                        className="btn-sm text-sm mt-3"
                        text="Enregistrer" />
                </form>
            </div>
            <div className="col-lg-6">
                <Label>
                    Programmes
                </Label>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Jour</th>
                                <th scope="col">Heure de début</th>
                                <th scope="col">heure de fin</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programmes.map(data => <TableContent key={data.id} data={data} onDelete={onDelete} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Card>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}

export default instance