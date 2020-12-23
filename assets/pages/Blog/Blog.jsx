import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "/@/layouts/Hero/Hero";


const Blog = () => {
    const { t } = useTranslation()
    
    return <Hero title={t("Blog")}>
        Blog
    </Hero>
}

export default Blog;