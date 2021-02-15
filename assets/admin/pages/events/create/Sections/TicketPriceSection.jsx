import React, { useCallback, useEffect, useState } from "react"
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from "../DatasForm"
import H5 from "../H5"
import { AddIcon, DeleteIcon } from "../Icons"
import { Tab, Tabs } from "/@/components/admin/Tabs"
import Card from "/@/components/Card"
import { useInputElementRefs, useMultipleOption } from "/@/utils/hooks"

const SECTION_KEY = "tickets"
let $ticket = {}

// @ts-ignore
const PaidTicketOption = React.memo(({ index, onSelect, onDelete, checked, data }) => {
    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, `${SECTION_KEY}.options.${index}`)

    return <>
        <tr>
            <td>
                <input
                    className="form-control form-control-sm"
                    ref={ref}
                    defaultValue={data?.name}
                    name="name"
                    type="text"
                    placeholder="Nom de l'option" />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    defaultValue={data?.price ? `$${data?.price}` : "$0.00"}
                    ref={ref}
                    name="price"
                    type="text"
                    placeholder="Price" />
            </td>
            <td>
                <input
                    className="form-control form-control-sm"
                    defaultValue={data?.stock || "50"}
                    name="stock"
                    ref={ref}
                    type="number"
                    placeholder="Stock" />
            </td>
            <td className="text-center align-middle">
                <div className="custom-control custom-radio text-center">
                    <input
                        className="custom-control-input"
                        id={`multi-${index}`}
                        onChange={() => onSelect(index)}
                        checked={checked}
                        ref={ref}
                        type="radio"
                        name="default" />
                    <label htmlFor={`multi-${index}`} className="custom-control-label d-block">{index}</label>
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
    const { setCount, options, setOptions, onDelete } = useMultipleOption($ticket?.options)

    const onSelect = useCallback((id) => {
        setOptions(a => a.map(e => {
            if (e.id == id) {
                e.checked = true
            } else {
                e.checked = false
            }
            return e
        }))
    }, [])

    useEffect(() => {
        const poptions = EVENT_DATA_FORM[SECTION_KEY].options
        if (poptions) {
            Object.keys(poptions)
                .forEach((k) => {
                    if (!options.map(e => e.id).includes(k)) {
                        delete EVENT_DATA_FORM[SECTION_KEY].options[k]
                    }
                })
            options.forEach((k) => {
                EVENT_DATA_FORM[SECTION_KEY].options[k.id].default = k.checked
            })
        }
    }, [options])

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
                    <th>Stock</th>
                    <th>Par défaut</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {options.map(v => (
                    // @ts-ignore
                    <PaidTicketOption data={v.data} key={v.id} checked={v.checked} index={v.id} onDelete={onDelete} onSelect={onSelect} />
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

const TicketPriceSection = ({ children = [] }) => {
    // @ts-ignore
    $ticket = window.$event?.ticket

    const [type, setType] = useState($ticket?.type || 'paid')

    useEffect(() => {
        EVENT_DATA_FORM[SECTION_KEY]['type'] = type
    }, [type])

    return <Card title={<H5 text="Prix des tickets" />} bodyClass="bg-light" cardClass="my-3">
        <Tabs>
            <Tab
                active={type == "free"}
                onClick={() => setType('free')}
                title="Billet gratuit" />
            <Tab
                active={type == "paid"}
                onClick={() => setType('paid')}
                id="billet-paid"
                title="Billet payé">
                <PaidTicketContent />
            </Tab>
        </Tabs>
        {children}
    </Card>
}

export default TicketPriceSection