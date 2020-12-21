import './styles/header.scss'
import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import NavBar from "./headers/NavMenu";
import BackToTop from './BackToTop';

const Layout = ({ children, title = '' }) => {
    const linkRef = useRef(null)

    return <>
        <Helmet>
            <title>{title ? title + '-' : ''} {"Rehoboth"}</title>
        </Helmet>
        <header className="app--header">
            <NavBar />
        </header>
        <main>
            {children}
        </main>
        <BackToTop />
    </>
}

export default Layout;