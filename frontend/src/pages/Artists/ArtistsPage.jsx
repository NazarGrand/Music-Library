import { useEffect, useState } from "react";
import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";
import ArtistsCatalog from "../../components/ArtistsCatalog/ArtistsCatalog";
import imgArtist from "../../assets/images/Artist.jpg";
import MusicPageHeader from "../../components/MusicPageHeader/MusicPageHeader";
import { useTranslation } from "react-i18next";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: artistsData } = await artistService.getAllArtists();

      const artists = artistsData.map((artist) => ({
        artistName: artist.name,
        image: artist.photoUrl ? artist.photoUrl : imgArtist,
        artistId: artist._id,
      }));

      setArtists(artists);
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
          <MusicPageHeader title={t("titleArtists")} />

          <ArtistsCatalog artistItems={artists} />
        </>
      )}
    </>
  );
};

export default ArtistsPage;
