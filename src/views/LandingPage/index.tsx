import Navbar from "../../components/Navbar/Navbar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import AliceCarousel from "react-alice-carousel";

import "./index.scss";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 }
};

const items: any = [
  <div className="carouselItems" data-value="1">
    <h2>1</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="2">
    <h2>2</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="3">
    <h2>3</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="4">
    <h2>4</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>
];

function LandingPage() {
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
            animationDuration={5000}
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
}

export default LandingPage;
