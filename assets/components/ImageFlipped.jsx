import React from "react"
import { Flipped } from "react-flip-toolkit"
import styled from "styled-components"
import { LozadImage } from "./LozadImage"



export const Image = styled(LozadImage)`
    width: 100%;
    height: auto;
    display: block;
    will-change: transform;
`

const ImageFlipped = ({ setKey, img, onClick = null, onDelayedAppear, onExit, lozad = true }) => {

    const handleClick = (e) => {
        e.preventDefault()
        onClick && onClick(img.uid, img.id)
    }

    return <a href={img.public_path} data-no-swup onClick={handleClick}>
        <Flipped
            stagger
            onAppear={onDelayedAppear}
            onExit={onExit}
            flipId={`imagekey-${setKey}`}>
            <Image
                data-src={lozad ? img.public_path : undefined}
                src={!lozad ? img.public_path : undefined} />
        </Flipped>
    </a>
}


export default ImageFlipped