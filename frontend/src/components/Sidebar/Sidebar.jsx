import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";
import * as infoSidebar from "../../data/InformationSidebar";
import * as infoSidebarAdmin from "../../data/InformationAdminSidebar";
import { useAuth } from "../../context/AuthContext";
import iconLogout from "../../assets/images/Logout.svg";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <Link className="sidebar__logo" to="/">
        Melodies
      </Link>

      {user.role === "user" ? (
        <>
          <SidebarNav menuTitle="Menu" menuItems={infoSidebar.MenuItems} />

          <SidebarNav
            menuTitle="Library"
            menuItems={infoSidebar.LibraryItems}
          />
        </>
      ) : (
        <SidebarNav
          menuTitle="Menu"
          menuItems={infoSidebarAdmin.MenuItemsAdmin}
        />
      )}

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
