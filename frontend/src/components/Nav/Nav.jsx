import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            className="nav__item-link"
            to="https://www.instagram.com/applemusic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className="nav__item-link"
            to="mailto:your.email@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__item-link" to="#">
            Premium
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
