import React, { useState } from "react";

import { Card, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Navbar from "../../components/Navbar/Navbar";

import "./index.scss";

function TravelPage() {
  const [city, setCity] = useState("");
  const [period, setPeriod] = useState("date");
  const [isFav, setIsFav] = useState(false);

  return (
    <div className={"travel"}>
      <Navbar />
      <div className={"destinationComponent"}>
        <div className={"choseDestination"}>
          Plan your travel
          <div className={"input"} style={{ marginTop: "35px" }}>
            Location
            <input
              placeholder="City..."
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={"input"}>
            Date
            <input
              type={"date"}
              placeholder="From ... to ..."
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>
        </div>
        <Card style={{ borderRadius: "20px" }}>
          <CardContent
            style={{
              backgroundColor: "#95b0b4",
              width: "500px",
              height: "400px"
            }}
          ></CardContent>
        </Card>
      </div>
      <div className={"destinationPossibilities"}>
        Popular places
        <div className={"favoritePlaces"}>
          <div>
            <Card style={{ borderRadius: "10px" }}>
              <CardContent
                style={{
                  backgroundColor: "#95b0b4",
                  width: "150px",
                  height: "150px"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelPage;
