import { useEffect, useState } from "react";
import AdminAlbumCatalog from "../../components/AdminAlbumCatalog/AdminAlbumCatalog";
import * as albumService from "../../services/AlbumService";
import Loader from "../../components/Loader/Loader";
import AdminAlbumWindow from "../../components/AdminAlbumWindow/AdminAlbumWindow";
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

  const onCreating = async (album) => {
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

  const onUpdating = async (album) => {
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

  const onDeleting = async (idAlbum) => {
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
            <AdminAlbumWindow
              closeModal={closeModal}
              selectedAlbum={selectedAlbum}
              setSelectedAlbum={setSelectedAlbum}
              onCreating={onCreating}
              onUpdating={onUpdating}
              onDeleting={onDeleting}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminAlbumsPage;
