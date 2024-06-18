import { useEffect, useState } from "react";
import AdminAlbumCatalog from "../../components/AdminAlbumCatalog/AdminAlbumCatalog";
import * as albumService from "../../services/AlbumService";
import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";
import AdminAlbumModal from "../../components/AdminAlbumModal/AdminAlbumModal";
import HeaderAdminPage from "../../components/HeaderAdminPage/HeaderAdminPage";
import { useTranslation } from "react-i18next";

const AdminAlbumsPage = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const { t } = useTranslation();
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
      await albumService.createAlbum(album);

      setSelectedAlbum(null);
      closeModal();
      fetchData();
    } catch (e) {
      console.error("Error getting data:", e);
      throw e;
    }
  };

  const onUpdate = async (album) => {
    try {
      await albumService.updateAlbum(album._id, album);

      setSelectedAlbum(null);
      closeModal();
      fetchData();
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
          <HeaderAdminPage
            openModal={openModal}
            title={t("titleAlbums")}
            titleButton={t("addAlbum")}
          />

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
              artists={artists}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminAlbumsPage;
