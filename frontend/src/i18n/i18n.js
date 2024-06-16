import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { sidebareTranslations } from "./translation/components/Sidebar";
import { LANGUAGES } from "./languages";
import { headerTranslations } from "./translation/components/Header";
import { sliderTranslations } from "./translation/components/Slider";
import { homePageTranslations } from "./translation/pages/HomePage";
import { tracksListTranslations } from "./translation/components/TracksList";
import { footerTranslations } from "./translation/components/Footer";
import { headerAlbumTranslations } from "./translation/components/HeaderAlbum";
import { favouriteTracksPageTranslations } from "./translation/pages/FavouriteTracksPage";
import { adminTracksPageTranslations } from "./translation/pages/AdminTracksPage";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  [LANGUAGES.EN]: {
    translation: {
      ...sidebareTranslations.en.translation,
      ...headerTranslations.en.translation,
      ...sliderTranslations.en.translation,
      ...homePageTranslations.en.translation,
      ...tracksListTranslations.en.translation,
      ...footerTranslations.en.translation,
      ...headerAlbumTranslations.en.translation,
      ...favouriteTracksPageTranslations.en.translation,
      ...adminTracksPageTranslations.en.translation,
    },
  },
  [LANGUAGES.UK]: {
    translation: {
      ...sidebareTranslations.uk.translation,
      ...headerTranslations.uk.translation,
      ...sliderTranslations.uk.translation,
      ...homePageTranslations.uk.translation,
      ...tracksListTranslations.uk.translation,
      ...footerTranslations.uk.translation,
      ...headerAlbumTranslations.uk.translation,
      ...favouriteTracksPageTranslations.uk.translation,
      ...adminTracksPageTranslations.uk.translation,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    // lng: [LANGUAGES.EN],
    fallbackLng: [LANGUAGES.EN],

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
