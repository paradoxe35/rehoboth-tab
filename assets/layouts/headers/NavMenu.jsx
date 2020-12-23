import React from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import styled from 'styled-components'
import { useTranslation } from "react-i18next";
import Cross from '/@/images/logo/cross.svg'

const Logo = styled.h1`
    font-size: 32px;
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

const SocialLinks = styled.div`
    padding-left: 20px;
    a {
        color: var(--bs-primary);
        padding-left: 6px;
        display: inline-block;
        line-height: 1px;
        transition: 0.3s;
        font-size: 16px;
    }
    a:hover {
        color: var(--bs-primary);
    }
    @media (max-width: 992px) {
        & {
            padding: 0 48px 0 0;
        }
    }
`

const Nav = styled.nav`
        ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    & > ul {
        display: flex;
    }
    & > ul > li {
        position: relative;
        white-space: nowrap;
        padding: 10px 0 10px 28px;
        a:before {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 0;
            background-color: var(--bs-secondary);
            visibility: hidden;
            width: 0px;
            transition: all 0.3s ease-in-out 0s;
        }
    }
    a {
        display: block;
        position: relative;
        color: var(--bs-light);
        transition: 0.3s;
        font-size: 15px;
        font-weight: 500;
    }

    a:hover:before,
    li:hover > a:before,
    .active > a:before {
        visibility: visible;
        width: 25px;
    }

    a:hover,
    .active > a,
    li:hover > a {
        color: var(--bs-primary);
    }
`


const LinkRoute = ({ routeName, text }) => {
    // @ts-ignore
    return <li className={route().current(routeName) ? 'active' : ''}>
        <InertiaLink href={route(routeName).toString()}>
            {text}
        </InertiaLink>
    </li>
}

const NavBar = () => {
    const { t } = useTranslation()
    // @ts-ignore
    const { appName } = usePage().props

    return <>
        <div className="container d-flex justify-content-between align-items-center">
            <Logo>
                <InertiaLink href="/">
                    <img src={Cross} alt={t("La Croix")} />
                    {appName}
                </InertiaLink>
            </Logo>

            <Nav className="d-none d-lg-block">
                <ul>
                    <LinkRoute routeName="home" text={t("Accueil")} />
                    <LinkRoute routeName="events" text={t("Événements")} />
                    <LinkRoute routeName="sermons" text={t("Sermons")} />
                    <LinkRoute routeName="blog" text={t("Blog")} />
                    <LinkRoute routeName="gallery" text={t("Galerie")} />
                    <LinkRoute routeName="contact" text={t("Contact")} />
                </ul>
            </Nav>

            <SocialLinks>
                <a href="#" className="twitter">
                    <FiFacebook />
                </a>
                <a href="#" className="facebook">
                    <FiTwitter />
                </a>
                <a href="#" className="instagram">
                    <FiInstagram />
                </a>
            </SocialLinks>
        </div>
    </>
}

export default NavBar