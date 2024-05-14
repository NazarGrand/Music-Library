import "./FormInput.scss";

const FormInput = ({
  type,
  name,
  placeholder,
  input,
  handleInput,
  handleToggle,
  icon,
}) => {
  return (
    <div className="form-input">
      <input
        className="form-input__text"
        type={type}
        name={name}
        placeholder={placeholder}
        value={input}
        onChange={handleInput}
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
  );
};

export default FormInput;
