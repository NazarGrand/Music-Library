import React, { useContext, useState } from "react";
import "./AlbumList.scss";
import TrackItem from "../TrackItem/TrackItem";
import imgPlus from "../../assets/images/Plus.svg";
import AlbumTrack from "../AlbumTrack/AlbumTrack";
import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";

const AlbumList = ({ tracks, album }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);
  const [numberTracks, setNumberTracks] = useState(20);
  const tracksPerPage = 20;

  const dispatch = useContext(DispatchPlaylistContext);

  const handleClick = () => {
    setNumberTracks(numberTracks + tracksPerPage);

    dispatch({
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
            {album === "weekly-top" || album === "trending-songs" ? (
              <div className="album-list__headlines">
                <span className="album-list__relase-date">Relase Date</span>

                <span className="album-list__labels">Label</span>
              </div>
            ) : (
              album !== "favourites" && (
                <div className="album-list__time">
                  <span className="album-list__title-time">Time</span>
                </div>
              )
            )}

            {album === "weekly-top" || album === "trending-songs" ? (
              <ul className="album-list__list">
                {tracks.slice(0, numberTracks).map((item, index) => (
                  <li key={index}>
                    <TrackItem
                      indexTrack={index + 1}
                      idTrack={item.idTrack}
                      image={item.image}
                      titleSong={item.titleSong}
                      artists={item.artists}
                      releaseDate={item.releaseDate}
                      label={item.label}
                      isPlayingSong={
                        trackName === item.titleSong &&
                        trackAuthor ===
                          item.artists.map((item) => item.name).join(", ")
                      }
                      isPlaying={isPlaying}
                      isFavouriteTrack={favouriteTracks.find(
                        (elem) => elem.idTrack === item.idTrack
                      )}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="album-list__list">
                {tracks.slice(0, numberTracks).map((item, index) => (
                  <li key={index}>
                    <AlbumTrack
                      indexTrack={index + 1}
                      idTrack={item.idTrack}
                      image={item.image}
                      titleSong={item.titleSong}
                      artistId={item.artistId}
                      artistName={item.artistName}
                      durationSong={item.duration}
                      isPlayingSong={
                        trackName === item.titleSong &&
                        trackAuthor ===
                          item.artists.map((item) => item.name).join(", ")
                      }
                      isPlaying={isPlaying}
                      isFavouriteTrack={favouriteTracks.find(
                        (elem) => elem.idTrack === item.idTrack
                      )}
                      album={album}
                    />
                  </li>
                ))}
              </ul>
            )}

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
