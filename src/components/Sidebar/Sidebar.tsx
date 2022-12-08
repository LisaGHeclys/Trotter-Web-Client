import "../../scss/sidebar.scss";
import "boxicons/css/boxicons.min.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import simpleLogo from "../../assets/simpleLogo.png";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/dashboard",
    section: ""
  },
  {
    display: "My destinations",
    icon: <i className="bx bxs-plane-alt"></i>,
    to: "/dashboard",
    section: ""
  },
  {
    display: "dashboard",
    icon: <i className="bx bx-heart"></i>,
    to: "/",
    section: ""
  },
  {
    display: "Discover",
    icon: <i className="bx bx-compass"></i>,
    to: "/dashboard",
    section: ""
  },
  {
    display: "Calendar",
    icon: <i className="bx bxs-calendar"></i>,
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
          <Link className="text-decoration: none" to={item.to} key={index}>
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
