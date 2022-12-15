import * as React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  CssBaseline,
  Grid
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

  return (
    <header>
      <AppBar elevation={0} color="transparent">
        <CssBaseline />
        <Toolbar className={"navbar"}>
          <Grid container p={0} m={0} className={"grid"}>
            <Grid container item xs={2} className={"logo"} columnGap={2}>
              <Grid item xs={isMobile ? 4 : 2}>
                <a href={"/"}>
                  <img src={simpleLogo} alt={"Logo"} className={"photo"} />
                </a>
              </Grid>
              <Grid item xs={isMobile ? 0 : 2}>
                {isMobile ? (
                  ""
                ) : (
                  <Link className={"text"} to={"/"}>
                    Trotter
                  </Link>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={isMobile ? 10 : 8}
              className={isMobile ? `drawer` : `pages`}
            >
              {isMobile ? (
                <>
                  <DrawerComponent />
                </>
              ) : (
                routesList.map((route, index) => (
                  <Grid item xs={isMobile ? 0 : 2} columnGap={2} key={index}>
                    <Link className={"text"} to={route.routes}>
                      {route.name}
                    </Link>
                  </Grid>
                ))
              )}
            </Grid>
            {!isMobile && (
              <Grid item xs={2} columnGap={4} className={"authComponent"}>
                <Login />
                <SignUp />
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Navbar;
