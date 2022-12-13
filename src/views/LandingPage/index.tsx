import Navbar from "../../components/Navbar/Navbar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import AliceCarousel from "react-alice-carousel";

import "./index.scss";

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
          test
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
