import React from "react";
import "./AlbumItem.scss";

import iconAlbum from "../../assets/images/AlbumIcon.svg";
import iconPlaylist from "../../assets/images/PlaylistIcon.svg";
import { Link, useLocation } from "react-router-dom";

const AlbumItem = ({ albumItem, type }) => {
  const { image, title, yearAlbum, albumId } = albumItem;
  const icon = type === "album" ? iconAlbum : iconPlaylist;

  const location = useLocation();

  const path = type === "album" ? `/albums/${albumId}` : "#";

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
          {type === "album" && <p className="album-item__year">{yearAlbum}</p>}

          <img className="album-item__icon" src={icon} alt="icon" />
        </div>
      </Link>
    </div>
  );
};

export default AlbumItem;
