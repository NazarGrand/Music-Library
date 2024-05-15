import { useState } from "react";
import "./FormInput.scss";
import classNames from "classnames";
import { isValueValid } from "../../utils/isValueValid";

const FormInput = ({
  type,
  name,
  placeholder,
  input,
  handleInput,
  handleToggle,
  icon,
  required,
  invalidValidationMessage,
  pattern,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);

  const handleBlur = (e) => {
    setFocused(false);

    console.log(input);

    if (!input.trim()) {
      setErrorMessage(`${name} is required!`);
      return;
    }

    if (pattern && !isValueValid(pattern, input)) {
      setErrorMessage(invalidValidationMessage);
      return;
    }
    setErrorMessage("");
  };

  const errorClasses = classNames("form-input__error", {
    "form-input__error--visible": errorMessage && !focused,
  });

  return (
    <>
      <div className="form-input">
        <input
          className="form-input__text"
          type={type}
          name={name}
          placeholder={placeholder}
          value={input}
          onChange={handleInput}
          onBlur={handleBlur}
          focused={focused.toString()}
          // pattern={pattern}
          onFocus={() => setFocused(true)}
          required={required}
        />

        {(name === "password" || name === "confirmPassword") && (
          <button
            className="form-input__button-eye"
            type="button"
            onClick={handleToggle}
          >
            <img className="form-input__img-eye" src={icon} alt="eye" />
          </button>
        )}
      </div>
      <span className={errorClasses}>{errorMessage}</span>
    </>
  );
};

export default FormInput;
