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
