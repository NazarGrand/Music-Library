import React, { useContext, useEffect } from "react";
import AlbumList from "../../components/AlbumList/AlbumList";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";

import imgFavourites from "../../assets/images/FavouriteTracks.jpg";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const FavouriteTracksPage = () => {
  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  const dispatch = useContext(DispatchPlaylistContext);

  const albumData = {
    nameAlbum: "Favourite tracks",
    imageAlbum: imgFavourites,
    artistsAlbum: favouriteTracks
      .flatMap((favorite) =>
        favorite.artists ? favorite.artists.map((artist) => artist.name) : []
      )
      .slice(0, 4)
      .join(", "),
    countSongs: favouriteTracks.length,
  };

  const initializePlaylist = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: {
        playlistTracks: favouriteTracks.slice(0, 20),
      },
    });
  };

  useEffect(() => {
    initializePlaylist();
  }, [favouriteTracks]);

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
