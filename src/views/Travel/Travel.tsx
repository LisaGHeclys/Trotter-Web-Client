import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
// import { GridProps } from "./Travel.type";
import styled from "styled-components";

import Joyride, { CallBackProps, Step } from "react-joyride";

const TravelPage: FC = () => {
  const [city, setCity] = useState<string>("");
  const [, /*period*/ setPeriod] = useState<string>("date");
  const steps: Step[] = [
    {
      content: <h2>Welcome on Trotter Application !</h2>,
      locale: {
        skip: (
          <h4>
            <b>Skip</b>
          </h4>
        ),
        next: <p>Next</p>
      },
      placement: "center",
      target: "body"
    },
    {
      content: <h2>Enter your future destination here</h2>,
      target: "#guided-tour-city"
    },
    {
      content: <h2>Set the dates of your travel</h2>,
      target: "#guided-tour-dates"
    },
    {
      content: <h2>Click on this button and voila ! Your trip is created</h2>,
      target: "#guided-tour-search-button"
    }
  ];

  const run = localStorage.getItem("GT_OVER") !== "true";
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const { t } = useTranslation();

  return (
    <div>
      <TravelWrapper container p={0} m={0} rowGap={10}>
        <Joyride
          showProgress
          showSkipButton
          continuous
          steps={steps}
          styles={{
            options: {
              arrowColor: COLORS.grey,
              backgroundColor: COLORS.bg,
              textColor: COLORS.text,
              primaryColor: COLORS.grey
            },
            buttonClose: {
              display: "none"
            }
          }}
          callback={(data: CallBackProps) => {
            if (data.status === "finished" || data.action === "skip") {
              localStorage.setItem("GT_OVER", "true");
            }
          }}
          run={run}
        />
        <Grid item p={0} m={0} xs={12}>
          <Navbar />
        </Grid>
      </TravelWrapper>
      <DestinationComponentWrapper>
        <h1>{t("travel.title")}</h1>
        <ChooseDestination>
          <input
            id="guided-tour-city"
            placeholder="City..."
            onChange={(e) => setCity(e.target.value)}
            data-testid="cityName"
          />
          <input
            id="guided-tour-dates"
            type={"date"}
            placeholder="From ... to ..."
            onChange={(e) => setPeriod(e.target.value)}
          />
          <SearchButton
            id="guided-tour-search-button"
            onClick={() => {
              dispatch({ type: "SEARCH", payload: { place: city } });
              navigate("/map");
            }}
            data-testid="goOnTrip"
          >
            <div>{t("travel.searchButton")}</div>
          </SearchButton>
        </ChooseDestination>
      </DestinationComponentWrapper>
    </div>
  );
};

const TravelWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DestinationComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 150px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const ChooseDestination = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  font-weight: bold;
  font-size: 30px;
  font-family: ${FONT};
  color: ${COLORS.text};
  justify-content: center;
  align-items: center;

  input {
    margin-left: 10px;
    margin-right: 10px;
    height: 5.4vh;
    width: 22.5%;

    background-color: ${COLORS.bg};
    border-style: solid;
    border-color: ${COLORS.border};
    border-radius: 10px;
    border-width: 1px;
  }
`;

const SearchButton = styled.button`
  width: 180px;
  height: 5.2vh;
  z-index: 1;
  position: relative;
  margin-top: 36px;

  background-color: ${COLORS.blue};
  border: none !important;
  border-radius: 10px;
  color: ${COLORS.white};
  box-shadow: 3px 2px 10px rgba(${COLORS.text}, 0.1);
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

export default TravelPage;
