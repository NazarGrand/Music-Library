import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";
import "./SidebarNav.scss";
import { useTranslation } from "react-i18next";

const SidebarNav = ({ menuTitle, menuItems }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const handleIsActive = (title) => {
    return classnames("sidebar-nav__item-link", {
      "sidebar-nav__item-link--active-link": location.pathname.includes(
        title.toLowerCase().replace(/ /g, "-")
      ),
    });
  };

  const handleClick = (link) => {
    sessionStorage.removeItem(`scrollPosition_${link}`);
  };

  return (
    <div className="sidebar-nav">
      <p className="sidebar-nav__menu">{menuTitle}</p>

      <nav className="sidebar-nav__nav">
        <ul className="sidebar-nav__list">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-nav__item">
              <NavLink
                className={() => handleIsActive(item.routeName)}
                to={item.link}
                onClick={() => handleClick(item.link)}
              >
                <div className="sidebar-nav__item-block">
                  <img
                    className="sidebar-nav__item-icon"
                    src={item.icon}
                    alt="home"
                  />

                  <p className="sidebar-nav__item-title">{t(item.title)}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
