import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EVENT_DATA_FORM, useSyncFormDataInputElements } from '../DatasForm';
import { FlatpickrDate, FlatpickrTime } from '../Flatpickr';
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import BsModal from '/@/components/admin/Modal';
import Card from "/@/components/Card"
import { Iframe } from '/@/components/Iframe';
import Label from '/@/components/Label';
import { triggerOnChangeEvent } from '/@/functions/functions';
import Quill, { defaultOption } from '/@/plugins/quill/quill';
import { useInputElementRefs, useOnChangeRef } from '/@/utils/hooks';
import { GOOGLE_API_KEY } from '/@/utils/vars';

const SECTION_KEY = "details"

const PlacesJsContainer = ({ onChange = null }) => {
    const ref = useRef(null)
    const places = useRef(null)

    const onChangeRef = useOnChangeRef(onChange)

    const handleChange = useCallback(({ suggestion }) => {
        onChangeRef.current && onChangeRef.current(suggestion)
    }, [])

    useEffect(() => {
        (async () => {
            if (ref.current) {
                const PlacesJs = (await import("places.js")).default
                places.current = PlacesJs({
                    container: ref.current
                });
                places.current.on("change", handleChange)
            }
        })()
        return () => places.current && places.current.destroy()
    }, [])

    return <FormControl ref={ref} label="Recherche d'adresse" />
}

const MapContent = ({ placejsOnChange }) => {
    const { ref, refs } = useInputElementRefs()

    const { ['lat']: ilat, ['lng']: ilng } = refs

    const modalRef = useRef(null)
    const localisation = useRef({ lat: null, lng: null })

    useSyncFormDataInputElements(refs, SECTION_KEY)

    const placeOnChange = useCallback(
        /** @param {import('places.js').Suggestion} e */
        (e) => {

            ilat.value = `${e.latlng.lat}`
            ilng.value = `${e.latlng.lng}`

            triggerOnChangeEvent(ilat)
            triggerOnChangeEvent(ilng)

            placejsOnChange && placejsOnChange(e)

        }, [ilng, ilng, placejsOnChange])

    const openModal = () => {
        const rll = /^(-?\d+(\.\d+)?)$/

        if (rll.test(ilat.value.trim()) && rll.test(ilng.value.trim())) {
            localisation.current = {
                lat: ilat.value.trim(),
                lng: ilng.value.trim()
            }
            modalRef.current && modalRef.current.show()
        }
    }

    return <>
        <div className="row">
            <div className="col-12">
                <PlacesJsContainer onChange={placeOnChange} />
            </div>
            <div className="col-12">
                <Label>
                    Renseigner votre adresse map manuellement
                </Label>
            </div>
            <div className="col-lg-6">
                <FormControl
                    label="Latitude"
                    defaultValue="-1.9509"
                    name="lat"
                    ref={ref}
                    placeholder="ex: -2.5056" />
            </div>
            <div className="col-lg-6">
                <FormControl
                    label="Longitude"
                    defaultValue="30.0615"
                    name="lng"
                    ref={ref}
                    placeholder="ex: 28.8594" />
            </div>

            <div className="col-12">
                <a onClick={openModal} href="javascript:;" className="text-sm btn-link">
                    Aperçu Map
                </a>
            </div>
        </div>
        <BsModal render={localisation} modalRef={modalRef}>
            {({ current: { lat, lng } }) => (
                <Iframe
                    width="100%"
                    height="400"
                    frameBorder="1"
                    style={{ border: "1px solid grey" }}
                    scrolling="no"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${lat}, ${lng}&zoom=18&language=fr`} />
            )}
        </BsModal>
    </>
}

const Map = ({ placejsOnChange = null }) => {
    const [checked, setChecked] = useState(false)

    const { ref, refs } = useInputElementRefs()

    useSyncFormDataInputElements(refs, SECTION_KEY)

    return <div className="mb-3">
        <Checkbox
            ref={ref}
            name="map"
            label="Map"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />

        {checked && <MapContent placejsOnChange={placejsOnChange} />}
    </div>
}

const Inscriptions = () => {
    const [checked, setChecked] = useState(false)

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
            <FormControl name="name" ref={ref} label="Nom de l'événement" />
        </div>
        <div className="col-lg-6">
            <FlatpickrDate name="start_date" ref={ref} label="Date de début" />
        </div>
        <div className="col-lg-6">
            <FlatpickrTime name="start_time" ref={ref} label="Heure de début" />
        </div>

        <div className="col-lg-6">
            <FlatpickrDate name="end_date" ref={ref} label="Date de fin" />
        </div>
        <div className="col-lg-6">
            <FlatpickrTime name="end_time" ref={ref} label="Heure de fin" />
        </div>
    </>
}

const EventDetailsLocalisation = () => {
    const { ref, refs } = useInputElementRefs()

    const { ['country']: country, ['city']: city, ['state']: state } = refs

    useSyncFormDataInputElements(refs, SECTION_KEY)

    const placejsOnChange = useCallback(
        /** @param {import('places.js').Suggestion} e */
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
            <FormControl name="venue" ref={ref} label="Lieu" />
        </div>
        <div className="col-lg-6">
            <FormControl name="address" ref={ref} label="Adresse" />
        </div>

        <div className="col-lg-4">
            <FormControl label="Ville" name="city" ref={ref} />
        </div>
        <div className="col-lg-4">
            <FormControl label="Etat" name="state" ref={ref} />
        </div>
        <div className="col-lg-4">
            <FormControl label="Pays" name="country" ref={ref} />
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
            delete defaultOption.modules.imageUploader
            quill.current = new Quill(ref.current, defaultOption);
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

const EventDetailsSection = () => {


    return <Card title={<H5 text="Détails de l'évènement" />} bodyClass="bg-light" cardClass="my-3">
        <div className="row">

            <EventDetailsMain />

            <Inscriptions />

            <EventDetailsLocalisation />

            <div className="col-12">
                <DescriptionAndText />
            </div>

        </div>
    </Card>
}

export default EventDetailsSection