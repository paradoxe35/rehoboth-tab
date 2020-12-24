import React from 'react'
import styled from 'styled-components'

const H2Styled = styled.h2`
    overflow: hidden;
    text-align: center;
    &:after, &:before {
        background-color: #ddd;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
    }
    &:before {
        right: 0.5em;
        margin-left: -50%;
    }

    &:after {
        left: 0.5em;
        margin-right: -50%;
    }
`

const CenterTitle = ({ children, className = ''}) => {
    return <H2Styled className={className}>
        {children}
    </H2Styled>
}

export default CenterTitle