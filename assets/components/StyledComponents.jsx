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