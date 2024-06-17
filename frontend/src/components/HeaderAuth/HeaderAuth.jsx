import "./HeaderAuth.scss";
import imgMelodies from "../../assets/images/MelodiesLoading.svg";
import classNames from "classnames";

const HeaderAuth = ({ type }) => {
  const headerAuth = classNames("header_auth", {
    header_auth__login: type === "login",
  });

  return (
    <div className={headerAuth}>
      <img className="header_auth__melodies" src={imgMelodies} alt="melodies" />

      <p className="header_auth__logo">Melodies</p>
    </div>
  );
};

export default HeaderAuth;
