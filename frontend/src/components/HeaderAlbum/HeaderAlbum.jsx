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

function formatDate(inputDate) {
  const dateObj = dayjs(inputDate);
  const formattedDate = dateObj.format("MMM D, YYYY");
  return formattedDate;
}

function formatMilliseconds(milliseconds) {
  const duration = moment.duration(milliseconds);

  let formattedTime = "";
  if (duration.hours() > 0) {
    formattedTime += `${duration.hours()}h `;
  }
  if (duration.minutes() > 0) {
    formattedTime += `${duration.minutes()}m `;
  }
  if (duration.seconds() > 0) {
    formattedTime += `${duration.seconds()}s`;
  }
  return formattedTime;
}

const HeaderAlbum = ({ albumData, tracks, album }) => {
  const dispatch = useContext(DispatchTrackContext);

  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handlePlayAllClick = () => {
    if (tracks.length !== 0) {
      dispatch({
        type: musicContextActions.setTrack,
        payload: {
          trackName: tracks[0].titleSong,
          trackAuthor: tracks[0].artists.map((item) => item.name).join(", "),
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

          <p className="header-album__title-author">{albumData.artistsAlbum}</p>

          <p className="header-album__title-count">
            {album !== "weekly-top" &&
              album !== "trending-songs" &&
              album !== "favourites" && (
                <>
                  {formatDate(albumData.releaseDate)}
                  <img src={imgDot} alt="dot" />{" "}
                </>
              )}
            {albumData.countSongs} songs
            {album !== "weekly-top" &&
              album !== "trending-songs" &&
              album !== "favourites" && (
                <>
                  <img src={imgDot} alt="dot" />
                  {formatMilliseconds(albumData.durationSongs)}
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
