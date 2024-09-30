import i18next from "i18next";
import "./HeaderAdminPage.scss";
import { LANGUAGES } from "../../i18n/languages";
import { useState } from "react";

import flagUnitedKingdom from "../../assets/images/FlagUnitedKingdom.png";
import flagUkraine from "../../assets/images/FlagUkraine.png";

const HeaderAdminPage = ({ openModal, title, titleButton }) => {
  const [language, setLanguage] = useState(i18next.language);

  const handleClickAdd = () => {
    openModal();
  };

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <div className="header-page">
      <div className="header-page__main">
        <p className="header-page__title">{title}</p>

        <div className="header-page__flags">
          <button
            className="header-page__button-flag"
            onClick={() => handleLanguageChange(LANGUAGES.EN)}
            disabled={language === LANGUAGES.EN}
          >
            <img
              className="header-page__image-flag"
              src={flagUnitedKingdom}
              alt="united kingdom"
            />
          </button>

          <button
            className="header-page__button-flag"
            onClick={() => handleLanguageChange(LANGUAGES.UK)}
            disabled={language === LANGUAGES.UK}
          >
            <img
              className="header-page__image-flag"
              src={flagUkraine}
              alt="ukraine"
            />
          </button>
        </div>
      </div>

      <button className="header-page__button" onClick={handleClickAdd}>
        {titleButton}
      </button>
    </div>
  );
};

export default HeaderAdminPage;
