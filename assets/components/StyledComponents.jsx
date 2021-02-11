import styled from "styled-components";
import NoContainerPadding from "./NoContainerPadding";

export const BgLightStyled = styled.div`
    background-color: var(--bs-light);
`

export const ItemRowStyled = styled.div`
    visibility: visible;
    opacity: 500;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: solid 1px #eee;
    transition: border .5s;
    &:hover{
        border-bottom: solid 1px var(--bs-primary);
    }
`


export const FixedDarkenContainerStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SpanDateStyled = styled.span`
    background: var(--bs-primary);
    padding: 2px 10px 2px 10px;
    color: var(--bs-light);
    font-size: 12px;
    border-radius: 3px;
`

export const CountdownParentStyled = styled(NoContainerPadding)`
    background-color: rgba(255, 253, 253, 0.856);
    height: auto;
`

export const CountdownRowStyled = styled.div`
    height: auto;
    min-height: 196px;
`