import React, { useContext } from "react";
import "./HeaderAlbum.scss";
import NavAlbums from "../NavAlbums/NavAlbums";

import imgPlayAll from "../../assets/images/PlayAll.svg";
import imgDot from "../../assets/images/Dot.svg";

import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { Link } from "react-router-dom";
import { formatDurationAlbum } from "../../utils/formatDurationAlbum";
import { formatDate } from "../../utils/formatDateTrack";
import { t } from "i18next";
import { getSongWord } from "../../utils/getSongWord";

const HeaderAlbum = ({ albumData, tracks, album }) => {
  const dispatch = useContext(DispatchTrackContext);

  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handlePlayAllClick = () => {
    if (tracks.length !== 0) {
      dispatchPlaylist({
        type: playlistContextActions.setPlaylist,
        payload: { playlistTracks: tracks },
      });

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

  const artists = tracks.map((track) => ({
    artistId: track.artistId,
    artistName: track.artistName,
  }));
  const seen = {};
  const uniqueArtists = artists.filter((item) => {
    if (item.artistId && !seen[item.artistId]) {
      seen[item.artistId] = true;
      return true;
    }
    return false;
  });

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

          {albumData.artistId ? (
            <Link
              className="header-album__link-author"
              to={`/artists/${albumData.artistId}`}
            >
              <p className="header-album__title-author">
                {albumData.artistAlbum}
              </p>
            </Link>
          ) : (
            <div className="header-album__artists">
              {uniqueArtists
                .map((artist, index) => (
                  <Link
                    key={artist.artistId}
                    className="header-album__link-author"
                    to={`/artists/${artist.artistId}`}
                  >
                    <span className="header-album__title-author">
                      {artist.artistName}
                    </span>

                    {artist.artistId &&
                      index !== uniqueArtists.length - 1 &&
                      ",\u00A0"}
                  </Link>
                ))
                .slice(0, 4)}
            </div>
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
            {getSongWord(albumData.countSongs)}
            <>
              <img src={imgDot} alt="dot" />
              {formatDurationAlbum(albumData.durationSongs)}
            </>
          </p>
        </div>

        <button
          className="header-album__button-play"
          onClick={handlePlayAllClick}
        >
          <p className="header-album__title-play">{t("playAll")}</p>

          <img src={imgPlayAll} alt="playall" />
        </button>
      </div>
    </div>
  );
};

export default HeaderAlbum;
