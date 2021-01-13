import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatpickrDate, FlatpickrTime } from '../Flatpickr';
import { Checkbox, FormControl } from '../FormControl'
import H5 from "../H5"
import BsModal from '/@/components/admin/Modal';
import Card from "/@/components/Card"
import { Iframe } from '/@/components/Iframe';
import Quill, { defaultOption } from '/@/plugins/quill/quill';
import { useInputElementRefs } from '/@/utils/hooks';
import { GOOGLE_API_KEY } from '/@/utils/vars';



const DescriptionAndText = () => {
    const ref = useRef(null)
    /** @type { { current: import('quill').default } } */
    const quill = useRef(null)

    useEffect(() => {
        if (ref.current) {
            quill.current = new Quill(ref.current, defaultOption);
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

const Inscriptions = () => {
    const [checked, setChecked] = useState(false)

    return <>
        <Checkbox
            label="Inscriptions"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />
        {checked && <FlatpickrDate label="Date limite d'inscription" />}
    </>
}


const usePlacejsOnChange = () => {
    const { ref,
        refs: {
            ['country']: country,
            ['city']: city
        }
    } = useInputElementRefs()

    const placejsOnChange = useCallback(/** @param {import('places.js').Suggestion} e */(e) => {
        country.value = e.country
        city.value = e.city
    }, [country, city])

    return {
        ref,
        placejsOnChange
    }
}

const PlacesJsContainer = ({ onChange = null }) => {
    const ref = useRef(null)
    const places = useRef(null)

    useEffect(() => {
        if (process.env.NODE_ENV == "development") return
        (async () => {
            if (ref.current) {
                const PlacesJs = (await import("places.js")).default
                places.current = PlacesJs({
                    container: ref.current
                });
                places.current.on("change", ({ suggestion }) => {
                    onChange && onChange(suggestion)
                })
            }
        })()
        return () => places.current && places.current.destroy()
    }, [])

    return <FormControl ref={ref} label="Recherche d'adresse" />
}



const MapContent = ({ placejsOnChange }) => {
    const { ref, refs: { ['lat']: ilat, ['lng']: ilng } } = useInputElementRefs()

    const modalRef = useRef(null)
    const localisation = useRef({ lat: null, lng: null })

    const placeOnChange = useCallback(/** @param {import('places.js').Suggestion} e */(e) => {

        ilat.value = `${e.latlng.lat}`
        ilng.value = `${e.latlng.lng}`

        placejsOnChange && placejsOnChange(e)

    }, [ilng, ilng])

    const openModal = () => {
        const rlat = /^(-?\d+(\.\d+)?)$/
        const rlng = /^(-?\d+(\.\d+)?)$/

        if (rlat.test(ilat.value.trim()) && rlng.test(ilng.value.trim())) {
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

            <div className="col-lg-6">
                <FormControl label="Latitude" defaultValue="-1.9509" name="lat" ref={ref} placeholder="ex: -2.5056" />
            </div>
            <div className="col-lg-6">
                <FormControl label="Longitude" defaultValue="30.0615" name="lng" ref={ref} placeholder="ex: 28.8594" />
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

    return <div className="mb-3">
        <Checkbox
            label="Map"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />

        {checked && <MapContent placejsOnChange={placejsOnChange} />}
    </div>
}



const EventDetailsSection = () => {
    const { ref, placejsOnChange } = usePlacejsOnChange()

    return <Card title={<H5 text="Détails de l'évènement" />} bodyClass="bg-light" cardClass="my-3">
        <div className="row">
            <div className="col-12">
                <FormControl label="Titre de l'événement" />
            </div>
            <div className="col-lg-6">
                <FlatpickrDate label="Date de début" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime label="Heure de début" />
            </div>

            <div className="col-lg-6">
                <FlatpickrDate label="Date de fin" />
            </div>
            <div className="col-lg-6">
                <FlatpickrTime label="Heure de fin" />
            </div>
            <div className="col-12">
                <Inscriptions />
            </div>

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

            <div className="col-12">
                {process.env.NODE_ENV !== "development" && <DescriptionAndText />}
            </div>

        </div>
    </Card>
}

export default EventDetailsSection