import React, { useContext } from "react";
import "./PopularArtistListTracks.scss";

import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import TrackItem from "../TrackItem/TrackItem";
import { useTranslation } from "react-i18next";

const PopularArtistListTracks = ({ popularTracks }) => {
  const { trackId, isPlaying } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchPlaylistContext);
  const { t } = useTranslation();

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: popularTracks },
    });
  };

  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  return (
    <div className="popular-tracks">
      <div className="popular-tracks__title">
        <span>{t("popular")} </span>{" "}
        <span className="popular-tracks__title--pink">{t("songs")}</span>
      </div>

      {popularTracks.length !== 0 ? (
        <>
          <div className="popular-tracks__headlines">
            <span className="popular-tracks__relase-date">
              {t("releaseDate")}
            </span>

            <span className="popular-tracks__labels">{t("label")}</span>

            <span className="popular-tracks__time">{t("time")}</span>
          </div>

          <ul className="popular-tracks__list">
            {popularTracks.map((item, index) => (
              <li key={index}>
                <TrackItem
                  indexTrack={index + 1}
                  track={item}
                  isPlayingSong={trackId === item.idTrack}
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                  isFavouriteTrack={favouriteTracks.find(
                    (elem) => elem.idTrack === item.idTrack
                  )}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="popular-tracks__subtitle">{t("noMusicFound")}</p>
      )}
    </div>
  );
};

export default PopularArtistListTracks;
