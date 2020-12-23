import React, { useEffect, useRef } from 'react'
import BodyClassName from 'react-body-classname'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Image from '/@/images/hero/hero.jpg'
import { usePage } from '@inertiajs/inertia-react'

const Div = styled.div`
    h1.display-6 {
        color: var(--bs-grey-light-1);
        border-top: solid 1px rgba(255,255,255,.2);
        border-bottom: solid 1px rgba(255,255,255,.2);
        display: block;
        padding: 10px;
    }
`

const DivContainer = styled.div`
    height: 35.53vh;
    min-height: 257px;
    position: relative;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    &:before {
        content: "";
        background: var(--bs-bg-color-hero);
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }
`


const Hero = ({ title = '', imageSrc = null, children, headTitle = null }) => {

    const divRef = useRef(null)
    // @ts-ignore
    const { appName } = usePage().props

    useEffect(() => {
        /** @type { HTMLElement } */
        const el = divRef.current

        if (el) {
            window.addEventListener("resize", function () {
                const width = document.body.clientWidth
                el.style.width = width + "px"
            })
        }
    }, [divRef.current])

    return <BodyClassName className="nav--muted">
        <>
            <Helmet>
                <title>{(title || headTitle) ? (headTitle || title) + ' - ' : ''}{appName}</title>
            </Helmet>
            <DivContainer className="mb-4" style={{ backgroundImage: `url(${imageSrc || Image})` }} ref={divRef}>
                <Div className="h-100 px-lg-6 px-lg-7 container">
                    <div className="h-100  align-items-center justify-content-center text-center row">
                        <div className="col-lg-6">
                            <h1 className="display-6 font-weight-bold mb-3" style={{ lineHeight: 1 }}>
                                {title}
                            </h1>
                        </div>
                    </div>
                </Div>
            </DivContainer>
            {children}
        </>
    </BodyClassName>
}

export default Hero