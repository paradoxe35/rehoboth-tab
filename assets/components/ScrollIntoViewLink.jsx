import React, { useEffect, useState } from 'react'


const ScrollIntoViewLink = ({ elTarget, children, className = undefined }) => {
    const [target, setTarget] = useState(null)

    useEffect(() => {
        const el = document.querySelector(elTarget)
        if (el) setTarget(el)
    }, [])

    return <a href={target?.scrollIntoView ? 'javascript:;' : elTarget}
        onClick={() => target?.scrollIntoView({ behavior: "smooth" })}
        className={`scroll-link smoothscroll ${className || ''}`}>
        {children}
    </a>
}

export default ScrollIntoViewLink