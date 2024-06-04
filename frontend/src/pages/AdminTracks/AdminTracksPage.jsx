import { useEffect, useState } from "react";
import AdminTracksList from "../../components/AdminTracksList/AdminTracksList";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import * as albumService from "../../services/AlbumService";
import AdminTrackWindow from "../../components/AdminTrackWindow/AdminTrackWindow";
import HeaderAdminPage from "../../components/HeaderAdminPage/HeaderAdminPage";

const AdminTracksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

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
      const createdTrack = await trackService.createTrack(track);

      if (createdTrack) {
        setSelectedTrack(null);
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdate = async (track) => {
    try {
      const updatedTrack = await trackService.updateTrack(track._id, track);
      if (updatedTrack) {
        setSelectedTrack(null);
        closeModal();
        fetchData();
      }
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
      <HeaderAdminPage openModal={openModal} title="Track" />

      <AdminTracksList
        trackItems={tracks}
        openModal={openModal}
        setSelectedTrack={setSelectedTrack}
      />

      {isOpenModal && (
        <AdminTrackWindow
          closeModal={closeModal}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          albums={albums}
        />
      )}
    </>
  );
};

export default AdminTracksPage;
