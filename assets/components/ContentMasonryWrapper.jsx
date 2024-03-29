import React from 'react'
import styled from "styled-components"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImageThumbnail from './ImageThumbnail'


export const MasonryImageStyled = styled.img`
    /* border-radius: 10px; */
    will-change: transform;
`

export const ItemFolio = styled.div`
    position: relative;

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
        display: block;
        width: 100%;
        z-index: 2;
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
        transition: all 0.3s ease-in-out;
        text-align: center;
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
        transform: scale(1);
    }

    &:hover .item-folio__text {
        opacity: 1;
        visibility: visible;
        transform: translate3d(0, 0, 0);
    }
`

export const ItemFolioThumb = ({ children }) => <div className="item-folio__thumb">{children}</div>

export const ItemFolioText = ({ title = undefined, cat = undefined }) => {
    return <div className="item-folio__text">
        <h5 className="item-folio__title">
            {title}
        </h5>
        <p className="item-folio__cat">
            {cat}
        </p>
    </div>
}

export const ContentMasonrySimpleWrapper = ({ children }) => {
    return <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}>
        <Masonry gutter="10px">
            {children}
        </Masonry>
    </ResponsiveMasonry>
}

const ContentMasonryWrapper = ({ images = [], children }) => {
    return <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3, 1200: 4 }}>
        <Masonry gutter="10px">
            {images.map(image => (
                <ItemFolio key={image.id}>
                    <ItemFolioThumb>
                        <a data-no-swup href={image.public_path} target="_blank">
                            <ImageThumbnail image={image} />
                        </a>
                    </ItemFolioThumb>
                    {children(image)}
                </ItemFolio>
            ))}
        </Masonry>
    </ResponsiveMasonry>
}

export default ContentMasonryWrapper