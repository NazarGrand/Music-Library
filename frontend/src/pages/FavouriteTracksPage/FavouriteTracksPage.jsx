import React, { useContext, useEffect } from "react";
import AlbumList from "../../components/AlbumList/AlbumList";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";

import imgFavourites from "../../assets/images/FavouriteTracks.jpg";
import TracksList from "../../components/TracksList/TracksList";
import { t } from "i18next";

const FavouriteTracksPage = () => {
  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  const durationSong = favouriteTracks.map((item) => item.duration);

  const durationSongs = durationSong.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const albumData = {
    nameAlbum: t("favouriteTracks"),
    imageAlbum: imgFavourites,
    artistAlbum: favouriteTracks.map((track) => track.artistName).join(", "),
    countSongs: favouriteTracks.length,
    durationSongs,
  };
  return (
    <>
      <HeaderAlbum
        album="favourites"
        albumData={albumData}
        tracks={favouriteTracks}
      />

      <TracksList trackItems={favouriteTracks} />
    </>
  );
};

export default FavouriteTracksPage;
