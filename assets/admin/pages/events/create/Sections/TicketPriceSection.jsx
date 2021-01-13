import React, { useEffect, useState } from "react"
import H5 from "../H5"
import { AddIcon, DeleteIcon } from "../Icons"
import Card from "/@/components/Card"
import { useMultipleOption } from "/@/utils/hooks"


// @ts-ignore
const PaidTicketOption = React.memo(({ index, onSelect, onDelete, checked }) => {
    return <>
        <tr>
            <td>
                <input className="form-control form-control-sm" type="text" placeholder="Nom de l'option" />
            </td>
            <td>
                <input className="form-control form-control-sm" defaultValue="$0.00" type="text" placeholder="Price" />
            </td>
            <td className="text-center align-middle">
                <div className="custom-control custom-radio">
                    <input
                        className="custom-control-input"
                        onChange={() => onSelect(index)}
                        checked={checked}
                        type="radio"
                        name="paid-ticket-option" />
                    <label className="custom-control-label" />
                </div>
            </td>
            <td className="text-center align-middle">
                <button className="btn btn-link btn-sm" onClick={() => onDelete(index)}>
                    <DeleteIcon />
                </button>
            </td>
        </tr>
    </>
})


const PaidTicketContent = () => {
    const { setCount, options, setOptions, onDelete } = useMultipleOption()

    const onSelect = (id) => {
        setOptions(a => a.map(e => {
            if (e.id == id) {
                e.checked = true
            } else {
                e.checked = false
            }
            return e
        }))
    }

    useEffect(() => {
        const hasDefault = options.some(v => v.checked)
        if (!hasDefault && !!options.length) {
            setOptions(a => {
                const y = [...a]
                y[0].checked = true
                return y
            })
        }
    }, [options])

    return <>
        <table className="table table-bordered mt-2 bg-white">
            <thead>
                <tr className="fs--1">
                    <th>Nom de l'option</th>
                    <th>Prix</th>
                    <th>Par défaut</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {options.map(v => (
                    // @ts-ignore
                    <PaidTicketOption key={v.id} checked={v.checked} index={v.id} onDelete={onDelete} onSelect={onSelect} />
                ))}
            </tbody>
        </table>
        <button type="button"
            onClick={() => setCount(e => e + 1)}
            className="btn btn-primary text-xs btn-sm text-white">
            <AddIcon />
        </button>
    </>
}

const TicketPriceSection = () => {
    const [type, setType] = useState('paid')

    return <Card title={<H5 text="Prix des tickets" />} bodyClass="bg-light" cardClass="my-3">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <a className="nav-link border-darken border"
                    onClick={() => setType('free')}
                    id="pills-free-ticket-tab"
                    data-bs-toggle="pill"
                    href="#pills-free-ticket"
                    role="tab"
                    aria-controls="pills-free-ticket" aria-selected="false">Billet gratuit</a>
            </li>
            <li className="nav-item mx-2" role="presentation">
                <a className="nav-link active border-darken border"
                    onClick={() => setType('paid')}
                    id="pills-paid-ticket-tab"
                    data-bs-toggle="pill"
                    href="#pills-paid-ticket"
                    role="tab"
                    aria-controls="pills-paid-ticket"
                    aria-selected="true">Billet payé</a>
            </li>
        </ul>
        <hr />
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade"
                id="pills-free-ticket"
                role="tabpanel"
                aria-labelledby="pills-free-ticket-tab" />
            <div className="tab-pane fade show active"
                id="pills-paid-ticket"
                role="tabpanel" aria-labelledby="pills-paid-ticket-tab">
                <PaidTicketContent />
            </div>
        </div>
    </Card>
}

export default TicketPriceSection