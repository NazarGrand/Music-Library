import "./ActivationSuccess.scss";
import image from "../../assets/images/giphy.gif";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const ActivationSuccess = () => {
  const navigate = useNavigate();

  const submitClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="activation-success">
      <div className="activation-success__block">
        <p className="activation-success__logo">Melodies</p>

        <img className="activation-success__image" src={image} alt="animated" />
        <p className="activation-success__text">
          Your account has been successfully activated:{")"}
        </p>

        <button className="activation-success__button" onClick={submitClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default ActivationSuccess;
