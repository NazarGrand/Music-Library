import React, { useContext } from "react";
import "./PopularArtistListTracks.scss";

import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";
import TrackItem from "../TrackItem/TrackItem";

const PopularArtistListTracks = ({ popularTracks }) => {
  const { trackId, isPlaying } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchPlaylistContext);

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
        <span>Popular </span>{" "}
        <span className="popular-tracks__title--pink"> Songs</span>
      </div>

      {popularTracks.length !== 0 ? (
        <>
          <div className="popular-tracks__headlines">
            <span className="popular-tracks__relase-date">Release Date</span>

            <span className="popular-tracks__labels">Label</span>

            <span className="popular-tracks__time">Time</span>
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
        <p className="popular-tracks__subtitle">No music found</p>
      )}
    </div>
  );
};

export default PopularArtistListTracks;
