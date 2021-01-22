import React, { useState } from 'react'
import { EVENT_DATA_FORM } from '../../create/DatasForm'
import EventDetailsSection from '../../create/Sections/EventDetailsSection'
import Button from '/@/components/admin/Button'


const Tab = () => {
    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        console.log(EVENT_DATA_FORM);
    }

    return <EventDetailsSection>
        <Button
            loading={loading}
            onClick={handleSaveForm}
            className="btn-sm text-sm"
            text="Mettre à jour" />
        <></>
    </EventDetailsSection>
}


export default Tab