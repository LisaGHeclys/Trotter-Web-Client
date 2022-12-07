import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { DateRange } from "react-date-range";
import "./index.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Range } from "react-date-range/index";

type BaseMapProps = {
  length: number;
  price: number;
  lng: number;
  lat: number;
  cityName: string;
};

const BaseMapPropsDefault: BaseMapProps = {
  length: 3,
  price: 0,
  lat: 2.333333,
  lng: 48.866667,
  cityName: "Paris"
};

const BaseMap = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;
  const ref = React.useRef<number>(0);
  const [cityName, setCityName] = useState<string>(
    BaseMapPropsDefault.cityName
  );
  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [price, setPrice] = useState<number>(BaseMapPropsDefault.price);
  const [lng, setLng] = useState<number>(BaseMapPropsDefault.lng);
  const [lat, setLat] = useState<number>(BaseMapPropsDefault.lat);
  const [src, setSrc] = useState<string>("https://picsum.photos/200/300");
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection"
    }
  ]);

  useEffect(() => {
    if (range.length === 0 || !range[0].endDate || !range[0].startDate) return;
    const diffTime = Math.abs(
      range[0]?.endDate?.getTime() - range[0]?.startDate?.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLength(diffDays);
  }, [range]);

  useEffect(() => {
    if (ref.current) return;
    ref.current = 1;
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: 2
    });
    const nav = new mapboxgl.NavigationControl();
    map.setProjection({
      name: "globe"
    });
    map.addControl(nav, "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );
    map.on("style.load", () => {
      map.setFog({});
    });
    map.on("load", () => {
      map.addSource("city", {
        type: "geojson",
        data: "http://localhost:3000/data.geojson"
      });

      map.addLayer({
        id: "city-layer",
        type: "circle",
        source: "city",
        paint: {
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white"
        }
      });
    });
    map.on("click", "city-layer", (e) => {
      if (!e.features || e.features.length === 0) return;
      console.log(e.features[0]);
      map.easeTo({
        center: [
          e.features[0].properties?.longitude,
          e.features[0].properties?.latitude
        ],
        zoom: 7
      });
      setCityName(e.features[0].properties?.name || "");
      setLng(e.features[0].properties?.longitude || 0);
      setLat(e.features[0].properties?.latitude || 0);
      setPrice(0);
    });
    map.on("mouseenter", "city-layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "city-layer", () => {
      map.getCanvas().style.cursor = "";
    });
  }, [lat, lng]);

  useEffect(() => {
    setSrc(
      `https://picsum.photos/${Math.floor(Math.random() * 100) + 200}/${
        Math.floor(Math.random() * 100) + 200
      }`
    );
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
          onChange={(item) =>
            setRange([
              {
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
                key: "selection"
              }
            ])
          }
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="dateRange"
          minDate={new Date()}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          weekStartsOn={1}
        />
        <h5>Some monument</h5>
        <img width={250} height={200} alt={"Eiffel Tower"} src={src} />
        <br />
        <b>Only for {price}€!</b>
      </div>
      <div id="mapContainer" className="map"></div>
    </div>
  );
};

export default BaseMap;
