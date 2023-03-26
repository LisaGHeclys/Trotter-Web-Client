import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import simpleLogo from "../../assets/simpleLogo.png";

import "../../scss/sidebar.scss";

type SidebarNavItemsType = {
  display: string;
  icon: JSX.Element;
  to: string;
  section: string;
}[];

const sidebarNavItems: SidebarNavItemsType = [
  {
    display: "Dashboard",
    icon: <HomeOutlinedIcon />,
    to: "/dashboard",
    section: ""
  },
  {
    display: "My destinations",
    icon: <AirplanemodeActiveOutlinedIcon />,
    to: "/dashboard",
    section: ""
  },
  {
    display: "Favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    to: "/",
    section: ""
  },
  {
    display: "Discover",
    icon: <ExploreOutlinedIcon />,
    to: "/dashboard",
    section: ""
  },
  {
    display: "Calendar",
    icon: <CalendarMonthOutlinedIcon />,
    to: "/dashboard",
    section: ""
  }
];

const Sidebar: FC = () => {
  const [, /*activeIndex*/ setActiveIndex] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebarLogo">
        <img src={simpleLogo} alt={"Logo"} className={"photo"} />
        Trotter
      </div>
      <hr />
      <div className="sidebarMenuIndicator"></div>
      {sidebarNavItems.map((item, index) => (
        <Link className="sidebarLink" to={item.to} key={index}>
          <div className="sidebarMenuItem">
            <div className="sidebarMenuItemIcon">{item.icon}</div>
            <div className="sidebarMenuItemText">{item.display}</div>
          </div>
        </Link>
      ))}
      <div className="sidebarMenuButton">
        <button className="sidebarMenuButtonLogOut">
          Log out
          <LogoutIcon className="sidebarMenuButtonLogOutIcon" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
