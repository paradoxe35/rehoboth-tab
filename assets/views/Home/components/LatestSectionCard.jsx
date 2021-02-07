import React from 'react'
import Card from '/@/components/Card'
import styled from 'styled-components'
import NoContainerPadding from '/@/components/NoContainerPadding'


export const LatestSectioCardItemStyled = styled(Card)`
    margin-top: auto;
    margin-bottom: auto;
`

export const LatestSectionParentStyled = styled(NoContainerPadding)`
    background-color: rgba(154, 136, 75, 0.137);
    height: auto;
    min-height: 297px;
`

export const LatestSectionH3Styled = styled.h3`
    font-weight: 500;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin: 0;
`

export const LatestSectionSpanStyled = styled.span`
    font-size: 15px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 400;
`



export const LatestSectionItemData = ({ col, showOnlySm, showOnlyMd, canShowInMd, children, className = '', index = null }) => {
    return <div
        data-aos="fade-left"
        data-aos-duration={`${index ? index * 400 : 400}`}
        className={`col-lg-${col} ${showOnlyMd || canShowInMd ? 'col-md-6' : ''} ${className} ${(!showOnlySm && !showOnlyMd) || 'd-none'} ${showOnlySm ? 'd-lg-block' : ''} ${showOnlyMd ? 'd-md-block' : ''}`}>
        {children}
    </div>
}

export const LatestSectionItemLabel = ({ col, children, index = null }) => {
    return <div data-aos="fade-right"
        data-aos-duration={`${index ? index * 400 : 400}`}
        className={`col-lg-${col} d-flex justify-content-center align-items-center`}>
        <div className="text-center my-4">
            {children}
        </div>
    </div>
}