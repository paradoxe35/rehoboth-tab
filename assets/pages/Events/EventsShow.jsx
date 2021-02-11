import React from 'react'
import styled from 'styled-components';
import { CountdownParentStyled, CountdownRowStyled } from '/@/components/StyledComponents';
import Hero from '/@/layouts/Hero/Hero'
import CountdownRender, { useCountdownDone } from '/@/views/CountdownRender';


const CountDownEvent = ({ event }) => {
    const { isReady, handleComplete } = useCountdownDone(event?.ready)


    return <div className="container-fluid">
        <CountdownParentStyled>
            <div className="container">
                <CountdownRowStyled className="row align-items-center">
                    <div className="col-lg-6 h-100 mt-3 mt-lg-0">
                    </div>
                    <div className="col-lg-6 my-3">
                        <CountdownRender isReady={isReady} handleComplete={handleComplete} date={event.start_datetime} />
                    </div>
                </CountdownRowStyled>
            </div>
        </CountdownParentStyled>
    </div>
}

const EventsShow = ({ event: { data: event } }) => {
    console.log(event);

    return <Hero
        bgColor={'rgba(5, 13, 24, 0.616)'}
        title={`Événement - ${event.name}`}
        heroClass={null} imageSrc={event.image.public_path}>
        <CountDownEvent event={event} />
    </Hero>
}

export default EventsShow