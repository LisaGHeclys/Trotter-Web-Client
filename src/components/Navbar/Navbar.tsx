import React, { FC } from "react";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppBar, useMediaQuery, useTheme, CssBaseline } from "@mui/material";
import styled from "styled-components";
import simpleLogo from "../../assets/Trotter_logo.png";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";
import DrawerComponent from "./DrawerComponent";
import { COLORS, FONT } from "../../UI/Colors";

// interface RoutesListType {
//   name: string;
//   routes: string;
// }

const Navbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const { t } = useTranslation();

  // const routesList: RoutesListType[] = [
  //   {
  //     name: t("description.navbarPart1"),
  //     routes: "/"
  //   },
  //   {
  //     name: t("description.navbarPart2"),
  //     routes: "/travel"
  //   },
  //   {
  //     name: t("description.navbarPart4"),
  //     routes: "/about"
  //   }
  // ];

  return (
    <AppBar elevation={0} color="transparent">
      <CssBaseline />
      <HeaderWrapper>
        <LogoWrapper>
          <a href={"/"}>
            <PictureWrapper src={simpleLogo} alt={"Logo"} />
          </a>
          {!isMobile && <LogoLink to={"/"}>Trotter</LogoLink>}
        </LogoWrapper>
        {isMobile ? (
          <EndNavbarWrapper>
            <LanguageSwitch />
            <DrawerComponent />
          </EndNavbarWrapper>
        ) : (
          <EndNavbarWrapper>
            <LanguageSwitch />
            <LoginLink to={"/login"}>Login</LoginLink>
            <RegisterLink to={"/register"}>Sign up</RegisterLink>
          </EndNavbarWrapper>
        )}
      </HeaderWrapper>
    </AppBar>
  );
};

const HeaderWrapper = styled.div`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.bg};
  z-index: 1;

  .pages {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drawer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all ease-in-out 0.2s;

  &:hover {
    color: ${COLORS.links};
    scale: 1.04;
  }
`;

const PictureWrapper = styled.img`
  height: 55px;
  width: fit-content;

  &:hover {
    color: ${COLORS.links};
  }
`;

const LogoLink = styled(Link)`
  color: ${COLORS.black};
  font-weight: 700;
  font-size: 28px;
  text-decoration: none;
  font-family: ${FONT};

  &:hover {
    color: ${COLORS.blue};
  }
  @media (max-width: 1024px) {
    font-size: 22px;
  }
`;

const LoginLink = styled(Link)`
  color: ${COLORS.black};
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  font-family: ${FONT};
  transition: all ease-in-out 0.2s;

  &:hover {
    scale: 1.04;
    color: ${COLORS.blue};
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const RegisterLink = styled(Link)`
  display: flex;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  font-family: ${FONT};
  transition: all ease-in-out 0.2s;
  padding: 4px 12px;
  border-radius: 10px;

  &:hover {
    background-color: ${COLORS.blueGreen};
    scale: 1.06;
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const EndNavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export default Navbar;
