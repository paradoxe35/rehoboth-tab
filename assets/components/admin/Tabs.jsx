import React, { useEffect, useRef } from 'react'
import { Tab as BsTab } from 'bootstrap'

const idTabs = (title) => `${title.toLocaleLowerCase().split(' ').join("-")}-itb`

export function Tabs({ children, hr = false }) {
    const tabRef = useRef(null)
    const tabId = useRef(Math.random())


    useEffect(() => {
        const { hash } = window.location
        if (hash && tabRef.current) {
            const el = tabRef.current.querySelector(`a[href="${hash}"`)
            el && (new BsTab(el)).show()
        }
    }, [tabRef.current])


    // @ts-ignore
    const childrenArray = React.Children.toArray(children).filter(e => e.props.title)

    return <>
        <ul className="nav nav-pills mb-3" ref={tabRef} id={`pills-${tabId.current}`} role="tablist">
            {/* @ts-ignore */}
            {childrenArray.map(({ props: { title, id: idTab, active, onClick }, key }, i) => {
                const id = idTab || idTabs(title)

                return <li className="nav-item" role="presentation" key={key}>
                    <a className={`nav-link ${active ? 'active' : ''} border-darken border ${i != 0 ? 'mx-2' : ''}`}
                        onClick={onClick}
                        id={`pills-${id}-tab`}
                        data-bs-toggle="pill"
                        href={`#pills-${id}`}
                        role="tab" aria-controls={`pills-${id}`} aria-selected={active}>
                        {title}
                    </a>
                </li>
            })}
        </ul>

        {hr && <hr />}

        <div className="tab-content" id={`pills-tabContent-${tabId.current}`}>
            {childrenArray.map((child, i) => {
                // @ts-ignore
                const { props: { title, id: idTab, active }, key } = child

                const id = idTab || idTabs(title)

                return <div key={key} className={`tab-pane ${active ? 'show active' : ''}`}
                    id={`pills-${id}`} role="tabpanel"
                    aria-labelledby={`pills-${id}-tab`}>
                    {child}
                </div>
            })}
        </div>
    </>
}


/**
 * @param {*} param0 
 */
export function Tab({ children }) {

    return children
}