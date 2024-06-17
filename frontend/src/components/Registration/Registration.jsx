import "./Registration.scss";
import imgBackArrow from "../../assets/images/BackArrowBlue.svg";
import { useState } from "react";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import imgLoader from "../../assets/images/Loader.svg";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classNames from "classnames";
import {
  isFieldEmpty,
  isFieldValid,
  isStateEmpty,
  patternEmail,
  patternPassword,
} from "../../utils/isFieldsValid";
import { ROUTES } from "../../utils/routes";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const isFormValid =
    isValidName && isValidEmail && isValidPassword && isValidConfirmPassword;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { t } = useTranslation();

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

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      await auth.registrationUser(input.name, input.email, input.password);
      navigate(ROUTES.LOGIN, { state: { userRegistered: true } });
    } catch (e) {
      setErrors({
        ...errors,
        confirmPassword: e.message,
      });
    }
    setIsDisabled(false);
  };

  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);

  const handleBlur = (name, value, setFocusedState) => {
    setFocusedState(false);

    if (name === "name") {
      const isEmpty = isFieldEmpty(
        name,
        value,
        t("name"),
        setErrors,
        errors,
        t("isRequired")
      );

      if (!isEmpty) {
        setErrors({ ...errors, name: "" });
        setIsValidName(true);
        return;
      }
      setIsValidName(false);
      return;
    }

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
        const message = t("passwordRequirements");
        const isValid = isFieldValid(
          patternPassword,
          name,
          value,
          message,
          setErrors,
          errors
        );

        if (isValid) {
          const newErrors = {};
          newErrors.password = "";
          setIsValidPassword(true);

          if (input.confirmPassword !== "" && input.confirmPassword !== value) {
            newErrors.confirmPassword = t("passwordMismatch");
            setIsValidConfirmPassword(false);
          }

          if (input.confirmPassword !== "" && input.confirmPassword === value) {
            newErrors.confirmPassword = "";
            setIsValidConfirmPassword(true);
          }

          if (Object.keys(newErrors).length !== 0) {
            setErrors({
              ...errors,
              ...newErrors,
            });
          }
          return;
        }
        setIsValidPassword(false);
        return;
      }
      setIsValidPassword(false);
      return;
    }

    if (name === "confirmPassword") {
      if (input.password !== value) {
        setErrors({
          ...errors,
          confirmPassword: t("passwordMismatch"),
        });
        setIsValidConfirmPassword(false);
        return;
      }

      setErrors({
        ...errors,
        confirmPassword: "",
      });
      setIsValidConfirmPassword(true);
    }
  };

  const isFieldsEmpty = () => {
    const newErrors = {};
    isStateEmpty(input.name, "name", t("name"), newErrors, t("isRequired"));

    isStateEmpty(input.email, "email", t("email"), newErrors, t("isRequired"));

    isStateEmpty(
      input.password,
      "password",
      t("password"),
      newErrors,
      t("isRequired")
    );

    if (input.password === "") {
      isStateEmpty(
        input.confirmPassword,
        "confirmPassword",
        t("confirm"),
        newErrors,
        t("isRequired")
      );
    } else if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword =
        "The confirm password doesn't match the password entered.";
    }

    if (Object.keys(newErrors).length !== 0) {
      setErrors({
        ...errors,
        ...newErrors,
      });
    }
  };

  const errorClassesName = classNames("registration__error", {
    "registration__error--visible": errors.name && !focusedName,
  });

  const errorClassesEmail = classNames("registration__error", {
    "registration__error--visible": errors.email && !focusedEmail,
  });

  const errorClassesPassword = classNames("registration__error", {
    "registration__error--visible": errors.password && !focusedPassword,
  });

  const errorClassesConfirmPassword = classNames("registration__error", {
    "registration__error--visible":
      errors.confirmPassword && !focusedConfirmPassword,
  });

  const submitClick = (e) => {
    if (!isFormValid) {
      e.preventDefault();
      isFieldsEmpty();
    }
  };

  const [typePassword, setTypePassword] = useState("password");
  const [iconPassword, setIconPassword] = useState(eye);

  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [iconConfirmPassword, setIconConfirmPassword] = useState(eye);

  const handleToggle = (e, name) => {
    e.preventDefault();

    if (name === "password") {
      if (typePassword === "password") {
        setIconPassword(eyeOff);
        setTypePassword("text");
      } else {
        setIconPassword(eye);
        setTypePassword("password");
      }
      return;
    }

    if (typeConfirmPassword === "password") {
      setIconConfirmPassword(eyeOff);
      setTypeConfirmPassword("text");
    } else {
      setIconConfirmPassword(eye);
      setTypeConfirmPassword("password");
    }
  };

  return (
    <div className="registration">
      <div className="registration__block">
        <button className="registration__button-back" onClick={handleClickBack}>
          <img
            className="registration__arrow-back"
            src={imgBackArrow}
            alt="back arrow"
          />
        </button>

        <form className="registration__form" onSubmit={handleSubmitEvent}>
          <p className="registration__title">{t("signInToContinue")}</p>

          <div className="registration__block-input">
            <div className="registration__area-input">
              <div className="registration__form-input">
                <input
                  className="registration__text"
                  type="text"
                  name="name"
                  placeholder={t("name")}
                  value={input.name}
                  onChange={handleInput}
                  onBlur={() => handleBlur("name", input.name, setFocusedName)}
                  onFocus={() => setFocusedName(true)}
                  required={true}
                />
              </div>
              <span className={errorClassesName}>{errors.name}</span>
            </div>

            <div className="registration__area-input">
              <div className="registration__form-input">
                <input
                  className="registration__text"
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  value={input.email}
                  onChange={handleInput}
                  onBlur={() =>
                    handleBlur("email", input.email, setFocusedEmail)
                  }
                  onFocus={() => setFocusedEmail(true)}
                  required={true}
                />
              </div>
              <span className={errorClassesEmail}>{errors.email}</span>
            </div>

            <div className="registration__area-input">
              <div className="registration__form-input">
                <input
                  className="registration__text"
                  type={typePassword}
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
                  className="registration__button-eye"
                  type="button"
                  name="password"
                  onClick={(e) => handleToggle(e, "password")}
                >
                  <img
                    className="registration__img-eye"
                    src={iconPassword}
                    alt="eye"
                  />
                </button>
              </div>
              <span className={errorClassesPassword}>{errors.password}</span>
            </div>

            <div className="registration__area-input">
              <div className="registration__form-input">
                <input
                  className="registration__text"
                  type={typeConfirmPassword}
                  name="confirmPassword"
                  placeholder={t("confirmPassword")}
                  value={input.confirmPassword}
                  onChange={handleInput}
                  onBlur={() =>
                    handleBlur(
                      "confirmPassword",
                      input.confirmPassword,
                      setFocusedConfirmPassword
                    )
                  }
                  onFocus={() => setFocusedConfirmPassword(true)}
                  required={true}
                />

                <button
                  className="registration__button-eye"
                  type="button"
                  onClick={handleToggle}
                >
                  <img
                    className="registration__img-eye"
                    src={iconConfirmPassword}
                    alt="eye"
                  />
                </button>
              </div>
              <span className={errorClassesConfirmPassword}>
                {errors.confirmPassword}
              </span>
            </div>
          </div>

          <div className="registration__block-submit">
            <button
              type="submit"
              className="registration__submit"
              onClick={submitClick}
              disabled={isDisabled}
            >
              {!isDisabled && t("createAccount")}
              <img
                className="login__image-loading"
                src={imgLoader}
                alt="loader"
                style={{ display: isDisabled ? "block" : "none" }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
