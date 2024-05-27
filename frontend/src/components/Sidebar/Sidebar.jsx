import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";
import * as infoSidebar from "../../data/InformationSidebar";
import { useAuth } from "../../context/AuthContext";
import iconLogout from "../../assets/images/Logout.svg";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <Link className="sidebar__logo" to="/">
        Melodies
      </Link>

      <SidebarNav menuTitle="Menu" menuItems={infoSidebar.MenuItems} />

      <SidebarNav menuTitle="Library" menuItems={infoSidebar.LibraryItems} />

      <SidebarNav
        menuTitle="Playlist and favorite"
        menuItems={infoSidebar.FavoriteItems}
      />

      <div className="sidebar-nav">
        <p className="sidebar-nav__menu">general</p>

        <nav className="sidebar-nav__nav">
          <ul className="sidebar-nav__list">
            <li className="sidebar-nav__item">
              <button
                className="sidebar-nav__item-button"
                onClick={() => logout()}
              >
                <div className="sidebar-nav__item-block">
                  <img
                    className="sidebar-nav__icon"
                    src={iconLogout}
                    alt="logout"
                  />
                  <p className="sidebar-nav__title">Logout</p>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
