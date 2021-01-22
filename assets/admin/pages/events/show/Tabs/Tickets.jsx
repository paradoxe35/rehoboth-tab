import React, { useState } from 'react'
import { EVENT_DATA_FORM } from '../../create/DatasForm';
import TicketPriceSection from '../../create/Sections/TicketPriceSection';
import Button from '/@/components/admin/Button';


const Tab = () => {
    const [loading, setLoading] = useState(false)

    const handleSaveForm = async () => {
        console.log(EVENT_DATA_FORM);
    }

    return <TicketPriceSection>
        <Button
            loading={loading}
            onClick={handleSaveForm}
            className="btn-sm text-sm mt-4"
            text="Mettre à jour" />
        <></>
    </TicketPriceSection>
}


export default Tab