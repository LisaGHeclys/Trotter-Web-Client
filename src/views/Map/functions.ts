import { feature, featureCollection } from "@turf/helpers";
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
  truckLocation: any,
  warehouseLocation: any,
  pointHopper: any,
  lastAtRestaurant: any,
  keepTrack: any
) {
  const coordinates = [truckLocation];
  const distributions = [];
  keepTrack = [truckLocation];

  const restJobs = pointHopper.features;

  if (restJobs.length > 0) {
    const needToPickUp = true;
    const restaurantIndex = coordinates.length;
    coordinates.push(warehouseLocation);
    keepTrack.push(pointHopper.warehouse);

    for (const job of restJobs) {
      keepTrack.push(job);
      coordinates.push(job.geometry.coordinates);
      if (needToPickUp > lastAtRestaurant) {
        distributions.push(`${restaurantIndex},${coordinates.length - 1}`);
      }
    }
  }
  return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
    ";"
  )}?distributions=${distributions.join(
    ";"
  )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
    process.env.REACT_APP_MAPBOX_TOKEN
  }`;
}

export const newDropoffs = async (
  truckLocation: any,
  warehouseLocation: any,
  pointHopper: any,
  lastAtRestaurant: any,
  keepTrack: any
) => {
  const query = await fetch(
    assembleQueryURL(
      truckLocation,
      warehouseLocation,
      pointHopper,
      lastAtRestaurant,
      keepTrack
    ),
    { method: "GET" }
  );
  const response = await query.json();
  const routeGeoJSON = featureCollection([feature(response.trips[0].geometry)]);
  return routeGeoJSON;
};
