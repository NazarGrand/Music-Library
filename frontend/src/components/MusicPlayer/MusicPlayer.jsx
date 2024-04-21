import React, { useContext, useEffect, useRef, useState } from "react";
import "./MusicPlayer.scss";

import * as trackService from "../../services/TrackService";
import { musicContextActions } from "../../constants/MusicContextActions";

import imgLoading from "../../assets/images/LoadingTrack.svg";
import imgPrevSong from "../../assets/images/PreviousSong.svg";
import imgPlay from "../../assets/images/PlayMusic.svg";
import imgPause from "../../assets/images/Pause.svg";
import imgNextSong from "../../assets/images/NextSong.svg";

import imgVolumeOn from "../../assets/images/Volume.svg";
import imgVolumeOff from "../../assets/images/VolumeOff.svg";

import imgRepeat from "../../assets/images/Repeat.svg";
import imgRepeatOnce from "../../assets/images/Repeat-once.svg";

import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";
import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const MusicPlayer = () => {
  const {
    trackName,
    trackAuthor,
    trackUrl,
    trackImage,
    trackVolume,
    trackPrevVolume,
    isPlaying,
    isLoading,
  } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { playlistTracks, currentIndexTrackPlaying } =
    useContext(StatePlaylistContext);
  const dispatchPlayList = useContext(DispatchPlaylistContext);

  const [progressSong, setProgressSong] = useState({ progress: 0 });

  const [isMoving, setIsMoving] = useState(false);

  const [isEndingSong, setIsEndingSong] = useState(false);

  const [isInfinite, setIsInfinite] = useState(false);

  const [isVolume, setIsVolume] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const audioElem = useRef(null);
  const clickMusicTrack = useRef();
  const clickVolume = useRef();

  const [currentTime, setCurrentTime] = useState(null);

  const [durationSong, setDurationSong] = useState(null);

  const [loadingUrlTrack, setLoadingUrlTrack] = useState(true);

  const fetchData = async () => {
    dispatch({
      type: musicContextActions.setIsLoading,
      payload: { isLoading: true },
    });

    try {
      if (!playlistTracks[currentIndexTrackPlaying].trackPlayingUrl) {
        setLoadingUrlTrack(true);

        const track = await trackService.getTrackUrl(trackName, trackAuthor);

        const trackUrl = track !== null ? track.url : null;

        const action = {
          type: musicContextActions.setTrackUrl,
          payload: {
            trackUrl: trackUrl,
          },
        };
        dispatch(action);

        dispatchPlayList({
          type: playlistContextActions.setTrackPlayingUrl,
          payload: {
            trackPlayingUrl: trackUrl,
          },
        });
      } else {
        const action = {
          type: musicContextActions.setTrackUrl,
          payload: {
            trackUrl: playlistTracks[currentIndexTrackPlaying].trackPlayingUrl,
          },
        };
        dispatch(action);
      }

      setCurrentTime(null);
      setDurationSong(null);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoadingUrlTrack(false);
    }
  };

  useEffect(() => {
    if (trackName !== null) fetchData();
  }, [trackName]);

  useEffect(() => {
    if (isPlaying) {
      if (isEndingSong && isInfinite) {
        setIsEndingSong(false);
        setProgressSong({ ...progressSong, progress: 0 });
        audioElem.current.currentTime = 0;
        audioElem.current.play();
      }
      if (currentTime && audioElem.current) audioElem.current.play();
    } else {
      if (currentTime && audioElem.current) audioElem.current.pause();
    }
  }, [isPlaying, isEndingSong, isInfinite, currentTime]);

  useEffect(() => {
    if (!isLoading) {
      if (isVolume) {
        audioElem.current.volume = trackVolume / 100;
      } else {
        audioElem.current.volume = 0;
      }
    }
  }, [trackVolume, isVolume, isLoading]);

  const PlayPause = () => {
    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: !isPlaying },
    });

    const newIsPlaying = !isPlaying;
    if (!isLoading) {
      if (newIsPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }

    if (isEndingSong) {
      setIsEndingSong(false);
      setProgressSong({ ...progressSong, progress: 0 });
      if (audioElem.current) {
        audioElem.current.currentTime = 0;
      }
    }
  };

  const handleLoadedData = () => {
    dispatch({
      type: musicContextActions.setIsLoading,
      payload: { isLoading: false },
    });

    if (audioElem.current && isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.play();
      audioElem.current.pause();
    }
  };

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;

    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    setCurrentTime({ minutes, seconds: remainingSeconds });

    const minutesSong = Math.floor(duration / 60);
    const remainingSecondsSong = Math.floor(duration % 60);
    setDurationSong({ minutes: minutesSong, seconds: remainingSecondsSong });
    if (!isMoving) {
      setProgressSong({
        progress: (currentTime / duration) * 100,
        length: duration,
      });
    }

    if (currentTime === duration) {
      const newIsEndingSong = !isEndingSong;

      setIsEndingSong(newIsEndingSong);

      if (newIsEndingSong && !isInfinite) {
        handleClickNextTrack();
      }
    }
  };

  const DisableUserSelect = () => {
    document.body.style.userSelect = "none";
  };

  const EnableUserSelect = () => {
    document.body.style.userSelect = "initial";
  };

  const mouseDownTrack = (e) => {
    document.addEventListener("mousemove", mouseMoveTrack);
    document.addEventListener("mouseup", mouseUpTrack);
    DisableUserSelect();
  };

  const mouseUpTrack = (e) => {
    document.removeEventListener("mousemove", mouseMoveTrack);
    document.removeEventListener("mouseup", mouseUpTrack);

    clickAudio(e);

    EnableUserSelect();
  };

  const clickAudio = (e) => {
    setIsMoving(false);
    const rect = clickMusicTrack.current.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;
    const width = rect.width;

    const divprogress = (offsetX / width) * 100;
    const prog = divprogress > 100 ? 100 : divprogress < 0 ? 0 : divprogress;
    setProgressSong({ ...progressSong, progress: prog });
    audioElem.current.currentTime = (prog / 100) * progressSong.length;

    if (prog === 100) setIsEndingSong(true);
    else setIsEndingSong(false);
  };

  const mouseMoveTrack = (e) => {
    if (e.buttons === 1) {
      setIsMoving(true);
      const rect = clickMusicTrack.current.getBoundingClientRect();
      const offsetX = e.pageX - rect.left;
      const width = rect.width;

      const divprogress = (offsetX / width) * 100;
      const prog = divprogress > 100 ? 100 : divprogress < 0 ? 0 : divprogress;
      setProgressSong({ ...progressSong, progress: prog });
    }
  };

  const handleClickVolume = () => {
    const newIsVolume = !isVolume;
    if (!newIsVolume && trackVolume !== 0) {
      dispatch({
        type: musicContextActions.setVolume,
        payload: { trackPrevVolume: trackVolume, trackVolume: 0 },
      });
    } else {
      dispatch({
        type: musicContextActions.setNewVolume,
        payload: { trackVolume: trackPrevVolume },
      });
    }
    setIsVolume(newIsVolume);
  };

  const clickVolumeTrack = (e) => {
    const rect = clickVolume.current.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;
    const width = rect.width;
    let progress = (offsetX / width) * 100;

    if (progress < 0) {
      progress = 0;
    } else if (progress > 100) {
      progress = 100;
    }
    const newVolume = progress > 100 ? 100 : progress < 0 ? 0 : progress;

    if (newVolume === 0) {
      setIsVolume(false);
    } else {
      setIsVolume(true);
    }

    dispatch({
      type: musicContextActions.setNewVolume,
      payload: {
        trackVolume: newVolume,
      },
    });
  };

  const mouseDownVolume = (e) => {
    document.addEventListener("mousemove", mouseMoveVolume);
    document.addEventListener("mouseup", mouseUpVolume);
    clickVolumeTrack(e);
    DisableUserSelect();
  };

  const mouseUpVolume = () => {
    document.removeEventListener("mousemove", mouseMoveVolume);
    document.removeEventListener("mouseup", mouseUpVolume);
    EnableUserSelect();
  };

  const mouseMoveVolume = (e) => {
    setIsHovered(true);
    if (e.buttons === 1) {
      clickVolumeTrack(e);
    }
  };

  const handleClickPreviousTrack = () => {
    const newCurrentIndexTrackPlaying = currentIndexTrackPlaying - 1;

    if (newCurrentIndexTrackPlaying < 0) {
      setProgressSong({ ...progressSong, progress: 0 });
      audioElem.current.currentTime = 0;
      audioElem.current.play();
    } else {
      dispatchPlayList({
        type: playlistContextActions.setCurrentIndexTrackPlaying,
        payload: { currentIndexTrackPlaying: newCurrentIndexTrackPlaying },
      });

      dispatch({
        type: musicContextActions.setTrack,
        payload: {
          trackName: playlistTracks[newCurrentIndexTrackPlaying].titleSong,
          trackAuthor: playlistTracks[newCurrentIndexTrackPlaying].artists
            .map((item) => item.name)
            .join(", "),
          trackImage: playlistTracks[newCurrentIndexTrackPlaying].image,
        },
      });
    }
  };

  const handleClickNextTrack = () => {
    const newCurrentIndex = currentIndexTrackPlaying + 1;

    const newCurrentIndexTrackPlaying =
      newCurrentIndex === playlistTracks.length ? 0 : newCurrentIndex;

    if (newCurrentIndexTrackPlaying === 0) {
      dispatch({
        type: musicContextActions.setIsPlaying,
        payload: { isPlaying: false },
      });
    }

    dispatchPlayList({
      type: playlistContextActions.setCurrentIndexTrackPlaying,
      payload: { currentIndexTrackPlaying: newCurrentIndexTrackPlaying },
    });

    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackName: playlistTracks[newCurrentIndexTrackPlaying].titleSong,
        trackAuthor: playlistTracks[newCurrentIndexTrackPlaying].artists
          .map((item) => item.name)
          .join(", "),
        trackImage: playlistTracks[newCurrentIndexTrackPlaying].image,
      },
    });
  };

  return (
    <div className="player">
      <img className="player__image-song" src={trackImage} alt="imgTrack" />

      <div className="player__title">
        <p className="player__title-song">{trackName}</p>

        <p className="player__title-author">{trackAuthor}</p>
      </div>

      <div className="player__buttons-play">
        <button
          className="player__button-prev"
          onClick={handleClickPreviousTrack}
        >
          <img
            className="player__img-prev-next"
            src={imgPrevSong}
            alt="previous"
          />
        </button>

        {isPlaying ? (
          <button
            className="player__button-pause-play"
            onClick={PlayPause}
            disabled={isLoading}
          >
            <img className="player__img-icon" src={imgPause} alt="pause" />
          </button>
        ) : (
          <button
            className="player__button-pause-play"
            onClick={PlayPause}
            disabled={isLoading}
          >
            <img className="player__img-icon" src={imgPlay} alt="pause" />
          </button>
        )}

        <button className="player__button-next" onClick={handleClickNextTrack}>
          <img className="player__img-prev-next" src={imgNextSong} alt="next" />
        </button>
      </div>

      {loadingUrlTrack ? (
        <img className="player__loading-img" src={imgLoading} alt="loading" />
      ) : (
        <>
          <audio
            src={trackUrl}
            ref={audioElem}
            onTimeUpdate={onPlaying}
            onLoadedData={handleLoadedData}
          />

          {isLoading ? (
            <img
              className="player__loading-img"
              src={imgLoading}
              alt="loading"
            />
          ) : (
            <div className="player__track-song">
              {currentTime && (
                <div className="player__current-time">
                  <p className="player__current-time-title">
                    {currentTime.minutes}:
                    {currentTime.seconds < 10
                      ? `0${currentTime.seconds}`
                      : currentTime.seconds}
                  </p>
                </div>
              )}

              {currentTime && (
                <div
                  className="player__block-track"
                  ref={clickMusicTrack}
                  onMouseDown={mouseDownTrack}
                  onMouseMove={mouseMoveTrack}
                  onMouseUp={mouseUpTrack}
                >
                  <div className="player__track">
                    <div
                      className="player__seek-bar"
                      style={{ width: `${progressSong.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {durationSong && !isNaN(durationSong.minutes) && (
                <div className="player__current-time">
                  <p className="player__current-time-title">
                    {durationSong.minutes}:
                    {durationSong.seconds < 10
                      ? `0${durationSong.seconds}`
                      : durationSong.seconds}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!isLoading && currentTime && (
        <>
          <div className="player__block-track-volume">
            {isHovered && (
              <div
                className="player__track-volume"
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className="player__clickarea-volume"
                  ref={clickVolume}
                  onClick={clickVolumeTrack}
                  onMouseDown={mouseDownVolume}
                  onMouseMove={mouseMoveVolume}
                  onMouseUp={mouseUpVolume}
                >
                  <div className="player__track-volume--area">
                    <div
                      className="player__change-volume"
                      style={{ width: `${trackVolume}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <button
              className="player__button-volume"
              onClick={handleClickVolume}
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                className="player__img-volume"
                src={imgVolumeOn}
                alt="volume"
                style={{ display: isVolume ? "block" : "none" }}
              />
              <img
                className="player__img-volume"
                src={imgVolumeOff}
                style={{ display: !isVolume ? "block" : "none" }}
                alt="volume"
              />
            </button>
          </div>
        </>
      )}

      {!isLoading && currentTime && (
        <button
          className="player__button-repeat"
          onClick={() => setIsInfinite(!isInfinite)}
        >
          <img
            className="player__img-icon"
            src={imgRepeat}
            alt="repeat"
            style={{ display: !isInfinite ? "block" : "none" }}
          />

          <img
            className="player__img-icon"
            src={imgRepeatOnce}
            alt="repeat"
            style={{ display: isInfinite ? "block" : "none" }}
          />
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
