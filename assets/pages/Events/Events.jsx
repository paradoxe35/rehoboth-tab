import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "/@/layouts/Hero/Hero";


const Events = () => {
    const { t } = useTranslation()

    return <Hero title={t("Événements")}>
        Événements
    </Hero>
}

export default Events;