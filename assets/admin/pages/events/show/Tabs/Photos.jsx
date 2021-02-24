import React, { useCallback, useState } from 'react'
import { EVENT_DATA_FORM, forkedEventFormData, handleUpdateEventData } from '../../create/DatasForm'
import H5 from '../../create/H5'
import CoverImageSection from '../../create/Sections/CoverImageSection'
import UploadPhotosSection from '../../create/Sections/UploadPhotosSection'
import { ApiRequest } from '/@/api/api'
import Button from '/@/components/admin/Button'
import { Tab, Tabs } from '/@/components/admin/Tabs'
import Card from '/@/components/Card'
import ContentMasonryWrapper, { ItemFolioText } from '/@/components/ContentMasonryWrapper'
import ImageThumbnail from '/@/components/ImageThumbnail'
import { confirmed } from '/@/functions/functions'
import { Notifier } from '/@/utils/notifier'


const ITab = () => {
    // @ts-ignore
    let $event = window.$event;

    // @ts-ignore
    const [photos, setPhotos] = useState(window.$event?.photos || [])
    // @ts-ignore
    const [image, setImage] = useState(window.$event?.image || null)


    const onDeletePhoto = useCallback((img) => {
        if (confirmed()) {
            setPhotos(imgs => imgs.filter(i => i.id != img.id))
            ApiRequest("delete", route("admin.images.destroy", { image: img.id }).toString())
        }
    }, [setPhotos])


    const [coverLoading, setCoverLoading] = useState(false)
    const [photosLoading, setPhotosLoading] = useState(false)


    const uploadCover = () => {
        const { cover } = forkedEventFormData()

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'cover', event: $event.id }),
            setCoverLoading,
            cover,
            (data) => data.cover && setImage(data.cover)
        )
    }

    const uploadPhotos = () => {
        const { pictures } = forkedEventFormData()

        if ((EVENT_DATA_FORM.photos.length + photos.length) > 10) {
            return Notifier.error("Vous ne pouvez pas télécharger plus de 10 images")
        }

        handleUpdateEventData(
            route('admin.events.updateEvent', { section: 'photos', event: $event.id }),
            setPhotosLoading,
            pictures,
            (data) => data.photos && setPhotos(data.photos)
        )
    }

    return <>
        <Card>
            <Tabs>
                <Tab active={true} id="photos-view" title="Photos">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <h5>Image de couverture</h5>

                            {image && <ImageThumbnail key={image.id} image={image} />}
                        </div>
                        <div className="col-lg-6 mb-3">
                            <h5>Photos</h5>
                            <ContentMasonryWrapper images={photos}>
                                {img => (
                                    <ItemFolioText title={(
                                        <Button
                                            color="danger"
                                            text="supprimer"
                                            onClick={() => onDeletePhoto(img)}
                                            type="button" className="p-1 text-xs" />
                                    )} />
                                )}
                            </ContentMasonryWrapper>
                        </div>
                    </div>
                </Tab>

                <Tab id="upload-photos" title="Télécharger">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <Card title={<H5 text="Image de couverture" />} bodyClass="bg-light" cardClass="my-3">
                                <CoverImageSection />
                            </Card>

                            <Button
                                loading={coverLoading}
                                onClick={uploadCover}
                                className="btn-sm text-sm mt-4"
                                text="Mettre à jour" />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <UploadPhotosSection />

                            <Button
                                loading={photosLoading}
                                onClick={uploadPhotos}
                                className="btn-sm text-sm mt-4"
                                text="Télécharger" />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </Card>
    </>
}


export default ITab