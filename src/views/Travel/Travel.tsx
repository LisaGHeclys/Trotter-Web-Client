import React, { FC, useState, useEffect } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Range } from "react-date-range";
import { BaseMapPropsDefault } from "../Map/Maps.helpers";
import Joyride, { CallBackProps, Step } from "react-joyride";

import WithHeader from "../../Layout/WithHeader";
import { getUserToken } from "../../reducers/auth.reducers";

// This part will be removed when the component will be connected to the backend server.
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

const cardData = [
  {
    id: 1,
    title: "Seoul, South Korea",
    content:
      "South Korea's capital, seamlessly blends ancient charm with modern vibrancy, offering a dynamic cityscape where tradition meets innovation.",
    imageUrl: "/seoul.jpg",
    city: "Seoul",
    lat: 37.566,
    lon: 126.9784
  },
  {
    id: 2,
    title: "Barcelona, Spain",
    content:
      "Spain's vibrant city, harmonizes history with modernity, creating a dynamic blend of iconic architecture and contemporary energy.",
    imageUrl: "/Barcelone.jpg",
    city: "Barcelona",
    lat: 41.38879,
    lon: 2.15899
  },
  {
    id: 3,
    title: "Lyon, France",
    content:
      "Lyon, the gastronomic capital, blends history and flavor along the Rhône and Saône rivers. With Renaissance charm, UNESCO-listed Old Town, and renowned bouchons, it's a culinary and cultural delight.",
    imageUrl: "/Lyon.png",
    city: "Lyon",
    lat: 45.76342,
    lon: 4.834277
  },
  {
    id: 4,
    title: "Paris, France",
    content:
      "Paris, the City of Lights, is a global symbol of romance and culture. With its iconic landmarks, charming streets, and culinary delights, it captivates visitors with its timeless allure.",
    imageUrl: "/paris.jpg",
    city: "Paris",
    lat: 48.864716,
    lon: 2.349014
  }
];

const TravelPage: FC = () => {
  const [, /*length*/ setLength] = useState<number>(BaseMapPropsDefault.length);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: "selection"
    }
  ]);
  const [city, setCity] = useState<{
    geometry: {
      coordinates: number[];
    };
    properties: {
      name: string;
    };
  } | null>(null);
  // const [, /*period*/ setPeriod] = useState<string>("date");
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

  useEffect(() => {
    if (range.length === 0 || !range[0].endDate || !range[0].startDate) return;
    const diffTime = Math.abs(
      range[0]?.endDate?.getTime() - range[0]?.startDate?.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLength(diffDays);
  }, [range]);

  const isLoggedIn = useSelector(getUserToken);

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
              arrowColor: COLORS.blue,
              backgroundColor: COLORS.bg,
              textColor: COLORS.text,
              primaryColor: COLORS.blue
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
          {isLoggedIn ? <WithHeader /> : <Navbar />}
        </Grid>
      </TravelWrapper>
      <DestinationComponentWrapper>
        <h1>{t("travel.title")}</h1>
        <ChooseDestination>
          <Autocomplete
            data-testid="cityName"
            id="guided-tour-city"
            disablePortal
            options={jsonData?.features ?? []}
            getOptionLabel={(option) => option.properties.name}
            sx={{ width: 350 }}
            isOptionEqualToValue={(option, value) =>
              option.properties.name === value.properties.name
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setCity(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" key={params.id} />
            )}
          />
          <SpaceDate />
          <DatePicker.RangePicker
            size={"middle"}
            placement="bottomLeft"
            id="guided-tour-dates"
            onChange={(rv) => {
              if (!rv || !rv[0] || !rv[1]) return;
              if (!rv[0]?.isBefore(rv[1]?.add(-7, "day"))) {
                setRange([
                  {
                    startDate: rv[0].toDate(),
                    endDate: rv[1].toDate(),
                    key: "selection"
                  }
                ]);
              }
            }}
            disabledDate={(date) => date.toDate() < new Date()}
            value={[dayjs(range[0].startDate), dayjs(range[0].endDate)]}
          />
          <SearchButton
            id="guided-tour-search-button"
            onClick={() => {
              if (city)
                dispatch({
                  type: "SEARCH",
                  payload: {
                    place: {
                      cityName: city.properties.name,
                      lat: city.geometry.coordinates[1],
                      lon: city.geometry.coordinates[0]
                    }
                  }
                });
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
                  onClick={() => {
                    dispatch({
                      type: "SEARCH",
                      payload: {
                        place: {
                          cityName: card.city,
                          lat: card.lat,
                          lon: card.lon
                        }
                      }
                    });
                    navigate("/map");
                  }}
                />
                <CardContent>
                  <h3>{card.title}</h3>
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
  margin-top: 75px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SpaceDate = styled.div`
  height: 15px;
  width: 100%;
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

  @media screen and (max-width: 1200px) {
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledCard = styled(Card)`
  flex: 0 0 calc(25% - 20px);

  @media screen and (max-width: 1200px) {
    flex: 0 0 calc(33.33% - 20px);
  }

  @media screen and (max-width: 768px) {
    flex: 0 0 calc(100% - 20px);
    margin-bottom: 20px;
  }
`;

export default TravelPage;
