import React from "react";
import "./Footer.scss";
import * as infoFooterLinks from "../../data/InformationFooterLinks";
import FooterLinks from "../FooterLinks/FooterLinks";
import { Link } from "react-router-dom";
import imgFacebook from "../../assets/images/Facebook.svg";
import imgInstagram from "../../assets/images/Instagram.svg";
import imgTwitter from "../../assets/images/Twitter.svg";
import imgPhone from "../../assets/images/Phone.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer__about">
        <p className="footer__title">{t("about")}</p>

        <p className="footer__description">{t("siteDescription")}</p>
      </div>

      <div className="footer__links">
        <FooterLinks
          title={t("melodies")}
          linkItems={infoFooterLinks.MelodiesItems}
        />

        <FooterLinks
          title={t("access")}
          linkItems={infoFooterLinks.AccessItems}
        />

        <FooterLinks
          title={t("contact")}
          linkItems={infoFooterLinks.ContactItems}
        />
      </div>

      <div className="footer__icons">
        <Link className="footer__logo" to="/">
          <p className="footer__logo-title">Melodies</p>
        </Link>

        <div className="footer__icons-network">
          <a href="https://www.facebook.com/applemusic" target="_blank">
            <img src={imgFacebook} alt="facebook" />
          </a>

          <a href="https://www.instagram.com/applemusic/" target="_blank">
            <img src={imgInstagram} alt="instagram" />
          </a>

          <a href="https://twitter.com/AppleMusic" target="_blank">
            <img src={imgTwitter} alt="twitter" />
          </a>

          <a href="tel:+380698541234">
            <img src={imgPhone} alt="phone" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
