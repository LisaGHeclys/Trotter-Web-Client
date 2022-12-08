import "../../scss/sidebar.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import simpleLogo from "../../assets/simpleLogo.png";

const sidebarNavItems = [
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
    display: "dashboard",
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

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
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
      <div className="sidebar__logo">
        <img src={simpleLogo} alt={"Logo"} className={"photo"} />
        Trotter
      </div>
      <div className="sidebar__menu_indicator">
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div className="sidebar__menu__item">
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
