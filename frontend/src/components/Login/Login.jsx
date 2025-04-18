import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Login.scss";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import imgLoader from "../../assets/images/Loader.svg";

import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import {
  isFieldEmpty,
  isFieldValid,
  isStateEmpty,
  patternEmail,
} from "../../utils/isFieldsValid";
import { ROUTES } from "../../utils/routes";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const isFormValid = isValidEmail && isValidPassword;

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);

  const { t } = useTranslation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      await auth.login(input.email, input.password);
      navigate(ROUTES.HOME);
    } catch (e) {
      setErrors({
        ...errors,
        password: e.message,
      });
    }

    setIsDisabled(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    const isValidInput = /^[^\sа-яА-ЯґҐєЄіІїЇ]*$/u.test(value);

    if (isValidInput) {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);

  const handleBlur = (name, value, setFocusedState) => {
    setFocusedState(false);

    if (name === "email") {
      const isEmpty = isFieldEmpty(
        name,
        value,
        t("email"),
        setErrors,
        errors,
        t("isRequired")
      );

      if (!isEmpty) {
        const message = t("invalidEmailFormat");
        const isValid = isFieldValid(
          patternEmail,
          name,
          value,
          message,
          setErrors,
          errors
        );

        if (isValid) {
          setErrors({ ...errors, email: "" });
          setIsValidEmail(true);
          return;
        }
        setIsValidEmail(false);
        return;
      }
      setIsValidEmail(false);
      return;
    }

    if (name === "password") {
      const isEmpty = isFieldEmpty(
        name,
        value,
        t("password"),
        setErrors,
        errors,
        t("isRequired")
      );

      if (!isEmpty) {
        setErrors({ ...errors, password: "" });
        setIsValidPassword(true);
        return;
      }
      setIsValidPassword(false);
      return;
    }
  };

  const isFieldsEmpty = () => {
    const newErrors = {};
    isStateEmpty(input.email, "email", t("email"), newErrors, t("isRequired"));

    isStateEmpty(
      input.password,
      "password",
      t("password"),
      newErrors,
      t("isRequired")
    );

    if (Object.keys(newErrors).length !== 0) {
      setErrors({
        ...errors,
        ...newErrors,
      });
    }
  };

  const errorClassesEmail = classNames("login__error", {
    "login__error--visible": !focusedEmail,
  });

  const errorClassesPassword = classNames("login__error", {
    "login__error--visible": !focusedPassword,
  });

  const submitClick = (e) => {
    if (!isFormValid) {
      e.preventDefault();
      isFieldsEmpty();
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);

  const handleToggle = (e) => {
    e.preventDefault();

    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleFormSubmit}>
        <p className="login__title">{t("titleLogin")}</p>

        <div className="login__block-input">
          <div className="login__area-input">
            <div className="login__form-input">
              <input
                className="login__text"
                type="email"
                name="email"
                placeholder={t("email")}
                value={input.email}
                onChange={handleInput}
                onBlur={() => handleBlur("email", input.email, setFocusedEmail)}
                onFocus={() => setFocusedEmail(true)}
                required={true}
              />
            </div>
            <span className={errorClassesEmail}>{errors.email}</span>
          </div>

          <div className="login__area-input">
            <div className="login__form-input">
              <input
                className="login__text"
                type={type}
                name="password"
                placeholder={t("password")}
                value={input.password}
                onChange={handleInput}
                onBlur={() =>
                  handleBlur("password", input.password, setFocusedPassword)
                }
                onFocus={() => setFocusedPassword(true)}
                required={true}
              />

              <button
                className="login__button-eye"
                type="button"
                onClick={handleToggle}
              >
                <img className="login__img-eye" src={icon} alt="eye" />
              </button>
            </div>
            <span className={errorClassesPassword}>{errors.password}</span>
          </div>
        </div>

        <div className="login__area-submit">
          <button
            type="submit"
            className="login__submit"
            onClick={submitClick}
            disabled={isDisabled}
          >
            {!isDisabled && t("login")}
            <img
              className="login__image-loading"
              src={imgLoader}
              alt="loader"
              style={{ display: isDisabled ? "block" : "none" }}
            />
          </button>
        </div>
      </form>

      <div className="login__sign-up">
        <div className="login__sign-up-block">
          <p className="login__sign-up-title">{t("dontHaveAnAccount")}</p>

          <p className="login__sign-up-subtitle">{t("signUpHere")}</p>
        </div>

        <Link className="login__sign-up-link" to={ROUTES.REGISTRATION}>
          {t("signUp")}
        </Link>
      </div>
    </div>
  );
};

export default Login;
