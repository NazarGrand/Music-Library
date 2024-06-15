import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { sidebareTranslations } from "./translation/components/Sidebar";
import { LANGUAGES } from "./languages";
import { headerTranslations } from "./translation/components/Header";

const resources = {
  [LANGUAGES.EN]: {
    translation: {
      ...sidebareTranslations.en.translation,
      ...headerTranslations.en.translation,
    },
  },
  [LANGUAGES.UK]: {
    translation: {
      ...sidebareTranslations.uk.translation,
      ...headerTranslations.uk.translation,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: [LANGUAGES.UK],

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
