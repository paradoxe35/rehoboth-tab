import "/@/utils/devtool"
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Button from "/@/components/admin/Button"
import { ApiRequest } from "/@/api/api"
import { usePhotoSwipe } from "/@/utils/hooks"

import ImageFlipped from "/@/components/ImageFlipped"
import BsModal from "/@/components/admin/Modal"
import { FormControl } from "../events/create/FormControl"
import { FlatpickrDate } from "../events/create/Flatpickr"
import { Notifier } from "/@/utils/notifier"
import { ItemFolio, ItemFolioText, ItemFolioThumb } from "/@/components/ContentMasonryWrapper"
import { confirmed } from "/@/functions/functions"
import FilePondComponent from "/@/components/FilePond"
import FullScreenLoader from "/@/components/FullScreenLoader"
import { LoadMoreGalleryButton, useImagesGalleryState } from "/@/components/gallery/Gallery"
import { FlipperGalleryContent, onFlippedDelayedAppear, onFlippedExit } from "/@/components/gallery/GalleryFlipper"

const Tabs = ({ setGroup }) => {
    return <ul className="nav nav-pills" role="tablist">
        <li className="nav-item" role="presentation">
            <a data-bs-toggle="pill"
                onClick={() => setGroup('all')}
                className="nav-link border-darken border active" aria-current="page" href="#">
                Afficher tout
            </a>
        </li>
        <li className="nav-item" role="presentation">
            <a data-bs-toggle="pill"
                onClick={() => setGroup('event')}
                className="nav-link border-darken border mx-2" href="#">
                Événement
            </a>
        </li>
        <li className="nav-item" role="presentation">
            <a data-bs-toggle="pill"
                onClick={() => setGroup('blog')}
                className="nav-link border-darken border mx-2" href="#">
                Blog
            </a>
        </li>
        <li className="nav-item" role="presentation">
            <a data-bs-toggle="pill"
                onClick={() => setGroup('gallery')}
                className="nav-link border-darken border mx-2" href="#">
                Galerie
            </a>
        </li>
    </ul>
}


const AddImagesModalContent = ({ imagesRef, formId }) => {
    const onaddfile = (file) => {
        imagesRef.current.push(file)
    }
    const onremovefile = (file) => {
        imagesRef.current = imagesRef.current.filter(f => f != file)
    }

    useEffect(() => {
        imagesRef.current = [];
    }, [])

    return <>
        <h5 className="mb-4">Nouvelle galerie</h5>
        <form id={formId} autoComplete="off">
            <div className="row">
                <div className="col-lg-5">
                    <FormControl label="Nom de la galerie" name="title" />
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" name="description" id="description" rows={2}></textarea>
                    </div>
                    <FlatpickrDate label="Date" name="date" />
                </div>
                <div className="col-lg-7">
                    <FilePondComponent
                        onaddfile={onaddfile}
                        allowMultiple={true}
                        maxFiles={20}
                        onremovefile={onremovefile}
                    />
                </div>
            </div>
        </form>
    </>
}

/**
 * @type { * }
 */
// @ts-ignore
const AddImages = React.memo(({ prependImages }) => {
    const modalRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const imagesRef = useRef([]);
    const formId = useRef(`form-${Math.random()}`)

    const handleUpload = () => {
        /** @type { HTMLFormElement } */
        // @ts-ignore
        const formEl = document.getElementById(formId.current);

        const imagesData = new FormData(formEl)
        imagesRef.current.forEach(img => imagesData.append('images[]', img))

        setLoading(true)
        ApiRequest('post', route('admin.galleries.store').toString(), imagesData)
            .then(({ data: { data } }) => {
                prependImages(data)
                Notifier.success("Enregistrés")
                modalRef.current && modalRef.current.hide()
            })
            .finally(() => setLoading(false))
    }

    const footer = <Button
        loading={loading}
        onClick={handleUpload}
        className="btn-sm text-sm"
        text="Sauvegarder" />

    return <>
        <Button
            text="Ajouter images"
            onClick={() => modalRef.current && modalRef.current.show()}
            className="btn-sm text-sm" />
        <BsModal size="xl" footer={footer} modalRef={modalRef}>
            {() => <AddImagesModalContent formId={formId.current} imagesRef={imagesRef} />}
        </BsModal>
    </>
})


const ImageFlippedContent = ({ img, onClick, index, removeImage }) => {

    const image = <ImageFlipped
        onClick={onClick}
        onDelayedAppear={onFlippedDelayedAppear}
        onExit={onFlippedExit}
        indexUid={index}
        img={img} />

    const onDeletePhoto = (item) => {
        if (confirmed()) {
            removeImage(item)
            ApiRequest("delete", route("admin.images.destroy", { image: img.id }).toString())
        }
    }

    return img.gallery ? (
        <ItemFolio>
            <ItemFolioThumb>
                {image}
            </ItemFolioThumb>
            <ItemFolioText title={(
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDeletePhoto(img)
                    }}
                    type="button" className="btn btn-link">
                    Supprimer
                </button>
            )} />
        </ItemFolio>
    ) : image
}


const PhotoSwipe = lazy(() => import(/* webpackChunkName: "pswp" */'/@/components/PhotoSwipe'))

const Main = () => {
    const {
        setGroup,
        images,
        prependImages,
        listData,
        getPaginatorChange,
        removeImage
    } = useImagesGalleryState('admin.galleries.images')

    const { setPswpIndex, setPswpOpen, pswpOpen, pswpIndex, loadPswp, handleClickImage } = usePhotoSwipe()

    return <>
        <div className="row">
            <div className="col">
                <Tabs setGroup={setGroup} />
            </div>
            <div className="col-auto">
                <AddImages prependImages={prependImages} />
            </div>
        </div>

        <div className="my-3">
            <FlipperGalleryContent images={images}>
                {
                    ({ img, index }) =>
                        <ImageFlippedContent
                            key={img.id}
                            removeImage={removeImage}
                            img={img}
                            onClick={handleClickImage}
                            index={index} />
                }
            </FlipperGalleryContent>
        </div>

        <LoadMoreGalleryButton getPaginatorChange={getPaginatorChange} listData={listData} />

        <Suspense fallback={<FullScreenLoader />}>
            {
                loadPswp && <PhotoSwipe
                    images={images}
                    setIndex={setPswpIndex}
                    index={pswpIndex}
                    setOpen={setPswpOpen}
                    open={pswpOpen}
                />
            }
        </Suspense>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance