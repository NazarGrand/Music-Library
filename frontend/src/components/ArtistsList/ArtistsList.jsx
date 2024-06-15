import React from "react";
import "./ArtistsList.scss";
import ArtistItem from "../ArtistItem/ArtistItem";
import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ArtistsList = ({ title, artistItems }) => {
  const { t } = useTranslation();
  return (
    <div className="artists">
      <p className="artists__title">
        {title} <span className="artists__title--pink">{t("artists")}</span>
      </p>
      {artistItems.length !== 0 ? (
        <div className="artists__block">
          <ul className="artists__list">
            {artistItems.map((item, index) => (
              <li key={index}>
                <ArtistItem artistItem={item} />
              </li>
            ))}
          </ul>

          {artistItems.length > 5 && (
            <Link className="artists__view-all" to={ROUTES.ARTISTS}>
              <div className="artists__plus">+</div>

              <p className="artists__view-all-text">View All</p>
            </Link>
          )}
        </div>
      ) : (
        <p className="artists__subtitle">No artist found</p>
      )}
    </div>
  );
};

export default ArtistsList;
