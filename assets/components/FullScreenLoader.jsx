import React from 'react'
import { createPortal } from 'react-dom'
import Spinner from './Spinner'
import { FixedDarkenContainerStyled } from './StyledComponents'

const FullScreenLoader = () => {
    return createPortal(
        <FixedDarkenContainerStyled>
            <Spinner />
        </FixedDarkenContainerStyled>,
        document.body
    )
}


export default FullScreenLoader