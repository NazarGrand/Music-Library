import React, { useContext } from "react";
import "./TracksList.scss";
import TrackItem from "../TrackItem/TrackItem";

import imgPlus from "../../assets/images/Plus.svg";
import { Link, useLocation } from "react-router-dom";
import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import { ROUTES } from "../../utils/routes";
import { useTranslation } from "react-i18next";

const TracksList = ({ title, trackItems, type }) => {
  const { trackId, isPlaying } = useContext(StateTrackContext);

  const dispatch = useContext(DispatchPlaylistContext);

  const location = useLocation();

  const { t } = useTranslation();

  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  console.log(favouriteTracks);

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: trackItems },
    });
  };

  console.log(trackItems);

  return (
    <div className="tracks">
      <div className="tracks__title">
        <span>{title} </span>{" "}
        <span className="tracks__title--pink">{t("songs")}</span>
      </div>
      {trackItems.length !== 0 ? (
        <>
          <div className="tracks__headlines">
            <span className="tracks__relase-date">{t("releaseDate")}</span>

            <span className="tracks__labels">{t("label")}</span>

            <span className="tracks__time">{t("time")}</span>
          </div>

          <ul className="tracks__list">
            {trackItems.map((item, index) => (
              <li key={index}>
                <TrackItem
                  indexTrack={index + 1}
                  track={item}
                  isPlayingSong={trackId === item.idTrack}
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                  isFavouriteTrack={favouriteTracks.find(
                    (elem) => elem === item.idTrack
                  )}
                />
              </li>
            ))}
          </ul>

          {type === "top-songs" && (
            <div className="tracks__view-all">
              <Link
                className="tracks__link-view"
                to={ROUTES.MOST_PLAYED}
                onClick={() =>
                  sessionStorage.setItem(
                    `scrollPosition_${location.pathname}`,
                    window.pageYOffset
                  )
                }
              >
                <img src={imgPlus} alt="plus" />{" "}
                <span className="tracks__view-all-text">{t("viewAll")}</span>
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="tracks__subtitle">{t("noMusicFound")}</p>
      )}
    </div>
  );
};

export default TracksList;
