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
