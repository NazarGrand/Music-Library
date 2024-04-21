import React from "react";
import "./HeaderArtist.scss";
import NavAlbums from "../NavAlbums/NavAlbums";

const HeaderArtist = ({ artist }) => {
  return (
    <div className="header-artist">
      <NavAlbums />

      <img
        className="header-artist__image"
        src={artist.imageArtist}
        alt="imgArtist"
      />

      <p className="header-artist__name">{artist.nameArtist}</p>
    </div>
  );
};

export default HeaderArtist;
