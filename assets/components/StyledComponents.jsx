import styled from "styled-components";

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