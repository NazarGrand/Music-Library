import React from "react";
import "./Button.scss";
import classnames from "classnames";

const Button = ({ type, buttonTitle }) => {
  return (
    <button
      className={classnames("button", {
        "button--login": type === "login",
        "button--sign-up": type === "sign-up",
      })}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
