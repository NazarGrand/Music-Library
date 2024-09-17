import React, { useState } from "react";
import "./TrackItem.scss";

import imgHeart from "../../assets/images/Heart.svg";
import imgHeartFill from "../../assets/images/HeartFill.svg";
import imgHeartFillDisabled from "../../assets/images/HeartFillDisabled.svg";

import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";
import imgLoadingTrack from "../../assets/images/LoadingTrack.svg";

import { musicContextActions } from "../../constants/MusicContextActions";
import { Link, useLocation } from "react-router-dom";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { favouriteTracksContextActions } from "../../constants/FavouriteTracksContextActions.js";
import { formatDurationTrack } from "../../utils/formatDurationTrack.js";
import { formatDate } from "../../utils/formatDateTrack.js";

import * as favouriteTracksService from "../../services/FavouriteTracksService.js";

const TrackItem = ({
  indexTrack,
  track,
  playingTrackId,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
  isFavouriteTrack,
  dispatchTrack,
  dispatchPlaylist,
  dispatchFavouriteTracks,
  isLoading,
}) => {
  const {
    idTrack,
    image,
    titleSong,
    artistId,
    artistName,
    releaseDate,
    label,
    duration,
  } = track;

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const imageHeart = loading
    ? imgHeartFillDisabled
    : isFavouriteTrack
    ? imgHeartFill
    : imgHeart;

  const handleClick = () => {
    if (initializePlaylistContext) {
      initializePlaylistContext();
    }

    const playing = playingTrackId !== idTrack ? true : !isPlaying;

    dispatchTrack({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: playing },
    });

    dispatchTrack({
      type: musicContextActions.setTrack,
      payload: {
        trackId: idTrack,
        trackName: titleSong,
        trackAuthor: artistName,
        artistId: artistId,
        trackImage: image,
      },
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
    <div className="track-item">
      <span className="track-item__index-track">#{indexTrack}</span>

      <div className="track-item__container">
        <div className="track-item__block-title">
          <button className="track-item__button" onClick={handleClick}>
            <img className="track-item__image" src={image} alt="imgTrack" />
          </button>

          <div className="track-item__title">
            <button className="track-item__button" onClick={handleClick}>
              <span className="track-item__title-song">{titleSong}</span>
            </button>

            <span className="track-item__block-artists">
              <div>
                <Link
                  className="track-item__link-author"
                  to={`/artists/${artistId}`}
                  onClick={() =>
                    sessionStorage.setItem(
                      `scrollPosition_${location.pathname}`,
                      window.pageYOffset
                    )
                  }
                >
                  <span className="track-item__title-author">{artistName}</span>
                </Link>
              </div>
            </span>
          </div>
        </div>

        <p className="track-item__relase-date">{formatDate(releaseDate)}</p>

        <p className="track-item__label">{label}</p>

        <div className="track-item__heart">
          <button
            className="track-item__button-like"
            onClick={handleClickFavourite}
            disabled={loading}
          >
            <img src={imageHeart} alt="heart" />
          </button>
        </div>

        <p className="track-item__duration-song">
          {formatDurationTrack(duration)}
        </p>

        <button className="track-item__button" onClick={handleClick}>
          {isPlayingSong && (
            <>
              <img
                className="track-item__gif-play-track"
                src={imgLoadingTrack}
                alt="trackplay"
                style={{ display: isLoading ? "block" : "none" }}
              />

              <img
                className="track-item__gif-play-track"
                src={gifPlayTrack}
                alt="trackplay"
                style={{ display: !isLoading && isPlaying ? "block" : "none" }}
              />

              <img
                className="track-item__img-play-track"
                src={imgPlayTrack}
                alt="trackplay"
                style={{ display: !isLoading && !isPlaying ? "block" : "none" }}
              />

              <div className="track-item__darken-layer" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrackItem;
