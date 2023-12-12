import React, { FC, useState, useEffect } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
import styled from "styled-components";

import Joyride, { CallBackProps, Step } from "react-joyride";

// This part will be removed when the component will be connected to the backend server.
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
const cardData = [
  {
    id: 1,
    title: "Card 1",
    content: "This is a simple card.",
    imageUrl: "/TrotterLogo.png"
  },
  {
    id: 2,
    title: "Card 2",
    content: "This is another card.",
    imageUrl: "/TrotterLogo.png"
  },
  {
    id: 3,
    title: "Card 3",
    content: "And one more card.",
    imageUrl: "/login.png"
  },
  {
    id: 4,
    title: "Card 4",
    content: "And one more card.",
    imageUrl: "/login.png"
  }
];

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

  const [jsonData, setJsonData] = useState<{
    features: {
      geometry: {
        coordinates: number[];
      };
      properties: {
        name: string;
      };
    }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the JSON file using the relative path
      const response = await fetch("/data.geojson");
      const data = await response.json();

      setJsonData(data);
    };

    fetchData();
  }, []);

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
          {/* <input
            id="guided-tour-city"
            placeholder="City..."
            onChange={(e) => setCity(e.target.value)}
            data-testid="cityName"
          /> */}
          <Autocomplete
            data-testid="cityName"
            id="guided-tour-city"
            disablePortal
            options={jsonData?.features ?? []}
            getOptionLabel={(option) => option.properties.name}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.properties.name === value.properties.name
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setCity(newValue.properties.name);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" key={params.id} />
            )}
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
        <TitleRecommended>Recommended tours</TitleRecommended>
        <RecommendedWrapper>
          {cardData.map((card) => (
            <StyledCard key={card.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ height: 250 }}
                  image={card.imageUrl}
                  alt={`${card.title} Image`}
                />
                <CardContent>
                  <h2>{card.title}</h2>
                  <p>{card.content}</p>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          ))}
        </RecommendedWrapper>
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
  margin-top: 100px;

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

  // input {
  //   margin-left: 10px;
  //   margin-right: 10px;
  //   height: 5.4vh;
  //   width: 22.5%;

  //   background-color: ${COLORS.bg};
  //   border-style: solid;
  //   border-color: ${COLORS.border};
  //   border-radius: 10px;
  //   border-width: 1px;
  // }
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

const TitleRecommended = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
`;

const RecommendedWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  flex: 0 0 calc(25% - 80px);
`;

export default TravelPage;
