import React, { FC, useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Navbar from "../../components/Navbar/Navbar";
import Louvre from "../../assets/PalaisLouvre.jpg";
import London from "../../assets/London.jpg";

import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const TravelPage: FC = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const CardContentNoPadding = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
`);

  const [city, setCity] = useState<string>("");
  const [, /*_period*/ setPeriod] = useState<string>("date");
  const [isFav, setIsFav] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const { t } = useTranslation();

  return (
    <div>
      <Grid container p={0} m={0} className={"travel"} rowGap={10}>
        <Grid item p={0} m={0} xs={12}>
          <Navbar />
        </Grid>
        <Grid
          container
          item
          p={0}
          m={0}
          className={"destinationComponent"}
          xs={8}
          rowGap={isMobile ? 5 : 0}
        >
          <Grid
            container
            item
            p={0}
            m={0}
            className={"choseDestination"}
            xs={isMobile ? 12 : 6}
          >
            <Grid item p={0} m={0} xs={12} mb={2}>
              {t("description.travelPart1")}
            </Grid>
            <Grid
              container
              item
              xs={isMobile ? 6 : 12}
              className={"input"}
              style={{ marginTop: isMobile ? "0px" : "35px" }}
            >
              {t("description.travelPart2")}
              <input
                placeholder="City..."
                onChange={(e) => setCity(e.target.value)}
                data-testid="cityName"
              />
            </Grid>
            <Grid container item xs={isMobile ? 6 : 12} className={"input"}>
              {t("description.travelPart3")}
              <input
                type={"date"}
                placeholder="From ... to ..."
                onChange={(e) => setPeriod(e.target.value)}
              />
            </Grid>
            <Grid>
              <button
                className="searchButton"
                onClick={() => {
                  dispatch({ type: "SEARCH", payload: { place: city } });
                  navigate("/map");
                }}
                data-testid="goOnTrip"
              >
                {t("description.travelPart4")}
              </button>
            </Grid>
          </Grid>
          <Grid item p={0} m={0} xs={isMobile ? 12 : 6}>
            <Card style={{ borderRadius: "20px", padding: "0" }}>
              <CardContentNoPadding className={"photoCard"}>
                <img className="photo" src={Louvre} alt="louvre" />
              </CardContentNoPadding>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          p={0}
          m={0}
          className={"destinationPossibilities"}
          xs={8}
        >
          <Grid item p={0} m={0} xs={12} className={"textPlaces"}>
            {t("description.travelPart5")}
          </Grid>
          <Grid item className={"favoritePlaces"}>
            <Grid item>
              <Card
                style={{ borderRadius: "10px" }}
                onClick={() => navigate("/map")}
              >
                <CardContentNoPadding
                  style={{
                    backgroundColor: "#95b0b4",
                    width: isMobile ? "75px" : "150px",
                    height: isMobile ? "75px" : "150px"
                  }}
                >
                  <img className="photo" src={London} alt="London" />
                </CardContentNoPadding>
              </Card>
              <IconButton
                onClick={() => {
                  setIsFav(!isFav);
                }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TravelPage;
