import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "../translations/en/common.json";
import common_vi from "../translations/vi/common.json";

export const resources = {
  en: {
    common: common_en,
  },
  vi: {
    common: common_vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: "common",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
