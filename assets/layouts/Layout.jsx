import './styles/header.scss'
import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "./headers/NavMenu";
import BackToTop from './BackToTop';
import styled from 'styled-components'

const Header = styled.header`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    z-index: 1030;
`

const Layout = ({ children, title = '' }) => {
    return <>
        <Helmet>
            <title>{title ? title + '-' : ''} {"Rehoboth"}</title>
        </Helmet>
        <Header className="app--header">
            <NavBar />
        </Header>
        <main>
            {children}
        </main>
        <BackToTop />
    </>
}

export default Layout;