import React, { useState, useEffect, useRef } from "react";

import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import Loader from "../../components/Loader/Loader";
import TracksList from "../../components/TracksList/TracksList";
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import Slider from "../../components/Slider/Slider";
import Header from "../../components/Header/Header";
import * as artistService from "../../services/ArtistService";
import * as trackService from "../../services/TrackService";
import imgArtist from "../../assets/images/Artist.jpg";
import imgTrack from "../../assets/images/Track.jpg";

import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const pageKey = `scrollPosition_${location.pathname}`;

  const fetchData = async () => {
    try {
      const getArtistsData = await artistService.getAllArtists();
      const getArtists = getArtistsData.data;

      const artists = getArtists.map((artist) => ({
        artistName: artist.name,
        image: artist.photoUrl ? artist.photoUrl : imgArtist,
        artistId: artist._id,
      }));

      setArtists(artists);

      const limit = 10;
      const tracksData = await trackService.getTopSongs(limit);

      const topTracks = tracksData.data.map((track) => ({
        titleSong: track.name,
        image: track.previewImage ? track.previewImage : imgTrack,
        releaseDate: track.releaseDate,
        duration: track.duration,
        idTrack: track._id,
      }));

      console.log(topTracks);

      setTopSongs(topTracks);
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
    if (topSongs.length) {
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
  }, [topSongs]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />

          <Slider artists={artists} />

          <MusicCardsList
            title="Top"
            cardItems={topSongs ?? []}
            type="top-songs"
          />

          <TracksList
            title="Trending"
            trackItems={topSongs.slice(5, 10) ?? []}
          />

          <ArtistsList title="Popular" artistItems={artists ?? []} />
        </div>
      )}
    </>
  );
};

export default HomePage;
