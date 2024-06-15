import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { sidebareTranslations } from "./translation/components/Sidebar";
import { LANGUAGES } from "./languages";
import { headerTranslations } from "./translation/components/Header";
import { sliderTranslations } from "./translation/components/Slider";
import { homePageTranslations } from "./translation/pages/HomePage";
import { tracksListTranslations } from "./translation/components/TracksList";

const resources = {
  [LANGUAGES.EN]: {
    translation: {
      ...sidebareTranslations.en.translation,
      ...headerTranslations.en.translation,
      ...sliderTranslations.en.translation,
      ...homePageTranslations.en.translation,
      ...tracksListTranslations.en.translation,
    },
  },
  [LANGUAGES.UK]: {
    translation: {
      ...sidebareTranslations.uk.translation,
      ...headerTranslations.uk.translation,
      ...sliderTranslations.uk.translation,
      ...homePageTranslations.uk.translation,
      ...tracksListTranslations.uk.translation,
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
