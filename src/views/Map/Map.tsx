import React, { FC, useCallback, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
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
import { Button, IconButton } from "@mui/material";
import { format, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { SearchState } from "../../reducers/search.reducers";
import { BaseMapPropsDefault, getCoordinates, weekColors } from "./Maps.utils";
import { FeatureDTO, GeoJsonRes, UnderLineProps } from "./Maps.type";
import styled from "styled-components";
import { Geometry } from "@turf/helpers";
import { useTranslation } from "react-i18next";

const BaseMap: FC = () => {
  const { t } = useTranslation();
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

  const decrementItineraryDay = useCallback((old: number) => {
    if (old - 1 >= 0) setItineraryDay(old - 1);
  }, []);

  const incrementItineraryDay = useCallback(
    (old: number) => {
      if (old + 1 < length) setItineraryDay(old + 1);
    },
    [length]
  );

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e.features || (e.features[0]?.layer?.id ?? "") !== "city-layer")
      return;
    setCityName(e.features[0].properties?.name || "");
    setLng(e.features[0].properties?.longitude || 0);
    setLat(e.features[0].properties?.latitude || 0);
    mapRef.current?.flyTo({
      center: [
        e.features[0].properties?.longitude || 0,
        e.features[0].properties?.latitude || 0
      ],
      zoom: 10,
      duration: 1000
    });
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
        const ress = await fetch(process.env.REACT_APP_SERVER_URI + "/IA", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`
          },
          body: JSON.stringify({
            lon: lng,
            lat: lat,
            days: length
          })
        });
        setMarkers([]);
        setDropoffs({});
        setRoutes({});
        const resJson: GeoJsonRes = await ress.json();

        if (resJson.features) {
          for (const features of resJson.features) {
            const i = resJson.features.indexOf(features);
            if (!features) continue;
            setDropoffs((old) => ({
              ...old,
              [i]: features as unknown as FeatureCollection
            }));
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
    console.log(dropoffs);
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
              }</h3><img width="200" height="100" src="${`https://picsum.photos/${
                Math.floor(Math.random() * 100) + 200
              }/${Math.floor(Math.random() * 100) + 200}`}" />`
            )}
        >
          {element?.properties?.kinds.includes("religion") ? (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={"https://static.thenounproject.com/png/158909-200.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("museums") ? (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={"../../assets/markers/Museum.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("natural_springs") ? (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={"../../assets/markers/Nature.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("shops") ? (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={"../../assets/markers/Shop.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("architecture") ? (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={"../../assets/markers/Architecture.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes(
              "theatres_and_entertainments"
            ) ? (
            <img
              width={36}
              height={36}
              alt={"theaters"}
              src={"../../assets/markers/Theater.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("foods") ? (
            <img
              width={36}
              height={36}
              alt={"Foods"}
              src={"../../assets/markers/Food.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("banks") ? (
            <img
              width={36}
              height={36}
              alt={"Banks"}
              src={"../../assets/markers/Bank.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("transport") ? (
            <img
              width={36}
              height={36}
              alt={"Transports"}
              src={"../../assets/markers/Transport.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinsds.includes("beaches") ? (
            <img
              width={36}
              height={36}
              alt={"Beaches"}
              src={"../../assets/markers/Beach.png"}
              className="hotelMarker"
            />
          ) : element?.properties?.kinds.includes("bridges") ? (
            <img
              width={36}
              height={36}
              alt={"Bridges"}
              src={"../../assets/markers/Bridge.png"}
              className="hotelMarker"
            />
          ) : (
            <img
              width={36}
              height={36}
              alt={"hotel"}
              src={
                "https://images-ext-2.discordapp.net/external/E1myNIG4k9PFEDvf0YyKxLwLvtz9uOkJCAkuCwojj6k/https/cdn-icons-png.flaticon.com/512/10175/10175378.png?width=1024&height=1024"
              }
              className="hotelMarker"
            />
          )}
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
    <div className="mapWrapper" id="mapWrapper">
      <div className="mapSideMenu">
        <h1>{t("description.mapPart1")}</h1>
        <p>
          <b>
            {length} {t("description.mapPart2")}
          </b>{" "}
          {t("description.mapPart3")} {cityName}!
        </p>
        <DateRangeWrapper
          editableDateInputs={true}
          onChange={(item) => {
            if (
              item.selection.endDate &&
              item.selection.startDate &&
              Math.abs(
                item.selection.endDate.getTime() -
                  item.selection.startDate.getTime()
              ) >=
                7 * 24 * 60 * 60 * 1000
            ) {
              return;
            } else
              setRange([
                {
                  startDate: item.selection.startDate,
                  endDate: item.selection.endDate,
                  key: "selection"
                }
              ]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={range}
          minDate={new Date()}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          weekStartsOn={1}
          showDateDisplay={false}
        />
        <Button
          variant="contained"
          onClick={() => setIsHotelSelectionActivated((prev) => !prev)}
          className={isHotelSelectionActivated ? "hotelSelectionActivated" : ""}
        >
          {t("description.mapPart4")}
        </Button>
        <label style={{ fontSize: 11, marginTop: 6 }}>
          {t("description.mapPart5")}
        </label>
        <Row>
          <IconButton onClick={() => decrementItineraryDay(itineraryDay)}>
            <ChevronLeft />
          </IconButton>
          <UnderLine itineraryDay={itineraryDay}>
            {format(
              addDays(range[0]?.startDate || new Date(), itineraryDay),
              "dd/MM/yyyy"
            )}{" "}
          </UnderLine>
          <IconButton onClick={() => incrementItineraryDay(itineraryDay)}>
            <ChevronRight />
          </IconButton>
        </Row>
        {dropoffs[itineraryDay]?.features?.map((feature: FeatureDTO, i) => {
          return (
            <InterestsPicture key={i}>
              <p>{feature.properties?.name}</p>
              <img
                src={`https://picsum.photos/${
                  Math.floor(Math.random() * 100) + 200
                }/${Math.floor(Math.random() * 100) + 200}`}
                alt="dropoff"
                title={feature.properties?.name}
                width={200}
                height={100}
              />
            </InterestsPicture>
          );
        })}
      </div>
      <div
        id="mapContainer"
        className={
          "map" +
          (isHotelSelectionActivated ? " mapContainerHotelSelectionOn" : "")
        }
      >
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 2
          }}
          ref={mapRef}
          cursor={cursor}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          projection={"globe"}
          fog={{
            color: "rgb(156, 180, 205)",
            "horizon-blend": 0.16,
            range: [0.4, 0.9]
          }}
          interactiveLayerIds={["city-layer"]}
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={() => setCursor("grab")}
          onClick={handleMapClick}
          onDblClick={handleMapDblClick}
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
              "circle-radius": 6,
              "circle-stroke-width": 2,
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
    </div>
  );
};

const DateRangeWrapper = styled(DateRange)`
  transform: scale(0.8);

  & > div > div > span > input {
    height: 24px;
    margin: 0;
  }
`;

const HotelMarker = styled.img`
  z-index: 999;
  position: relative;
`;

const InterestsPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
