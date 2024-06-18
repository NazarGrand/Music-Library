import React from "react";
import "./AlbumCatalog.scss";
import AlbumItem from "../AlbumItem/AlbumItem";
import { useTranslation } from "react-i18next";

const AlbumCatalog = ({ albumItems }) => {
  const { t } = useTranslation();
  return (
    <div className="album-catalog">
      <p className="album-catalog__title">
        <span className="album-catalog__title--blue">{t("titleAlbums")}</span>
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

              <p className="album-catalog__btn-text">{t("viewAll")}</p>
            </li>
          )}
        </ul>
      ) : (
        <p className="album-catalog__subtitle">{t("noMusicFound")}</p>
      )}
    </div>
  );
};

export default AlbumCatalog;
