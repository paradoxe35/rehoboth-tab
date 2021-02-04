import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import LogoApp from './LogoApp';
import { NavHeader, SocialLinks, ToggleButton } from './NavHeader';
import { Inertia } from '@inertiajs/inertia';



const LinkRoute = ({ routeName, text }) => {
    // @ts-ignore
    return <li className={route().current(routeName) ? 'active' : ''}>
        <InertiaLink className="link" href={route(routeName).toString()}>
            {text}
        </InertiaLink>
    </li>
}

const SocialIcons = ({ className = null, children = null }) => {
    return <SocialLinks>
        <div className={className}>
            <a href="#" className="twitter">
                <FiFacebook />
            </a>
            <a href="#" className="facebook">
                <FiTwitter />
            </a>
            <a href="#" className="instagram">
                <FiInstagram />
            </a>
        </div>
        {children}
    </SocialLinks>
}

const bodyEl = document.querySelector('body')
const menuIsOpen = {
    toggle: () => bodyEl.classList.toggle('menu-is-open'),
    remove: () => bodyEl.classList.remove('menu-is-open'),
    add: () => bodyEl.classList.add('menu-is-open'),
}

const NavBar = () => {
    const handleCollapse = () => menuIsOpen.toggle()

    useEffect(() => {
        const closeMenu = () => menuIsOpen.remove()

        const removeStartEventListener = Inertia.on('navigate', () => menuIsOpen.remove())
        window.addEventListener('click', closeMenu)

        return () => {
            removeStartEventListener()
            menuIsOpen.remove()
            window.removeEventListener('click', closeMenu)
        }
    }, [])

    return <>
        <div className="container d-flex justify-content-between align-items-center">
            <LogoApp />

            <NavHeader onClick={e => e.stopPropagation()} className="bs-invisible d-lg-bs-visible">
                <a href="javascript:;"
                    onClick={handleCollapse}
                    className="nav__close d-lg-none d-xl-none mb-2" title="Fermer">
                    <span>Fermer</span>
                </a>
                <ul>
                    <LinkRoute routeName="guest.home" text={"Accueil"} />
                    <LinkRoute routeName="guest.events" text={"Événements"} />
                    <LinkRoute routeName="guest.sermons" text={"Sermons"} />
                    <LinkRoute routeName="guest.blog" text={"Blog"} />
                    <LinkRoute routeName="guest.gallery" text={"Galerie"} />
                    <LinkRoute routeName="guest.contact" text={"Contact"} />

                    <li className="mx-0 px-0">
                        <SocialIcons className="d-sm-block d-md-none mx-3" />
                    </li>
                </ul>


            </NavHeader>

            <SocialIcons className="text-center d-sm-none d-md-inline-block">
                <span className="d-lg-none d-xl-none mx-2"></span>
                <ToggleButton
                    className="btn d-lg-none d-xl-none"
                    onClick={e => {
                        e.stopPropagation()
                        handleCollapse()
                    }}
                    data-toggle="tooltip" data-placement="left" title="" data-original-title="Toggle Navigation">
                    <span className="navbar-toggle-icon">
                        <span className="toggle-line"></span>
                    </span>
                </ToggleButton>
            </SocialIcons>
        </div>
    </>
}

export default NavBar