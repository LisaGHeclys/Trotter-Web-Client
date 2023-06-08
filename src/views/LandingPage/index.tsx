import Navbar from "../../components/Navbar/Navbar";
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
import Londre from "../../assets/londre.jpg";
import Peru from "../../assets/peru.jpg";
import Auckland from "../../assets/auckland.jpg";

import { styled } from "@mui/material/styles";

import "./index.scss";
import responsive from "../../constants";
import React, { FC } from "react";

const CardContentNoPadding = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
`);

const items: JSX.Element[] = [
  <div className="carouselItems" data-value="1" key="Lyon">
    <Card style={{ borderRadius: "50px" }}>
      <CardContentNoPadding>
        <img src={Lyon} width="350" height="100%" alt={"lyon"} />
      </CardContentNoPadding>
    </Card>
  </div>,
  <div className="carouselItems" data-value="2" key="Seoul">
    <Card style={{ borderRadius: "50px" }}>
      <CardContentNoPadding>
        <img src={Seoul} width="350" height="100%" alt={"Seoul"} />
      </CardContentNoPadding>
    </Card>
  </div>,
  <div className="carouselItems" data-value="3" key="London">
    <Card style={{ borderRadius: "50px" }}>
      <CardContentNoPadding>
        <img src={Londre} width="350" height="100%" alt={"London"} />
      </CardContentNoPadding>
    </Card>
  </div>,
  <div className="carouselItems" data-value="4" key="Peru">
    <Card style={{ borderRadius: "50px" }}>
      <CardContentNoPadding>
        <img src={Peru} width="350" height="100%" alt={"Peru"} />
      </CardContentNoPadding>
    </Card>
  </div>,
  <div className="carouselItems" data-value="4" key="Auckland">
    <Card style={{ borderRadius: "50px" }}>
      <CardContentNoPadding>
        <img src={Auckland} width="350" height="100%" alt={"Auckland"} />
      </CardContentNoPadding>
    </Card>
  </div>
];

const LandingPage: FC = () => {
  const theme = useTheme();

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
          Travelling alone never has been so easy
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
          Plan your solo trip with us and discover the activities we can offer
          you
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
