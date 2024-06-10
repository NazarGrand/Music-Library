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
      const getArtistData = await artistService.getArtist(artistId);
      const getArtist = getArtistData.data;

      const artist = {
        artistId: getArtist._id,
        nameArtist: getArtist.name,
        imageArtist: getArtist.photoUrl ? getArtist.photoUrl : imgArtist,
      };

      const tracks = getArtist.singleSongs.map((song) => ({
        image: song.previewImage ? song.previewImage : imgTrack,
        titleSong: song.name,
        artistId: artist.artistId,
        artistName: artist.nameArtist,
        duration: song.duration,
        releaseDate: song.releaseDate,
        idTrack: song._id,
      }));

      const albumsArtist = getArtist.albums.map((album) => ({
        image: album.previewImage ? album.previewImage : imgAlbum,
        albumName: album.name,
        yearAlbum: new Date(album.releaseDate).getFullYear(),
        albumId: album._id,
      }));

      const songsArtist = getArtist.singleSongs.map((song) => ({
        image: song.previewImage ? song.previewImage : imgTrack,
        titleSong: song.name,
        artistName: song.artistReference.name,
        yearSong: new Date(song.releaseDate).getFullYear(),
        idTrack: song._id,
      }));

      setArtist(artist);
      setPopularTracks(tracks);
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
