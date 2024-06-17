import React, { useState } from "react";
import "./Header.scss";
import flagUnitedKingdom from "../../assets/images/FlagUnitedKingdom.png";
import flagUkraine from "../../assets/images/FlagUkraine.png";
import i18next from "i18next";
import { LANGUAGES } from "../../i18n/languages";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [language, setLanguage] = useState(i18next.language);
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <header className="header">
      <p className="header__title">{t("titleHomePage")}</p>

      <div className="header__flags">
        <button
          className="header__button-flag"
          onClick={() => handleLanguageChange(LANGUAGES.EN)}
          disabled={language === LANGUAGES.EN}
        >
          <img
            className="header__image-flag"
            src={flagUnitedKingdom}
            alt="united kingdom"
          />
        </button>

        <button
          className="header__button-flag"
          onClick={() => handleLanguageChange(LANGUAGES.UK)}
          disabled={language === LANGUAGES.UK}
        >
          <img className="header__image-flag" src={flagUkraine} alt="ukraine" />
        </button>
      </div>
    </header>
  );
};

export default Header;
