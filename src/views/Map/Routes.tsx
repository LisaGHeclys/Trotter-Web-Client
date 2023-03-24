import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { Fragment } from "react";
import { Layer, Source } from "react-map-gl";

type RoutesProps = {
  routes: { [id: string]: FeatureCollection<Geometry, GeoJsonProperties> };
  colors: { primary: string; secondary: string }[];
};

const Routes = ({ routes, colors }: RoutesProps) => {
  return (
    <>
      {Object.keys(routes).map((key, i) => {
        return (
          <Fragment key={key}>
            <Source id={`route${key}`} type="geojson" data={routes[key]} />
            <Layer
              id={`routeline-active${key}`}
              type="line"
              source={`route${key}`}
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{
                "line-color": colors[i].primary,
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  12,
                  3,
                  22,
                  12
                ]
              }}
              waterway-label
            />
            <Layer
              id={`routearrows${key}`}
              type="symbol"
              source={`route${key}`}
              layout={{
                "symbol-placement": "line",
                "text-field": "▶",
                "text-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  12,
                  24,
                  22,
                  60
                ],
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
              }}
              paint={{
                "text-color": colors[i].secondary,
                "text-halo-color": "hsl(55, 11%, 96%)",
                "text-halo-width": 3
              }}
              waterway-label
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default Routes;
