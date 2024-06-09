import React from "react";
import "./AlbumItem.scss";

import iconAlbum from "../../assets/images/AlbumIcon.svg";
import { Link, useLocation } from "react-router-dom";

const AlbumItem = ({ albumItem }) => {
  const { image, title, yearAlbum, albumId } = albumItem;

  const location = useLocation();

  const path = `/albums/${albumId}`;

  return (
    <div className="album-item">
      <Link
        className="album-item__link"
        to={path}
        onClick={() =>
          sessionStorage.setItem(
            `scrollPosition_${location.pathname}`,
            window.pageYOffset
          )
        }
      >
        <img className="album-item__image" src={image} alt="musicimg" />

        <p className="album-item__title">{title}</p>

        <div className="album-item__block">
          <p className="album-item__year">{yearAlbum}</p>

          <img className="album-item__icon" src={iconAlbum} alt="icon" />
        </div>
      </Link>
    </div>
  );
};

export default AlbumItem;
