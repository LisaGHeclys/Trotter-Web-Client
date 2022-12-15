import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { DateRange } from "react-date-range";
import "./index.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Range } from "react-date-range/index";
import { feature, featureCollection } from "@turf/helpers";
import { useSelector } from "react-redux";
import { getCoordinates } from "./functions";

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
  lng: 2.333333,
  lat: 48.866667,
  cityName: "Paris"
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
    mapboxgl.accessToken
  }`;
}

const BaseMap = () => {
  const ref = React.useRef<number>(0);
  const state = useSelector((state: any) => state);
  const [cityName, setCityName] = useState<string>(
    state.search.place === ""
      ? BaseMapPropsDefault.cityName
      : state.search.place
  );
  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [price, setPrice] = useState<number>(BaseMapPropsDefault.price);
  const [lng, setLng] = useState<number>(BaseMapPropsDefault.lng);
  const [lat, setLat] = useState<number>(BaseMapPropsDefault.lat);
  const [src, setSrc] = useState<string>("https://picsum.photos/200/300");
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: "selection"
    }
  ]);
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

  async function newDropoff(
    truckLocation: any,
    warehouseLocation: any,
    pointHopper: any,
    lastAtRestaurant: any,
    keepTrack: any
  ) {
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
    const routeGeoJSON = featureCollection([
      feature(response.trips[0].geometry)
    ]);
    return routeGeoJSON;
  }

  const testLocation = [BaseMapPropsDefault.lng, BaseMapPropsDefault.lat];

  useEffect(() => {
    if (range.length === 0 || !range[0].endDate || !range[0].startDate) return;
    const diffTime = Math.abs(
      range[0]?.endDate?.getTime() - range[0]?.startDate?.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLength(diffDays);
  }, [range]);
  let map: any;

  const getDays = () => {
    return length;
  };

  useEffect(() => {
    if (ref.current) return;
    ref.current = 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: 2
    });
    const nav = new mapboxgl.NavigationControl();
    map.setProjection({
      name: "globe"
    });
    map.addControl(nav, "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );
    map.on("style.load", () => {
      map.setFog({});
    });
    map.on("load", async () => {
      map.addSource("city", {
        type: "geojson",
        data: "http://localhost:3000/data.geojson"
      });

      map.addLayer({
        id: "city-layer",
        type: "circle",
        source: "city",
        paint: {
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white"
        }
      });

      // const warehouse = featureCollection([point(testLocation)]);
      // var locationA = point([2.3376327, 48.8661385], { name: "Location A" });
      // var locationB = point([2.3294382, 48.8674736], { name: "Location B" });
      // var locationC = point([2.3388429, 48.8663864], { name: "Location C" });

      var dropoffs = featureCollection([]);
      const nothing = featureCollection([]);
      map.addSource("route", {
        type: "geojson",
        data: nothing
      } as any);

      map.addSource("route2", {
        type: "geojson",
        data: nothing
      } as any);

      map.addSource("route3", {
        type: "geojson",
        data: nothing
      } as any);

      map.addSource("dropoffs", {
        type: "geojson",
        data: dropoffs
      } as any);

      map.addSource("dropoffs2", {
        type: "geojson",
        data: dropoffs
      } as any);

      map.addSource("dropoffs3", {
        type: "geojson",
        data: dropoffs
      } as any);

      map.addLayer(
        {
          id: "routeline-active",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "blue",
            "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
          }
        },
        "waterway-label"
      );

      map.addLayer(
        {
          id: "routeline-active2",
          type: "line",
          source: "route2",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "yellow",
            "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
          }
        },
        "waterway-label"
      );

      map.addLayer(
        {
          id: "routeline-active3",
          type: "line",
          source: "route3",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "red",
            "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
          }
        },
        "waterway-label"
      );

      map.addLayer({
        id: "dropoffs-symbol",
        type: "circle",
        source: "dropoffs",
        paint: {
          "circle-radius": 6,
          "circle-color": "blue",
          "circle-stroke-color": "lightblue",
          "circle-stroke-width": 1
        }
      });

      map.addLayer({
        id: "dropoffs-symbol2",
        type: "circle",
        source: "dropoffs2",
        paint: {
          "circle-radius": 6,
          "circle-color": "yellow",
          "circle-stroke-color": "green",
          "circle-stroke-width": 1
        }
      });

      map.addLayer({
        id: "dropoffs-symbol3",
        type: "circle",
        source: "dropoffs3",
        paint: {
          "circle-radius": 6,
          "circle-color": "red",
          "circle-stroke-color": "pink",
          "circle-stroke-width": 1
        }
      });

      (map.getSource("route") as any).setData(
        await newDropoff(testLocation, testLocation, dropoffs, 0, [])
      );
      map.addControl(
        new mapboxgl.ScaleControl({ maxWidth: 80, unit: "metric" }),
        "bottom-right"
      );
      map.addLayer(
        {
          id: "routearrows",
          type: "symbol",
          source: "route",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160
            ],
            "text-keep-upright": false
          },
          paint: {
            "text-color": "#3887be",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3
          }
        },
        "waterway-label"
      );

      map.addLayer(
        {
          id: "routearrows2",
          type: "symbol",
          source: "route2",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160
            ],
            "text-keep-upright": false
          },
          paint: {
            "text-color": "yellow",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3
          }
        },
        "waterway-label"
      );

      map.addLayer(
        {
          id: "routearrows3",
          type: "symbol",
          source: "route3",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160
            ],
            "text-keep-upright": false
          },
          paint: {
            "text-color": "red",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3
          }
        },
        "waterway-label"
      );

      const fetchCoordinates = async (cityName: string) => {
        const res = await getCoordinates(cityName);
        setLng(res.lon);
        setLat(res.lat);
        map.easeTo({
          center: [res.lon, res.lat],
          zoom: 12
        });
      };
      fetchCoordinates(cityName).catch((err) => console.log(err));
    });
    map.on("click", "city-layer", async (e: any) => {
      if (!e.features || e.features.length === 0) return;
      map.easeTo({
        center: [
          e.features[0].properties?.longitude,
          e.features[0].properties?.latitude
        ],
        zoom: 12
      });
      setCityName(e.features[0].properties?.name || "");
      setLng(e.features[0].properties?.longitude || 0);
      setLat(e.features[0].properties?.latitude || 0);
      setPrice(0);
      const localLon = e.features[0].properties?.longitude;
      const localLat = e.features[0].properties?.latitude;

      const res = await fetch(process.env.REACT_APP_SERVER_URI + "/IA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lon: e.features[0].properties?.longitude,
          lat: e.features[0].properties?.latitude,
          days: getDays()
        })
      });
      const resJson = await res.json();
      const a = resJson.features.filter((feature: any, i: number) => {
        return i <= 5;
      });
      const b = resJson.features.filter((feature: any, i: number) => {
        return i > 5 && i <= 10;
      });
      const c = resJson.features.filter((feature: any, i: number) => {
        return i > 10;
      });

      const coords = [localLon, localLat];
      resJson.features = a;
      (map.getSource("dropoffs") as any).setData(resJson);
      (map.getSource("route") as any).setData(
        await newDropoff(coords, coords, resJson, 0, [])
      );
      console.log(a);
      resJson.features = b;
      (map.getSource("dropoffs2") as any).setData(resJson);
      (map.getSource("route2") as any).setData(
        await newDropoff(coords, coords, resJson, 0, [])
      );
      console.log(b);
      resJson.features = c;
      (map.getSource("dropoffs3") as any).setData(resJson);
      console.log(resJson);
      (map.getSource("route3") as any).setData(
        await newDropoff(coords, coords, resJson, 0, [])
      );
      console.log(c);
    });
    map.on("mouseenter", "city-layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "city-layer", () => {
      map.getCanvas().style.cursor = "";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  useEffect(() => {
    setSrc(
      `https://picsum.photos/${Math.floor(Math.random() * 100) + 200}/${
        Math.floor(Math.random() * 100) + 200
      }`
    );
  }, [cityName]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <div className="mapSidebar">
        <h1>Go world trotting!</h1>
        <p>
          <b>{length} days</b> in {cityName}!
        </p>
        <DateRange
          editableDateInputs={true}
          onChange={(item) =>
            setRange([
              {
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
                key: "selection"
              }
            ])
          }
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="dateRange"
          minDate={new Date()}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          weekStartsOn={1}
        />
        <h5>Some monument</h5>
        <img width={250} height={200} alt={"Eiffel Tower"} src={src} />
        <br />
        <b>Only for {price}€!</b>
      </div>
      <div id="mapContainer" className="map"></div>
    </div>
  );
};

export default BaseMap;
