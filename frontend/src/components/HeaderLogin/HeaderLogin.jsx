import "./HeaderLogin.scss";
import imgMelodies from "../../assets/images/MelodiesLoading.svg";
import classNames from "classnames";

const HeaderLogin = ({ type }) => {
  const headerLogin = classNames("header-login", {
    "header-login__login": type === "login",
  });

  return (
    <div className={headerLogin}>
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
