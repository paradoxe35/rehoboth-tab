import React, { useEffect } from 'react'

import SwiperCore, { Navigation, Pagination, Parallax, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { InertiaLink } from '@inertiajs/inertia-react'
import styled from 'styled-components'

import Home2 from '/@/images/home/home1.jpg';
import Home1 from '/@/images/home/home2.jpg';
import Home3 from '/@/images/home/home3.jpg';

SwiperCore.use([Navigation, Pagination, Parallax, Autoplay, A11y]);

const classes = {
    height: "100vh",
    minHeight: "600px",
    backgroundPosition: "50% 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}

/** @type { React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> } */
const Div = ({ className }) => <div className={`d-none d-lg-block text-light ${className}`} />

const SwiperButton = styled(Div)`
    transition: all .2s ease-in-out;
    opacity: .3;
    &:hover {
        opacity: .7;
    }
`

const SwiperButtonPrev = styled(SwiperButton)`
    left: 30px !important;
`

const SwiperButtonNext = styled(SwiperButton)`
    right: 30px !important;
`


const HomeHero = () => {
    const slides = "swiper--slide--item"

    useEffect(() => {
        Array.from(document.querySelectorAll(`.${slides}`))
            .forEach(
                /** @param { HTMLElement } el */
                (el) => {
                    window.addEventListener("resize", function () {
                        const width = document.body.clientWidth
                        el.style.width = width + "px"
                    })
                })
    }, [])

    return <Swiper
        slidesPerView={1}
        allowTouchMove
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        autoplay={{
            delay: 10500,
            disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        pagination={{
            clickable: true,
            dynamicBullets: true
        }}
        parallax={true}>

        <SwiperButtonNext className="swiper-button-next" />
        <SwiperButtonPrev className="swiper-button-prev" />

        <SwiperSlide className={slides} style={{ backgroundImage: `url(${Home1})`, ...classes }}>
            <SwiperSlideContent
                subtitle={"Il y a une place"}
                title={"Pour tout le monde"}
                action={{ text: "Lire plus", href: "#" }}
                subtitleColor="text-primary"
                description={"Peu importe d'où vous venez ou qui vous êtes, le puits de la parole est ouvert à tous."}
            />
        </SwiperSlide>

        <SwiperSlide className={slides} style={{ backgroundImage: `url(${Home2})`, ...classes }}>
            <SwiperSlideContent
                subtitle={"Mettez votre foi"}
                title={"En action"}
                action={{ text: "Lire plus", href: "#" }}
                colClass="offset-lg-6"
                subtitleColor="text-primary"
                description={"Mettez votre foi en action aujourd'hui et laissez vos actions être alimentées par votre foi."}
            />
        </SwiperSlide>

        <SwiperSlide className={slides} style={{ backgroundImage: `url(${Home3})`, ...classes }}>
            <SwiperSlideContent
                subtitle={"Abandon total"}
                title={"À Dieu"}
                action={{ text: "Lire plus", href: "#" }}
                subtitleColor="text-primary"
                description={"La première étape pour surmonter tout type de situation qui tient dans l'esclavage."}
            />
        </SwiperSlide>
    </Swiper>
}


const DivContainer = styled.div`
    h2.display-1, a.btn, p.text-description {
        color: var(--bs-grey-light);
    }
`

const SwiperSlideContent = ({
    subtitle = null,
    title = null,
    description = null,
    action = { href: '#', text: null },
    flexClass = '',
    colClass = '',
    subtitleClass = '',
    titleClass = '',
    subtitleColor = ''
}) => {
    return <DivContainer className="h-100 px-lg-6 px-lg-7 container">
        <div data-swiper-parallax="-500" className={`h-100 align-items-center ${flexClass} row`}>
            <div className={`col-lg-6 ${colClass}`}>
                {
                    subtitle &&
                    <p className={`subtitle letter-spacing-3 ${!subtitleColor ? 'font-weight-light' : ''}  ${subtitleClass} ${subtitleColor || 'text-dark'} mb-3`}>
                        {subtitle}
                    </p>
                }
                {
                    title &&
                    <h2 className={`display-1 font-weight-bold ${titleClass} mb-3`} style={{ lineHeight: 1 }}>
                        {title}
                    </h2>
                }
                {
                    description &&
                    <p className="text-description mb-5">{description}</p>
                }
                {
                    action.text &&
                    <InertiaLink href={action.href} className="btn btn-dark text-secondary">{action.text}</InertiaLink>
                }
            </div>
        </div>
    </DivContainer>
}


export default HomeHero