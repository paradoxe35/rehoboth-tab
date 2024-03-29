import React from "react"
import { Flipped } from "react-flip-toolkit"
import styled from "styled-components"
import ImageThumbnail from "./ImageThumbnail"


const Div = styled.div`
    width: 100%;
    height: auto;
    display: block;
    will-change: transform;
`

const pathId = /(\/|\\|\.)/g

const ImageFlipped = ({ img, onClick = null, onDelayedAppear, onExit, indexUid = null }) => {
    const key = img.path.replace(pathId, '-')
    if (indexUid !== null) img.uid = indexUid;

    const handleClick = (e) => {
        e.preventDefault()
        onClick && onClick(img.uid, img.id)
    }

    return <a href={img.public_path} data-no-swup onClick={handleClick}>
        <Flipped
            stagger
            onAppear={onDelayedAppear}
            onExit={onExit}
            flipId={`imagekey-${key}`}>
            <Div>
                <ImageThumbnail image={img} title={img?.gallery?.title} />
            </Div>
        </Flipped>
    </a>
}


export default ImageFlipped