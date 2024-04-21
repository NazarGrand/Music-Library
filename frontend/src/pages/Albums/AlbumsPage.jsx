import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";
import * as musicService from "../../services/MusicService.js";
import * as albumTracksService from "../../services/AlbumTracksService.js";
import * as albumMetadataService from "../../services/AlbumMetadataService.js";
import Loader from "../../components/Loader/Loader.jsx";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum.jsx";
import AlbumList from "../../components/AlbumList/AlbumList.jsx";

import imgTrendingMusic from "../../assets/images/TrendingMusic.png";
import { DispatchPlaylistContext } from "../../context/PlayListContext.jsx";
import { playlistContextActions } from "../../constants/PlaylistContextActions.js";

const AlbumsPage = () => {
  let { album } = useParams();

  const [songs, setSongs] = useState([]);
  const [albumData, setAlbumData] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useContext(DispatchPlaylistContext);
  const location = useLocation();

  const pageKey = `scrollPosition_${location.pathname}`;

  const fetchData = async () => {
    try {
      setLoading(true);

      if (album === "weekly-top" || album === "trending-songs") {
        const weeklyTopSongs = await musicService.getWeekTopChart();

        const newTopSongs = weeklyTopSongs.map((item) => ({
          image: item.trackMetadata.displayImageUri,
          titleSong: item.trackMetadata.trackName,
          artists: item.trackMetadata.artists.map((artist) => ({
            name: artist.name,
            artistId: artist.spotifyUri.split(":")[2],
          })),
          releaseDate: item.trackMetadata.releaseDate,
          label: item.trackMetadata.labels[0].name,
          idTrack: item.trackMetadata.trackUri.split(":")[2],
        }));

        setSongs(newTopSongs);

        dispatch({
          type: playlistContextActions.setPlaylist,
          payload: {
            playlistTracks: newTopSongs.slice(0, 20),
          },
        });

        const albumInfo = {
          nameAlbum: _.startCase(album),
          imageAlbum: imgTrendingMusic,
          artistsAlbum:
            newTopSongs
              .map((item) => item.artists.map((item) => item.name).join(", "))
              .slice(0, 3)
              .join(", ") + " and ...",
          countSongs: newTopSongs.length,
        };

        setAlbumData(albumInfo);
      } else {
        const albumMetadata = await albumMetadataService.getAlbumMetadata(
          album
        );

        const durationSong = albumMetadata.tracks.items.map(
          (item) => item.track.duration.totalMilliseconds
        );

        const durationSongs = durationSong.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        const albumInfo = {
          nameAlbum: albumMetadata.name,
          imageAlbum: albumMetadata.coverArt.sources[0].url,
          artistsAlbum: albumMetadata.artists.items
            .map((item) => item.profile.name)
            .join(", "),
          countSongs: albumMetadata.tracks.totalCount,
          label: albumMetadata.label,
          releaseDate: albumMetadata.date.isoString,
          durationSongs: durationSongs,
        };

        setAlbumData(albumInfo);

        const albumTracks = await albumTracksService.getTracks(album);

        const albumSongs = albumTracks.map((item) => ({
          image: albumInfo.imageAlbum,
          titleSong: item.track.name,
          artists: item.track.artists.items.map((artist) => ({
            name: artist.profile.name,
            artistId: artist.uri.split(":")[2],
          })),
          releaseDate: albumInfo.releaseDate,
          label: albumInfo.label,
          duration: item.track.duration.totalMilliseconds,
          idTrack: item.track.uri.split(":")[2],
        }));

        setSongs(albumSongs);

        dispatch({
          type: playlistContextActions.setPlaylist,
          payload: {
            playlistTracks: albumSongs.slice(0, 20),
          },
        });
      }
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (loading) {
      intervalRef.current = setInterval(
        () =>
          window.scrollTo({
            top: 0,
          }),
        10
      );
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [loading]);

  useEffect(() => {
    if (songs.length) {
      const scrollPosition = sessionStorage.getItem(pageKey);
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem(pageKey);
      } else {
        window.scrollTo({
          top: 0,
        });
      }
    }
  }, [songs]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <HeaderAlbum
            album={album}
            albumData={albumData}
            tracks={songs ?? []}
          />{" "}
          <AlbumList album={album} tracks={songs ?? []} />
        </>
      )}
    </>
  );
};

export default AlbumsPage;
