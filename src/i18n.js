import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

i18n

.use(LanguageDetector) // Detects the user's current browser language
.use(initReactI18next) // Connects i18next with React
.init({
    resources:{
        en: {translation: en},
        es: {translation: es},
        fr: {translation: fr}
    },
    fallbackLng: "es", // Default language if none is detected
    interpolation: {
        escapeValue: false // React already escapes values, so no need for extra XSS protection
    } 
});

export default i18n;
