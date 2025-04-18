import { useEffect, useState } from "react";
import * as albumService from "../../services/AlbumService";
import imgAlbum from "../../assets/images/AlbumImage.jpg";
import Loader from "../../components/Loader/Loader";
import MusicPageHeader from "../../components/MusicPageHeader/MusicPageHeader";
import AllAlbums from "../../components/AllAlbums/AllAlbums";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const getAlbumsData = await albumService.getAllAlbums();
      const getAlbums = getAlbumsData.data;

      const albums = getAlbums.map((album) => ({
        albumName: album.name,
        image: album.previewImage ? album.previewImage : imgAlbum,
        albumId: album._id,
        yearAlbum: dayjs(album.releaseDate).year(),
      }));

      setAlbums(albums);
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
          <MusicPageHeader title={t("titleAlbums")} />

          <AllAlbums albumItems={albums} />
        </>
      )}
    </>
  );
};

export default AlbumsPage;
