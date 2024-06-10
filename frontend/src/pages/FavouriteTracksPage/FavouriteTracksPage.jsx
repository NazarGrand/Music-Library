import React, { useContext, useEffect } from "react";
import AlbumList from "../../components/AlbumList/AlbumList";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";

import imgFavourites from "../../assets/images/FavouriteTracks.jpg";

const FavouriteTracksPage = () => {
  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  const albumData = {
    nameAlbum: "Favourite tracks",
    imageAlbum: imgFavourites,
    artistAlbum: favouriteTracks.map((track) => track.artistName).join(", "),
    countSongs: favouriteTracks.length,
  };

  console.log(albumData);

  return (
    <>
      <HeaderAlbum
        album="favourites"
        albumData={albumData}
        tracks={favouriteTracks}
      />
      <AlbumList tracks={favouriteTracks} album="favourites" />
    </>
  );
};

export default FavouriteTracksPage;
