import React, { useContext, useState } from "react";
import "./AlbumTrack.scss";
import { formatDurationTrack } from "../../utils/formatDurationTrack";

import imgHeart from "../../assets/images/Heart.svg";
import imgHeartFill from "../../assets/images/HeartFill.svg";
import imgHeartFillDisabled from "../../assets/images/HeartFillDisabled.svg";

import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";
import imgLoadingTrack from "../../assets/images/LoadingTrack.svg";

import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { Link, useLocation } from "react-router-dom";
import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { DispatchFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import { favouriteTracksContextActions } from "../../constants/FavouriteTracksContextActions";

import * as favouriteTracksService from "../../services/FavouriteTracksService.js";
import classNames from "classnames";

const AlbumTrack = ({
  indexTrack,
  albumItem,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
  isFavouriteTrack,
  album,
}) => {
  const { idTrack, image, titleSong, artistId, artistName, duration } =
    albumItem;

  const [loading, setLoading] = useState(false);

  const { isLoading } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { playlistTracks, currentIndexTrackPlaying } =
    useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const dispatchFavouriteTracks = useContext(DispatchFavouriteTracksContext);

  const imageHeart = loading
    ? imgHeartFillDisabled
    : isFavouriteTrack
    ? imgHeartFill
    : imgHeart;

  const location = useLocation();

  const heartStyle = classNames("album-track__heart", {
    "album-track__heart--disabled": loading,
  });

  const handleClick = () => {
    if (initializePlaylistContext) initializePlaylistContext();

    const playing =
      currentIndexTrackPlaying === indexTrack - 1 &&
      playlistTracks[currentIndexTrackPlaying].idTrack === idTrack
        ? !isPlaying
        : true;

    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackId: idTrack,
        trackName: titleSong,
        trackAuthor: artistName,
        artistId: artistId,
        trackImage: image,
      },
    });

    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: playing },
    });

    dispatchPlaylist({
      type: playlistContextActions.setCurrentIndexTrackPlaying,
      payload: {
        currentIndexTrackPlaying: indexTrack - 1,
      },
    });
  };

  const handleClickFavourite = async () => {
    if (!isFavouriteTrack) {
      setLoading(true);
      try {
        const { data: favouriteTracks } =
          await favouriteTracksService.addTrackToFavourites(idTrack);

        dispatchFavouriteTracks({
          type: favouriteTracksContextActions.setFavouriteTracks,
          payload: favouriteTracks,
        });
      } catch (e) {
        console.error("Error getting data:", e);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const { data: favouriteTracks } =
          await favouriteTracksService.removeTrackFromFavourites(idTrack);

        dispatchFavouriteTracks({
          type: favouriteTracksContextActions.setFavouriteTracks,
          payload: favouriteTracks,
        });
      } catch (e) {
        console.error("Error getting data:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="album-track">
      <span className="album-track__index-track">#{indexTrack}</span>

      <div className="album-track__container">
        <div className="album-track__block-title">
          <button className="album-track__button" onClick={handleClick}>
            <img className="album-track__image" src={image} alt="imgTrack" />
          </button>

          <div className="album-track__title">
            <button className="album-track__button" onClick={handleClick}>
              <span className="album-track__title-song">{titleSong}</span>
            </button>

            <span className="album-track__block-artists">
              <div>
                <Link
                  className="album-track__link-author"
                  to={`/artists/${artistId}`}
                  onClick={() =>
                    sessionStorage.setItem(
                      `scrollPosition_${location.pathname}`,
                      window.pageYOffset
                    )
                  }
                >
                  <span className="album-track__title-author">
                    {artistName}
                  </span>
                </Link>
              </div>
            </span>
          </div>
        </div>

        <div
          className="album-track__block-time-song"
          style={{ marginRight: album === "favourites" ? "50px" : "0px" }}
        >
          <div className={heartStyle}>
            <button
              className="album-track__button-like"
              onClick={handleClickFavourite}
              disabled={loading}
            >
              <img src={imageHeart} alt="heart" />
            </button>
          </div>

          {album !== "favourites" && (
            <p className="album-track__duration-song">
              {formatDurationTrack(duration)}
            </p>
          )}
        </div>

        <button className="album-track__button" onClick={handleClick}>
          {isPlayingSong && (
            <>
              <img
                className="album-track__gif-play-track"
                src={imgLoadingTrack}
                alt="loading"
                style={{ display: isLoading ? "block" : "none" }}
              />

              <img
                className="album-track__gif-play-track"
                src={gifPlayTrack}
                alt="trackplay"
                style={{ display: !isLoading && isPlaying ? "block" : "none" }}
              />

              <img
                className="album-track__img-play-track"
                src={imgPlayTrack}
                alt="trackplay"
                style={{ display: !isLoading && !isPlaying ? "block" : "none" }}
              />

              <div className="album-track__darken-layer" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AlbumTrack;
