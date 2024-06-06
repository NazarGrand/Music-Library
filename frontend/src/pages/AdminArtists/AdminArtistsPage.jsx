import { useEffect, useState } from "react";
import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";
import HeaderAdminPage from "../../components/HeaderAdminPage/HeaderAdminPage";
import AdminArtistCatalog from "../../components/AdminArtistCatalog/AdminArtistCatalog";
import AdminArtistModal from "../../components/AdminArtistModal/AdminArtistModal";

const AdminArtistsPage = () => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const openModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const onCreate = async (artist) => {
    try {
      const createdArtist = await artistService.createArtist(artist);

      if (createdArtist) {
        setSelectedArtist(null);
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdate = async (artist) => {
    try {
      const updatedArtist = await artistService.updateArtist(
        artist._id,
        artist
      );
      if (updatedArtist) {
        setSelectedArtist(null);
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onDelete = async (idArtist) => {
    try {
      await artistService.deleteArtist(idArtist);
      setSelectedArtist(null);
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderAdminPage openModal={openModal} title="Album" />

          <AdminArtistCatalog
            artistItems={artists}
            openModal={openModal}
            setSelectedArtist={setSelectedArtist}
          />

          {isOpenModal && (
            <AdminArtistModal
              closeModal={closeModal}
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminArtistsPage;
