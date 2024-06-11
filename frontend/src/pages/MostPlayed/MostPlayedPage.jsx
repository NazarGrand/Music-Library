import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import AlbumList from "../../components/AlbumList/AlbumList";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";
import imgTrack from "../../assets/images/Track.jpg";
import imgMostPlayed from "../../assets/images/MostPlayed.png";
import TracksList from "../../components/TracksList/TracksList";

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
        image: track.previewImage ? track.previewImage : imgTrack,
        releaseDate: track.releaseDate,
        duration: track.duration,
        idTrack: track._id,
      }));

      setTracks(mostPlayedTracks);

      const album = {
        nameAlbum: "Most played",
        imageAlbum: imgMostPlayed,
        countSongs: mostPlayedTracks.length,
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
          <TracksList trackItems={tracks} />{" "}
        </>
      )}
    </>
  );
};

export default MostPlayedPage;
