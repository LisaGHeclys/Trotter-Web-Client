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
