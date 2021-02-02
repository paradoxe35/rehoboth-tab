import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import NoContainerPadding from '/@/components/NoContainerPadding'
import SubtitleLead from '/@/components/SubtitleLead'
import Card from '/@/components/Card'
import ContentMasonryWrapper from '/@/components/ContentMasonryWrapper'


const ContainerStyled = styled(NoContainerPadding)`
    background-color: var(--bs-light)dfd;
`

const SpanAutoStyled = styled.span`
    font-size: 12px;
    &:hover {
        color: var(--bs-primary);
        text-decoration: underline;
    }
`

const images = [
    "https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg",
    "http://www.satriathemes.club/blessing/img/gallery/pic%20(1).jpg",
    "http://www.satriathemes.club/blessing/img/gallery/pic%20(2).jpg",
    "http://www.satriathemes.club/blessing/img/gallery/pic%20(3).jpg",
    "http://www.satriathemes.club/blessing/img/gallery/pic%20(4).jpg",
    "http://www.satriathemes.club/blessing/img/gallery/pic%20(5).jpg",
    "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg",
    "https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg",
    "https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg",
    "https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg",
].slice(0, 10);

const Titles = () => {
    const { t } = useTranslation()

    return <div className="row mb-4" data-aos="fade-up">
        <div className="col">
            <h5>
                <SubtitleLead>
                    {t("Galerie")}
                </SubtitleLead>
            </h5>
        </div>
        <div className="col-auto">
            <SpanAutoStyled className="h6 text-center subtitle font-weight-600">
                <InertiaLink className="text-secondary" href={route('guest.gallery').toString()}>
                    {t("Toutes les images")}
                </InertiaLink>
            </SpanAutoStyled>
        </div>
    </div>
}


const FromGallery = () => {
    return <div className="container-fluid mb-4">
        <ContainerStyled>
            <div className="container my-4 overflow-hidden" data-aos="fade-up">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        <Titles />

                        <Card border={false} bodyClass="p-0" className="bg-transparent">
                            <ContentMasonryWrapper images={images}>
                                {img => (
                                    <div className="item-folio__text">
                                        <h5 className="item-folio__title">
                                            Palmeira
                                        </h5>
                                        <p className="item-folio__cat">
                                            Web Design
                                        </p>
                                    </div>
                                )}
                            </ContentMasonryWrapper>
                        </Card>

                    </div>
                </div>
            </div>
        </ContainerStyled>
    </div>
}




export default FromGallery