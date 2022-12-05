import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./index.scss";

const BaseMap = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;
  const ref = React.useRef<number>(0);

  useEffect(() => {
    if (ref.current) return;
    ref.current = 1;
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    const marker = new mapboxgl.Marker()
      .setLngLat([-74.499999, 40.000001])
      .addTo(map);
  }, []);

  return <div id="mapContainer" className="map"></div>;
};

export default BaseMap;
