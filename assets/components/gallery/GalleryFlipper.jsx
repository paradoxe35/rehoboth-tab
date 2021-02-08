import React from "react";
import { Flipper, spring } from "react-flip-toolkit";
import LoaderFlipped from "../LoaderFlipped";
import { ContentGallery } from "./Gallery";

export const onFlippedDelayedAppear = (el, index) => {
    spring({
        config: "wobbly",
        values: {
            translateY: [-15, 0],
            opacity: [0, 1]
        },
        // @ts-ignore
        onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
        },
        delay: index * 25,
    })
}

export const onFlippedExit = (el, index, removeElement) => {
    spring({
        config: { overshootClamping: true },
        onUpdate: value => {
            // @ts-ignore
            el.style.opacity = 1 - value;
        },
        delay: index * 50,
        onComplete: removeElement
    })
}


export const FlipperGalleryContent = ({ images = [], children }) => {
    // @ts-ignore
    return <Flipper spring="stiff" flipKey={images}>
        <ContentGallery images={images}>
            {(loader, { index, img }) => (
                loader ? <LoaderFlipped key={index} onDelayedAppear={onFlippedDelayedAppear} onExit={onFlippedExit} setKey={index} /> :
                    children({ img, index })
            )}
        </ContentGallery>
    </Flipper>
}