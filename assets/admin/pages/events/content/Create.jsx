import "/@/utils/devtool"
import React, { useEffect, useRef, forwardRef, useState, useCallback } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Card from '/@/components/Card'
import FilePond from '/@/plugins/filepond'
import flatpickr from '/@/plugins/flatpickr'
import Button from "/@/components/admin/Button"
import BsModal from "/@/components/admin/Modal"
import { GOOGLE_API_KEY } from "/@/utils/vars"

const fileLabel = (type) => {
    return `${type} ou <span class="filepond--label-action">Parcourir</span>`
}


const useInputElementRefs = function () {
    /**
     * @type { [refs: { [x: string]: HTMLInputElement }, setRefs: any] }
     */
    // @ts-ignore
    const [refs, setRefs] = useState({})

    const ref = useCallback((e) => {
        if (e instanceof HTMLInputElement && e.hasAttribute('name')) {
            setRefs(r => {
                if (e.name in r && r[e.name] === e) {
                    return r
                }
                return { ...r, [e.name]: e }
            })
        }
    }, [])
    return {
        ref,
        refs
    }
}

const H5 = ({ text }) => <h5 className="mb-0 text-sm"><b>{text}</b></h5>

/**
 * @type { JSX.Element | any }
 */
const FormControl = forwardRef(/** @param {*} param0  */
    ({
        label = '',
        type = "text",
        defaultValue = null,
        value = null,
        onChange = null,
        name = null,
        placeholder = null
    }, ref) => {

        const id = Math.random()

        return <div className="mb-3">
            <label htmlFor={`input-${id}`} className="form-label">{label}</label>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                name={name}
                placeholder={placeholder}
                className="form-control text-xs"
                id={`input-${id}`} />
        </div>
    })

const Checkbox = ({ label = '', checked = null, onChange = null, name = null }) => {
    const id = Math.random()

    return <div className="form-check my-3">
        <input
            className="form-check-input"
            id={`checkbox-${id}`}
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked} />
        <label className="form-check-label" htmlFor={`checkbox-${id}`}>
            {label}
        </label>
    </div>
}

const FlatpickrDate = (props) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            flatpickr(ref.current, {})
        }
    }, [ref.current])

    return <FormControl {...props} ref={ref} />
}

const FlatpickrTime = (props) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            flatpickr(ref.current, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
            })
        }
    }, [ref.current])

    return <FormControl {...props} ref={ref} />
}

const CoverImageSection = () => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                labelIdle: fileLabel('Déposez une image de couverture'),
                allowMultiple: false,
                // @ts-ignore
                acceptedFileTypes: ['image/png', 'image/jpeg'],
                maxFileSize: "5MB",
                minFileSize: "50KB"
            })

            return () => pont.destroy()
        }

    }, [ref.current])

    return <Card bodyClass="p-1" cardClass="p-0 my-3">
        <input type="file" ref={ref} />
    </Card>
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
    }, [ref.current])

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
                <iframe
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${lat}, ${lng}&zoom=18&language=fr`}>
                </iframe>
            )}
        </BsModal>
    </>
}

const Map = ({ placejsOnChange = null }) => {
    const [checked, setChecked] = useState(false)

    return <>
        <Checkbox
            label="Map"
            checked={checked}
            onChange={({ target: { checked } }) => setChecked(checked)} />

        {checked && <MapContent placejsOnChange={placejsOnChange} />}
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


const DescriptionAndText = () => {
    return <>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Description
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
        </div>
    </>
}


const EventDetailsSection = () => {
    const { ref, placejsOnChange } = usePlacejsOnChange()

    return <Card title={<H5 text="Détails de l'évènement" />} cardClass="my-3">
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
                <DescriptionAndText />
            </div>

        </div>
    </Card>
}

const OtherInfoSection = () => {
    return <Card title={<H5 text="Autre info" />} cardClass="my-3">

    </Card>
}



const Main = () => {
    return <>
        <CoverImageSection />
        <div className="row">
            <div className="col-lg-8 pr-lg-2">
                <EventDetailsSection />
            </div>
            <div className="col-lg-4 pl-lg-2 sticky-top sticky-sidebar" style={{ zIndex: 0 }}>
                <OtherInfoSection />
            </div>
        </div>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance