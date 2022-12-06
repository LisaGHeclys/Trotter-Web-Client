import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./index.scss";

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
  cityName: "Paris",
};

const BaseMap = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;
  const ref = React.useRef<number>(0);
  const { length, price, lng, lat, cityName } = BaseMapPropsDefault;

  useEffect(() => {
    if (ref.current) return;
    ref.current = 1;
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: 2,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
  }, [lat, lng]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div className="mapSidebar">
        <h1>Go world trotting!</h1>
        <p>
          <b>{length} days</b> in {cityName}!
        </p>
        <div className="flexRow">
          <label>From:</label>
          <input type="date" name="from" id="from" />

          <label>To:</label>
          <input type="date" name="to" id="to" />
        </div>
        <h5>Eiffel Tower</h5>
        <img
          width={250}
          height={200}
          alt={"Eiffel Tower"}
          src="https://lh3.googleusercontent.com/cC6_lOzZ9R9sfxxJosTORlW8GjW5bKxiHMeo_8LIVH3_gfStKc9ocqbjpcwaJZY8Cm6e-feRKwArtF8fK6sILmTg3KQdd01U3vLITByXCtYDEHe0HTG3-5DdYes"
        />
        <br />
        <b>Only for {price}€!</b>
      </div>
      <div id="mapContainer" className="map"></div>
    </div>
  );
};

export default BaseMap;
