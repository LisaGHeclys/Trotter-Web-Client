import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import En from "./en/en.json";
import Es from "./es/es.json";
import Fr from "./fr/fr.json";

export const resources = {
  en: {
    translation: En
  },
  es: {
    translation: Es
  },
  fr: {
    translation: Fr
  }
};

i18next.use(initReactI18next).init({
  lng: localStorage.getItem("language")
    ? String(localStorage.getItem("language"))
    : "en", // if you're using a language detector, do not define the lng option
  debug: true,
  fallbackLng: "en",
  resources
});
