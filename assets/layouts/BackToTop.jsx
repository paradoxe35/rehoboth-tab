import React, { useEffect, useRef } from "react";
import { FiArrowUp } from "react-icons/fi"
import { fadeIn, fadeOut, throttle } from "/@/functions/functions";
import styled from 'styled-components'
import ueScroll from "../plugins/ue-scroll";

const Link = styled.a`
    position: fixed;
    display: none;
    right: 15px;
    bottom: 15px;
    z-index: 99999;
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
    background: var(--primary);
    color: #fff;
    transition: all 0.4s;
    &:hover {
        background: var(--primary-hover);
        color: #fff;
    }
`



const BackToTop = () => {

    const linkRef = useRef(null)

    useEffect(() => {
        if (linkRef.current) {
            /** @type { HTMLElement } */
            const el = linkRef.current
            const toggleIcon = function () {
                if (this.scrollY > 100) {
                    fadeIn(el);
                } else {
                    fadeOut(el);
                }
            }
            window.addEventListener("load", toggleIcon)
            window.addEventListener("scroll", throttle(toggleIcon, 50))
            ueScroll.init(el)
        }
    }, [linkRef.current])

    return <>
        <Link href="#" ref={linkRef}>
            <Svg />
        </Link>
    </>
}

export default BackToTop;