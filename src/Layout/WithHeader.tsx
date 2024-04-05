import React from "react";
import "./WithHeaders.scss";
import trotterLogo from "../assets/Trotter_logo.png";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "antd";

type WithHeaderProps = {
  children?: JSX.Element;
};

type NavButtons = {
  key: string;
  redirect: string;
}[];

const navButtons: NavButtons = [
  {
    key: "home",
    redirect: "/"
  },
  {
    key: "discover",
    redirect: "/map"
  },
  {
    key: "trending",
    redirect: "/trending"
  }
];

const WithHeader: React.FC<WithHeaderProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <head className="navbar">
        <div className="logoButtonContainer">
          <img
            src={trotterLogo}
            alt=""
            title="Home page"
            height={34}
            draggable={false}
            className="trotterLogo"
          />
        </div>
        <div className="navButtonsContainer">
          {navButtons.map((button) => (
            <button
              type="button"
              key={button.key}
              onClick={() => navigate(button.redirect)}
            >
              <Typography variant="button">
                {t(button.key).toUpperCase()}
              </Typography>
            </button>
          ))}
        </div>
        <div className="profileButtonContainer">
          <Link to="/profile">
            <Avatar
              src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${localStorage.getItem(
                "jwt"
              )}`}
            />
          </Link>
        </div>
      </head>
      <div className="pageLayout">{children}</div>
    </>
  );
};

export default WithHeader;
