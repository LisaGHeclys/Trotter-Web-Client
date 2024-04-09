import { /* CircularProgress ,*/ Typography } from "@mui/material";
import { Divider, StepProps, Steps } from "antd";
import { addDays, format } from "date-fns";
import React, { Fragment, useState } from "react";
import BudgetComponent from "./Budget";
// import { useFetchCityInfo } from "../../hooks/useFetchCityInfo";

type TripSectionProps = {
  tripData: {
    lat: number | null;
    lon: number | null;
    cityName: string | null;
    bbox: number[] | null;
  };
  loading: boolean;
  startDate: Date;
  steps: StepProps[][];
};

enum TAB {
  ITINERARY,
  INFO,
  BUDGET
}

const TripSection = ({ loading, startDate, steps }: TripSectionProps) => {
  const [tab, setTab] = useState<TAB>(TAB.ITINERARY);
  //eslint-disable-next-line
  const [cityInfo, setCityInfo] = useState<any[] | null>(null);
  console.log(
    steps,
    Array.from({ length: steps.length }, (v, i) => i)
  );

  //   const [fetchCityInfoStatus, fetchCityInfo] = useFetchCityInfo();
  return (
    <div className="mapSideMenu">
      <div className="tabsContainer">
        <div onClick={() => setTab(TAB.ITINERARY)}>
          <Typography
            variant="h5"
            fontWeight={"bolder"}
            color={tab === TAB.ITINERARY ? "black" : "darkgray"}
          >
            ITINERARY
          </Typography>
        </div>
        {/* <div
          onClick={async () => {
            setTab(TAB.INFO);
            const citySlug = tripData?.features.find(
                //eslint-disable-next-line
              (feature: any) => feature.properties.name === tripData.cityName
            )?.properties.href;
            if (!cityInfo && citySlug)
              setCityInfo(await fetchCityInfo({ slug: citySlug }));
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"bolder"}
            color={tab === TAB.INFO ? "black" : "darkgray"}
          >
            INFO
          </Typography>
        </div> */}
        <div onClick={() => setTab(TAB.BUDGET)}>
          <Typography
            variant="h5"
            fontWeight={"bolder"}
            color={tab === TAB.BUDGET ? "black" : "darkgray"}
          >
            BUDGET
          </Typography>
        </div>
      </div>
      {tab === TAB.ITINERARY
        ? loading
          ? null
          : Array.from({ length: steps.length }, (v, i) => i).map((day) => (
              <Fragment key={day}>
                <h3 /* itineraryDay={day} */>
                  {format(
                    addDays(startDate || new Date(), day),
                    "EEEE, do MMMM"
                  )}{" "}
                </h3>
                <Steps
                  items={steps.length ? steps[day] : []}
                  direction="vertical"
                  current={10000}
                />
                <Divider />
              </Fragment>
            ))
        : null}

      {/* {tab === TAB.INFO ? (
        <div className="infoContainer">
          {fetchCityInfoStatus.loading ? (
            <CircularProgress />
          ) : cityInfo ? (
            <>
              <h3>City Size</h3>
              <p>
                <b>Population size:</b>{" "}
                {cityInfo[1].data[0].float_value.toFixed(1)}M
              </p>
              <p>
                <b>Spoken languages:</b> {cityInfo[11].data[2].string_value}
              </p>
              <p>
                <b>Currency used:</b> {cityInfo[5].data[0].string_value}
              </p>
              <p>
                <b>Median age:</b> {cityInfo[9].data[2].float_value} years
              </p>
              <h3>Climate</h3>
              <p>
                <b>Average day length:</b>{" "}
                {cityInfo[2].data[0].float_value.toFixed(1)} hours
              </p>
              <p>
                <b> Average day Temperature:</b>{" "}
                {cityInfo[2].data[3].string_value}°C -{" "}
                {cityInfo[2].data[2].string_value}°C
              </p>
              <p>
                <b> Average number of rainy days per year:</b>{" "}
                {cityInfo[2].data[1].float_value.toFixed(0)}
              </p>
              <p>
                <b>Weather type:</b> {cityInfo[2].data[5].string_value}
              </p>
              <h3>Cost of living</h3>
              <h5>in $</h5>
              <p>
                <b>Cost of a meal at a restaurant:</b>{" "}
                {cityInfo[3].data[8].currency_dollar_value.toFixed(2)}
              </p>
              <p>
                <b>Cost of a cappucino:</b>{" "}
                {cityInfo[3].data[3].currency_dollar_value.toFixed(2)}
              </p>
              <p>
                <b>Cost of a movie ticket:</b>{" "}
                {cityInfo[3].data[4].currency_dollar_value.toFixed(2)}
              </p>
              <p>
                <b>Cost of a beer:</b>{" "}
                {cityInfo[3].data[6].currency_dollar_value.toFixed(2)}
              </p>
              <p>
                <b>Cost of a fresh bread:</b>{" "}
                {cityInfo[3].data[2].currency_dollar_value.toFixed(2)}
              </p>
              <p>
                <b>Cost of a kilogram of apples:</b>{" "}
                {cityInfo[3].data[1].currency_dollar_value.toFixed(2)}
              </p>
            </>
          ) : null}
        </div>
      ) : null} */}

      {tab === TAB.BUDGET ? <BudgetComponent /> : null}
    </div>
  );
};

export default TripSection;
