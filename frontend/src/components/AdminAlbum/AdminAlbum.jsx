import iconAlbum from "../../assets/images/AlbumIcon.svg";
import "./AdminAlbum.scss";

const AdminAlbum = ({ album, openModal, setSelectedAlbum }) => {
  const { name, previewImage, releaseDate } = album;
  const date = new Date(releaseDate);

  const handleAlbumClick = () => {
    setSelectedAlbum(album);
    openModal();
  };

  return (
    <div className="album">
      <button className="album__button" onClick={handleAlbumClick}>
        <img className="album__image" src={previewImage} alt="musicimg" />

        <p className="album__title">{name}</p>

        <div className="album__block">
          <p className="album__release-year">{date.getFullYear()}</p>

          <img className="album__icon" src={iconAlbum} alt="icon" />
        </div>
      </button>
    </div>
  );
};

export default AdminAlbum;
