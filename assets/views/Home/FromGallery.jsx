import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import NoContainerPadding from '/@/components/NoContainerPadding'
import SubtitleLead from '/@/components/SubtitleLead'
import Card from '/@/components/Card'
import { ContentMasonrySimpleWrapper } from '/@/components/ContentMasonryWrapper'
import FullScreenLoader from '/@/components/FullScreenLoader'
import { usePhotoSwipe } from '/@/utils/hooks'
import ImageGalleryItem from '../ImageGalleryItem'


const ContainerStyled = styled(NoContainerPadding)`
    background-color: var(--bs-light);
`

const SpanAutoStyled = styled.span`
    font-size: 12px;
    &:hover {
        color: var(--bs-primary);
        text-decoration: underline;
    }
`

const Titles = () => {
    return <div className="row mb-4" data-aos="fade-up">
        <div className="col">
            <h5>
                <SubtitleLead>
                    Galerie
                </SubtitleLead>
            </h5>
        </div>
        <div className="col-auto">
            <SpanAutoStyled className="h6 text-center subtitle font-weight-600">
                <InertiaLink className="text-secondary" href={route('guest.gallery').toString()}>
                    Toutes les images
                </InertiaLink>
            </SpanAutoStyled>
        </div>
    </div>
}


const GalleryContent = ({ images, setPswpIndex }) => {
    return <div className="container-fluid">
        <ContainerStyled className="pb-4">
            <div className="container my-4 overflow-hidden" data-aos="fade-up">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <Titles />

                        <Card border={false} bodyClass="p-0" className="bg-transparent">
                            <ContentMasonrySimpleWrapper>
                                {images.map((img, i) => {
                                    return <ImageGalleryItem
                                        img={img}
                                        onClick={() => setPswpIndex(i)}
                                    />
                                })}
                            </ContentMasonrySimpleWrapper>
                        </Card>
                    </div>
                </div>
            </div>
        </ContainerStyled>
    </div>
}

const PhotoSwipe = lazy(() => import('/@/components/PhotoSwipe'))

const FromGallery = () => {
    // @ts-ignore
    const { images } = usePage().props

    const { setPswpIndex, setPswpOpen, pswpOpen, pswpIndex, loadPswp } = usePhotoSwipe()

    return <>
        <GalleryContent images={images} setPswpIndex={setPswpIndex} />
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




export default FromGallery