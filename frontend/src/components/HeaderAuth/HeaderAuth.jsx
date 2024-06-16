import "./HeaderAuth.scss";
import imgMelodies from "../../assets/images/MelodiesLoading.svg";
import classNames from "classnames";
import { LANGUAGES } from "../../i18n/languages";
import i18next from "i18next";

import flagUnitedKingdom from "../../assets/images/FlagUnitedKingdom.png";
import flagUkraine from "../../assets/images/FlagUkraine.png";
import { useState } from "react";

const HeaderAuth = ({ type }) => {
  const [language, setLanguage] = useState(i18next.language);

  const headerAuth = classNames("header_auth", {
    header_auth__login: type === "login",
  });

  return (
    <div className={headerAuth}>
      <div className="header_auth__block">
        <div className="header_auth__image">
          <img
            className="header_auth__melodies"
            src={imgMelodies}
            alt="melodies"
          />
        </div>

        <div className="header_auth__flags">
          <button
            className="header_auth__button-flag"
            onClick={() => {
              i18next.changeLanguage(LANGUAGES.EN);
              setLanguage(LANGUAGES.EN);
            }}
            disabled={language === LANGUAGES.EN}
          >
            <img
              className="header_auth__image-flag"
              src={flagUnitedKingdom}
              alt="united kingdom"
            />
          </button>

          <button
            className="header_auth__button-flag"
            onClick={() => {
              i18next.changeLanguage(LANGUAGES.UK);
              setLanguage(LANGUAGES.UK);
            }}
            disabled={language === LANGUAGES.UK}
          >
            <img
              className="header_auth__image-flag"
              src={flagUkraine}
              alt="ukraine"
            />
          </button>
        </div>
      </div>

      {type === "login" && <p className="header_auth__logo">Melodies</p>}
    </div>
  );
};

export default HeaderAuth;
