import { useEffect, useState } from "react";
import AdminAlbumCatalog from "../../components/AdminAlbumCatalog/AdminAlbumCatalog";
import * as albumService from "../../services/AlbumService";
import Loader from "../../components/Loader/Loader";
import AdminAlbumModal from "../../components/AdminAlbumModal/AdminAlbumModal";
import HeaderAdminPage from "../../components/HeaderAdminPage/HeaderAdminPage";

const AdminAlbumsPage = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const openModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const onCreate = async (album) => {
    try {
      const createdAlbum = await albumService.createAlbum(album);

      if (createdAlbum) {
        setSelectedAlbum(null);
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdate = async (album) => {
    try {
      const updatedAlbum = await albumService.updateAlbum(album._id, album);
      if (updatedAlbum) {
        setSelectedAlbum(null);
        closeModal();
        fetchData();
      }
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onDelete = async (idAlbum) => {
    try {
      await albumService.deleteAlbum(idAlbum);
      setSelectedAlbum(null);
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderAdminPage openModal={openModal} title="Album" />

          <AdminAlbumCatalog
            albumItems={albums}
            openModal={openModal}
            setSelectedAlbum={setSelectedAlbum}
          />

          {isOpenModal && (
            <AdminAlbumModal
              closeModal={closeModal}
              selectedAlbum={selectedAlbum}
              setSelectedAlbum={setSelectedAlbum}
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

export default AdminAlbumsPage;
