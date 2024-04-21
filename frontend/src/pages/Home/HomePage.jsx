import React, { useState, useEffect, useRef } from "react";

import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import Loader from "../../components/Loader/Loader";
import * as musicService from "../../services/MusicService";
import TracksList from "../../components/TracksList/TracksList";
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import { ArtistItems } from "../../data/InformationArtists";
import Slider from "../../components/Slider/Slider";
import Header from "../../components/Header/Header";

import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const pageKey = `scrollPosition_${location.pathname}`;

  const fetchData = async () => {
    try {
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

      setTopSongs(newTopSongs);
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

          <Slider />

          <MusicCardsList
            title="Weekly Top"
            cardItems={topSongs ?? []}
            type="weekly-top"
          />

          <TracksList
            title="Trending"
            trackItems={topSongs.slice(5, 12) ?? []}
          />

          <ArtistsList title="Popular" artistItems={ArtistItems ?? []} />
        </div>
      )}
    </>
  );
};

export default HomePage;
