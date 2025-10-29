import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation JSON files
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

// Initialize i18next
i18n
    .use(LanguageDetector) // Detect user's browser language
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources: {
            en: { translation: en }, // English translations
            es: { translation: es }, // Spanish translations
            fr: { translation: fr }, // French translations
        },
        fallbackLng: "es", // Default language if detection fails
        debug: process.env.NODE_ENV === "development", // Enable debug in development
        interpolation: {
            escapeValue: false, // React already escapes variables
        },
        react: {
            useSuspense: false, // Avoids wrapping components in Suspense
        },
        detection: {
            order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"],
        },
    });

export default i18n;

