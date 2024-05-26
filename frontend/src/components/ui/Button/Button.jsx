import React from "react";
import "./Button.scss";
import classnames from "classnames";

const Button = ({ type, buttonTitle, method }) => {
  return (
    <button
      className={classnames("button", {
        "button--login": type === "login",
        "button--sign-up": type === "sign-up",
        "button--logout": type === "logout",
      })}
      onClick={method}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
