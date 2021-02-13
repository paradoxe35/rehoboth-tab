import React from 'react'
import Hero from '/@/layouts/Hero/Hero'
import ContentDetailsEvent from '/@/views/EventsShow/ContentDetailsEvent';
import CountDownEvent from '/@/views/EventsShow/CountDownEvent';
import MetaDetailsEvent from '/@/views/EventsShow/MetaDetailsEvent';

const EventsShow = ({ event: { data: event } }) => {
    return <Hero
        bgColor={'rgba(5, 13, 24, 0.616)'}
        title={`Événement - ${event.name}`}
        heroClass={null} imageSrc={event.image.public_path}>
        <CountDownEvent event={event} />

        <div className="container">
            <div className="row justify-content-center my-3">
                <div className="pr-lg-2 col-lg-7 mb-3">
                    <ContentDetailsEvent event={event} />
                </div>
                <div className="pl-lg-2 col-lg-4 mb-3">
                    <MetaDetailsEvent event={event} />
                </div>
            </div>
        </div>

    </Hero>
}

export default EventsShow