import React, { useCallback, useEffect, useRef } from 'react'
import { FormControl } from './FormControl'
import { useOnChangeRef } from '/@/utils/hooks'



const PlacesJsContainer = ({ onChange = undefined }) => {
    const ref = useRef(null)
    const places = useRef(null)

    const handleChange = useOnChangeRef(onChange)

    useEffect(() => {
        (async () => {
            if (ref.current) {
                const PlacesJs = (await import(/* webpackChunkName: "placesjs" */"places.js")).default
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

export default PlacesJsContainer