import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.scss";
import { t } from "i18next";

const FooterLinks = ({ title, linkItems }) => {
  return (
    <div className="footer-links">
      <p className="footer-links__title">{title}</p>

      <hr className="footer-links__line" />

      <nav className="footer-links__nav">
        <ul className="footer-links__list">
          {linkItems.map((item, index) => (
            <li key={index} className="footer-links__item">
              <Link className="footer-links__item-link" to={item.link}>
                <p className="footer-links__item-title">{t(item.title)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FooterLinks;
