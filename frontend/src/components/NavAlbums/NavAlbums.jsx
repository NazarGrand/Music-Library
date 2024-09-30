import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavAlbums.scss";

import imgBackArrow from "../../assets/images/BackArrow.svg";

import { Link } from "react-router-dom";

const NavAlbums = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="nav-album__navigate">
      <button className="nav-album__button-back" onClick={handleClickBack}>
        <img
          className="nav-album__back-arrow"
          src={imgBackArrow}
          alt="backArrow"
        />
      </button>
    </div>
  );
};

export default NavAlbums;
