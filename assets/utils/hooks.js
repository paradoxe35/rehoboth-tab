import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { throttle } from "../functions/functions"


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

export const useListDataPaginator = (datas = null, fn) => {
    const [listData, setListData] = useState(datas || {})
    const paginator = useRef(null)

    useEffect(() => {
        setListData(datas || {})
    }, [datas])

    useEffect(() => {
        paginator.current = listData
    }, [listData])

    const onPageChange = useCallback(({ page }, param) => {
        const { meta } = paginator.current
        if (!meta || meta.current_page == page) return
        fn && fn(page, param)
    }, [])

    return { listData, setListData, onPageChange, paginator }
}

export const useScrollBottom = (handler) => {
    const canLoad = useRef(true)

    useEffect(() => {
        const scroll = () => {
            if ((window.innerHeight + window.pageYOffset - 30) >= document.body.offsetHeight && canLoad.current) {
                if (handler) {
                    handler(canLoad)
                    canLoad.current = false
                }
            }
        }
        window.addEventListener('scroll', throttle(scroll, 50))
        return () => window.removeEventListener('scroll', scroll)
    }, [])
}