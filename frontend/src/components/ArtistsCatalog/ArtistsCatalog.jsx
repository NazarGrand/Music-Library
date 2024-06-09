import ArtistItem from "../ArtistItem/ArtistItem";
import "./ArtistsCatalog.scss";

const ArtistsCatalog = ({ artistItems }) => {
  console.log(artistItems);
  return (
    <div className="artists-catalog">
      {artistItems.length !== 0 ? (
        <ul className="artists-catalog__list">
          {artistItems.map((item) => (
            <li key={item.artistId}>
              <ArtistItem artistItem={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="artists-catalog__subtitle">No artists found</p>
      )}
    </div>
  );
};

export default ArtistsCatalog;
