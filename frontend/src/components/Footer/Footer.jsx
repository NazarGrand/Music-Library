import React from "react";
import "./Footer.scss";
import * as infoFooterLinks from "../../data/InformationFooterLinks";
import FooterLinks from "../FooterLinks/FooterLinks";
import { Link } from "react-router-dom";
import imgFacebook from "../../assets/images/Facebook.svg";
import imgInstagram from "../../assets/images/Instagram.svg";
import imgTwitter from "../../assets/images/Twitter.svg";
import imgPhone from "../../assets/images/Phone.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__about">
        <p className="footer__title">About</p>

        <p className="footer__description">
          Melodies is a website that has been created for over
          <span className="footer__description--pink"> 5 year’s </span> now and
          it is one of the most famous music player website’s in the world. in
          this website you can listen and download songs for free. also of you
          want no limitation you can buy our{" "}
          <span className="footer__description--blue">premium pass’s.</span>
        </p>
      </div>

      <div className="footer__links">
        <FooterLinks
          title="Melodies"
          linkItems={infoFooterLinks.MelodiesItems}
        />

        <FooterLinks title="Access" linkItems={infoFooterLinks.AccessItems} />

        <FooterLinks title="Contact" linkItems={infoFooterLinks.ContactItems} />
      </div>

      <div className="footer__icons">
        <Link className="footer__logo" to="/">
          <p className="footer__logo-title">Melodies</p>
        </Link>

        <div className="footer__icons-network">
          <Link to="https://www.facebook.com/applemusic" target="_blank">
            <img src={imgFacebook} alt="facebook" />
          </Link>

          <Link to="https://www.instagram.com/applemusic/" target="_blank">
            <img src={imgInstagram} alt="instagram" />
          </Link>

          <Link to="https://twitter.com/AppleMusic" target="_blank">
            <img src={imgTwitter} alt="twitter" />
          </Link>

          <a href="tel:+380698541234">
            <img src={imgPhone} alt="phone" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
