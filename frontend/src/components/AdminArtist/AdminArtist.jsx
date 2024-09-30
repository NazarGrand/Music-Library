import "./AdminArtist.scss";
import imgArtist from "../../assets/images/Artist.jpg";

const AdminArtist = ({ artist, openModal, setSelectedArtist }) => {
  const { name, photoUrl } = artist;

  const handleArtistClick = () => {
    setSelectedArtist(artist);
    openModal();
  };

  const image = photoUrl ? photoUrl : imgArtist;

  return (
    <div className="admin-artist">
      <button className="admin-artist__button" onClick={handleArtistClick}>
        <img className="admin-artist__image" src={image} alt="artistimg" />

        <p className="admin-artist__title">{name}</p>
      </button>
    </div>
  );
};

export default AdminArtist;
