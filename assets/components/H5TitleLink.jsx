import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import styled from 'styled-components'


const H5Styled = styled.h5`
    a {
        color: inherit;
    }
    &:hover{
        text-decoration: underline;
    }
`

const H5TitleLink = ({ children, href, inertialProps = {}, className = null, title = null }) => {

    return <H5Styled className={className}>
        <InertiaLink href={href} {...inertialProps} title={title}>
            {children}
        </InertiaLink>
    </H5Styled>
}

export default H5TitleLink