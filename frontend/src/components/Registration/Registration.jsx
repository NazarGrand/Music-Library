import "./Registration.scss";
import imgBackArrow from "../../assets/images/BackArrowBlue.svg";
import FormInput from "../FormInput/FormInput";
import { useState } from "react";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isValueValid } from "../../utils/isValueValid";
import classNames from "classnames";

const Registration = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();
  const [isValid, setIsValid] = useState(false);

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

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      await auth.registrationUser(input.email, input.password);
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

  const handleBlur = (e) => {
    setFocusedName(false);
    setFocusedEmail(false);
    setFocusedPassword(false);
    setFocusedConfirmPassword(false);

    const { name, value } = e.target;

    if (name === "name") {
      if (!value.trim()) {
        setErrors({ ...errors, name: "Name is required!" });
        setIsValid(false);
        return;
      }

      setErrors({
        ...errors,
        name: "",
      });
    }

    if (name === "email") {
      if (!value.trim()) {
        setErrors({ ...errors, email: "Email is required!" });
        setIsValid(false);
        return;
      }

      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (pattern && !isValueValid(pattern, value)) {
        setErrors({
          ...errors,
          email: "Invalid email format. Please enter a valid email address.",
        });
        setIsValid(false);
        return;
      }

      setErrors({
        ...errors,
        email: "",
      });
    }

    if (name === "password") {
      if (!value.trim()) {
        setErrors({ ...errors, password: "Password is required!" });
        setIsValid(false);
        return;
      }

      const pattern = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$/;

      if (pattern && !isValueValid(pattern, value)) {
        setErrors({
          ...errors,
          password: "Password: 6+ characters, 1 digit required.",
        });
        setIsValid(false);
        return;
      }

      setErrors({
        ...errors,
        password: "",
      });
    }

    if (name === "confirmPassword") {
      if (input.password !== value) {
        setErrors({
          ...errors,
          confirmPassword:
            "The confirm password doesn't match the password entered.",
        });
        setIsValid(false);
        return;
      }

      setErrors({
        ...errors,
        confirmPassword: "",
      });
    }

    setIsValid(true);
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
      handleBlur(e);
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

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
