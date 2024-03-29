import React, { useState } from 'react'
import { forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm';
import TicketPriceSection from '../../create/Sections/TicketPriceSection';
import Button from '/@/components/admin/Button';


const Submit = () => {
    // @ts-ignore
    let $event = window.$event;

    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        const { formData } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'tickets', event: $event.id }),
            setLoading,
            { ...formData.tickets, remaining: formData.other_info.remaining_tickets }
        )
    }

    return <Button
        loading={loading}
        onClick={handleSaveForm}
        className="btn-sm text-sm mt-4"
        text="Mettre à jour" />
}


const Tab = () => {
    return <TicketPriceSection>
        <Submit />
        <></>
    </TicketPriceSection>
}


export default Tab