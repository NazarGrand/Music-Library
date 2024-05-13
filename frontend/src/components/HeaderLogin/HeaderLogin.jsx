import "./HeaderLogin.scss";
import imgMelodies from "../../assets/images/MelodiesLoading.svg";

const HeaderLogin = () => {
  return (
    <div className="header-login">
      <img
        className="header-login__melodies"
        src={imgMelodies}
        alt="melodies"
      />

      <p className="header-login__logo">Melodies</p>
    </div>
  );
};

export default HeaderLogin;
