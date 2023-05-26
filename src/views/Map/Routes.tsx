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
    <Fragment key={itineraryDay}>
      <Source
        id={`route${itineraryDay}`}
        type="geojson"
        data={routes[itineraryDay]}
      />
      <Layer
        id={`routeline-active${itineraryDay}`}
        type="line"
        source={`route${itineraryDay}`}
        layout={{
          "line-join": "round",
          "line-cap": "round"
        }}
        paint={{
          "line-color": colors[itineraryDay].primary,
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
        }}
        waterway-label
      />
      <Layer
        id={`routearrows${itineraryDay}`}
        type="symbol"
        source={`route${itineraryDay}`}
        layout={{
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
        }}
        paint={{
          "text-color": colors[itineraryDay].secondary,
          "text-halo-color": "hsl(55, 11%, 96%)",
          "text-halo-width": 3
        }}
        waterway-label
      />
    </Fragment>
  );
};

export default Routes;
