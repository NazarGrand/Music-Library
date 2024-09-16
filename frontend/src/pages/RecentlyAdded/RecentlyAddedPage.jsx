import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";
import imgTrack from "../../assets/images/Track.jpg";
import imgRecentlyAdded from "../../assets/images/RecentlyAdded.png";
import TracksList from "../../components/TracksList/TracksList";
import { t } from "i18next";

const RecentlyAddedPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albumData, setAlbumData] = useState(null);
  const limit = 10;

  const fetchData = async () => {
    try {
      const tracksData = await trackService.recentlyAdded(limit);

      console.log(tracksData.data);
      const recentlyTracks = tracksData.data.map((track) => ({
        titleSong: track.name,
        image: track.previewImage
          ? track.previewImage
          : track.albumReference?.previewImage
          ? track.albumReference?.previewImage
          : imgTrack,
        artistName: track.artistReference?.name,
        artistId: track.artistReference?._id,
        duration: track.duration,
        label: track.label,
        releaseDate: track.createdAt,
        idTrack: track._id,
      }));

      setTracks(recentlyTracks);

      const durationSong = recentlyTracks.map((item) => item.duration);

      const durationSongs = durationSong.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const album = {
        nameAlbum: t("titleRecentlyAdded"),
        imageAlbum: imgRecentlyAdded,
        countSongs: recentlyTracks.length,
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
            album="recently-added"
            albumData={albumData}
            tracks={tracks}
          />

          <TracksList trackItems={tracks} type="recently added" />
        </>
      )}
    </>
  );
};

export default RecentlyAddedPage;
