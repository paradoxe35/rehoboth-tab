import "../styles/nav-menu.scss"
import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const NavBar = () => {
    return <>
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <h1 className="logo">
                <a href="index.html">Kelly</a>
            </h1>

            <nav className="nav-menu d-none d-lg-block">
                <ul>
                    <li className="active"><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="resume.html">Resume</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>

            <div className="header-social-links">
                <a href="#" className="twitter">
                    <FiFacebook />
                </a>
                <a href="#" className="facebook">
                    <FiTwitter />
                </a>
                <a href="#" className="instagram">
                    <FiInstagram />
                </a>
                <a href="#" className="linkedin">
                    <FiLinkedin />
                </a>
            </div>
        </div>
    </>
}

export default NavBar