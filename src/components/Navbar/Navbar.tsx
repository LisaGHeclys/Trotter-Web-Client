import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  CssBaseline,
  Grid
} from "@mui/material";

import simpleLogo from "../../assets/Trotter_logo.png";

import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

import DrawerComponent from "./DrawerComponent";
import Login from "./Login";
import SignUp from "./SignUp";

import "../../scss/navbar.scss";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const Navbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();
  type RoutesListType = {
    name: string;
    routes: string;
  }[];

  const routesList: RoutesListType = [
    {
      name: t("description.navbarPart1"),
      routes: "/"
    },
    {
      name: t("description.navbarPart2"),
      routes: "/travel"
    },
    {
      name: t("description.navbarPart4"),
      routes: "/about"
    }
  ];

  return (
    <header>
      <AppBar elevation={0} color="transparent">
        <CssBaseline />
        <Toolbar className={"navbar"}>
          <Grid container p={0} m={0} className={"grid"}>
            <Grid
              container
              item
              xs={2}
              className={"logo-container"}
              columnGap={2}
            >
              <Grid item xs={isMobile ? 4 : 2}>
                <a href={"/"}>
                  <img src={simpleLogo} alt={"Logo"} className={"logo"} />
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
              className={isMobile ? "drawer" : "pages"}
            >
              {isMobile ? (
                <>
                  <DrawerComponent />
                  <LanguageSwitch />
                </>
              ) : (
                <>
                  {routesList.map((route, index: number) => (
                    <Grid
                      item
                      xs={isMobile ? 0 : 2}
                      columnGap={2}
                      key={index}
                      sx={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        px: 1
                      }}
                    >
                      <Link
                        className={"text"}
                        to={route.routes}
                        style={{ fontSize: 22 }}
                      >
                        {route.name}
                      </Link>
                    </Grid>
                  ))}
                  <LanguageSwitch />
                </>
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
};

export default Navbar;
