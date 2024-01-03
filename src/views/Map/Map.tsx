/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useState } from "react";
import "./Map.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Range } from "react-date-range";
import { useSelector } from "react-redux";
import {
  GeolocateControl,
  Layer,
  Marker,
  Map,
  MapRef,
  NavigationControl,
  ScaleControl,
  Source
} from "react-map-gl";
import { FeatureCollection } from "geojson";
import { Popup, MapLayerMouseEvent } from "mapbox-gl";
import Routes from "./Routes";
import { RootState } from "../../store";
import {
  Autocomplete,
  Card,
  CircularProgress,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { format, addDays } from "date-fns";
// import { SearchState } from "../../reducers/search.reducers";
import { BaseMapPropsDefault, weekColors } from "./Maps.utils";
import { TransportType, UnderLineProps } from "./Maps.type";
import styled from "styled-components";
import { Geometry } from "@turf/helpers";
import WithHeader from "../../Layout/WithHeader";
import MapSidebar from "./MapSidebar";
import { StepProps, Steps, DatePicker } from "antd";
import StepMarker from "./StepMarker";
import { useGenerateItinerary } from "../../hooks/useGenerateItinerary";
import dayjs from "dayjs";
import { Toaster } from "react-hot-toast";
import {
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk
} from "@mui/icons-material";
import BudgetComponent from "./Budget";
import { useFetchCityInfo } from "../../hooks/useFetchCityInfo";
import { useSaveTrip } from "../../hooks/useSaveTrip";

enum TAB {
  ITINERARY,
  INFO,
  BUDGET
}

const BaseMap: FC = () => {
  const ref = React.useRef<number>(0);
  const mapRef = React.useRef<MapRef>(null);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [routes, setRoutes] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  // const searchState = useSelector<RootState, SearchState>(
  //   (state) => state.search
  // );
  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [itineraryDay, setItineraryDay] = useState<number>(0);
  const [tripData, setTripData] = useState<{
    lat: number;
    lon: number;
    cityName: string;
  }>({
    lat: BaseMapPropsDefault.lat,
    lon: BaseMapPropsDefault.lng,
    cityName: BaseMapPropsDefault.cityName
  });
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: "selection"
    }
  ]);
  const [markers, setMarkers] = useState<React.ReactElement[]>([]);
  const [hotel, setHotel] = useState<React.ReactElement[]>([]);
  const [cursor, setCursor] = useState<string>("grab");
  const [isHotelSelectionActivated, setIsHotelSelectionActivated] =
    useState<boolean>(false);
  const [isTripSaveModalOpen, toggleIsTripSaveModalOpen] =
    useState<boolean>(false);

  const [tab, setTab] = useState<TAB>(TAB.ITINERARY);
  const [cityInfo, setCityInfo] = useState<any[] | null>(null);
  const [transportMode, setTransportMode] = useState<TransportType>(
    TransportType.WALKING
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [generateItineraryStatus, generateItinerary] = useGenerateItinerary();
  const [fetchCityInfoStatus, fetchCityInfo] = useFetchCityInfo();
  const [saveTripStatus, saveTrip] = useSaveTrip();
  const [steps, setSteps] = useState<StepProps[][]>([]);
  const [jsonData, setJsonData] = useState<{
    features: {
      geometry: {
        coordinates: number[];
      };
      properties: {
        name: string;
        href: string;
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

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e.features || !e.features[0]) return;
    if (e.features[0].layer.id === "city-layer") {
      setTripData({
        cityName: e.features[0].properties?.name || "",
        lat: (e.features[0].geometry as any).coordinates[1] || 0,
        lon: (e.features[0].geometry as any).coordinates[0] || 0
      });
      mapRef.current?.flyTo({
        center: [
          (e.features[0].geometry as any).coordinates[0] || 0,
          (e.features[0].geometry as any).coordinates[1] || 0
        ],
        zoom: 10,
        duration: 1000
      });
    } else if (e.features[0].layer.id.includes("routeline-active")) {
      setItineraryDay(
        parseInt(e.features[0].layer.id.replace("routeline-active", ""))
      );
    }
  };

  const handleMapDblClick = async (e: MapLayerMouseEvent) => {
    if (isHotelSelectionActivated) {
      const newMarker = (
        <Marker
          key={markers.length}
          longitude={e.lngLat.lng}
          latitude={e.lngLat.lat}
        >
          <HotelMarker
            width={36}
            height={36}
            alt={"hotel"}
            src={
              "https://em-content.zobj.net/source/microsoft-teams/337/house_1f3e0.png"
            }
          />
        </Marker>
      );
      setHotel([newMarker]);
      setTripData((prev) => ({
        cityName: prev.cityName,
        lat: e.lngLat.lat,
        lon: e.lngLat.lng
      }));
      setIsHotelSelectionActivated(false);
    }
  };

  useEffect(() => {
    if (range.length === 0 || !range[0].endDate || !range[0].startDate) return;
    const diffTime = Math.abs(
      range[0]?.endDate?.getTime() - range[0]?.startDate?.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLength(diffDays);
  }, [range]);

  const fetchCoordinates = useCallback(
    async (lng: number, lat: number, transportMode: TransportType) => {
      if (!lng && !lat) return;
      try {
        const resJsonWithStatus = await generateItinerary({
          lon: lng ?? 0,
          lat: lat ?? 0,
          days: length,
          transportMean: transportMode
        });

        setMarkers([]);
        setDropoffs({});
        setRoutes({});
        setCityInfo(null);
        setTab(TAB.ITINERARY);
        if (resJsonWithStatus[0] === false) {
          mapRef.current?.flyTo({
            center: [
              resJsonWithStatus[1].features[0].features[0].geometry
                .coordinates[0] as unknown as number,
              resJsonWithStatus[1].features[0].features[0].geometry
                .coordinates[1] as unknown as number
            ],
            zoom: 12
          });
        }
        setSteps([]);
        const resJson = resJsonWithStatus[1];

        if (resJson.features) {
          for (const features of resJson.features) {
            const i = resJson.features.indexOf(features);
            if (!features) continue;
            setDropoffs((old) => ({
              ...old,
              [i]: features as unknown as FeatureCollection
            }));
            const tripLegData = resJson.routes[i].tripLegData;
            setSteps((old) => {
              old.push(
                features.features.map((feature, featureIndex) => {
                  return {
                    title: <b>{feature.properties.name}</b>,
                    description: (
                      <>
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: 500,
                            padding: "12px",
                            alignItems: "end",
                            justifyContent: "center",
                            backgroundColor: "gr"
                          }}
                        >
                          {featureIndex !== 0 || hotel.length > 0 ? (
                            <div className="transportInfo">
                              {transportMode === TransportType.DRIVING ? (
                                <DirectionsCar sx={{ height: 16, width: 16 }} />
                              ) : null}
                              {transportMode === TransportType.CYCLING ? (
                                <DirectionsBike
                                  sx={{ height: 16, width: 16 }}
                                />
                              ) : null}
                              {transportMode === TransportType.WALKING ? (
                                <DirectionsWalk
                                  sx={{ height: 16, width: 16 }}
                                />
                              ) : null}
                              <b>
                                {tripLegData[featureIndex].distances}m |{" "}
                                {tripLegData[featureIndex].durations} min
                              </b>
                            </div>
                          ) : null}
                          <div className="flexRow">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse eu venenatis odio. Pellentesque
                              ultrices vel leo sed sollicitudin.
                            </p>
                            <img
                              src={feature.images[0] ?? ""}
                              height={132}
                              width={200}
                            />
                          </div>
                        </Card>
                      </>
                    ),
                    status: "finish",
                    icon: (
                      <StepMarker
                        dayIndex={i}
                        featureIndex={featureIndex}
                        onClick={() => {
                          mapRef.current?.flyTo({
                            center: [
                              feature.geometry
                                .coordinates[0] as unknown as number,
                              feature.geometry
                                .coordinates[1] as unknown as number
                            ],
                            zoom: 16,
                            duration: 1000
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setItineraryDay(i);
                        }}
                      />
                    )
                  };
                })
              );
              return old;
            });
          }
        }

        if (resJson.routes) {
          for (const routes1 of resJson.routes) {
            const i = resJson.routes.indexOf(routes1);
            if (!routes1) continue;
            setRoutes((old) => ({
              ...old,
              [i]: routes1.route
            }));
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [length, token, hotel]
  );

  useEffect(() => {
    setMarkers([]);
    dropoffs[itineraryDay]?.features?.forEach((element, i: number) => {
      setMarkers((old) => [
        ...old,
        <Marker
          key={element?.properties?.name + i}
          latitude={
            (element.geometry as Partial<Geometry> & { coordinates: number[] })
              .coordinates[1]
          }
          longitude={
            (element.geometry as Partial<Geometry> & { coordinates: number[] })
              .coordinates[0]
          }
          popup={new Popup({
            offset: 20,
            className: "markerPopup",
            anchor: "bottom",
            closeOnMove: true,
            closeOnClick: true
          })
            // .setText(element?.properties?.name)
            .setHTML(
              `<h3>${
                element?.properties?.name
              }</h3><img width="200" height="100" src="${`${
                (element as any).images[0] ||
                "https://www.freeiconspng.com/thumbs/ghost-icon/ghost-icon-14.png"
              }`}" />`
            )}
        >
          {/* <CustomMarker element={element as Feature} /> */}
          <StepMarker dayIndex={itineraryDay} featureIndex={i} />
        </Marker>
      ]);
    });
  }, [dropoffs, itineraryDay]);

  useEffect(() => {
    if (!ref.current || generateItineraryStatus.loading) {
      // fetchCoordinates(cityName, lng, lat).catch((err) => console.log(err));
      ref.current = 1;
    } else {
      fetchCoordinates(tripData.lon, tripData.lat, transportMode).catch((err) =>
        console.log(err)
      );
    }
    setItineraryDay(0);
  }, [tripData, fetchCoordinates, transportMode]);

  return (
    <WithHeader>
      <>
        <MapSidebar
          hotelMode={isHotelSelectionActivated}
          toggleHotelMode={setIsHotelSelectionActivated}
          setTransportMode={setTransportMode}
          transportMode={transportMode}
          toggleIsTripSaveModalOpen={toggleIsTripSaveModalOpen}
        />
        <div className="searchBar">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jsonData?.features ?? []}
            getOptionLabel={(option) => option.properties.name}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.properties.name === value.properties.name
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setTripData({
                  cityName: newValue.properties.name,
                  lat: newValue.geometry.coordinates[1],
                  lon: newValue.geometry.coordinates[0]
                });
                mapRef.current?.flyTo({
                  center: [
                    newValue.geometry.coordinates[0],
                    newValue.geometry.coordinates[1]
                  ],
                  zoom: 12
                });
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" key={params.id} />
            )}
          />
          <DatePicker.RangePicker
            size={"middle"}
            placement="bottomLeft"
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
        </div>
        <div className="mapWrapper" id="mapWrapper">
          <div
            id="mapContainer"
            className={
              "map" +
              (isHotelSelectionActivated ? " mapContainerHotelSelectionOn" : "")
            }
          >
            {generateItineraryStatus.loading ? (
              <div className="itineraryLoading">
                {" "}
                <p>
                  <b>
                    YOUR TRIP TO {tripData.cityName.toUpperCase()} IS BEING
                    GENERATED
                  </b>
                </p>
                <span className="loader"></span>
              </div>
            ) : null}
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                latitude: tripData.lat,
                longitude: tripData.lon,
                zoom: 2
              }}
              ref={mapRef}
              cursor={cursor}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              projection={"globe"}
              interactiveLayerIds={[
                "city-layer",
                ...Object.keys(routes)
                  .map((key) => parseInt(key))
                  .map((key) => `routeline-active${key}`)
              ]}
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={() => setCursor("grab")}
              onClick={handleMapClick}
              onDblClick={handleMapDblClick}
              minZoom={1}
            >
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
              <NavigationControl />
              <ScaleControl maxWidth={100} unit="metric" />

              <Source
                id="cities"
                type="geojson"
                data={`${process.env.REACT_APP_URI}/data.geojson`}
              />
              <Layer
                id="city-layer"
                type="circle"
                source="cities"
                paint={{
                  "circle-radius": 4,
                  "circle-stroke-width": 1,
                  "circle-color": "red",
                  "circle-stroke-color": "white"
                }}
              />

              {markers?.map((marker) => marker)}
              {hotel?.map((marker) => marker)}
              <Routes
                routes={routes}
                colors={weekColors}
                itineraryDay={itineraryDay}
              />
            </Map>
          </div>
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
              <div
                onClick={async () => {
                  setTab(TAB.INFO);
                  const citySlug = jsonData?.features.find(
                    (feature) => feature.properties.name === tripData.cityName
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
              </div>
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
              ? generateItineraryStatus.loading
                ? null
                : Array.from(Array(length).keys()).map((day) => (
                    <>
                      <UnderLine itineraryDay={day}>
                        {format(
                          addDays(range[0]?.startDate || new Date(), day),
                          "EEEE, do MMMM"
                        )}{" "}
                      </UnderLine>
                      <Steps
                        items={steps.length ? steps[day] : []}
                        direction="vertical"
                        current={10000}
                      />
                      <Divider />
                    </>
                  ))
              : null}

            {tab === TAB.INFO ? (
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
                      <b>Spoken languages:</b>{" "}
                      {cityInfo[11].data[2].string_value}
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
            ) : null}

            {tab === TAB.BUDGET ? <BudgetComponent /> : null}
          </div>
        </div>
        <Toaster />

        {isTripSaveModalOpen ? (
          <div className="tripSaveModal">
            <div className="tripSaveModalContent">
              <h2>Do you want to save your trip?</h2>
              <p>
                On our free plan you can only save up to 3 trips. If you want to
                save more, you can upgrade to our premium plan.
              </p>
              {saveTripStatus.loading ? <CircularProgress /> : null}
              <div className="tripSaveModalButtons">
                <button
                  type="button"
                  className="tripSaveModalButton"
                  onClick={() => toggleIsTripSaveModalOpen(false)}
                  disabled={saveTripStatus.loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saveTripStatus.loading}
                  className="tripSaveModalButton"
                  onClick={async () => {
                    await saveTrip({
                      startDate: range[0]?.startDate?.getTime() || 0,
                      endDate: range[0]?.endDate?.getTime() || 0,
                      housingCoordinates: [
                        hotel[0]?.props.longitude || 0,
                        hotel[0]?.props.latitude || 0
                      ],
                      cityName: tripData.cityName,
                      tripData: {
                        dropoffs,
                        routes
                      }
                    });
                    toggleIsTripSaveModalOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </WithHeader>
  );
};

const HotelMarker = styled.img`
  z-index: 999;
  position: relative;
`;

const UnderLine = styled.h3<UnderLineProps>`
  background-repeat: no-repeat;
  background-size: 100% 0.4em;
  background-position: 15% 88%;
  transition: background-size 0.25s ease-in;
  backgroundimage: linear-gradient(
    120deg,
    ${(props) => weekColors[props.itineraryDay].primary} 0%,
    ${(props) => weekColors[props.itineraryDay].secondary} 30%,
    ${(props) => weekColors[props.itineraryDay].secondary} 70%,
    ${(props) => weekColors[props.itineraryDay].primary} 100%
  );

  &:hover {
    background-size: 100% 88%;
  }
`;

export default BaseMap;
