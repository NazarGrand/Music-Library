import React from "react";
import "./AlbumCatalog.scss";
import AlbumItem from "../AlbumItem/AlbumItem";

const AlbumCatalog = ({ albumItems }) => {
  return (
    <div className="album-catalog">
      <p className="album-catalog__title">
        Artist's <span className="album-catalog__title--blue">Albums</span>
      </p>
      {albumItems.length !== 0 ? (
        <ul className="album-catalog__list">
          {albumItems.slice(0, 5).map((item, index) => (
            <li key={index}>
              <AlbumItem albumItem={item} />
            </li>
          ))}
          {albumItems.length > 5 && (
            <li className="album-catalog__view-all">
              <div className="album-catalog__button">+</div>

              <p className="album-catalog__btn-text">View All</p>
            </li>
          )}
        </ul>
      ) : (
        <p className="album-catalog__subtitle">No music found</p>
      )}
    </div>
  );
};

export default AlbumCatalog;
