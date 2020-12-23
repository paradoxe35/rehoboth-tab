import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "/@/layouts/Hero/Hero";


const Sermons = () => {
    const { t } = useTranslation()

    return <Hero title={t("Sermons")}>
        Sermons
    </Hero>
}

export default Sermons;