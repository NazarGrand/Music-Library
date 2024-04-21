import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import SidebarNav from "../SidebarNav/SidebarNav";
import * as infoSidebar from "../../data/InformationSidebar";

const Sidebar = () => {
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

      <SidebarNav menuTitle="general" menuItems={infoSidebar.GeneralItems} />
    </div>
  );
};

export default Sidebar;
