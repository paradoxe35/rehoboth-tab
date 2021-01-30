import "/@/utils/devtool"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Button from "/@/components/admin/Button"
import { ApiRequest } from "/@/api/api"
import { Flipper, Flipped } from 'react-flip-toolkit'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import anime from "animejs"
import { useListDataPaginator, useScrollBottom } from "/@/utils/hooks"

import { PhotoSwipe } from 'react-pswp';
import 'react-pswp/dist/index.css';

import LoaderFlipped from "/@/components/LoaderFlipped"
import ImageFlipped from "/@/components/ImageFlipped"
import BsModal from "/@/components/admin/Modal"
import FilePond, { imageOptions } from "/@/plugins/filepond"
import { FormControl } from "../events/create/FormControl"
import { FlatpickrDate } from "../events/create/Flatpickr"
import { Notifier } from "/@/utils/notifier"

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

const onDelayedAppear = (el, index) => {
    anime({
        targets: el,
        opacity: [0, 1],
        scale: [0.9, 1],
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

const Content = ({ images = [], onClick = null }) => {
    return <>
        <Flipped flipId="list">
            <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}>
                <Masonry gutter="10px">
                    {images.map((img, i) => {
                        if (typeof img === 'boolean') {
                            return <LoaderFlipped
                                onDelayedAppear={onDelayedAppear}
                                onExit={onExit} 
                                setKey={i} />
                        } else {
                            const key = img.path.replace(pathId, '-')
                            img.uid = i
                            return <ImageFlipped
                                onClick={onClick}
                                onDelayedAppear={onDelayedAppear}
                                onExit={onExit}
                                key={key}
                                setKey={key}
                                img={img} />
                        }
                    })}

                    {!images.length && <div className="py-5" />}
                </Masonry>
            </ResponsiveMasonry>
        </Flipped>
    </>
}


const useImagesState = () => {
    const [images, setImages] = useState([])
    const [group, setGroup] = useState("all")

    const {
        listData,
        setListData,
        onPageChange: getPaginatorChange,
        paginator
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

    function onLoadNextItems(page, canLoad) {
        setImages(im => [...im, ...trueArr])

        ApiRequest('get', route('admin.galleries.images', { page }).toString())
            .then(({ data: pdata }) => {
                imagesRef.current.push(...pdata.data)
                setListData(pdata)
            })
            .finally(() => {
                canLoad.current = true
            })
    }

    useScrollBottom((canLoad) => {
        const { links, meta } = paginator.current
        links?.next && getPaginatorChange({ page: meta.current_page + 1 }, canLoad)
    })

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

    return { images, setGroup, prependImages }
}

const AddImagesModalContent = ({ imagesRef, formId }) => {
    const ref = useRef(null)

    useEffect(() => {
        imagesRef.current = [];
        if (ref.current) {
            const pont = FilePond.create(ref.current, {
                ...imageOptions,
                maxFiles: 20,
                onaddfile: (err, { file }) => {
                    if (!err) {
                        imagesRef.current.push(file)
                    }
                },
                onremovefile: (err, { file }) => {
                    if (!err) {
                        imagesRef.current = imagesRef.current.filter(f => f != file)
                    }
                }
            })
            return () => pont.destroy()
        }
    }, [])

    return <>
        <h5 className="mb-4">Ajouter des images à la galerie</h5>
        <form id={formId} autoComplete="off">
            <div className="row">
                <div className="col-lg-5">
                    <FormControl label="Titre de la galerie" name="title" />
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" id="description" rows={2}></textarea>
                    </div>
                    <FlatpickrDate label="Date" />
                </div>
                <div className="col-lg-7">
                    <div ref={ref} />
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


const Main = () => {
    const { setGroup, images, prependImages } = useImagesState()

    const [index, setIndex] = useState(null);
    const [open, setOpen] = useState(false);


    const pswpContainer = useMemo(() => images.map((img, i) => ({
        uid: i,
        src: img.public_path,
        msrc: img.public_path,
        w: img.width,
        h: img.height,
        title: img.caption,
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
            <Flipper staggerConfig={{ default: { reverse: true, speed: .3 }, }} spring="gentle" flipKey={images}>
                <Content onClick={handleClickImage} images={images} />
            </Flipper>
        </div>
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