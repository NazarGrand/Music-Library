import "./ActivationSuccess.scss";
import image from "../../assets/images/giphy.gif";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import classNames from "classnames";

const ActivationSuccess = ({
  title,
  message,
  isRegistered,
  setIsRegistered,
}) => {
  const navigate = useNavigate();

  const submitClick = () => {
    if (isRegistered) {
      setIsRegistered(false);
      return;
    }
    navigate(ROUTES.LOGIN);
  };

  const blockClass = classNames("activation-success__block", {
    "activation-success__block--email-valid": !isRegistered,
  });

  return (
    <div className="activation-success">
      <div className={blockClass}>
        <p className="activation-success__logo">Melodies</p>

        <img className="activation-success__image" src={image} alt="animated" />

        <p className="activation-success__title">{title}</p>

        <p className="activation-success__text">
          {message}
          {")"}
        </p>

        <button className="activation-success__button" onClick={submitClick}>
          {isRegistered ? "Ok" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default ActivationSuccess;
