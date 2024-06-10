import React, { useContext } from "react";
import "./HeaderAlbum.scss";
import NavAlbums from "../NavAlbums/NavAlbums";

import dayjs from "dayjs";
import moment from "moment";

import imgPlayAll from "../../assets/images/PlayAll.svg";
import imgDot from "../../assets/images/Dot.svg";

import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { formatDurationTrack } from "../../utils/formatDurationTrack";
import { Link } from "react-router-dom";

function formatDate(inputDate) {
  const dateObj = dayjs(inputDate);
  const formattedDate = dateObj.format("MMM D, YYYY");
  return formattedDate;
}

const HeaderAlbum = ({ albumData, tracks, album }) => {
  const dispatch = useContext(DispatchTrackContext);

  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handlePlayAllClick = () => {
    if (tracks.length !== 0) {
      dispatch({
        type: musicContextActions.setTrack,
        payload: {
          trackId: tracks[0].idTrack,
          trackName: tracks[0].titleSong,
          trackAuthor: tracks[0].artistName,
          trackImage: tracks[0].image,
        },
      });

      dispatch({
        type: musicContextActions.setIsPlaying,
        payload: { isPlaying: true },
      });

      dispatchPlaylist({
        type: playlistContextActions.setCurrentIndexTrackPlaying,
        payload: {
          currentIndexTrackPlaying: 0,
        },
      });
    }
  };

  return (
    <div className="header-album">
      <NavAlbums />

      <div className="header-album__block">
        <img
          className="header-album__image"
          src={albumData.imageAlbum}
          alt="imageAlbum"
        />

        <div className="header-album__block-title">
          <p className="header-album__title">{albumData.nameAlbum}</p>

          {albumData.artistId && (
            <Link
              className="header-album__link-author"
              to={`/artists/${albumData.artistId}`}
            >
              <p className="header-album__title-author">
                {albumData.artistAlbum}
              </p>
            </Link>
          )}

          <p className="header-album__title-count">
            {album !== "favourites" &&
              album !== "recently-added" &&
              album !== "most-played" && (
                <>
                  {formatDate(albumData.releaseDate)}
                  <img src={imgDot} alt="dot" />{" "}
                </>
              )}
            {albumData.countSongs} songs
            {album !== "favourites" &&
              album !== "recently-added" &&
              album !== "most-played" && (
                <>
                  <img src={imgDot} alt="dot" />
                  {formatDurationTrack(albumData.durationSongs)}
                </>
              )}
          </p>
        </div>

        <button
          className="header-album__button-play"
          onClick={handlePlayAllClick}
        >
          <p className="header-album__title-play">Play All</p>

          <img src={imgPlayAll} alt="playall" />
        </button>
      </div>
    </div>
  );
};

export default HeaderAlbum;
