import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Login.scss";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import imgGreater from "../../assets/images/Greater.svg";
import FormInput from "../FormInput/FormInput";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  console.log(input.email);

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(input);

    try {
      if (input.email !== "" && input.password !== "") {
        auth.login(input.email, input.password);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <FormInput
            type="email"
            name="email"
            placeholder="E-Mail"
            input={input.email}
            handleInput={handleInput}
          />

          <FormInput
            type={type}
            name="password"
            placeholder="Password"
            input={input.password}
            handleInput={handleInput}
            handleToggle={handleToggle}
            icon={icon}
          />
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

          <button type="submit" className="login__submit">
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
