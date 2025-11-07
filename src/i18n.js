import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    fallbackLng: "en", //Always fallback to English
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    detection: {
      //Detection order (navigator goes last)
      order: ["localStorage", "htmlTag", "path", "subdomain", "navigator"],
      caches: ["localStorage"],
    },
  });

// Force English only on the very first visit
if (!localStorage.getItem("i18nextLng")) {
  i18n.changeLanguage("en");
}

export default i18n;
