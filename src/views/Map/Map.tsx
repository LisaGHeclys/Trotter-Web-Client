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
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { format, addDays } from "date-fns";
import { SearchState } from "../../reducers/search.reducers";
import { BaseMapPropsDefault, getCoordinates, weekColors } from "./Maps.utils";
import { UnderLineProps } from "./Maps.type";
import styled from "styled-components";
import { Geometry } from "@turf/helpers";
import WithHeader from "../../Layout/WithHeader";
import MapSidebar from "./MapSidebar";
import { StepProps, Steps, DatePicker } from "antd";
import StepMarker from "./StepMarker";
import { useGenerateItinerary } from "../../hooks/useGenerateItinerary";
import dayjs from "dayjs";
import { Toaster } from "react-hot-toast";

const BaseMap: FC = () => {
  const ref = React.useRef<number>(0);
  const mapRef = React.useRef<MapRef>(null);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [routes, setRoutes] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const searchState = useSelector<RootState, SearchState>(
    (state) => state.search
  );
  const [cityName, setCityName] = useState<string>(
    searchState.place === "" ? BaseMapPropsDefault.cityName : searchState.place
  );
  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [itineraryDay, setItineraryDay] = useState<number>(0);
  const [lng, setLng] = useState<number>(BaseMapPropsDefault.lng);
  const [lat, setLat] = useState<number>(BaseMapPropsDefault.lat);
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
  const token = useSelector((state: RootState) => state.auth.token);
  const [generateItineraryStatus, generateItinerary] = useGenerateItinerary();
  const [steps, setSteps] = useState<StepProps[][]>([]);
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

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e.features || !e.features[0]) return;
    if (e.features[0].layer.id === "city-layer") {
      setCityName(e.features[0].properties?.name || "");
      setLng((e.features[0].geometry as any).coordinates[0] || 0);
      setLat((e.features[0].geometry as any).coordinates[1] || 0);
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
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
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
    async (cityName?: string, lng?: number, lat?: number) => {
      if (!cityName && !lng && !lat) return;
      if (cityName) {
        const res = await getCoordinates(cityName);
        setLng(res.lon);
        setLat(res.lat);
        mapRef.current?.flyTo({
          center: [res.lon, res.lat],
          zoom: 12
        });
      }
      try {
        const resJsonWithStatus = await generateItinerary({
          lon: lng ?? 0,
          lat: lat ?? 0,
          days: length
        });

        setMarkers([]);
        setDropoffs({});
        setRoutes({});
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
                            flexDirection: "row",
                            maxWidth: 500,
                            padding: "12px",
                            gap: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "gr"
                          }}
                        >
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
              [i]: routes1
            }));
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [length, token]
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
    if (!ref.current) {
      fetchCoordinates(cityName, lng, lat).catch((err) => console.log(err));
      ref.current = 1;
    } else {
      fetchCoordinates(undefined, lng, lat).catch((err) => console.log(err));
    }
    setItineraryDay(0);
  }, [lat, lng, fetchCoordinates, cityName]);

  return (
    <WithHeader>
      <>
        <MapSidebar
          hotelMode={isHotelSelectionActivated}
          toggleHotelMode={setIsHotelSelectionActivated}
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
                setCityName(newValue.properties.name);
                setLat(newValue.geometry.coordinates[1]);
                setLng(newValue.geometry.coordinates[0]);
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
                    YOUR TRIP TO {cityName.toUpperCase()} IS BEING GENERATED
                  </b>
                </p>
                <span className="loader"></span>
              </div>
            ) : null}
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                latitude: lat,
                longitude: lng,
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
            <Typography variant="h5" fontWeight={"bolder"}>
              ITINERARY
            </Typography>
            {generateItineraryStatus.loading
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
                ))}
          </div>
        </div>
        <Toaster />
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
