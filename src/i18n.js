import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

// Read saved language OR default to English
const savedLanguage = localStorage.getItem("i18nextLng") || "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: savedLanguage, // initial language to load
    fallbackLng: "es", // fallback language if something goes wrong
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
