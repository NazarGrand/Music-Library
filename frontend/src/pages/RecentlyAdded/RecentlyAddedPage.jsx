import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import AlbumList from "../../components/AlbumList/AlbumList";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum";
import imgTrack from "../../assets/images/Track.jpg";
import imgRecentlyAdded from "../../assets/images/RecentlyAdded.png";

const RecentlyAddedPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albumData, setAlbumData] = useState(null);

  const fetchData = async () => {
    try {
      const tracksData = await trackService.recentlyAdded(10);

      console.log(tracksData.data);

      const recentlyTracks = tracksData.data.map((track) => ({
        titleSong: track.name,
        image: track.previewImage ? track.previewImage : imgTrack,
        duration: track.duration,
        idTrack: track._id,
      }));

      setTracks(recentlyTracks);

      const album = {
        nameAlbum: "Recently added",
        imageAlbum: imgRecentlyAdded,
        artistAlbum: recentlyTracks.map((track) => track.artistName).join(", "),
        countSongs: recentlyTracks.length,
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
          <AlbumList tracks={tracks} />{" "}
        </>
      )}
    </>
  );
};

export default RecentlyAddedPage;
