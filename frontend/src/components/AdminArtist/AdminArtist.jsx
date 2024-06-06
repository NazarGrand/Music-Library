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
    <div className="artist">
      <button className="artist__button" onClick={handleArtistClick}>
        <img className="artist__image" src={image} alt="artistimg" />

        <p className="artist__title">{name}</p>
      </button>
    </div>
  );
};

export default AdminArtist;
