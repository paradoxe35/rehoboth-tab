import { useCallback, useEffect, useMemo, useRef, useState } from "react"


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


export const useOnChangeRef = (onChange) => {
    const onChangeRef = useRef(onChange)

    onChangeRef.current = onChange

    return onChangeRef
}


export const useMultipleOption = (defaultOptions = []) => {

    const fnDefaulOptions = useMemo(() => {
        return (defaultOptions || []).map((o, i) => {
            return { id: `option_${i}`, checked: !!o?.default, data: o }
        })
    }, [defaultOptions])

    const [count, setCount] = useState(fnDefaulOptions.length)
    const [options, setOptions] = useState(fnDefaulOptions)
    const optionRef = useRef(null)

    optionRef.current = options

    useEffect(() => {
        setOptions(a => [...a, { id: `option_${count}`, checked: count === 0, data: {} }])
    }, [count])

    const onDelete = useCallback((id) => setOptions(a => {
        if (a.length == 1) return a
        return a.filter(v => v.id != id)
    }), [])

    return {
        count,
        setCount,
        options,
        setOptions,
        onDelete
    }
}

export const mergeRefs = (...refs) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return inst => {
        for (const ref of filteredRefs) {
            if (typeof ref === 'function') {
                ref(inst);
            } else if (ref) {
                ref.current = inst;
            }
        }
    };
};

export const useListDataPaginator = (datas, fn) => {
    const [listData, setListData] = useState(datas || {})

    useEffect(() => {
        setListData(datas || {})
    }, [datas])

    const onPageChange = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        fn && fn(page)
    }, [listData])

    return [listData, setListData, onPageChange]
}