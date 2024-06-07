import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavAlbums.scss";

import imgBackArrow from "../../assets/images/BackArrow.svg";
import iconLogin from "../../assets/images/Artists.svg";

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

      <div className="nav-album__block-nav">
        <nav className="nav-album__nav">
          <ul className="nav-album__list">
            <li className="nav-album__item">
              <Link className="nav__item-link" to="/">
                Share
              </Link>
            </li>

            <li className="nav-album__item">
              <Link
                className="nav__item-link"
                to="https://www.instagram.com/applemusic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </Link>
            </li>

            <li className="nav-album__item">
              <Link className="nav__item-link" to="/">
                Premium
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* <img className="nav-album__icon" src={iconLogin} alt="iconLogin" /> */}
    </div>
  );
};

export default NavAlbums;
