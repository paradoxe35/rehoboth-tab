import anime from "animejs";
import React, { forwardRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { select } from "/@/functions/animation/functions";


const SiteOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2003;
    font-weight: bold;
    opacity: 0;
    color: var(--bs-light);
    pointer-events: none;
    overflow: hidden;
    &.site-active {
        pointer-events: initial;
    }
`

const BackButton = styled.a`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3002;
  display: none;
  -webkit-tap-highlight-color: transparent;
    .back-image {
        width: 51px;
        height: 51px;
    }
    @media (max-width: 992px) {
        & {
            position: absolute;
        }
    }
`


const SiteOverlayPage = ({ children = null, onClose = null, canvasRef = null, prefix = 'reg', backBtnOnParent = true }) => {

    const backButton = <BackButton href="javascript:;" onClick={onClose} className={`${prefix}-back-button`}>
        <svg className="back-image" xmlns="http://www.w3.org/2000/svg" width="102.125" height="102.125" viewBox="0 0 102.125 102.125">
            <path fill="#fff" d="M115.594,59.919a51.05,51.05,0,1,1-51.05,51.05A51.05,51.05,0,0,1,115.594,59.919ZM139,108.031H102.868l16.6-16.6-4.216-4.187L91.5,111l23.754,23.754,4.187-4.186-16.569-16.6H139v-5.938Z" transform="translate(-64.531 -59.906)"></path>
        </svg>
    </BackButton>

    return <SiteOverlay className={`js-${prefix}`}>
        {backBtnOnParent ? backButton : null}
        {backBtnOnParent ? children : children(backButton)}
        <SiteCanvas ref={canvasRef} />
    </SiteOverlay>
}


const Canvas = styled.canvas`
    width: 100vw;
    overflow-x: hidden;
    height: 100vh;
    position: fixed;
    z-index: 2001;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
`


const SiteCanvas = forwardRef(
    /**
     * @param { React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> } props 
     */
    (props, ref) => {
        // @ts-ignore
        return createPortal(<Canvas {...props} ref={ref} />, document.body)
    })


export const regBackButton = {
    show(prefix = 'reg') {
        select(`.${prefix}-back-button`).style.opacity = 0;
        select(`.${prefix}-back-button`).style.display = "block";
        anime({
            targets: `.${prefix}-back-button`,
            opacity: [0, 1],
            easing: "easeOutExpo",
            scale: [0.8, 1],
            delay: 300,
            translateX: [-40, 0]
        });
    },
    hide(prefix = 'reg') {
        anime({
            targets: `.${prefix}-back-button`,
            opacity: [1, 0],
            easing: "easeInQuad",
            translateX: [0, -40],
            scale: [1, 0.8],
            duration: 300,
            complete: function () {
                select(`.${prefix}-back-button`).style.display = "none";
            }
        });
    }
}

export default SiteOverlayPage