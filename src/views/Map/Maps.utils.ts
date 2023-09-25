import { BaseMapProps } from "./Maps.type";

export const BaseMapPropsDefault: BaseMapProps = {
  length: 3,
  price: 0,
  lng: 2.333333,
  lat: 48.866667,
  cityName: "Paris"
};

export const weekColors: { primary: string; secondary: string }[] = [
  { primary: "red", secondary: "lightcoral" },
  { primary: "blue", secondary: "lightblue" },
  { primary: "green", secondary: "lightgreen" },
  { primary: "yellow", secondary: "lightyellow" },
  { primary: "orange", secondary: "orange" },
  { primary: "purple", secondary: "purple" },
  { primary: "brown", secondary: "lightbrown" }
];

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