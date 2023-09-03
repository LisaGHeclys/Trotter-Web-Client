import { FC, Fragment } from "react";
import { Layer, Source } from "react-map-gl";
import React from "react";
import { RoutesProps } from "./Maps.type";

const Routes: FC<RoutesProps> = ({ routes, colors, itineraryDay }) => {
  return (
    <>
      {Object.keys(routes)
        .map((key) => parseInt(key))
        .map((key) => (
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
                "line-color": colors[key].primary,
                "line-width":
                  itineraryDay === key
                    ? ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
                    : ["interpolate", ["linear"], ["zoom"], 4, 1, 6, 4],
                "line-opacity": itineraryDay === key ? 1 : 0.1,
                "line-width-transition": {
                  delay: 0,
                  duration: 300
                },
                "line-opacity-transition": {
                  delay: 0,
                  duration: 300
                }
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
                "text-color": colors[key].secondary,
                "text-halo-color": "hsl(55, 11%, 96%)",
                "text-halo-width": 3,
                "text-opacity": itineraryDay === key ? 1 : 0
              }}
              waterway-label
            />
          </Fragment>
        ))}
    </>
  );
};

export default Routes;
