import { feature, featureCollection } from "@turf/helpers";
import { GeoJsonRes } from ".";
import store from "../../store";

export const getItinerary = async (data: { lat: number; lng: number }) => {
  const { lat, lng } = data;
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URI}/itinerary/get?lat=${lat}&lng=${lng}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().auth?.token || ""}`
      }
    }
  );
  const json = await response.json();
  return json;
};

export const getCoordinates = async (data: string) => {
  const response = await fetch(
    `https://api.opentripmap.com/0.1/en/places/geoname?name=${data}&apikey=${process.env.REACT_APP_OTM_KEY}
        `,
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  );
  const json = await response.json();
  return json;
};

function assembleQueryURL(
  hotelCoordinates: number[],
  poiCoordinates: GeoJsonRes
) {
  const distribs = poiCoordinates.features.map((feature, index) => {
    return `${feature.geometry.coordinates.join(",")}`;
  });
  distribs.unshift(hotelCoordinates.join(","));

  return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${distribs.join(
    ";"
  )}?distributions=${distribs
    .filter((_distrib, i) => i > 1)
    .map((_distrib, i) => `1,${i + 2}`)
    .join(
      ";"
    )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
    process.env.REACT_APP_MAPBOX_TOKEN
  }`;
}

export const newDropoffs = async (
  hotelCoordinates: number[],
  poiCoordinates: GeoJsonRes
) => {
  const query = await fetch(
    assembleQueryURL(hotelCoordinates, poiCoordinates),
    { method: "GET" }
  );
  const response = await query.json();
  const routeGeoJSON = featureCollection([feature(response.trips[0].geometry)]);
  return routeGeoJSON;
};
