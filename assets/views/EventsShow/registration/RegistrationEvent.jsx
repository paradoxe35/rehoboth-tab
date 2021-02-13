import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SiteOverlayPage from '/@/components/site-overlay/SiteOverlay'
import regPage from './animate'


const RegistrationContent = () => {
    return <div className="container">
    </div>
}


const Registration = () => {
    const ctx = useRef(null)
    useEffect(() => {
        if (ctx.current) {
            regPage.overlay.init(ctx.current)
        }
    }, [])

    return createPortal(
        <SiteOverlayPage onClose={() => regPage.hide()} canvasRef={ctx} prefix="reg">
            <RegistrationContent />
        </SiteOverlayPage>,
        document.body
    )
}


const Register = () => {
    return <>
        <button onClick={(e) => regPage.reveal(e)} className="btn btn-primary text-sm btn-sm text-white">
            <span>S'inscrire</span>
        </button>
        <Registration />
    </>
}


export default Register