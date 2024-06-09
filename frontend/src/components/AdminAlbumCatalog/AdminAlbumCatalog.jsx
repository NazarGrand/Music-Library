import AdminAlbum from "../AdminAlbum/AdminAlbum";
import "./AdminAlbumCatalog.scss";

const AdminAlbumCatalog = ({ albumItems, openModal, setSelectedAlbum }) => {
  return (
    <div className="admin-album-catalog">
      {albumItems.length !== 0 ? (
        <ul className="admin-album-catalog__list">
          {albumItems.map((item, index) => (
            <li key={index} className="admin-album-catalog__item">
              <AdminAlbum
                album={item}
                openModal={openModal}
                setSelectedAlbum={setSelectedAlbum}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-album-catalog__subtitle">No albums found</p>
      )}
    </div>
  );
};

export default AdminAlbumCatalog;
