import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import NoContainerPadding from '/@/components/NoContainerPadding'
import SubtitleLead from '/@/components/SubtitleLead'
import Card from '/@/components/Card'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


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
                <InertiaLink className="text-secondary" href={route('gallery').toString()}>
                    {t("Toutes les images")}
                </InertiaLink>
            </SpanAutoStyled>
        </div>
    </div>
}

const MasonryImageStyled = styled.img`
    border-radius: 10px;
`

const ItemFolio = styled.div`
        position: relative;
        overflow: hidden;
        .item-folio__thumb img {
            vertical-align: bottom;
            transition: all 0.5s ease-in-out;
        }

        .item-folio__thumb a {
            display: block;
        }

        .item-folio__thumb a::before {
            display: block;
            background-color: rgba(0, 0, 0, 0.8);
            content: "";
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: all 0.5s ease-in-out;
            z-index: 1;
        }

        .item-folio__thumb a::after {
            content: "";
            font-size: 2.7rem;
            display: block;
            height: 30px;
            width: 30px;
            line-height: 30px;
            margin-left: -15px;
            margin-top: -15px;
            position: absolute;
            left: 50%;
            top: 50%;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease-in-out;
            transform: scale(0.5);
            z-index: 1;
        }

        .item-folio__text {
            position: absolute;
            left: 0;
            bottom: 1.6rem;
            padding: 0 3.3rem;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 100%, 0);
            transition: all 0.3s ease-in-out;
        }

        .item-folio__title {
            line-height: 1.286;
            color: rgba(255, 255, 255, 0.774);
            text-transform: uppercase;
            letter-spacing: .2rem;
            margin: 0 0 .3rem 0;
        }

        .item-folio__cat {
            color: rgba(255, 255, 255, 0.5);
            line-height: 1.714;
            margin-bottom: 0;
        }


        /* on hover 
        * ----------------------------------------------- */
        &:hover .item-folio__thumb a::before {
            opacity: 1;
            visibility: visible;
        }

        &:hover .item-folio__thumb a::after {
            opacity: 1;
            visibility: visible;
            -webkit-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
        }

        &:hover .item-folio__thumb img {
            transform: scale(1.05);
        }

        &:hover .item-folio__text {
            opacity: 1;
            visibility: visible;
            transform: translate3d(0, 0, 0);
        }
`

const ContentMasonryWrapper = () => {

    const content = images.map((image, i) => (
        <ItemFolio>
            <div className="item-folio__thumb">
                <a href={image} className="thumb-link" title="Palmeira" data-size="1050x700">
                    <MasonryImageStyled
                        key={i}
                        src={image}
                        style={{ width: "100%", display: "block" }}
                    />
                </a>
            </div>

            <div className="item-folio__text">
                <h5 className="item-folio__title">
                    Palmeira
                </h5>
                <p className="item-folio__cat">
                    Web Design
                </p>
            </div>
        </ItemFolio>
    ))

    if (process.env.NODE_ENV === "development") {
        return <Masonry columnsCount={3} gutter="10px">
            {content}
        </Masonry>
    }
    return <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}>
        <Masonry gutter="10px">
            {content}
        </Masonry>
    </ResponsiveMasonry>
}


const FromGallery = () => {
    return <div className="container-fluid">
        <ContainerStyled>
            <div className="container my-4" data-aos="fade-up">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        <Titles />

                        <Card border={false} bodyClass="p-0">
                            <ContentMasonryWrapper />
                        </Card>

                    </div>
                </div>
            </div>
        </ContainerStyled>
    </div>
}




export default FromGallery