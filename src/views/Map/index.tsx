import React, { FC, useCallback, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "./index.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Range } from "react-date-range";
import { useSelector } from "react-redux";
import { getCoordinates, newDropoffs } from "./functions";
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
import { Popup } from "mapbox-gl";
import Routes from "./Routes";
import Dropoffs from "./Dropoffs";
import { RootState } from "../../store";
import { Button } from "@mui/material";

type BaseMapProps = {
  length: number;
  price: number;
  lng: number;
  lat: number;
  cityName: string;
};

export type GeoJsonRes = {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      name: string;
    };
  }[];
};

const BaseMapPropsDefault: BaseMapProps = {
  length: 3,
  price: 0,
  lng: 2.333333,
  lat: 48.866667,
  cityName: "Paris"
};

const weekColors: { primary: string; secondary: string }[] = [
  { primary: "red", secondary: "lightcoral" },
  { primary: "blue", secondary: "lightblue" },
  { primary: "green", secondary: "lightgreen" },
  { primary: "yellow", secondary: "lightyellow" },
  { primary: "orange", secondary: "lightorange" },
  { primary: "purple", secondary: "lightpurple" },
  { primary: "brown", secondary: "lightbrown" }
];

const BaseMap: FC = () => {
  const ref = React.useRef<number>(0);
  const mapRef = React.useRef<MapRef>(null);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [routes, setRoutes] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const state = useSelector<RootState, RootState>((state) => state);
  const [cityName, setCityName] = useState<string>(
    state.search.place === ""
      ? BaseMapPropsDefault.cityName
      : state.search.place
  );
  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [price /*_setPrice*/] = useState<number>(BaseMapPropsDefault.price);
  const [lng, setLng] = useState<number>(BaseMapPropsDefault.lng);
  const [lat, setLat] = useState<number>(BaseMapPropsDefault.lat);
  const [src, setSrc] = useState<string>("https://picsum.photos/200/300");
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
        resJson.features.forEach((element, i: number) => {
          setMarkers((old) => [
            ...old,
            <Marker
              key={element.properties.name + i}
              latitude={element.geometry.coordinates[1]}
              longitude={element.geometry.coordinates[0]}
              popup={new Popup({
                offset: 20,
                className: "markerPopup",
                anchor: "bottom",
                closeOnMove: true,
                closeOnClick: true
              }).setText(element.properties.name)}
            />
          ]);
        });

        const a = resJson.features.filter((_feature, i: number) => {
          //! TO REFORMAT
          return i <= 5;
        });
        const b = resJson.features.filter((_feature, i: number) => {
          return i > 5 && i <= 10;
        });
        const c = resJson.features.filter((_feature, i: number) => {
          return i > 10;
        });
        const coords = [lng, lat];
        resJson.features = a;
        setDropoffs((old) => ({
          ...old,
          dropoffs: resJson as unknown as FeatureCollection
        }));
        let route = await newDropoffs(coords as number[], resJson);
        setRoutes((old) => ({ ...old, route: route }));
        resJson.features = b;
        setDropoffs((old) => ({
          ...old,
          dropoffs2: resJson as unknown as FeatureCollection
        }));
        route = await newDropoffs(coords as number[], resJson);
        setRoutes((old) => ({ ...old, route2: route }));
        resJson.features = c;
        setDropoffs((old) => ({
          ...old,
          dropoffs3: resJson as unknown as FeatureCollection
        }));
        route = await newDropoffs(coords as number[], resJson);
        setRoutes((old) => ({ ...old, route3: route }));
      } catch (e) {
        console.log(e);
      }
    },
    [length, token]
  );

  useEffect(() => {
    if (!ref.current) {
      fetchCoordinates(cityName, lng, lat).catch((err) => console.log(err));
      ref.current = 1;
    } else
      fetchCoordinates(undefined, lng, lat).catch((err) => console.log(err));
  }, [lat, lng, fetchCoordinates, cityName]);

  useEffect(() => {
    setSrc(
      `https://picsum.photos/${Math.floor(Math.random() * 100) + 200}/${
        Math.floor(Math.random() * 100) + 200
      }`
    );
    setMarkers([]);
  }, [cityName]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <div className="mapSidebar">
        <h1>Go world trotting!</h1>
        <p>
          <b>{length} days</b> in {cityName}!
        </p>
        <DateRange
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
          className="dateRange"
          minDate={new Date()}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          weekStartsOn={1}
        />
        <Button
          variant="contained"
          onClick={() => setIsHotelSelectionActivated((prev) => !prev)}
          className={isHotelSelectionActivated ? "hotelSelectionActivated" : ""}
        >
          Add my hôtel
        </Button>
        <label style={{ fontSize: 11, marginTop: 6 }}>
          Double click on the map when the dd an hotel option is on to register
          your hotel
        </label>
        <h5>Some monument</h5>
        <img width={250} height={200} alt={"Eiffel Tower"} src={src} />
        <br />
        <b>Only for {price}€!</b>
      </div>
      <div id="mapContainer" className="map">
        {/* {isHotelSelectionActivated && <div className="hotelSelectionFilter"/>} */}
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
          onClick={async (e) => {
            if (
              !e.features ||
              (e.features[0]?.layer?.id ?? "") !== "city-layer"
            )
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
          }}
          onDblClick={async (e) => {
            if (isHotelSelectionActivated) {
              const newMarker = (
                <Marker
                  key={markers.length}
                  longitude={e.lngLat.lng}
                  latitude={e.lngLat.lat}
                >
                  <img
                    width={36}
                    height={36}
                    alt={"hotel"}
                    src={
                      "https://em-content.zobj.net/source/microsoft-teams/337/house_1f3e0.png"
                    }
                    className="hotelMarker"
                  />
                </Marker>
              );
              setHotel((old) => [newMarker]);
              setLng(e.lngLat.lng);
              setLat(e.lngLat.lat);
              setIsHotelSelectionActivated(false);
            }
          }}
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

          {markers.map((marker) => marker)}
          {hotel.map((marker) => marker)}

          <Dropoffs dropoffs={dropoffs} colors={weekColors} />
          <Routes routes={routes} colors={weekColors} />
        </Map>
      </div>
    </div>
  );
};

export default BaseMap;
