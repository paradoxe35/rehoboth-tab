import React, { useState } from 'react'
import { forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm'
import ScheduleSection from '../../create/Sections/ScheduleSection'
import Button from '/@/components/admin/Button'

// @ts-ignore
const $event = window.$event

const Tab = () => {

    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        const { formData } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'schedules', event: $event.id }),
            setLoading,
            formData.schedules
        )
    }


    return <ScheduleSection>
        <Button
            loading={loading}
            onClick={handleSaveForm}
            className="btn-sm text-sm mt-4"
            text="Mettre à jour" />
        <></>
    </ScheduleSection>
}


export default Tab