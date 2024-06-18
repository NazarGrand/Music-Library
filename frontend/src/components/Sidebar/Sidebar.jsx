import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";
import * as infoSidebar from "../../data/InformationSidebar";
import * as infoSidebarAdmin from "../../data/InformationAdminSidebar";
import { useAuth } from "../../context/AuthContext";
import iconLogout from "../../assets/images/Logout.svg";

import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <Link className="sidebar__logo" to="/">
        Melodies
      </Link>

      {user.role === "user" ? (
        <>
          <SidebarNav
            menuTitle={t("titleMenu")}
            menuItems={infoSidebar.MenuItems}
          />

          <SidebarNav
            menuTitle={t("titleLibrary")}
            menuItems={infoSidebar.LibraryItems}
          />
        </>
      ) : (
        <SidebarNav
          menuTitle={t("titleMenu")}
          menuItems={infoSidebarAdmin.MenuItemsAdmin}
        />
      )}

      <div className="sidebar-nav">
        <p className="sidebar-nav__menu">{t("titleGeneral")}</p>

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
                  <p className="sidebar-nav__title">{t("titleLogout")}</p>
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
