import React, { useEffect } from 'react'
import BodyClassName from 'react-body-classname';
import AbountChurch from '/@/views/Home/AbountChurch';
import FromGallery from '/@/views/Home/FromGallery';
import HomeHero from '/@/views/Home/HomeHero';
import LatestBlog from '/@/views/Home/LatestBlog';
import LatestSermons from '/@/views/Home/LatestSermons';
import NewsLetter from '/@/views/Home/Newsletter';
import UpcomingEvent from '/@/views/Home/UpcomingEvents';


import aos from 'aos'
import 'aos/dist/aos.css'



const Home = () => {
    useEffect(() => {
        aos.init({ once: true })
    }, [])
    return <BodyClassName className="nav--muted">
        <>
            <HomeHero />
            <UpcomingEvent />
            <AbountChurch />
            <LatestSermons />
            <FromGallery />
            <LatestBlog />
            <NewsLetter />
        </>
    </BodyClassName>
}

export default Home
