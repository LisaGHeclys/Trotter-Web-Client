import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { Fragment } from "react";
import { Layer, Source } from "react-map-gl";

type DropoffsProps = {
  dropoffs: { [id: string]: FeatureCollection<Geometry, GeoJsonProperties> };
  colors: { primary: string; secondary: string }[];
};

const Dropoffs = ({ dropoffs, colors }: DropoffsProps) => {
  return (
    <>
      {Object.keys(dropoffs).map((key, i) => {
        return (
          <Fragment key={key}>
            <Source id={`dropoffs${key}`} type="geojson" data={dropoffs[key]} />
            <Layer
              id={`dropoff${key}`}
              type="circle"
              source={`dropoffs${key}`}
              paint={{
                "circle-radius": 6,
                "circle-color": colors[i].primary,
                "circle-stroke-color": colors[i].secondary,
                "circle-stroke-width": 1
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default Dropoffs;
