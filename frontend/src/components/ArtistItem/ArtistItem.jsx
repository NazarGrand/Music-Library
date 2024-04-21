import React from "react";
import "./ArtistItem.scss";
import { Link, useLocation } from "react-router-dom";

const ArtistItem = ({ artistItem }) => {
  const { image, artistName, artistId } = artistItem;

  const location = useLocation();

  return (
    <div className="artist-item">
      <Link
        className="artist-item__link"
        to={`/artists/${artistId}`}
        onClick={() =>
          sessionStorage.setItem(
            `scrollPosition_${location.pathname}`,
            window.pageYOffset
          )
        }
      >
        <img className="artist-item__image" src={image} alt="Artistimg" />

        <p className="artist-item__title-author">{artistName}</p>
      </Link>
    </div>
  );
};

export default ArtistItem;
