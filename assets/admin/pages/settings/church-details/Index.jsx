import "/@/utils/devtool"
import React, { useCallback, useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Card from "/@/components/Card"
import { ApiRequest } from "/@/api/api"
import { FormControl } from "../../events/create/FormControl"
import { useInputElementRefs } from "/@/utils/hooks"
import MapContent from "../../events/create/MapContent"
import { triggerOnChangeEvent } from "/@/functions/functions"
import Button from "/@/components/admin/Button"
import { Notifier } from "/@/utils/notifier"
import Label from "/@/components/Label"


let $details = null
let $address = null


const AddressContent = ({ pref }) => {
    return <>
        <FormControl
            defaultValue={$address.venue}
            ref={pref}
            name="venue"
            label="Lieu" />

        <FormControl
            defaultValue={$address.address}
            ref={pref}
            name="address"
            label="Adresse" />

        <FormControl
            defaultValue={$address.city}
            ref={pref}
            label="Ville"
            name="city"
        />

        <FormControl
            defaultValue={$address.state}
            ref={pref}
            label="Etat"
            name="state"
        />

        <FormControl
            defaultValue={$address.country}
            ref={pref}
            label="Pays"
            name="country"
        />
    </>
}


const FormContent = () => {
    const { ref, refs } = useInputElementRefs()
    const { ['country']: country, ['city']: city, ['state']: state } = refs

    const placejsOnChange = useCallback(
        /** @param { import('places.js').Suggestion } e */
        (e) => {
            country.value = e.country || ''
            city.value = e.city || ''
            state.value = e.county || ''

            triggerOnChangeEvent(state)
            triggerOnChangeEvent(city)
            triggerOnChangeEvent(country)
        }, [country, city, state])

    return <>
        <div className="row">
            <div className="col-lg-6 mb-3">
                <Label>
                    L'adresse de l'Église
                </Label>

                <AddressContent pref={ref} />
            </div>
            <div className="col-lg-6 mb-3">
                <Label>
                    Coordonnées de l'Église
                </Label>

                <FormControl
                    defaultValue={$details.email}
                    name="email"
                    label="Email" />

                <FormControl
                    defaultValue={$details.phone}
                    name="phone"
                    label="Phone" />

                <div className="mb-3">
                    <label htmlFor="descriptin" className="form-label">
                        Description
                        </label>
                    <textarea className="form-control" name="description" id="descriptin" rows={3}>
                        {$details.description}
                    </textarea>
                </div>
            </div>
        </div>

        <Label>
            Adresse map
        </Label>
        <MapContent
            sectionKey={null}
            label="Renseigner votre adresse map"
            $address={$address}
            placejsOnChange={placejsOnChange}
        />
    </>
}


const SaveContent = ({ formRef }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)

        const form = new FormData(formRef.current)

        ApiRequest('post', route('admin.settings.church-details').toString(), form)
            .finally(() => setLoading(false))
            .then(({ data: { message } }) => Notifier.success(message))
    }

    return <Button
        loading={loading}
        onClick={handleSubmit}
        type="button"
        className="btn-sm text-sm mt-3"
        text="Enregistrer" />
}

const Main = () => {

    const ref = useRef(null)

    return <Card>
        <form method="post" onSubmit={e => e.preventDefault()} ref={ref} autoComplete="off">
            <FormContent />
            <SaveContent formRef={ref} />
        </form>
    </Card>
}

const instance = (element) => {

    $details = window.$details || {}
    // @ts-ignore
    $address = $details.address || {}

    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance