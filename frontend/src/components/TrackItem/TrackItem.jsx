import React, { useContext } from "react";
import dayjs from "dayjs";
import "./TrackItem.scss";

import imgHeart from "../../assets/images/Heart.svg";
import imgHeartFill from "../../assets/images/HeartFill.svg";

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
import { DispatchFavouriteTracksContext } from "../../context/FavouriteTracksContext.jsx";
import { favouriteTracksContextActions } from "../../constants/FavouriteTracksContextActions.js";

function formatDate(inputDate) {
  const dateObj = dayjs(inputDate);
  const formattedDate = dateObj.format("MMM D, YYYY");
  return formattedDate;
}

const TrackItem = ({
  indexTrack,
  idTrack,
  image,
  titleSong,
  artists,
  releaseDate,
  label,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
  isFavouriteTrack,
}) => {
  const { isLoading } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { currentIndexTrackPlaying } = useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const location = useLocation();

  const dispatchFavouriteTracks = useContext(DispatchFavouriteTracksContext);

  const imageHeart = isFavouriteTrack ? imgHeartFill : imgHeart;

  const handleClick = () => {
    if (initializePlaylistContext) {
      initializePlaylistContext();
    }

    const playing =
      currentIndexTrackPlaying === indexTrack - 1 ? !isPlaying : true;

    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: playing },
    });

    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackName: titleSong,
        trackAuthor: artists.map((item) => item.name).join(", "),
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

  const handleClickFavourite = () => {
    if (!isFavouriteTrack) {
      dispatchFavouriteTracks({
        type: favouriteTracksContextActions.addFavouriteTrack,
        payload: {
          idTrack,
          image,
          titleSong,
          artists,
        },
      });
    } else {
      dispatchFavouriteTracks({
        type: favouriteTracksContextActions.deleteFavouriteTrack,
        payload: idTrack,
      });
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
              {artists.map((item, index) => (
                <div key={index}>
                  <Link
                    className="track-item__link-author"
                    to={`/artists/${item.artistId}`}
                    onClick={() =>
                      sessionStorage.setItem(
                        `scrollPosition_${location.pathname}`,
                        window.pageYOffset
                      )
                    }
                  >
                    <span className="track-item__title-author">
                      {item.name}
                    </span>
                  </Link>

                  {index !== artists.length - 1 && ",\u00A0"}
                </div>
              ))}
            </span>
          </div>
        </div>

        <p className="track-item__relase-date">{formatDate(releaseDate)}</p>

        <p className="track-item__label">{label}</p>

        <div className="track-item__heart">
          <button
            className="track-item__button-like"
            onClick={handleClickFavourite}
          >
            <img src={imageHeart} alt="heart" />
          </button>
        </div>

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
