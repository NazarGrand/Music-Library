import AdminArtist from "../AdminArtist/AdminArtist";
import "./AdminArtistCatalog.scss";

const AdminArtistCatalog = ({ artistItems, openModal, setSelectedArtist }) => {
  return (
    <div className="artist-catalog">
      {artistItems.length !== 0 ? (
        <ul className="artist-catalog__list">
          {artistItems.map((item) => (
            <li key={item._id} className="album-catalog__item">
              <AdminArtist
                artist={item}
                openModal={openModal}
                setSelectedArtist={setSelectedArtist}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="artist-catalog__subtitle">No artists found</p>
      )}
    </div>
  );
};

export default AdminArtistCatalog;
