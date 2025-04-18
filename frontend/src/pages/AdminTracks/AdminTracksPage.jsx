import { useEffect, useState } from "react";
import AdminTracksList from "../../components/AdminTracksList/AdminTracksList";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import * as albumService from "../../services/AlbumService";
import * as artistService from "../../services/ArtistService";
import AdminTrackModal from "../../components/AdminTrackModal/AdminTrackModal";
import HeaderAdminPage from "../../components/HeaderAdminPage/HeaderAdminPage";
import { useTranslation } from "react-i18next";

const AdminTracksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const { t } = useTranslation();
  const openModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const onCreate = async (track) => {
    try {
      await trackService.createTrack(track);

      setSelectedTrack(null);
      closeModal();
      fetchData();
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdate = async (track) => {
    try {
      await trackService.updateTrack(track._id, track);

      setSelectedTrack(null);
      closeModal();
      fetchData();
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onDelete = async (idTrack) => {
    try {
      await trackService.deleteTrack(idTrack);
      setSelectedTrack(null);
      closeModal();
      fetchData();
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const adminTracks = await trackService.getAllTracks();
      setTracks(adminTracks.data);

      const adminAlbums = await albumService.getAllAlbums();
      setAlbums(adminAlbums.data);

      const adminArtists = await artistService.getAllArtists();
      setArtists(adminArtists.data);
    } catch (e) {
      console.error("Error getting data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <HeaderAdminPage
        openModal={openModal}
        title={t("tracks")}
        titleButton={t("addTrack")}
      />

      <AdminTracksList
        trackItems={tracks}
        openModal={openModal}
        setSelectedTrack={setSelectedTrack}
      />

      {isOpenModal && (
        <AdminTrackModal
          closeModal={closeModal}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          albums={albums}
          artists={artists}
        />
      )}
    </>
  );
};

export default AdminTracksPage;
