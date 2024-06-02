import { useEffect, useState } from "react";
import AdminTracksList from "../../components/AdminTracksList/AdminTracksList";
import Loader from "../../components/Loader/Loader";
import * as trackService from "../../services/TrackService";
import AdminTrackWindow from "../../components/AdminTrackWindow/AdminTrackWindow";
import HeaderAdminTracks from "../../components/HeaderAdminTracks/HeaderAdminTracks";

const AdminTracksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
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

  const onCreating = async (track) => {
    try {
      const createdTrack = await trackService.createTrack(track);

      if (createdTrack) {
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdating = async (track) => {
    try {
      const updatedTrack = await trackService.updateTrack(track._id, track);
      if (updatedTrack) {
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onDeleting = async (idTrack) => {
    try {
      await trackService.deleteTrack(idTrack);
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
      console.log(adminTracks.data);
      setTracks(adminTracks.data);
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
      <HeaderAdminTracks openModal={openModal} />

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
          onCreating={onCreating}
          onUpdating={onUpdating}
          onDeleting={onDeleting}
        />
      )}
    </>
  );
};

export default AdminTracksPage;
