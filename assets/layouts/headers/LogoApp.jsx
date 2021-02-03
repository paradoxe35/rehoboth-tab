import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'
import Cross from '/@/images/logo/cross.svg'

const Logo = styled.h1`
    font-size: 1.3rem;
    margin: 0;
    padding: 0;
    line-height: 1;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    a {
        color: var(--bs-light);
    }
    img {
        max-height: 40px;
    }
    @media (max-width: 992px) {
        & {
            font-size: 28px;
        }
    }
`

const LogoApp = ({ className = '' }) => {
    // @ts-ignore
    const { appName } = usePage().props

    return <Logo className={className}>
        <InertiaLink href="/">
            <img src={Cross} alt={'La Croix'} />
            {appName}
        </InertiaLink>
    </Logo>
}

export default LogoApp