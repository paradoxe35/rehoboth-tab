import React, { useEffect } from 'react'
import BodyClassName from 'react-body-classname';
import AbountChurch from '/@/views/Home/AbountChurch';
import FromGallery from '/@/views/Home/FromGallery';
import HomeHero from '/@/views/Home/HomeHero';
import LatestBlog from '/@/views/Home/LatestBlog';
import LatestSermons from '/@/views/Home/LatestSermons';
import UpcomingEvent from '/@/views/Home/UpcomingEvents';
import OurPrograms from '/@/views/Home/OurPrograms';

import aos from 'aos'
import 'aos/dist/aos.css'




const Home = () => {
    useEffect(() => {
        aos.init({ once: true })
    }, [])
    // @ts-ignore
    return <BodyClassName className="nav--muted">
        <>
            <HomeHero />
            <div className="p-0 m-0" id="hero-bottom" />
            <UpcomingEvent />
            <AbountChurch />
            <LatestSermons />
            <FromGallery />
            <LatestBlog />
            <OurPrograms />
        </>
    </BodyClassName>
}

export default Home
