import React, { useEffect, useRef } from "react";
import { FiArrowUp } from "react-icons/fi"
import { fadeIn, fadeOut, throttle } from "/@/functions/functions";
import styled from 'styled-components'

const Link = styled.a`
    position: fixed;
    display: none;
    right: 15px;
    bottom: 15px;
    z-index: 99999;
    cursor: pointer;
`

const Svg = styled(FiArrowUp)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    width: 40px;
    height: 40px;
    padding: 9px 9px;
    border-radius: 50px;
    background: var(--bs-primary);
    color: var(--bs-light);
    transition: all 0.4s;
    &:hover {
        background: var(--bs-primary-hover);
        color: var(--bs-light);
    }
`

const BackToTop = () => {

    const linkRef = useRef(null)

    useEffect(() => {
        if (linkRef.current) {
            /** @type { HTMLElement } */
            const el = linkRef.current
            const toggleIcon = function () {
                if (window.scrollY > 400) {
                    fadeIn(el);
                } else {
                    fadeOut(el);
                }
            }
            toggleIcon()
            window.addEventListener("scroll", throttle(toggleIcon, 50))
            el.addEventListener('click', () => window.scrollTo({ top: 0, behavior: "smooth" }))
        }
    }, [linkRef.current])

    return <>
        <Link ref={linkRef}>
            <Svg />
        </Link>
    </>
}

export default BackToTop;