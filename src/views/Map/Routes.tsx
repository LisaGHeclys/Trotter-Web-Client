import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { FC, Fragment } from "react";
import { Layer, Source } from "react-map-gl";

type RoutesProps = {
  routes: { [id: string]: FeatureCollection<Geometry, GeoJsonProperties> };
  colors: { primary: string; secondary: string }[];
  itineraryDay: number;
};

const Routes: FC<RoutesProps> = ({ routes, colors, itineraryDay }) => {
  return (
    <>
      {Object.keys(routes).map((key, index) => (
        <Fragment key={key}>
          <Source id={`route${index}`} type="geojson" data={routes[index]} />
          <Layer
            id={`routeline-active${index}`}
            type="line"
            source={`route${index}`}
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": colors[index].primary,
              "line-width":
                itineraryDay === index
                  ? ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
                  : ["interpolate", ["linear"], ["zoom"], 4, 1, 6, 4],
              "line-opacity": itineraryDay === index ? 1 : 0.1,
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
            id={`routearrows${index}`}
            type="symbol"
            source={`route${index}`}
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
              "text-color": colors[index].secondary,
              "text-halo-color": "hsl(55, 11%, 96%)",
              "text-halo-width": 3,
              "text-opacity": itineraryDay === index ? 1 : 0
            }}
            waterway-label
          />
        </Fragment>
      ))}
    </>
  );
};

export default Routes;
