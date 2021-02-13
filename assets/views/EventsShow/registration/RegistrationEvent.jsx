import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SiteCanvas from '/@/components/site-overlay/SiteCanvas'
import SiteOverlayPage from '/@/components/site-overlay/SiteOverlay'
import regPage from './animate'


const RegistrationContent = () => {
    return <SiteOverlayPage onClose={() => regPage.hide()}>
            <div className="container">
            </div>
    </SiteOverlayPage>
}


const Registration = () => {
    return createPortal(<RegistrationContent />, document.body)
}


const Register = () => {
    const ctx = useRef(null)
    useEffect(() => {
        if (ctx.current) {
            regPage.overlay.init(ctx.current)
        }
    }, [])

    return <>
        <button onClick={(e) => regPage.toggle(e)} className="btn btn-primary text-sm btn-sm text-white">
            <span>S'inscrire</span>
        </button>
        <Registration />
        {/* @ts-ignore */}
        <SiteCanvas ref={ctx} />
    </>
}


export default Register