import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import EnAboutUS from "./en/AboutUs.json";
import EnDashboard from "./en/Dashboard.json";
import EnLanding from "./en/LandingPage.json";
import EnLogin from "./en/LoginPage.json";
import EnRegister from "./en/RegisterPage.json";
import EnTravel from "./en/TravelPage.json";

import EsAboutUS from "./es/AboutUs.json";
import EsDashboard from "./es/Dashboard.json";
import EsLanding from "./es/LandingPage.json";
import EsLogin from "./es/LoginPage.json";
import EsRegister from "./es/RegisterPage.json";
import EsTravel from "./es/TravelPage.json";

import FrAboutUS from "./fr/AboutUs.json";
import FrDashboard from "./fr/Dashboard.json";
import FrLanding from "./fr/LandingPage.json";
import FrLogin from "./fr/LoginPage.json";
import FrRegister from "./fr/RegisterPage.json";
import FrTravel from "./fr/TravelPage.json";

export const resources = {
  en: {
    EnAboutUS,
    EnDashboard,
    EnLanding,
    EnLogin,
    EnRegister,
    EnTravel
  },
  es: {
    EsAboutUS,
    EsDashboard,
    EsLanding,
    EsLogin,
    EsRegister,
    EsTravel
  },
  fr: {
    FrAboutUS,
    FrDashboard,
    FrLanding,
    FrLogin,
    FrRegister,
    FrTravel
  }
};

i18next.use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources
});
