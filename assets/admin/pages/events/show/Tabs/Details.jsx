import React, { useState } from 'react'
import { forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm'
import EventDetailsSection from '../../create/Sections/EventDetailsSection'
import Button from '/@/components/admin/Button'


// @ts-ignore
const $event = window.$event

const Submit = () => {
    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        const { formData } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'details', event: $event.id }),
            setLoading,
            formData.details
        )
    }

    return <Button
        loading={loading}
        onClick={handleSaveForm}
        className="btn-sm text-sm"
        text="Mettre à jour" />
}

const Tab = () => {
    return <EventDetailsSection>
        <Submit /><></>
    </EventDetailsSection>
}


export default Tab