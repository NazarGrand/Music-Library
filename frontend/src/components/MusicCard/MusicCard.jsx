import React, { useContext } from "react";
import "./MusicCard.scss";
import { Link } from "react-router-dom";
import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";

import { musicContextActions } from "../../constants/MusicContextActions";

import imgNotes from "../../assets/images/Notes.svg";
import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";
import imgLoadingTrack from "../../assets/images/LoadingTrack.svg";

import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const MusicCard = ({
  indexTrack,
  musicCard,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
  type,
}) => {
  const { idTrack, image, titleSong, artistId, artistName, yearSong } =
    musicCard;

  const { isLoading } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { currentIndexTrackPlaying } = useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handleClickButton = () => {
    initializePlaylistContext();

    const playing = currentIndexTrackPlaying !== indexTrack ? true : !isPlaying;

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
        currentIndexTrackPlaying: indexTrack,
      },
    });
  };

  const handleClickLink = (event) => {
    event.stopPropagation();
  };

  return (
    <button className="music-card__button" onClick={handleClickButton}>
      <div className="music-card">
        <img className="music-card__image" src={image} alt="musicimg" />

        <p className="music-card__title-song">{titleSong}</p>

        <div className="music-card__block">
          {type !== "artist-songs" && (
            <span className="music-card__block-artists">
              <div>
                <Link
                  className="music-card__link-author"
                  to={`/artists/${artistId}`}
                  onClick={handleClickLink}
                >
                  <span className="music-card__title-artist">{artistName}</span>
                </Link>
              </div>
            </span>
          )}

          {yearSong && (
            <span className="music-card__year-song">{yearSong}</span>
          )}

          <img className="music-card__notes" src={imgNotes} alt="notes" />
        </div>

        {isPlayingSong && (
          <>
            <img
              className="music-card__gif-play-track"
              src={imgLoadingTrack}
              alt="loading"
              style={{ display: isLoading ? "block" : "none" }}
            />

            <img
              className="music-card__gif-play-track"
              src={gifPlayTrack}
              alt="trackplay"
              style={{ display: !isLoading && isPlaying ? "block" : "none" }}
            />

            <img
              className="music-card__img-play-track"
              src={imgPlayTrack}
              alt="trackplay"
              style={{ display: !isLoading && !isPlaying ? "block" : "none" }}
            />

            <div className="music-card__darken-layer" />
          </>
        )}
      </div>
    </button>
  );
};

export default MusicCard;
