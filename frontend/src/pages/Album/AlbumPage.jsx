import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as albumService from "../../services/AlbumService.js";
import Loader from "../../components/Loader/Loader.jsx";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum.jsx";
import AlbumList from "../../components/AlbumList/AlbumList.jsx";

import imgAlbum from "../../assets/images/AlbumImage.jpg";

const AlbumPage = () => {
  let { albumId } = useParams();

  const [songs, setSongs] = useState([]);
  const [albumData, setAlbumData] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const pageKey = `scrollPosition_${location.pathname}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const albumMetadata = await albumService.getAlbum(albumId);

      const albumData = albumMetadata.data;

      const durationSong = albumData.tracksReferences.map(
        (item) => item.duration
      );

      const durationSongs = durationSong.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const albumInfo = {
        nameAlbum: albumData.name,
        imageAlbum: albumData.previewImage ? albumData.previewImage : imgAlbum,
        artistAlbum: albumData.artistReference?.name,
        artistId: albumData.artistReference?._id,
        countSongs: albumData.tracksReferences.length,
        label: albumData.label,
        releaseDate: albumData.releaseDate,
        durationSongs: durationSongs,
      };

      setAlbumData(albumInfo);

      const albumTracks = albumData.tracksReferences;

      const albumSongs = albumTracks.map((item) => ({
        image: albumInfo.imageAlbum,
        titleSong: item.name,
        artistId: albumInfo.artistId,
        artistName: albumInfo.artistAlbum,
        releaseDate: albumInfo.releaseDate,
        label: albumInfo.label,
        duration: item.duration,
        idTrack: item._id,
      }));

      setSongs(albumSongs);
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
          <HeaderAlbum albumData={albumData} tracks={songs ?? []} />

          <AlbumList album={albumId} tracks={songs ?? []} />
        </>
      )}
    </>
  );
};

export default AlbumPage;
