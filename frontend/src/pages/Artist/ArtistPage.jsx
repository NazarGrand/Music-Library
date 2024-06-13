import React, { useEffect, useRef, useState } from "react";
import HeaderArtist from "../../components/HeaderArtist/HeaderArtist";

import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";
import { useLocation, useParams } from "react-router-dom";
import ArtistMusic from "../../components/ArtistMusic/ArtistMusic";
import imgArtist from "../../assets/images/Artist.jpg";
import imgTrack from "../../assets/images/Track.jpg";
import imgAlbum from "../../assets/images/AlbumImage.jpg";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import dayjs from "dayjs";

const ArtistPage = () => {
  const { artistId } = useParams();

  const [artist, setArtist] = useState({});
  const [popularTracks, setPopularTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  const location = useLocation();

  const pageKey = `scrollPosition_${location.pathname}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: artistData } = await artistService.getArtist(artistId);

      const artist = {
        artistId: artistData._id,
        nameArtist: artistData.name,
        imageArtist: artistData.photoUrl ? artistData.photoUrl : imgArtist,
      };

      const singleTracks = await artistService.getPopularSongs(artistId);

      console.log(singleTracks.data);

      const topTracks = singleTracks.data.map((song) => ({
        image: song.previewImage ? song.previewImage : imgTrack,
        titleSong: song.name,
        artistId: artist.artistId,
        artistName: artist.nameArtist,
        duration: song.duration,
        label: song.label,
        releaseDate: song.releaseDate,
        idTrack: song._id,
      }));

      const albumsArtist = artistData.albums.map((album) => ({
        image: album.previewImage ? album.previewImage : imgAlbum,
        albumName: album.name,
        yearAlbum: dayjs(album.releaseDate).year(),
        albumId: album._id,
      }));

      const songsArtist = artistData.singleSongs.map((song) => ({
        image: song.previewImage ? song.previewImage : imgTrack,
        titleSong: song.name,
        artistName: song.artistReference.name,
        yearSong: dayjs(song.releaseDate).year(),
        idTrack: song._id,
      }));

      setArtist(artist);
      setPopularTracks(topTracks);
      setAlbums(albumsArtist);
      setSongs(songsArtist);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    fetchData();
  }, [artistId]);

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
    if (popularTracks.length) {
      const scrollPosition = sessionStorage.getItem(pageKey);
      if (scrollPosition) {
        window.scrollTo({
          top: parseInt(scrollPosition, 10),
        });
        sessionStorage.removeItem(pageKey);
      } else {
        window.scrollTo({
          top: 0,
        });
      }
    }
  }, [popularTracks]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderArtist artist={artist} />

          <ArtistMusic
            popularTracks={popularTracks ?? []}
            albums={albums ?? []}
            songs={songs ?? []}
          />
        </>
      )}
    </>
  );
};

export default ArtistPage;
