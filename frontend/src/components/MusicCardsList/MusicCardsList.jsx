import React, { useContext } from "react";
import "./MusicCardsList.scss";
import MusicCard from "../MusicCard/MusicCard";
import { StateTrackContext } from "../../context/MusicContext";
import { Link, useLocation } from "react-router-dom";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const MusicCardsList = ({ title, cardItems, type }) => {
  const { trackId, isPlaying } = useContext(StateTrackContext);

  const dispatch = useContext(DispatchPlaylistContext);

  const album = "weekly-top";

  const location = useLocation();

  const path = type === "weekly-top" ? `/albums/${album}` : "#";

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: {
        playlistTracks: cardItems.slice(0, 5),
      },
    });
  };

  return (
    <div className="music-catalog">
      <p className="music-catalog__title">
        {title} <span className="music-catalog__title--pink">Songs</span>
      </p>
      {cardItems.length !== 0 ? (
        <div className="music-catalog__block">
          <ul className="music-catalog__list">
            {cardItems.slice(0, 5).map((item, index) => (
              <li key={index}>
                <MusicCard
                  indexTrack={index}
                  musicCard={item}
                  isPlayingSong={trackId === item.idTrack}
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                  type={type}
                />
              </li>
            ))}
          </ul>
          {cardItems.length > 5 && (
            <Link
              className="music-catalog__view-all"
              to={path}
              onClick={() =>
                sessionStorage.setItem(
                  `scrollPosition_${location.pathname}`,
                  window.pageYOffset
                )
              }
            >
              <div className="music-catalog__button">+</div>

              <p className="music-catalog__btn-text">View All</p>
            </Link>
          )}
        </div>
      ) : (
        <p className="music-catalog__subtitle">No music found</p>
      )}
    </div>
  );
};

export default MusicCardsList;
