import { Map } from "react-map-gl";
import React from "react";

const MapPreview = () => {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      // projection={""}
    />
  );
};

export default MapPreview;
