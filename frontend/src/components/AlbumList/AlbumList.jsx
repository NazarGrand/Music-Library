import React, { useContext, useState } from "react";
import "./AlbumList.scss";
import imgPlus from "../../assets/images/Plus.svg";
import AlbumTrack from "../AlbumTrack/AlbumTrack";
import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";
import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import {
  DispatchFavouriteTracksContext,
  StateFavouriteTracksContext,
} from "../../context/FavouriteTracksContext";
import { t } from "i18next";

const AlbumList = ({ tracks, album }) => {
  const { trackId, isPlaying } = useContext(StateTrackContext);
  const [numberTracks, setNumberTracks] = useState(20);
  const tracksPerPage = 20;

  const { isLoading } = useContext(StateTrackContext);
  const dispatchTrack = useContext(DispatchTrackContext);

  const { playlistTracks, currentIndexTrackPlaying } =
    useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const dispatchFavouriteTracks = useContext(DispatchFavouriteTracksContext);

  const initializePlaylistContext = () => {
    dispatchPlaylist({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: tracks },
    });
  };

  const handleClick = () => {
    setNumberTracks(numberTracks + tracksPerPage);

    dispatchPlaylist({
      type: playlistContextActions.setNextSongsInPlaylist,
      payload: {
        nextPlaylistTracks: tracks.slice(
          numberTracks,
          numberTracks + tracksPerPage
        ),
      },
    });
  };

  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  return (
    <>
      <div className="album-list">
        {tracks.length !== 0 ? (
          <>
            {album !== "favourites" && (
              <div className="album-list__time">
                <span className="album-list__title-time">{t("time")}</span>
              </div>
            )}
            <ul className="album-list__list">
              {tracks.slice(0, numberTracks).map((item, index) => (
                <li key={index}>
                  <AlbumTrack
                    indexTrack={index + 1}
                    albumItem={item}
                    isPlayingSong={trackId === item.idTrack}
                    isPlaying={isPlaying}
                    isFavouriteTrack={favouriteTracks.find(
                      (elem) => elem === item.idTrack
                    )}
                    initializePlaylistContext={initializePlaylistContext}
                    album={album}
                    isLoading={isLoading}
                    dispatchTrack={dispatchTrack}
                    playlistTracks={playlistTracks}
                    currentIndexTrackPlaying={currentIndexTrackPlaying}
                    dispatchFavouriteTracks={dispatchFavouriteTracks}
                    dispatchPlaylist={dispatchPlaylist}
                  />
                </li>
              ))}
            </ul>
            {numberTracks < tracks.length && (
              <div className="album-list__load-more">
                <button
                  className="album-list__button-load-more"
                  onClick={handleClick}
                >
                  {" "}
                  <img src={imgPlus} alt="plus" />{" "}
                  <span className="album-list__load-more-text">Load More</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="album-list__no-results">No music found</p>
        )}
      </div>
    </>
  );
};

export default AlbumList;
