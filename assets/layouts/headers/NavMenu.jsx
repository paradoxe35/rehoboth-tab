import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import LogoApp from './LogoApp';
import { NavHeader, SocialLinks, ToggleButton } from './NavHeader';
import { Inertia } from '@inertiajs/inertia';
import SocialIcons from './SocialIcons';



const LinkRoute = ({ routeName, text }) => {
    // @ts-ignore
    return <li className={route().current().toString().includes(routeName) ? 'active' : ''}>
        <InertiaLink className="link" href={route(routeName).toString()}>
            {text}
        </InertiaLink>
    </li>
}

const SocialIconsWrapper = ({ className = null, children = null }) => {
    return <SocialLinks>
        <SocialIcons className={className} />
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
                    className="nav__close d-lg-none mb-2" title="Fermer">
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
                        <SocialIconsWrapper className="d-block d-md-none mx-3" />
                    </li>
                </ul>
            </NavHeader>

            <SocialIconsWrapper className="text-center d-none d-md-inline-block">
                <span className="d-none d-md-inline-block d-lg-none mx-2"></span>
                <ToggleButton
                    className="btn d-lg-none"
                    onClick={e => {
                        e.stopPropagation()
                        handleCollapse()
                    }} title="Basculer la navigation">
                    <span className="navbar-toggle-icon">
                        <span className="toggle-line"></span>
                    </span>
                </ToggleButton>
            </SocialIconsWrapper>
        </div>
    </>
}

export default NavBar