import "./Registration.scss";
import imgBackArrow from "../../assets/images/BackArrowBlue.svg";
import { useState } from "react";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
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

  const isValid =
    isValidName && isValidEmail && isValidPassword && isValidConfirmPassword;
  console.log(isValid);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      await auth.registrationUser(input.email, input.password);
      setErrors({
        ...errors,
        confirmPassword: "Registration successful!",
      });
      navigate(ROUTES.LOGIN);
    } catch (e) {
      setErrors({
        ...errors,
        confirmPassword: e.message,
      });
    }
  };

  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);

  const handleBlur = (name, value) => {
    if (name === "name") {
      setFocusedName(false);
    } else if (name === "email") {
      setFocusedEmail(false);
    } else if (name === "password") {
      setFocusedPassword(false);
      setFocusedConfirmPassword(false);
    } else if (name === "confirmPassword") {
      setFocusedConfirmPassword(false);
    }

    if (name === "name") {
      const isEmpty = isFieldEmpty(name, value, "Name", setErrors, errors);

      if (!isEmpty) {
        setErrors({ ...errors, name: "" });
        setIsValidName(true);
        return;
      } else {
        setIsValidName(false);
        return;
      }
    }

    if (name === "email") {
      const isEmpty = isFieldEmpty(name, value, "Email", setErrors, errors);

      if (!isEmpty) {
        const message =
          "Invalid email format. Please enter a valid email address.";
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
        } else {
          setIsValidEmail(false);
          return;
        }
      } else {
        setIsValidEmail(false);
        return;
      }
    }

    if (name === "password") {
      const isEmpty = isFieldEmpty(name, value, "Password", setErrors, errors);

      if (!isEmpty) {
        const message = "Password: 6+ characters, 1 digit required.";
        const isValid = isFieldValid(
          patternPassword,
          name,
          value,
          message,
          setErrors,
          errors
        );

        if (isValid) {
          console.log("valid password");
          const newErrors = {};
          newErrors.password = "";
          setIsValidPassword(true);

          if (input.confirmPassword !== "" && input.confirmPassword !== value) {
            newErrors.confirmPassword =
              "The confirm password doesn't match the password entered.";
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
        } else {
          setIsValidPassword(false);
          return;
        }
      } else {
        setIsValidPassword(false);
        return;
      }
    }

    if (name === "confirmPassword") {
      if (input.password !== value) {
        setErrors({
          ...errors,
          confirmPassword:
            "The confirm password doesn't match the password entered.",
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
    isStateEmpty(input.name, "name", newErrors, setErrors, errors);

    isStateEmpty(input.email, "email", newErrors, setErrors, errors);

    isStateEmpty(input.password, "password", newErrors, setErrors, errors);

    if (input.password === "") {
      isStateEmpty(
        input.confirmPassword,
        "confirmPassword",
        newErrors,
        setErrors,
        errors
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
    if (!isValid) {
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
          <p className="registration__title">Sign In To Continue</p>

          <div className="registration__block-input">
            <div className="registration__area-input">
              <div className="registration__form-input">
                <input
                  className="registration__text"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={handleInput}
                  onBlur={() => handleBlur("name", input.name)}
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
                  placeholder="E-Mail"
                  value={input.email}
                  onChange={handleInput}
                  onBlur={() => handleBlur("email", input.email)}
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
                  placeholder="Password"
                  value={input.password}
                  onChange={handleInput}
                  onBlur={() => handleBlur("password", input.password)}
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
                  placeholder="Password"
                  value={input.confirmPassword}
                  onChange={handleInput}
                  onBlur={() =>
                    handleBlur("confirmPassword", input.confirmPassword)
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
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
