import React, { useState } from "react";

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

import "./index.scss";
import { useNavigate } from "react-router-dom";
import { TextFieldsOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";

function TravelPage() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [city, setCity] = useState("");
  const [period, setPeriod] = useState("date");
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AnyAction>>();

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
              Plan your travel
            </Grid>
            <Grid
              container
              item
              xs={isMobile ? 6 : 12}
              className={"input"}
              style={{ marginTop: isMobile ? "0px" : "35px" }}
            >
              Location
              <input
                placeholder="City..."
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid container item xs={isMobile ? 6 : 12} className={"input"}>
              Date
              <input
                type={"date"}
                placeholder="From ... to ..."
                onChange={(e) => setPeriod(e.target.value)}
              />
            </Grid>
            <Grid>
            <button
            className="loginButton"
            onClick={() => {
              console.log(city);
              dispatch({ type: "SEARCH", payload: { place: city } });
              navigate("/map");
            }}
          >Submit</button>
            </Grid>
          </Grid>
          <Grid item p={0} m={0} xs={isMobile ? 12 : 6}>
            <Card style={{ borderRadius: "20px" }}>
              <CardContent className={"photoCard"}>photo</CardContent>
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
            Popular places
          </Grid>
          <Grid item className={"favoritePlaces"}>
            <Grid item>
              <Card
                style={{ borderRadius: "10px" }}
                onClick={() => navigate("/map")}
              >
                <CardContent
                  style={{
                    backgroundColor: "#95b0b4",
                    width: isMobile ? "75px" : "150px",
                    height: isMobile ? "75px" : "150px"
                  }}
                ></CardContent>
              </Card>
              <IconButton
                onClick={() => {
                  setIsFav(!isFav);
                }}
              >
                {isFav === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TravelPage;
