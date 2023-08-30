import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppBar, useMediaQuery, useTheme, CssBaseline } from "@mui/material";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";
import simpleLogo from "../../assets/simpleLogo.png";
import DrawerComponent from "./DrawerComponent";
import "../../scss/navbar.scss";
import { COLORS, FONT } from "../../UI/Colors";

const Navbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  console.log(isMobile);
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
  z-index: 9999;

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
  height: 50px;
  width: 38px;

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
    color: ${COLORS.links};
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
    color: ${COLORS.links};
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const RegisterLink = styled(Link)`
  display: flex;
  background-color: ${COLORS.links};
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  font-family: ${FONT};
  transition: all ease-in-out 0.2s;
  padding: 4px 12px;
  border-radius: 50px;

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
