import React, { useEffect, useState } from "react";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";
import * as favouriteTracksService from "../../services/FavouriteTracksService";

import imgFavourites from "../../assets/images/FavouriteTracks.jpg";
import imgTrack from "../../assets/images/Track.jpg";
import TracksList from "../../components/TracksList/TracksList";
import { t } from "i18next";
import Loader from "../../components/Loader/Loader";

const FavouriteTracksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albumData, setAlbumData] = useState(null);

  const fetchData = async () => {
    try {
      const tracksData = await favouriteTracksService.getAllFavouriteTracks();

      const favouriteTracks = tracksData.data.map((track) => ({
        titleSong: track.name,
        image: track.previewImage ? track.previewImage : imgTrack,
        artistName: track.artistReference?.name,
        artistId: track.artistReference?._id,
        releaseDate: track.releaseDate,
        label: track.label,
        duration: track.duration,
        idTrack: track._id,
      }));

      setTracks(favouriteTracks);

      const durationSong = favouriteTracks.map((item) => item.duration);

      const durationSongs = durationSong.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const album = {
        nameAlbum: t("favouriteTracks"),
        imageAlbum: imgFavourites,
        countSongs: favouriteTracks.length,
        durationSongs: durationSongs,
      };

      setAlbumData(album);
    } catch (e) {
      console.error("Error getting data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderAlbum
            album="favourites"
            albumData={albumData}
            tracks={tracks}
          />

          <TracksList trackItems={tracks} />
        </>
      )}
    </>
  );
};

export default FavouriteTracksPage;
