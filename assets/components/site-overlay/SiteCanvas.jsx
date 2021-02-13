import React, { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'


const Canvas = styled.canvas`
    width: 100vw;
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

export default SiteCanvas