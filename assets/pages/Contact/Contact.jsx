import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "/@/layouts/Hero/Hero";


const Contact = () => {
    const { t } = useTranslation()

    return <Hero title={t("Contact")}>
        Contact
    </Hero>
}

export default Contact;