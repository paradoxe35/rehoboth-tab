import React, { useCallback, useState } from 'react'
import H5 from '../../create/H5'
import CoverImageSection from '../../create/Sections/CoverImageSection'
import UploadPhotosSection from '../../create/Sections/UploadPhotosSection'
import Button from '/@/components/admin/Button'
import { Tab, Tabs } from '/@/components/admin/Tabs'
import Card from '/@/components/Card'
import ContentMasonryWrapper from '/@/components/ContentMasonryWrapper'
import { confirmed } from '/@/functions/functions'


const ITab = () => {

    // @ts-ignore
    const [photos, setPhotos] = useState(window.$event?.photos || [])
    // @ts-ignore
    const [image, setImage] = useState(window.$event?.image || null)


    const onDeletePhoto = useCallback((img) => {
        if (confirmed()) {
            setPhotos(imgs => imgs.filter(i => i.id != img.id))
        }
    }, [setPhotos])


    const [coverLoading, setCoverLoading] = useState(false)
    const [photosLoading, setPhotosLoading] = useState(false)


    const uploadCover = () => {
    }

    const uploadPhotos = () => {
    }

    return <>
        <Card>
            <Tabs>
                <Tab active={true} id="photos-view" title="Photos">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <h5>Image de couverture</h5>

                            <img src={image.public_path} className="img-fluid img-thumbnail" alt={image.caption} />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <h5>Photos</h5>
                            <ContentMasonryWrapper images={photos} imgKey="public_path" >
                                {img => (
                                    <div className="item-folio__text">
                                        <h5 className="item-folio__title">
                                            <button
                                                onClick={() => onDeletePhoto(img)}
                                                type="button" className="btn btn-link">
                                                Supprimer
                                            </button>
                                        </h5>
                                    </div>
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