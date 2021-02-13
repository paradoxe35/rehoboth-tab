import React, { useState } from 'react'
import { EVENT_DATA_FORM, forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm'
import OtherInfoSection from '../../create/Sections/OtherInfoSection'
import Button from '/@/components/admin/Button'


// @ts-ignore
const $event = window.$event

const Submit = () => {
    const [loading, setLoading] = useState(false)
    const handleSaveForm = async () => {
        const { formData } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'other_info', event: $event.id }),
            setLoading,
            formData.other_info
        )
    }

    return <Button
        loading={loading}
        onClick={handleSaveForm}
        className="btn-sm text-sm"
        text="Mettre à jour" />
}


const Tab = () => {
    return <OtherInfoSection>
        <Submit />
        <></>
    </OtherInfoSection>
}


export default Tab