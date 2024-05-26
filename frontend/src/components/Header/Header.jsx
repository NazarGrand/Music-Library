import React, { useState } from "react";
import "./Header.scss";
import iconSearch from "../../assets/images/Search.png";
import Nav from "../Nav/Nav";
import Button from "../ui/Button/Button";
import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { logout } = useAuth();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <header className="header">
      <div className="header__search">
        <img className="header__search-icon" src={iconSearch} alt="search" />

        <input
          className="header__search-input"
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Search For Musics, Artists, Albumes ..."
        />
      </div>

      <Nav />
    </header>
  );
};

export default Header;
