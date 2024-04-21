import React, { useContext } from "react";
import "./PopularArtistListTracks.scss";

import AlbumTrack from "../AlbumTrack/AlbumTrack";
import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";

const PopularArtistListTracks = ({ popularTracks }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);
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
          <div className="popular-tracks__time">
            <span className="popular-tracks__title-time">Time</span>
          </div>

          <ul className="popular-tracks__list">
            {popularTracks.map((item, index) => (
              <li key={index}>
                <AlbumTrack
                  indexTrack={index + 1}
                  idTrack={item.idTrack}
                  image={item.image}
                  titleSong={item.titleSong}
                  artists={item.artists}
                  durationSong={item.duration}
                  isPlayingSong={
                    trackName === item.titleSong &&
                    trackAuthor ===
                      item.artists.map((item) => item.name).join(", ")
                  }
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
