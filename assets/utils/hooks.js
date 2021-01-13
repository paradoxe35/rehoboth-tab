import { useCallback, useEffect, useState } from "react"


export const useInputElementRefs = function () {
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


export const useMultipleOption = () => {
    const [count, setCount] = useState(0)
    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions(a => [...a, { id: `option-${count}`, checked: count === 0 }])
    }, [count])

    const onDelete = (id) => setOptions(a => {
        if (a.length == 1) return a
        return a.filter(v => v.id != id)
    })

    return {
        count,
        setCount,
        options,
        setOptions,
        onDelete
    }
}