import "./Error.scss";
import imgError from "../../assets/images/Technics.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useTranslation } from "react-i18next";

export default function Error({ errorMessage, type }) {
  const { t } = useTranslation();
  const possibleErrors = [t("userAlreadyVerified"), t("incorrectToken")];

  const message =
    possibleErrors.includes(errorMessage) && type === "email"
      ? errorMessage
      : type === "email"
      ? t("somethingWentWrong")
      : t("pageNotExist");

  const showButton =
    type !== "email"
      ? true
      : type === "email" && message === t("userAlreadyVerified")
      ? true
      : false;

  const route = type === "email" ? ROUTES.LOGIN : ROUTES.HOME;

  return (
    <div className="error-page">
      <div className="error-page__text">
        <h1 className="error-page__title">{t("oops")}!</h1>

        <p className="error-page__subtitle">{message}!</p>

        {showButton && (
          <button className="error-page__button">
            <Link className="error-page__button-link" to={route}>
              {type === "email" ? "Login" : "Back to Home"}
            </Link>
          </button>
        )}
      </div>

      <img className="error-page__img-404" src={imgError} alt="error" />
    </div>
  );
}
