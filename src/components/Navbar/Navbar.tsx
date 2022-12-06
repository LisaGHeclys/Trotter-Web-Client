import * as React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  CssBaseline
} from "@mui/material";

import simpleLogo from "../../assets/simpleLogo.png";

import routesList from "../RoutesParams";

import DrawerComponent from "./DrawerComponent";
import Login from "./Login";
import SignUp from "./SignUp";

import "../../scss/navbar.scss";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMobile);

  return (
    <header>
      <AppBar elevation={0}>
        <CssBaseline />
        <Toolbar className={"navbar"}>
          <div className={"logo"}>
            <a href={"/"}>
              <img src={simpleLogo} alt={"Logo"} className={"photo"} />
            </a>
            {isMobile ? "" : "Trotter"}
          </div>
          {isMobile ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <div className={"pages"}>
              {routesList.map((route, index) => (
                <Link className={"text"} to={route.routes} key={index}>
                  {route.name}
                </Link>
              ))}
            </div>
          )}
          {isMobile ? (
            <></>
          ) : (
            <div className={"authComponent"}>
              <Login />
              <SignUp />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Navbar;
