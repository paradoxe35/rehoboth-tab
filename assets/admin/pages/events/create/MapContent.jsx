import React, { useCallback, useRef } from 'react'
import { useSyncFormDataInputElements } from './DatasForm'
import { FormControl } from './FormControl'
import PlacesJsContainer from './PlacesJsContainer'
import BsModal from '/@/components/admin/Modal'
import { Iframe } from '/@/components/Iframe'
import Label from '/@/components/Label'
import { triggerOnChangeEvent } from '/@/functions/functions'
import { useInputElementRefs } from '/@/utils/hooks'
import { embedGoogleMap } from '/@/utils/vars'



const MapContent = ({ placejsOnChange, sectionKey, $address, label = "Renseigner votre adresse map manuellement" }) => {
    const { ref, refs } = useInputElementRefs()

    const { ['lat']: ilat, ['lng']: ilng } = refs

    const modalRef = useRef(null)
    const localisation = useRef({ lat: null, lng: null })

    useSyncFormDataInputElements(refs, sectionKey)

    const placeOnChange = useCallback(
        /** @param {{suggestion:import('places.js').Suggestion } } param0 */
        ({ suggestion: e }) => {
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
                <Label>{label}</Label>
            </div>
            <div className="col-lg-6">
                <FormControl
                    defaultValue={$address.latitude}
                    label="Latitude"
                    name="lat"
                    ref={ref}
                    placeholder="ex: -2.5056" />
            </div>
            <div className="col-lg-6">
                <FormControl
                    defaultValue={$address.longitude}
                    label="Longitude"
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
                    src={embedGoogleMap(lat, lng)} />
            )}
        </BsModal>
    </>
}

export default MapContent