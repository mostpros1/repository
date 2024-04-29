import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./translation.en.json"; // Import your English translation JSON file
import translationNL from "./translation.nl.json"; // Import your Dutch translation JSON file

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN, // Populate the 'en' language with translations from your English JSON file
      },
      nl: {
        translation: translationNL, // Populate the 'nl' language with translations from your Dutch JSON file
      },
    },
    lng: "nl", // Set the default language to Dutch
    fallbackLng: "nl", // Fallback to Dutch if language detection fails
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    backend: {
      loadPath: "/translation.{{lng}}.json", // Update the loadPath to point to translation.json in the root directory
    },
    detection: {
      order: ["path"], // Configure language detection order
      lookupFromPathIndex: 0, // Use the first part of the path as the language
      caches: [], // Disable language detection cache
    },
  } as any);

export default i18n;

