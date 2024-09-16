import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";
import imgTrack from "../../assets/images/Track.jpg";
import imgMostPlayed from "../../assets/images/MostPlayed.png";
import TracksList from "../../components/TracksList/TracksList";
import { t } from "i18next";

const MostPlayedPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albumData, setAlbumData] = useState(null);
  const limit = 10;

  const fetchData = async () => {
    try {
      const tracksData = await trackService.getTopSongs(limit);

      const mostPlayedTracks = tracksData.data.map((track) => ({
        titleSong: track.name,
        image: track.previewImage
          ? track.previewImage
          : track.albumReference?.previewImage
          ? track.albumReference?.previewImage
          : imgTrack,
        artistName: track.artistReference?.name,
        artistId: track.artistReference?._id,
        releaseDate: track.releaseDate,
        label: track.label,
        duration: track.duration,
        idTrack: track._id,
      }));

      setTracks(mostPlayedTracks);

      const durationSong = mostPlayedTracks.map((item) => item.duration);

      const durationSongs = durationSong.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const album = {
        nameAlbum: t("titleMostPlayed"),
        imageAlbum: imgMostPlayed,
        countSongs: mostPlayedTracks.length,
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
            album="most-played"
            albumData={albumData}
            tracks={tracks}
          />

          <TracksList trackItems={tracks} />
        </>
      )}
    </>
  );
};

export default MostPlayedPage;
