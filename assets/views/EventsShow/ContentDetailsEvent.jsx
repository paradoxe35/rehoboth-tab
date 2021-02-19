import React, { lazy, Suspense } from 'react'
import styled from 'styled-components';
import Card from '/@/components/Card'
import { ContentMasonrySimpleWrapper } from '/@/components/ContentMasonryWrapper';
import FullScreenLoader from '/@/components/FullScreenLoader';
import { Iframe } from '/@/components/Iframe';
import ImageThumbnail from '/@/components/ImageThumbnail';
import { usePhotoSwipe } from '/@/utils/hooks';
import { embedGoogleMap } from '/@/utils/vars';


const Tag = styled.a`
    color: #748194;
    margin-right: .25rem;
`

const PhotoSwipe = lazy(() => import(/* webpackChunkName: "pswp" */'/@/components/PhotoSwipe'))


const Photos = ({ event }) => {
    const { setPswpIndex, setPswpOpen, pswpOpen, pswpIndex, loadPswp } = usePhotoSwipe()
    const photos = event.photos

    return <>
        {!!photos.length && (
            <Card cardClass="mb-3">
                <h5 className="mb-3">Photos</h5>
                <ContentMasonrySimpleWrapper>
                    {photos.map((img, i) => {
                        return <a href={img.public_path} onClick={e => (e.preventDefault(), setPswpIndex(i))}>
                            <ImageThumbnail image={img} title={event?.name} />
                        </a>
                    })}
                </ContentMasonrySimpleWrapper>
                <Suspense fallback={<FullScreenLoader />}>
                    {
                        loadPswp && <PhotoSwipe
                            images={photos}
                            setIndex={setPswpIndex}
                            index={pswpIndex}
                            setOpen={setPswpOpen}
                            open={pswpOpen}
                        />
                    }
                </Suspense>
            </Card>
        )}
    </>
}


const ContentDetailsEvent = ({ event }) => {
    const tags = (event?.tags || [])
    const address = event.address

    return <>
        <Card cardClass="mb-3">
            <h5 className="mb-3">{event?.name}</h5>
            <div className="text-muted" dangerouslySetInnerHTML={{ __html: event?.content || '' }} />

            {event.label && (
                <>
                    <h5 className="mb-1">Label</h5>
                    <p className="text-muted text-xs mb-3"><em>{event.label}</em></p>
                </>
            )}

            {!!tags.length && <h5 className="mb-3">Tags</h5>}
            {tags.map(tag => <Tag href="javascript:;" className="badge border text-600 mr-1">{tag.name}</Tag>)}
        </Card>

        {address.map && (
            <div id="view-map">
                <Card cardClass="mb-3">
                    <h5 className="mb-3">Carte</h5>
                    <Iframe
                        width="100%"
                        height="300"
                        src={embedGoogleMap(address.latitude, address.longitude)} />
                </Card>
            </div>
        )}

        <Photos event={event} />
    </>
}

export default ContentDetailsEvent