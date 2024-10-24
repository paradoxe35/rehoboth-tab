import React from 'react'
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

    return <div className="row  justify-content-center text-sm">
        <div className="col-auto">
            <div className="copyright">
                <SpanStyled>© Copyright {new Date().getFullYear()}, Tous les droits sont réservés.</SpanStyled>
                <span>Faite par <a href="https://pngwasi.me" target="_blank">@PNG_</a></span>
            </div>
        </div>
    </div>
}

export default Copyright