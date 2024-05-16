import "./Registration.scss";
import imgBackArrow from "../../assets/images/BackArrowBlue.svg";
import FormInput from "../FormInput/FormInput";
import { useState } from "react";
import eye from "../../assets/images/Eye.svg";
import eyeOff from "../../assets/images/Eye-off.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Registration = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.registrationUser(input.email, input.password);
      console.log(result?.message);
    } catch (e) {
      console.log(e.message);
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
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              input={input.name}
              handleInput={handleInput}
            />

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

            <FormInput
              type={type}
              name="confirmPassword"
              placeholder="Confirm password"
              input={input.confirmPassword}
              handleInput={handleInput}
              handleToggle={handleToggle}
              icon={icon}
            />
          </div>

          <div className="registration__block-submit">
            <button type="submit" className="registration__submit">
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
