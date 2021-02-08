import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "./headers/NavMenu";
import BackToTop from './BackToTop';
import styled from 'styled-components'
import { usePage } from '@inertiajs/inertia-react'
import Footer from "./Footer/Footer";


const Header = styled.header`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    z-index: 1030;
    box-shadow: 0px 0px 25px 0 rgba(0, 0, 0, 0.08);
    z-index: 997;
    padding: 15px 0;
`

const Layout = ({ children, title = '' }) => {
    // @ts-ignore
    const { appName } = usePage().props

    return <>
        {/*  @ts-ignore */}
        <Helmet>
            <title>{title ? title + ' - ' : ''} {appName}</title>
        </Helmet>
        <Header className="app--header">
            <NavBar />
        </Header>
        <main>
            {children}
        </main>
        <BackToTop />
        <Footer />
    </>
}

export default Layout;