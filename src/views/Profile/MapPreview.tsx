import { Map, Marker } from "react-map-gl";
import React, { useEffect, useState } from "react";
import { Trip } from "../../reducers/trips.reducers";
import { GeoJsonRes } from "../Map/Maps.type";
import { FeatureCollection, Geometry } from "@turf/helpers";
import StepMarker from "../Map/StepMarker";
import { Popup } from "mapbox-gl";
import Routes from "../Map/Routes";
import { weekColors } from "../Map/Maps.helpers";

type MapPreviewProps = {
  trip: Trip;
};

const MapPreview = ({ trip }: MapPreviewProps) => {
  const [hasComputed, setHasComputed] = useState(false);
  const [routes, setRoutes] = useState({});
  const [markers, setMarkers] = useState<React.ReactElement[]>([]);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});

  const computeMapData = (resJson: GeoJsonRes) => {
    setHasComputed(true);
    let dropo: {
      [id: string]: FeatureCollection;
    } = {};
    if (resJson.features) {
      for (const features of resJson.features) {
        const i = resJson.features.indexOf(features);
        if (!features) continue;
        dropo = {
          ...dropo,
          [i]: features as unknown as FeatureCollection
        };
      }
    }
    setDropoffs(dropo);

    let tempRoutes = {};
    if (resJson.routes) {
      for (const routes1 of resJson.routes) {
        const i = resJson.routes.indexOf(routes1);
        if (!routes1) continue;
        tempRoutes = {
          ...tempRoutes,
          [i]: routes1.route
        };
      }
    }
    setRoutes(tempRoutes);

    Object.keys(dropoffs).forEach((key) => {
      dropoffs[key]?.features?.forEach((element, i: number) => {
        const pic = element?.properties?.photos?.length
          ? element?.properties?.photos[0].prefix +
            "original" +
            element?.properties?.photos[0].suffix
          : null;
        setMarkers((old) => [
          ...old,
          <Marker
            key={element?.properties?.name + i}
            latitude={
              (
                element.geometry as Partial<Geometry> & {
                  coordinates: number[];
                }
              ).coordinates[1]
            }
            longitude={
              (
                element.geometry as Partial<Geometry> & {
                  coordinates: number[];
                }
              ).coordinates[0]
            }
            popup={new Popup({
              offset: 20,
              className: "markerPopup",
              anchor: "bottom",
              closeOnMove: true,
              closeOnClick: true
            }).setHTML(
              `<h3>${
                element?.properties?.name
              }</h3><img width="200" height="100" src="${`${
                pic ||
                "https://www.freeiconspng.com/thumbs/ghost-icon/ghost-icon-14.png"
              }`}" />`
            )}
          >
            {/* <CustomMarker element={element as Feature} /> */}
            <StepMarker dayIndex={parseInt(key)} featureIndex={i} />
          </Marker>
        ]);
      });
    });
  };

  useEffect(() => {
    console.log("hey");
    if (!hasComputed) {
      computeMapData(trip.tripData);
    }
  }, []);

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      // projection={""}
      interactive={false}
      initialViewState={{
        latitude: trip.tripData.features[0].features[0].geometry.coordinates[1],
        longitude:
          trip.tripData.features[0].features[0].geometry.coordinates[0],
        zoom: 10
      }}
    >
      {markers?.map((marker) => marker)}
      <Routes routes={routes} colors={weekColors} itineraryDay={0} />
    </Map>
  );
};

export default MapPreview;
