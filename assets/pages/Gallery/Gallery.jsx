import { usePage } from "@inertiajs/inertia-react";
import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import FullScreenLoader from "/@/components/FullScreenLoader";
import { LoadMoreGalleryButton, useImagesGalleryState } from "/@/components/gallery/Gallery";
import { FlipperGalleryContent, onFlippedDelayedAppear, onFlippedExit } from "/@/components/gallery/GalleryFlipper";
import ImageFlipped from "/@/components/ImageFlipped";
import Hero from "/@/layouts/Hero/Hero";
import { usePhotoSwipe } from "/@/utils/hooks";
import ImageGalleryItem from "/@/views/ImageGalleryItem";

const FilterButton = ({ setGroup, group, label, groupName }) => {
    return <a href="javascript:;"
        className={group === groupName ? 'selected' : null}
        onClick={() => setGroup(groupName)}>{label}</a>
}


const FiltersList = styled.ul`
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    li {
        display: inline-block;
        margin-right: 4px;
        margin-bottom: 20px;
    }
    a.selected {
        background: var(--bs-primary);
        color: var(--bs-light);
    }
    a {
        border: 1px solid #dee2e6 !important;
        letter-spacing: 0.03em;
        font-size: 0.8rem;
        transition: .5s;
        outline: none !important;
        background: var(--bs-light);
        padding: 5px 10px 5px 10px;
        text-decoration: none;
    }
`

const Filters = ({ setGroup, group }) => {
    return <FiltersList>
        <li>
            <FilterButton setGroup={setGroup} group={group} groupName="all" label="Afficher tout" />
        </li>
        <li>
            <FilterButton setGroup={setGroup} group={group} groupName="event" label="Événement" />
        </li>
        <li>
            <FilterButton setGroup={setGroup} group={group} groupName="blog" label="Blog" />
        </li>
        <li>
            <FilterButton setGroup={setGroup} group={group} groupName="gallery" label="Galerie" />
        </li>
    </FiltersList>
}


const ImageFlippedContent = ({ img, onClick, index }) => {

    const image = <ImageFlipped
        onClick={onClick}
        onDelayedAppear={onFlippedDelayedAppear}
        onExit={onFlippedExit}
        indexUid={index}
        img={img} />

    return img.gallery ? <ImageGalleryItem img={img} component={image} /> : image
}

const PhotoSwipe = lazy(() => import('/@/components/PhotoSwipe'))

const Gallery = () => {
    // @ts-ignore
    const { images: initialImages } = usePage().props
    const { setGroup, images, listData, getPaginatorChange, group } = useImagesGalleryState('guest.gallery.items', initialImages)
    const { setPswpIndex, setPswpOpen, pswpOpen, pswpIndex, loadPswp, handleClickImage } = usePhotoSwipe()


    return <>
        <Hero title={"Galerie"}>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <Filters setGroup={setGroup} group={group} />
                            <div className="my-3">
                                <FlipperGalleryContent images={images}>
                                    {
                                        ({ img, index }) =>
                                            <ImageFlippedContent
                                                key={img.id}
                                                img={img}
                                                onClick={handleClickImage}
                                                index={index} />
                                    }
                                </FlipperGalleryContent>
                            </div>
                            <LoadMoreGalleryButton getPaginatorChange={getPaginatorChange} listData={listData} />
                        </div>
                    </div>
                </div>
            </div>
        </Hero>

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

export default Gallery;