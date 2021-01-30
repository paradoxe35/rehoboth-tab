import React from "react"
import { Flipped } from "react-flip-toolkit"
import styled from "styled-components"
import { LozadImage } from "./LozadImage"



export const Image = styled(LozadImage)`
    will-change: transform;
    width: 100%;
    display: block;
    cursor: pointer;
`


const ImageFlipped = ({ setKey, img, onClick = null, onDelayedAppear, onExit }) => {

    const handleClick = (e) => {
        e.preventDefault()
        onClick && onClick(img.uid, img.id)
    }

    return <a href={img.public_path} onClick={handleClick}>
        <Flipped
            onAppear={onDelayedAppear}
            onExit={onExit}
            flipId={`imagekey-${setKey}`}>
            <Image data-src={img.public_path} />
        </Flipped>
    </a>
}


export default ImageFlipped