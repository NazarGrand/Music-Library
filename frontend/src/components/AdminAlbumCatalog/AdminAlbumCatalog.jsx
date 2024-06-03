import AdminAlbum from "../AdminAlbum/AdminAlbum";
import "./AdminAlbumCatalog.scss";

const AdminAlbumCatalog = ({ albumItems, openModal, setSelectedAlbum }) => {
  return (
    <div className="album-catalog">
      {albumItems.length !== 0 ? (
        <ul className="album-catalog__list">
          {albumItems.map((item, index) => (
            <li key={index} className="album-catalog__item">
              <AdminAlbum
                album={item}
                openModal={openModal}
                setSelectedAlbum={setSelectedAlbum}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="album-catalog__subtitle">No albums found</p>
      )}
    </div>
  );
};

export default AdminAlbumCatalog;
