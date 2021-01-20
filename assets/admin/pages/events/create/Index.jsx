import "/@/utils/devtool"
import React, { useState } from 'react'
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
import { ApiRequest } from "/@/api/api"
import { Notifier } from "/@/utils/notifier"



const Submit = () => {
    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        if (!EVENT_DATA_FORM.cover) {
            return Notifier.error("Image couverture est requise");
        }

        setLoading(true)
        try {

            const pictures = new FormData()
            pictures.set('cover', EVENT_DATA_FORM.cover)
            EVENT_DATA_FORM.photos.forEach((photo) => pictures.append('photos[]', photo))

            const formData = { ...EVENT_DATA_FORM }

            delete formData.cover
            delete formData.photos

            await ApiRequest('post',
                route('admin.events.store', { section: 'details' }
                ).toString(), formData.details)

            await ApiRequest('post',
                route('admin.events.store', { section: 'tickets' }
                ).toString(), formData.tickets)

            await ApiRequest('post',
                route('admin.events.store', { section: 'schedules' }
                ).toString(), formData.schedules)

            const { data } = await ApiRequest('post',
                route('admin.events.store', { section: 'save' }
                ).toString(), formData)

            ApiRequest('post',
                route('admin.events.store', { section: 'pictures', event_id: data.event.id }
                ).toString(), pictures)
                .finally(() => {

                    $swup.loadPage({
                        url: route('admin.events.show', { event: data.event.id }, false)
                            .toString()
                    })
                    setLoading(false)
                })

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return <Button
        loading={loading}
        onClick={handleSaveForm}
        className="btn-sm text-sm"
        text="Sauvegarder" />

}

const Main = () => {

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
                    <Submit />
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