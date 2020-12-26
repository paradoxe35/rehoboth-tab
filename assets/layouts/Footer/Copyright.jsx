import { usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'


const SpanStyled = styled.span`
    display: inline-block;
    &:after {
        content: "|";
        display: inline-block;
        padding: 0 1rem 0 1.2rem;
        color: rgba(26, 26, 26, 0.205);
    }
`

const Copyright = () => {

    // @ts-ignore
    const { appName } = usePage().props

    return <div className="row  justify-content-center text-sm">
        <div className="col-auto">
            <div className="copyright">
                <SpanStyled>© Copyright {appName} {new Date().getFullYear()}</SpanStyled>
                <span>Made by <a href="#" target="_blank">@PNG_</a></span>
            </div>
        </div>
    </div>
}

export default Copyright