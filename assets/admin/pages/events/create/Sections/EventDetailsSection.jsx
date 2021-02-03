import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from '../DatasForm';
import { FlatpickrDate, FlatpickrTime } from '../Flatpickr';
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import MapContent from '../MapContent';
import Card from "/@/components/Card"
import { triggerOnChangeEvent } from '/@/functions/functions';
import Quill, { defaultOption } from '/@/plugins/quill/quill';
import { useInputElementRefs } from '/@/utils/hooks';

const SECTION_KEY = "details"

let $event = {}
let $address = {}


const Map = ({ placejsOnChange = undefined }) => {
    const [checked, setChecked] = useState(!!$address.map)

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <div className="mb-3">
        <Checkbox
            ref={ref}
            name="map"
            label="Map"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />

        {checked && <MapContent
            sectionKey={SECTION_KEY}
            $address={$address}
            placejsOnChange={placejsOnChange}
        />}
    </div>
}

const Inscriptions = () => {
    const [checked, setChecked] = useState(!!$event.enable_registration)

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <div className="col-12">
        <Checkbox
            ref={ref}
            name="registration"
            label="Inscriptions"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />
        {
            checked &&
            <FlatpickrDate
                defaultValue={$event.registration_deadline}
                ref={ref}
                name="registration_deadline"
                label="Date limite d'inscription" />
        }
    </div>
}

const EventDetailsMain = () => {
    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <>
        <div className="col-12">
            <FormControl
                name="name"
                defaultValue={$event.name}
                ref={ref}
                label="Nom de l'événement" />
        </div>
        <div className="col-lg-6">
            <FlatpickrDate
                defaultValue={$event.start_date}
                name="start_date"
                ref={ref} label="Date de début" />
        </div>
        <div className="col-lg-6">
            <FlatpickrTime
                defaultValue={$event.start_time}
                name="start_time"
                ref={ref}
                label="Heure de début" />
        </div>

        <div className="col-lg-6">
            <FlatpickrDate
                defaultValue={$event.end_date}
                name="end_date"
                ref={ref}
                label="Date de fin" />
        </div>
        <div className="col-lg-6">
            <FlatpickrTime
                defaultValue={$event.end_time}
                name="end_time"
                ref={ref}
                label="Heure de fin" />
        </div>
    </>
}

const EventDetailsLocalisation = () => {
    const { ref, refs } = useInputElementRefs()

    const { ['country']: country, ['city']: city, ['state']: state } = refs

    useSyncFormDataInputElements(refs, SECTION_KEY)

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
        <div className="col-lg-6">
            <FormControl
                defaultValue={$address.venue}
                name="venue"
                ref={ref}
                label="Lieu" />
        </div>
        <div className="col-lg-6">
            <FormControl
                defaultValue={$address.address}
                name="address"
                ref={ref}
                label="Adresse" />
        </div>

        <div className="col-lg-4">
            <FormControl
                defaultValue={$address.city}
                label="Ville"
                name="city"
                ref={ref} />
        </div>
        <div className="col-lg-4">
            <FormControl
                defaultValue={$address.state}
                label="Etat"
                name="state"
                ref={ref} />
        </div>
        <div className="col-lg-4">
            <FormControl
                defaultValue={$address.country}
                label="Pays"
                name="country"
                ref={ref} />
        </div>

        <div className="col-12">
            <Map placejsOnChange={placejsOnChange} />
        </div>
    </>
}


const DescriptionAndText = () => {
    const ref = useRef(null)
    /** @type { { current: import('quill').default } } */
    const quill = useRef(null)

    useEffect(() => {
        if (ref.current) {
            quill.current = new Quill(ref.current, defaultOption);
            if ($event.text) {
                quill.current.clipboard.dangerouslyPasteHTML($event.text)
                EVENT_DATA_FORM[SECTION_KEY].description = $event.text
            }

            quill.current.on("editor-change", () => {
                EVENT_DATA_FORM[SECTION_KEY].description = quill.current.root.innerHTML
            })
        }
    }, [])

    return <>
        <div className="mb-3">
            <label className="form-label">
                Description
            </label>
            <div className="default-style bg-white">
                <div id="full-editor" style={{ maxHeight: "400px", overflowY: "auto" }} ref={ref} />
            </div>
        </div>
    </>
}

const EventDetailsSection = ({ children = [] }) => {

    $event = window.$event || {}
    $address = $event.address || {}

    return <Card title={<H5 text="Détails de l'évènement" />} bodyClass="bg-light" cardClass="my-3">
        <div className="row">

            <EventDetailsMain />

            <Inscriptions />

            <EventDetailsLocalisation />

            <div className="col-12">
                <DescriptionAndText />
            </div>

        </div>

        {children}
    </Card>
}

export default EventDetailsSection