import lozad from 'lozad'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { respondToVisibility, throttle } from '../functions/functions'


const DivContainer = styled.div`
    display: block;
    overflow: hidden;
    position: relative;
    transition-duration: .2s;
    transition-property: box-shadow;
`

const ImageWrapper = styled.div`
    position: absolute; 
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: opacity 500ms ease 0s;
`

const DivThumbnail = styled.div`
    background-size: cover; 
    transition: opacity 500ms ease 500ms; 
    position: absolute;
    ${
    /* @ts-ignore */
    ({ load }) => load ? `
            opacity: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        `: `
            opacity: 1;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
        `
    }
`

const ImageThumbnail = ({ image, title = null, height = "auto", className = null }) => {
    const [load, setLoad] = useState(false)
    const ref = useRef(null)
    const refParent = useRef(null)

    useEffect(() => {
        if (refParent.current && height == "auto") {
            let hasWidth = 0
            const setParentHeight = () => {
                if (!refParent.current) return
                const data = refParent.current.getBoundingClientRect()
                if (hasWidth === data.width) return
                hasWidth = data.width
                refParent.current.style.height = `${(image.height / image.width) * hasWidth}px`
            }
            setParentHeight()

            let unobserve = null;
            if (hasWidth === 0) {
                unobserve = respondToVisibility(refParent.current, (isVisible) => {
                    if (hasWidth === 0 && isVisible) setParentHeight()
                })
            }
            window.addEventListener('resize', throttle(setParentHeight, 50))
            return () => {
                window.removeEventListener('resize', throttle(setParentHeight, 50))
                unobserve && unobserve()
            }
        }
    }, [])

    useEffect(() => {
        if (ref.current) {
            lozad(ref.current, {
                load: (el) => {
                    const img = new Image();
                    img.onload = () => setLoad(true)
                    img.src = el.getAttribute('data-src');;
                    img.style.width = "100%";
                    img.style.height = height;
                    if (height != "auto") {
                        img.style.objectFit = "cover"
                    }
                    img.alt = title || image.caption
                    el.parentElement.appendChild(img)
                }
            }).observe()
        }
    }, [])

    // @ts-ignore
    return <DivContainer ref={refParent} style={{ height }} className={className}>
        <img
            style={{ display: "block", width: "100%", height: "100%" }}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAwIiBoZWlnaHQ9IjEwMDAiPjwvc3ZnPg==" role="presentation" />
        {/* @ts-ignore */}
        <DivThumbnail load={load} style={{ backgroundImage: `url(${image.thumbnail})` }} />
        <ImageWrapper style={{ opacity: load ? "1" : "0" }}>
            <div
                style={{ visibility: "hidden", opacity: "0", width: "0px", height: "0px", margin: "0", padding: "0" }}
                ref={ref}
                data-src={image.public_path} />
        </ImageWrapper>
    </DivContainer>
}

export default ImageThumbnail