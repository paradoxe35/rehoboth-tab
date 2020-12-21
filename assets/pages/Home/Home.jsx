import React, { useRef } from 'react'
import BodyClassName from 'react-body-classname';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// @ts-ignore
import Home1 from './images/home-1-plain.jpg';
// @ts-ignore
import Home2 from './images/home-2-plain.jpg';
// @ts-ignore
import Home3 from './images/home-3-plain.jpg';
import styled from 'styled-components'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Parallax]);


const classes = {
    height: "95vh",
    minHeight: "600px",
    width: "1583px",
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}

/** @type { React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> } */
const Div = ({ className }) => <div className={`d-none d-lg-block text-dark ${className}`} />

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

const Home = () => {


    return <BodyClassName className="">
        <Swiper
            slidesPerView={1}
            allowTouchMove
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            speed={1500}
            loop={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            parallax={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>

            <SwiperButtonNext className="swiper-button-next" />
            <SwiperButtonPrev className="swiper-button-prev" />

            <SwiperSlide style={{ backgroundImage: `url(${Home1})`, ...classes }}>
                <div className="h-100 px-lg-6 px-lg-7 container-fluid">
                    <div data-swiper-parallax="-500" className="h-100 align-items-center justify-content-center text-center row">
                        <div className="col-lg-6">
                            <p className="subtitle letter-spacing-3 font-weight-light text-dark mb-3">Blue &amp; White</p>
                            <h2 className="display-1 mb-3" style={{ lineHeight: 1 }}>Linen and denim</h2>
                            <a href="#" className="btn btn-dark">Start shopping</a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style={{ backgroundImage: `url(${Home2})`, ...classes }}>
                <div className="h-100 px-lg-6 px-lg-7 container-fluid">
                    <div data-swiper-parallax="-500" className="h-100 align-items-center row">
                        <div className="col-lg-6 offset-lg-6">
                            <p className="subtitle letter-spacing-3 font-weight-light text-primary mb-4">Sneakers</p>
                            <h2 className="display-1 mb-5" style={{ lineHeight: 1 }}>For every occassion</h2>
                            <a href="#" className="btn btn-dark">Start shopping</a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style={{ backgroundImage: `url(${Home3})`, ...classes }} />
        </Swiper>
    </BodyClassName>

}

// Home.layout = page => <Layout children={page} title="Welcome" />

export default Home
