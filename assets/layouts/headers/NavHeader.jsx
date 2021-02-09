import styled from "styled-components";


export const Nav = styled.nav`
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
        .link:before {
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

    .link:hover:before,
    li:hover > .link:before,
    .active > .link:before {
        visibility: visible;
        width: 25px;
    }

    .link:hover,
    .active > .link,
        li:hover > .link {
        color: var(--bs-primary);
    }
`

export const NavHeader = styled(Nav)`
    @media (max-width: 991.98px) { 
        .menu-is-open & {
                transform: translateX(0);
                visibility: visible;
                -webkit-overflow-scrolling: touch;
                display: block !important;
        }
        .menu-is-open & ul {
            opacity: 1;
            visibility: visible;
            transition-property: all;
            transition-duration: 0.5s;
            transition-timing-function: ease-in-out;
            transition-delay: 0.3s;
            left: 0;
        }
        & ul {
            position: relative;
            left: 50px;
            opacity: 0;
            visibility: hidden;
        }

        & {
            background: #0C0C0C;
            color: rgba(255, 255, 255, 0.25);
            font-family: "montserrat-light", sans-serif;
            font-size: 1.3rem;
            line-height: 1.846;
            padding: 3.6rem 3rem 3.6rem 3.6rem;
            height: 100%;
            width: 280px;
            position: fixed;
            right: 0;
            top: 0;
            z-index: 700;
            overflow-y: auto;
            overflow-x: hidden;
            transition: all 0.5s ease;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            transform: translateX(100%);
            visibility: hidden;
            ul {
                display: block;
            }
            .nav__close {
                display: block;
                height: 30px;
                width: 30px;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.3);
                position: absolute;
                top: 36px;
                right: 30px;
                font: 0/0 a;
                text-shadow: none;
                color: transparent;
                z-index: 800;
                span::before, 
                span::after {
                    content: "";
                    display: block;
                    height: 2px;
                    width: 12px;
                    background-color: #FFFFFF;
                    position: absolute;
                    top: 50%;
                    left: 9px;
                    margin-top: -1px;
                }
                span::before {
                    transform: rotate(-45deg);
                }
                span::after {
                    transform: rotate(45deg);
                }
            }
        }
        
    }
`

export const SocialLinks = styled.div`
    padding-left: 20px;
    a {
        color: var(--bs-primary);
        margin-left: 6px;
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

export const ToggleButton = styled.button`
    height: 2.5rem;
    width: 2.5rem;
    padding: 0.3125rem;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 50%;
    .navbar-toggle-icon {
        position: relative;
        height: 0.125rem;
        width: 1.25rem;
        transition: all 0.2s ease-in-out;
        display: block;
        top: -0.3125rem;
        pointer-events: none;
        &:before {
            width: 50%;
            top: 0.3125rem;
            content: "";
            position: absolute;
            transition: all 0.2s ease-in-out;
            border-radius: .25rem;
            height: 0.125rem;
            background-color: var(--bs-primary);
            left: 0;
        }
        &:after {
            width: 75%;
            top: 0.625rem;
            content: "";
            position: absolute;
            height: 0.125rem;
            background-color: var(--bs-primary);
            left: 0;
            transition: all 0.2s ease-in-out;
            border-radius: .25rem;
        }
        .toggle-line {
            display: block;
            height: 100%;
            border-radius: .25rem;
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
            background-color: var(--bs-primary);
            pointer-events: none;
        }
    }
`
