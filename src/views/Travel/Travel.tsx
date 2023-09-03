import React, { FC, useState } from "react";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "../../components/Navbar/Navbar";
import Louvre from "../../assets/PalaisLouvre.jpg";
import London from "../../assets/London.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
import { GridProps } from "./Travel.type";
import styled from "styled-components";

const TravelPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [city, setCity] = useState<string>("");
  const [period, setPeriod] = useState<string>("date");
  const [isFav, setIsFav] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const { t } = useTranslation();

  return (
    <div>
      <TravelWrapper container p={0} m={0} rowGap={10}>
        <Grid item p={0} m={0} xs={12}>
          <Navbar />
        </Grid>
        <DestinationComponentWrapper
          container
          item
          p={0}
          m={0}
          xs={8}
          rowGap={isMobile ? 5 : 0}
        >
          <ChoseDestination container item xs={isMobile ? 12 : 6}>
            <Grid item p={0} m={0} xs={12} mb={2}>
              {t("description.travelPart1")}
            </Grid>
            <GridInput
              container
              item
              xs={isMobile ? 6 : 12}
              isMobile={isMobile}
            >
              {t("description.travelPart2")}
              <input
                placeholder="City..."
                onChange={(e) => setCity(e.target.value)}
                data-testid="cityName"
              />
            </GridInput>
            <GridInput container item xs={isMobile ? 6 : 12}>
              {t("description.travelPart3")}
              <input
                type={"date"}
                placeholder="From ... to ..."
                onChange={(e) => setPeriod(e.target.value)}
              />
            </GridInput>
            <Grid>
              <SearchButton
                onClick={() => {
                  dispatch({ type: "SEARCH", payload: { place: city } });
                  navigate("/map");
                }}
                data-testid="goOnTrip"
              >
                {t("description.travelPart4")}
              </SearchButton>
            </Grid>
          </ChoseDestination>
          <Grid item p={0} m={0} xs={isMobile ? 12 : 6}>
            <CardContentPhoto src={Louvre} alt="louvre" />
          </Grid>
        </DestinationComponentWrapper>
        <DestinationPossibilities container item p={0} m={0} xs={8}>
          <Grid item p={0} m={0} xs={12}>
            {t("description.travelPart5")}
          </Grid>
          <FavoritePlaces item>
            <Grid item>
              <CardContentPhoto
                style={{
                  backgroundColor: "#95b0b4",
                  width: isMobile ? "75px" : "150px",
                  height: isMobile ? "75px" : "150px",
                  borderRadius: "10px"
                }}
                src={London}
                alt="London"
                onClick={() => navigate("/map")}
              />
              <IconButton
                onClick={() => {
                  setIsFav(!isFav);
                }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Grid>
          </FavoritePlaces>
        </DestinationPossibilities>
      </TravelWrapper>
    </div>
  );
};

const TravelWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DestinationComponentWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 60vh;
  align-content: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 50vh;
    text-align: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }
`;

const ChoseDestination = styled(Grid)`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-weight: 700;
  font-size: 35px;
  text-decoration: none;
  font-family: ${FONT};
  color: ${COLORS.black};
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 425px) {
    font-size: 25px;
  }
`;

const GridInput = styled(Grid)<GridProps>`
  display: flex;
  flex-direction: column;
  font-weight: 200;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => (props.isMobile ? "0px" : "35px")};

  @media (max-width: 768px) {
    font-size: 18px;
    justify-content: space-between;
    align-content: center;
  }
  @media (max-width: 425px) {
    font-size: 15px;
    justify-content: space-between;
    align-content: center;
  }

  input {
    margin-left: 0;
    margin-right: 0;
    background-color: ${COLORS.bg};
    height: 5vh;
    width: 25vw;
    border-style: solid;
    border-color: ${COLORS.grey};
    border-radius: 10px;
    border-width: 1px;
  }
`;

const SearchButton = styled.button`
  width: 180px;
  height: 52px;
  z-index: 1;
  position: relative;
  margin-top: 20px;
  background-color: ${COLORS.links};
  border: 1px ${COLORS.links} solid;
  border-radius: 10px;
  color: ${COLORS.white};
  box-shadow: 3px 2px 10px rgba(${COLORS.text}, 0.2);
  cursor: pointer;
  font-weight: bolder;
  font-size: 20px;
  font-family: ${FONT};

  &:hover {
    background-color: ${COLORS.blueGreen};
    transition-duration: 0.4s;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`;

const DestinationPossibilities = styled(Grid)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 20vh;
  font-weight: 200;
  font-size: 20px;
`;

const FavoritePlaces = styled(Grid)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardContentPhoto = styled.img`
  width: 100%;
  object-fit: cover;
  background-color: #95b0b4;
  height: 40vh;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: 30vh;
  }
  @media (max-width: 320px) {
    height: 20vh;
  }
`;

export default TravelPage;
