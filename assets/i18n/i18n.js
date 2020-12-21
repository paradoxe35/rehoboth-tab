//@ts-check
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./translation/en.json";


export const i18nReactInit = (locale) => {
    i18n
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            resources: {
                en: {
                    translation: en
                }
            },
            debug: process.env.NODE_ENV === "development",
            lng: locale,
            fallbackLng: locale,
            interpolation: {
                escapeValue: false
            }
        });
}