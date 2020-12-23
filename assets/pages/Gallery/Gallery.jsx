import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "/@/layouts/Hero/Hero";

const Gallery = () => {
    const { t } = useTranslation()

    return <Hero title={t("Galerie")}>
        Gallery
    </Hero>
}

export default Gallery;