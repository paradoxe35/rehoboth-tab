import "/@/utils/devtool"
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Card from '/@/components/Card'
import Button from "/@/components/admin/Button"

import CoverImageSection from "./Sections/CoverImageSection"
import EventDetailsSection from "./Sections/EventDetailsSection"
import TicketPriceSection from "./Sections/TicketPriceSection"
import ScheduleSection from "./Sections/ScheduleSection"
import UploadPhotosSection from "./Sections/UploadPhotosSection"
import OtherInfoSection from "./Sections/OtherInfoSection"
import { EVENT_DATA_FORM } from './DatasForm'


const Main = () => {

    const handleSaveForm = () => {
        console.log(EVENT_DATA_FORM);
    }

    return <>
        <CoverImageSection />
        <div className="row">
            <div className="col-lg-8 pr-lg-2">
                <EventDetailsSection />
                <TicketPriceSection />
                <ScheduleSection />
                <UploadPhotosSection />
            </div>
            <div className="col-lg-4 pl-lg-2" >
                <div className="sticky-top sticky-sidebar" style={{ zIndex: 5 }}>
                    <OtherInfoSection />
                </div>
            </div>
        </div>
        <Card cardClass="my-3">
            <div className="row justify-content-between align-items-center">
                <div className="col-md">
                    <h5 className="mb-2 mb-md-0">
                        Bon travail! Vous avez presque fini
                    </h5>
                </div>
                <div className="col-auto">
                    <Button
                        onClick={handleSaveForm}
                        className="btn-sm text-sm"
                        text="Sauvegarder" />
                </div>
            </div>
        </Card>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance