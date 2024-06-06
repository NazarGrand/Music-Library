import iconAlbum from "../../assets/images/AlbumIcon.svg";
import imgAlbum from "../../assets/images/AlbumImage.jpg";
import "./AdminAlbum.scss";

const AdminAlbum = ({ album, openModal, setSelectedAlbum }) => {
  const { name, previewImage, releaseDate } = album;
  const date = new Date(releaseDate);

  const handleAlbumClick = () => {
    setSelectedAlbum(album);
    openModal();
  };

  const image = previewImage ? previewImage : imgAlbum;

  return (
    <div className="album">
      <button className="album__button" onClick={handleAlbumClick}>
        <img className="album__image" src={image} alt="musicimg" />

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
