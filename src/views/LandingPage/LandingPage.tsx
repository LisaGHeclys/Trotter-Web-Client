import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import Lyon from "../../assets/lyon.jpg";
import Seoul from "../../assets/seoul.jpg";
import London from "../../assets/londre.jpg";
import Peru from "../../assets/peru.jpg";
import Auckland from "../../assets/auckland.jpg";
import Navbar from "../../components/Navbar/Navbar";

import "./index.scss";
import responsive from "../../constants";
import { useTranslation } from "react-i18next";
import { CardProps, CityToDisplay } from "../../model/LandingPage/LandingPage";

const CardContentNoPadding = styled(CardContent)`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  height: 20vh;
  border-radius: 50px;
`;

const Cards = ({ title, value, image }: CardProps) => {
  return (
    <CardWrapper data-value={value}>
      <Card style={{ borderRadius: "50px" }}>
        <CardContentNoPadding>
          <img src={image} width="350" height="100%" alt={title} />
        </CardContentNoPadding>
      </Card>
    </CardWrapper>
  );
};

const items: JSX.Element[] = [
  <Cards
    title={CityToDisplay.Lyon}
    value="1"
    image={Lyon}
    key={CityToDisplay.Lyon}
  />,
  <Cards
    title={CityToDisplay.Seoul}
    value="1"
    image={Seoul}
    key={CityToDisplay.Seoul}
  />,
  <Cards
    title={CityToDisplay.London}
    value="1"
    image={London}
    key={CityToDisplay.London}
  />,
  <Cards
    title={CityToDisplay.Peru}
    value="1"
    image={Peru}
    key={CityToDisplay.Peru}
  />,
  <Cards
    title={CityToDisplay.Auckland}
    value="1"
    image={Auckland}
    key={CityToDisplay.Auckland}
  />
];

const LandingPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Grid
        container
        p={0}
        m={0}
        className={"landingPage"}
        id="row"
        rowGap={10}
      >
        <Grid p={0} m={0} item xs={12}>
          <Navbar />
        </Grid>
        <Grid p={0} m={0} item className={"title"} xs={12}>
          {t("description.landingPart1")}
        </Grid>
        <Grid p={0} m={0} item className={"backgroundCarousel"} xs={12}>
          <div className="blur"></div>
          <AliceCarousel
            items={items}
            responsive={responsive}
            autoPlay
            animationDuration={8000}
            infinite
          />
        </Grid>
        <Grid p={0} m={0} item className={"description"} xs={isMobile ? 8 : 6}>
          {t("description.landingPart2")}
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
