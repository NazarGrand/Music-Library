import "./ActivationError.scss";
import imgError from "../../assets/images/Technics.svg";

const ActivationError = ({ errorMessage }) => {
  const possibleErrors = ["The user is already verified", "Incorrect token"];

  const message = possibleErrors.includes(errorMessage)
    ? errorMessage
    : "Sorry, something went wrong";

  return (
    <div className="activation-error">
      <div className="activation-error__text">
        <h1 className="activation-error__title">OOps!</h1>

        <p className="activation-error__subtitle">{message}!</p>
      </div>

      <img className="activation-error__img-404" src={imgError} alt="error" />
    </div>
  );
};

export default ActivationError;
