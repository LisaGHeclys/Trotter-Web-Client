import React from "react";
import "./WithHeaders.scss";
import trotterLogo from "../assets/Trotter_logo.png";
import { useTranslation } from "react-i18next";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type WithHeaderProps = {
  children: JSX.Element;
};

type NavButtons = {
  key: string;
  redirect: string;
}[];

const navButtons: NavButtons = [
  {
    key: "home",
    redirect: ""
  },
  {
    key: "discover",
    redirect: ""
  },
  {
    key: "destinations",
    redirect: ""
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
          <IconButton sx={{ padding: 0, height: 36, width: 36 }}>
            <AccountCircle sx={{ height: "100%", width: "100%" }} />
          </IconButton>
        </div>
      </head>
      {children}
    </>
  );
};

export default WithHeader;
