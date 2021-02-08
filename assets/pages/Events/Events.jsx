import React from "react";
import Hero from "/@/layouts/Hero/Hero";
import EventsIndex from "/@/views/Events/index/EventsIndex";


const Events = () => {
    return <Hero title={"Événements"}>
        <EventsIndex />
    </Hero>
}

export default Events;