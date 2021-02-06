import "/@/utils/devtool"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Button from "/@/components/admin/Button"
import { ApiRequest } from "/@/api/api"
import { Flipper } from 'react-flip-toolkit'
import anime from "animejs"
import { useListDataPaginator } from "/@/utils/hooks"

import { PhotoSwipe } from 'react-pswp';
import 'react-pswp/dist/index.css';

import LoaderFlipped from "/@/components/LoaderFlipped"
import ImageFlipped from "/@/components/ImageFlipped"
import BsModal from "/@/components/admin/Modal"
import { FormControl } from "../events/create/FormControl"
import { FlatpickrDate } from "../events/create/Flatpickr"
import { Notifier } from "/@/utils/notifier"
import { ContentMasonrySimpleWrapper, ItemFolio, ItemFolioText, ItemFolioThumb } from "/@/components/ContentMasonryWrapper"
import { confirmed } from "/@/functions/functions"
import FilePondComponent from "/@/components/FilePond"

const trueArr = new Array(5).fill(true)

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

const LoadMoreButton = ({ listData, getPaginatorChange }) => {

    const handleClick = () => {
        const { links, meta } = listData
        links?.next && getPaginatorChange({ page: meta.current_page + 1 })
    }

    return <>
        {listData?.links?.next && (
            <button
                className="btn btn-primary text-center text-xs text-white btn-sm"
                onClick={handleClick}
                type="button">
                <span className="loading">• • •</span>
                <span className="visually-hidden">Charge plus</span>
            </button>
        )}
    </>
}

const useImagesState = () => {
    const [images, setImages] = useState([])
    const [group, setGroup] = useState("all")

    const {
        listData,
        setListData,
        onPageChange: getPaginatorChange,
    } = useListDataPaginator(null, onLoadNextItems)

    const imagesRef = useRef(trueArr)
    const groupRef = useRef(group)

    groupRef.current = group

    useEffect(() => {
        ApiRequest('get', route('admin.galleries.images').toString())
            .then(({ data: pdata }) => {
                setListData(pdata)
                setImages(pdata.data)
                imagesRef.current = pdata.data
            })
    }, [])


    const prependImages = useCallback((imgs) => {
        imagesRef.current.push(...imgs)
        setImages(im => [
            ...(groupRef.current === "all" ? imgs : imgs.filter(i => i.imageable == group)),
            ...im,
        ])
    }, [imagesRef, setImages, group])

    const removeImage = useCallback((img) => {
        imagesRef.current = imagesRef.current.filter(i => i.id != img.id)
        setImages(im => im.filter(i => i.id != img.id))
    }, [imagesRef, setImages])

    function onLoadNextItems(page) {
        setImages(im => [...im, ...trueArr])

        ApiRequest('get', route('admin.galleries.images', { page }).toString())
            .then(({ data: pdata }) => {
                imagesRef.current.push(...pdata.data)
                setListData(pdata)
            })
    }

    useEffect(() => {
        switch (group) {
            case 'all':
                setImages(imagesRef.current)
                break;
            default:
                setImages(imagesRef.current.filter(i => i.imageable == group))
                break;
        }
    }, [group, listData])

    return { images, setGroup, prependImages, listData, getPaginatorChange, removeImage }
}

const onDelayedAppear = (el, index) => {
    anime({
        targets: el,
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [-15, 0],
        easing: "easeOutSine",
        delay: index * 40,
        duration: 400
    })
}

const onExit = (el, index, removeElement) => {
    anime({
        targets: el,
        opacity: 0,
        scale: 0.9,
        easing: "easeOutSine",
        duration: 400,
        delay: index * 40,
        complete: removeElement
    })
}

const pathId = /(\/|\\|\.)/g

const ImageFlippedContent = ({ img, onClick, i, removeImage }) => {
    const key = img.path.replace(pathId, '-')
    img.uid = i

    const image = <ImageFlipped
        onClick={onClick}
        onDelayedAppear={onDelayedAppear}
        onExit={onExit}
        setKey={key}
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

const Content = ({ images = [], onClick = undefined, removeImage }) => {
    return <ContentMasonrySimpleWrapper>
        {images.map((img, i) => {
            if (typeof img === 'boolean') {
                return <LoaderFlipped
                    key={i}
                    onDelayedAppear={onDelayedAppear}
                    onExit={onExit}
                    setKey={i} />
            } else {
                return <ImageFlippedContent key={img.id} removeImage={removeImage} img={img} onClick={onClick} i={i} />
            }
        })}

        {!images.length && <div className="py-5" />}
    </ContentMasonrySimpleWrapper>
}

const Main = () => {
    const {
        setGroup,
        images,
        prependImages,
        listData,
        getPaginatorChange,
        removeImage
    } = useImagesState()

    const [index, setIndex] = useState(null);
    const [open, setOpen] = useState(false);


    const pswpContainer = useMemo(() => images.map((img, i) => ({
        uid: i,
        src: img.public_path,
        msrc: img.public_path,
        w: img.width,
        h: img.height,
        title: img?.gallery?.title || img.caption,
        description: img?.gallery?.description,
    })), [images])

    const handleClickImage = useCallback((uid) => setIndex(uid), [setIndex])

    useEffect(() => {
        if (!open && index !== null) setOpen(true);
    }, [index]);

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
            {/* @ts-ignore */}
            <Flipper spring="stiff" flipKey={images}>
                <Content removeImage={removeImage} onClick={handleClickImage} images={images} />
            </Flipper>
        </div>

        <LoadMoreButton getPaginatorChange={getPaginatorChange} listData={listData} />

        <PhotoSwipe
            container={pswpContainer}
            onIndexChange={setIndex}
            onOpenChange={setOpen}
            index={index}
            open={open}
            theme={{
                foreground: '#fff',
                background: '#1A202C',
            }}
        />
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance