import React from "react";
import "./Loader.scss";

import imgMelodies from "../../assets/images/MelodiesLoading.svg";
import imgLoader from "../../assets/images/Loader.svg";

const Loader = () => {
  return (
    <div className="loader">
      <img
        className="loader__image-melodies"
        src={imgMelodies}
        alt="melodies"
      />

      <div className="loader__block-load">
        <p className="loader__title">Loading</p>

        <img className="loader__image-loading" src={imgLoader} alt="loading" />
      </div>
    </div>
  );
};
export default Loader;
