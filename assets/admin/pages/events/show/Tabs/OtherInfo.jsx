import React, { useState } from 'react'
import { forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm'
import OtherInfoSection from '../../create/Sections/OtherInfoSection'
import { ApiRequest } from '/@/api/api'
import Button from '/@/components/admin/Button'
import { confirmed } from '/@/functions/functions'

const Submit = () => {
    // @ts-ignore
    let $event = window.$event;

    const [loading, setLoading] = useState(false)
    const [loadingDel, setLoadingDel] = useState(false)

    const handleSaveForm = () => {
        const { formData } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'other_info', event: $event.id }),
            setLoading,
            formData.other_info
        )
    }

    const handleDestroy = () => {
        if (!confirmed()) return
        setLoadingDel(true)
        ApiRequest('delete', route('admin.events.destroy', { event: $event.id }).toString())
            .then(() => $swup.loadPage({ url: route('admin.events.index') }, true))
            .finally(() => setLoadingDel(false))
    }

    return <div className="d-flex justify-content-between">
        <Button
            loading={loading}
            onClick={handleSaveForm}
            className="btn-sm text-sm"
            text="Mettre à jour" />

        <Button
            loading={loadingDel}
            onClick={handleDestroy}
            color="danger"
            className="btn-sm text-sm"
            text="Supprimer" />
    </div>
}


const Tab = () => {
    return <OtherInfoSection>
        <Submit />
        <></>
    </OtherInfoSection>
}


export default Tab