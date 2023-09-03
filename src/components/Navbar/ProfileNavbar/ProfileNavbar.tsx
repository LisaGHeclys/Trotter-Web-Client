import React, { FC } from "react";
import { Link } from "react-router-dom";
import { AppBar, useMediaQuery, useTheme, CssBaseline } from "@mui/material";
import styled from "styled-components";
import simpleLogo from "../../../assets/Trotter_logo.png";
import { COLORS, FONT } from "../../../UI/Colors";

const ProfileNavbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    color: ${COLORS.links};
  }
  @media (max-width: 1024px) {
    font-size: 22px;
  }
`;

export default ProfileNavbar;
