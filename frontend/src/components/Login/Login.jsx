import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Login.scss";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import imgGreater from "../../assets/images/Greater.svg";
import { Link } from "react-router-dom";
import { isValueValid } from "../../utils/isValueValid";
import classNames from "classnames";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    try {
      await auth.login(input.email, input.password);
    } catch (e) {
      setErrors({
        ...errors,
        password: e.message,
      });
    }
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

  const handleBlur = (e) => {
    setFocusedEmail(false);
    setFocusedPassword(false);

    const { name, value } = e.target;

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

      setIsValid(true);
    }

    if (name === "password") {
      if (!value.trim()) {
        setErrors({ ...errors, password: "Password is required!" });
        setIsValid(false);
        return;
      }

      setErrors({
        ...errors,
        password: "",
      });

      setIsValid(true);
    }

    if (input.email === "" && input.password === "") {
      setErrors({
        email: "Email is required!",
        password: "Password is required!",
      });
      return;
    }

    if (input.email === "") {
      setErrors({
        ...errors,
        email: "Email is required!",
      });
      return;
    }

    if (input.password === "") {
      setErrors({
        ...errors,
        password: "Password is required!",
      });
      return;
    }
  };

  const errorClassesEmail = classNames("login__error", {
    "login__error--visible": errors.email && !focusedEmail,
  });

  const errorClassesPassword = classNames("login__error", {
    "login__error--visible": errors.password && !focusedPassword,
  });

  const submitClick = (e) => {
    if (!isValid) {
      e.preventDefault();
      handleBlur(e);
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
      <form className="login__form" onSubmit={handleSubmitEvent}>
        <p className="login__title">Login To Continue</p>

        <div className="login__block-input">
          <div className="login__area-input">
            <div className="login__form-input">
              <input
                className="login__text"
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

          <div className="login__area-input">
            <div className="login__form-input">
              <input
                className="login__text"
                type={type}
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleInput}
                onBlur={handleBlur}
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
          <button className="login__forgot-password">
            <p className="login__forgot-password-title">Forgot password</p>

            <img
              className="login__forgot-password-image"
              src={imgGreater}
              alt="greater"
            />
          </button>

          <button type="submit" className="login__submit" onClick={submitClick}>
            Login
          </button>
        </div>
      </form>

      <div className="login__sign-up">
        <div className="login__sign-up-block">
          <p className="login__sign-up-title">Don't Have An Account</p>

          <p className="login__sign-up-subtitle">Sign Up Here</p>
        </div>

        <Link className="login__sign-up-link" to="/registraton">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
