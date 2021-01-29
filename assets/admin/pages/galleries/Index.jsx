import "/@/utils/devtool"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Button from "/@/components/admin/Button"
import { ApiRequest } from "/@/api/api"
import { Flipper, Flipped } from 'react-flip-toolkit'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import anime from "animejs"
import styled from "styled-components"
import Card from "/@/components/Card"
import { useListDataPaginator, useScrollBottom } from "/@/utils/hooks"
import Skeleton from "react-loading-skeleton"
import { LozadImage } from "/@/components/LozadImage"
import { PhotoSwipe } from 'react-pswp';

import 'react-pswp/dist/index.css';

const trueArr = new Array(4).fill(true)

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

const pathId = /(\/|\\|\.)/g

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

export const Image = styled(LozadImage)`
    will-change: transform;
    width: 100%;
    display: block;
    cursor: pointer;
`

const ImageFlipped = ({ setKey, img, onClick = null }) => {

    const handleClick = (e) => {
        e.preventDefault()
        onClick && onClick(img.uid)
    }

    return <a href={img.public_path} onClick={handleClick}>
        <Flipped
            stagger
            onAppear={onDelayedAppear}
            onExit={onExit}
            flipId={`imagekey-${setKey}`}>
            <Image data-src={img.public_path} />
        </Flipped>
    </a>
}

const LoaderFlipped = ({ setKey }) => {

    return <Flipped
        stagger
        onAppear={onDelayedAppear}
        onExit={onExit}
        flipId={`imagekey-${setKey}`}>
        {/* @ts-ignore */}
        <Skeleton height={200} />
    </Flipped>
}

const Content = ({ images = [], onClick = null }) => {
    return <>
        <Flipped flipId="list">
            <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}>
                <Masonry gutter="10px">
                    {images.map((img, i) => {
                        if (typeof img === 'boolean') {
                            return <LoaderFlipped setKey={i} />
                        } else {
                            const key = img.path.replace(pathId, '-')
                            img.uid = i
                            return <ImageFlipped onClick={onClick} key={key} setKey={key} img={img} />
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

    const imagesRef = useRef([])

    useEffect(() => {
        ApiRequest('get', route('admin.galleries.images').toString())
            .then(({ data: pdata }) => {
                setListData(pdata)
                setImages(pdata.data)
                imagesRef.current = pdata.data
            })
    }, [])

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

    return { images, setGroup }
}

const Main = () => {
    const { setGroup, images } = useImagesState()

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
                <Button text="Ajouter images" className="btn-sm text-sm" />
            </div>
        </div>

        <div className="my-3">
            <Card>
                {/* @ts-ignore */}
                <Flipper staggerConfig={{ default: { reverse: true, speed: .3 }, }} spring="gentle" flipKey={images}>
                    <Content onClick={handleClickImage} images={images} />
                </Flipper>
            </Card>
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