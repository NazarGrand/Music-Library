import AlbumItem from "../AlbumItem/AlbumItem";
import "./AllAlbums.scss";

const AllAlbums = ({ albumItems }) => {
  return (
    <div className="all-albums">
      {albumItems.length !== 0 ? (
        <ul className="all-albums__list">
          {albumItems.map((item) => (
            <li key={item.albumId}>
              <AlbumItem albumItem={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="all-albums__subtitle">No artists found</p>
      )}
    </div>
  );
};

export default AllAlbums;
