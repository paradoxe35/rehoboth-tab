import React, { useEffect, useRef } from 'react'
import BodyClassName from 'react-body-classname'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Image from '/@/images/hero/hero.jpg'
import { usePage } from '@inertiajs/inertia-react'

const Div = styled.div`
    z-index: 20;
    h1.h3 {
        color: #b6b6b6;
        border-top: solid 1px rgba(255,255,255,.2);
        border-bottom: solid 1px rgba(255,255,255,.2);
        display: block;
        z-index: 20;
        padding: 10px;
        position: relative;
    }
`

const DivContainer = styled.div`
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
        z-index: 9;
    }
`
const RowDiv = styled.div`
    padding-top: 110.5px;
    padding-bottom: 103px;
`

const Hero = ({ title = '', imageSrc = null, children, headTitle = null, heroClass = 'mb-4' }) => {

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

    //  @ts-ignore
    return <BodyClassName className="nav--muted">
        <>
            {/*  @ts-ignore */}
            <Helmet>
                <title>{(title || headTitle) ? (headTitle || title) + ' - ' : ''}{appName}</title>
            </Helmet>
            {/*  @ts-ignore */}
            <DivContainer className={heroClass} style={{ backgroundImage: `url(${imageSrc || Image})` }} ref={divRef}>
                <Div className="px-lg-6 px-lg-7 container">
                    <RowDiv className="h-100 justify-content-center text-center row">
                        <div className="col-lg-6">
                            <h1 className="h3 font-weight-bold m-0" style={{ lineHeight: 1 }}>
                                {title}
                            </h1>
                        </div>
                    </RowDiv>
                </Div>
            </DivContainer>
            {children}
        </>
    </BodyClassName>
}

export default Hero