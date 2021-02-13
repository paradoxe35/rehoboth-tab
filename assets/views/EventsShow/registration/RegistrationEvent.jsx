import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SiteOverlayPage from '/@/components/site-overlay/SiteOverlay'
import regPage from './animate'
import RegistrationContent from './RegistrationContent'


const Registration = ({ event }) => {
    const ctx = useRef(null)
    useEffect(() => {
        if (ctx.current) {
            regPage.overlay.init(ctx.current)
        }
    }, [])

    return createPortal(
        <SiteOverlayPage onClose={() => regPage.hide()} canvasRef={ctx} prefix="reg" backBtnOnParent={false}>
            {backButton => <RegistrationContent event={event} backButton={backButton} />}
        </SiteOverlayPage>,
        document.body
    )
}


const Register = ({ event }) => {
    return <>
        <button onClick={(e) => regPage.reveal(e)} className="btn btn-primary text-sm btn-sm text-white">
            <span>S'inscrire</span>
        </button>
        <Registration event={event} />
    </>
}


export default Register